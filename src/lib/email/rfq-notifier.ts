import { RFQ } from '@/types';

export type SendRfqResult = {
  success: boolean;
  messageId?: string;
  error?: string;
};

export async function sendRfqNotification(rfq: RFQ): Promise<SendRfqResult> {
  const recipientEmail = process.env.RFQ_NOTIFICATION_EMAIL || 'sales@deltachem.com.eg';
  const apiKey = process.env.RESEND_API_KEY;

  const emailSubject = `[New RFQ Inquiry] ${rfq.reference_number} - ${rfq.product_name} (${rfq.company_name})`;
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0a192f; padding: 24px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 0.5px;">DELTACHEM B2B Commercial Portal</h1>
        <p style="margin: 4px 0 0; font-size: 14px; color: #38bdf8;">New Request for Quotation Received</p>
      </div>
      
      <div style="padding: 24px; background-color: #ffffff;">
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px;">
          <strong style="color: #166534;">Inquiry Reference:</strong> <span style="font-family: monospace; font-size: 15px; color: #15803d; font-weight: bold;">${rfq.reference_number}</span>
        </div>

        <h3 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #0d9488; padding-bottom: 6px;">Requested Product Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 40%;"><strong>Product Name:</strong></td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${rfq.product_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;"><strong>Inquiry Quantity:</strong></td>
            <td style="padding: 8px 0; color: #0f172a;">${rfq.required_quantity}</td>
          </tr>
          ${rfq.grade_spec ? `<tr><td style="padding: 8px 0; color: #64748b;"><strong>Grade / Spec:</strong></td><td style="padding: 8px 0; color: #0f172a;">${rfq.grade_spec}</td></tr>` : ''}
          ${rfq.application ? `<tr><td style="padding: 8px 0; color: #64748b;"><strong>Application:</strong></td><td style="padding: 8px 0; color: #0f172a;">${rfq.application}</td></tr>` : ''}
          ${rfq.target_delivery_date ? `<tr><td style="padding: 8px 0; color: #64748b;"><strong>Target Date:</strong></td><td style="padding: 8px 0; color: #0f172a;">${rfq.target_delivery_date}</td></tr>` : ''}
        </table>

        <h3 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #0d9488; padding-bottom: 6px;">Buyer Contact Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 40%;"><strong>Company Name:</strong></td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${rfq.company_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;"><strong>Contact Person:</strong></td>
            <td style="padding: 8px 0; color: #0f172a;">${rfq.contact_person}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;"><strong>Business Email:</strong></td>
            <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${rfq.email}" style="color: #0d9488;">${rfq.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;"><strong>Telephone / Mobile:</strong></td>
            <td style="padding: 8px 0; color: #0f172a;">${rfq.phone}</td>
          </tr>
        </table>

        ${
          rfq.additional_comments
            ? `<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px;">
                <strong style="color: #475569; display: block; margin-bottom: 4px;">Additional Requirements / Comments:</strong>
                <p style="margin: 0; color: #334155; font-style: italic;">${rfq.additional_comments}</p>
              </div>`
            : ''
        }

        <p style="font-size: 13px; color: #64748b; margin-top: 24px;">
          This inquiry has been logged in the DELTACHEM Admin Management Portal. Log in to the administrator portal to review or update quotation status.
        </p>
      </div>
      <div style="background-color: #f1f5f9; padding: 14px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
        DELTACHEM Company &bull; 66 Gamal El-Deen Zaki st, Gesr El-Suez, Cairo, Egypt &bull; Tel: (202) 26988187
      </div>
    </div>
  `;

  // If Resend API key is configured, execute real dispatch
  if (apiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL || 'DELTACHEM Portal <notifications@deltachem.com.eg>',
          to: [recipientEmail],
          subject: emailSubject,
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { success: false, error: `Resend API error: ${errorText}` };
      }

      const data = (await response.json()) as { id: string };
      return { success: true, messageId: data.id };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, error: errorMsg };
    }
  }

  // Fallback: Log notification for inspection in local dev or unconfigured email
  console.log(`[RFQ Email Dispatch Simulation] Sent to ${recipientEmail}:`, {
    reference: rfq.reference_number,
    company: rfq.company_name,
    product: rfq.product_name,
  });

  return { success: true, messageId: `simulated-${Date.now()}` };
}
