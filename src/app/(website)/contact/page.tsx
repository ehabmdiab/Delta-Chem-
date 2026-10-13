import { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact DELTACHEM | Cairo Head Office & Sales Desk',
  description:
    'Get in touch with DELTACHEM: Head office at 66 Gamal El-Deen Zaki st, Gesr El-Suez, Cairo. Tel: (202) 26988187. Email: sales@deltachem.com.eg.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
