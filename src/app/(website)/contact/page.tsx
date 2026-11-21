import { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact DELTACHEM | Cairo Head Office & Sales Desk',
  description:
    'Contact DELTACHEM at 64 Abdel Aziz Hegazy Street, El Togarieen, Gesr El-Suez, Cairo, Egypt. Tel: 0226988187 / 0226988217. Mobile & WhatsApp: 01003875503 / 01210110609.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
