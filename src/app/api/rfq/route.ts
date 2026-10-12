import { NextResponse } from 'next/server';
import { rfqFormSchema } from '@/lib/validation/rfq';
import { dataStore } from '@/lib/data/store';
import { sendRfqNotification } from '@/lib/email/rfq-notifier';

export async function POST(request: Request) {
  try {
    const json = await request.json();

    // 1. Anti-spam honeypot check
    if (json.website_url_hp && json.website_url_hp.length > 0) {
      return NextResponse.json(
        { error: 'Spam submission rejected.' },
        { status: 400 }
      );
    }

    // 2. Schema validation
    const parsed = rfqFormSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.format() },
        { status: 422 }
      );
    }

    const {
      company_name,
      contact_person,
      email,
      phone,
      product_id,
      product_name,
      required_quantity,
      grade_spec,
      application,
      target_delivery_date,
      additional_comments,
    } = parsed.data;

    // 3. Database persistence
    const rfq = await dataStore.createRFQ({
      company_name,
      contact_person,
      email,
      phone,
      product_id: product_id || null,
      product_name,
      required_quantity,
      grade_spec: grade_spec || null,
      application: application || null,
      target_delivery_date: target_delivery_date || null,
      additional_comments: additional_comments || null,
    });

    // 4. Dispatch Email Notification
    const emailResult = await sendRfqNotification(rfq);

    return NextResponse.json(
      {
        success: true,
        reference_number: rfq.reference_number,
        message: 'Your Request for Quotation has been received successfully.',
        notification_delivered: emailResult.success,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
