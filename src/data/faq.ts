export interface FAQItem {
  id: string
  number: string
  question: string
  answer: string
}

export const FAQ_DATA = {
  eyebrow: 'FAQ',
  headingLead: 'Frequently Asked ',
  headingAccent: 'Questions',
  support: {
    title: 'Still have a question?',
    subtitle: 'Our team is happy to help with anything about Finexa.',
    cta: 'Contact Us',
  },
  items: [
    {
      id: 'faq-01',
      number: '01',
      question: 'What is Finexa and who is it for?',
      answer:
        'Finexa is an intelligent financial tracking and management platform designed for ambitious individuals, freelancers, and growing businesses looking to gain crystal-clear visibility into their cash flow and investments.',
    },
    {
      id: 'faq-02',
      number: '02',
      question: 'How does Finexa’s AI generate financial insights?',
      answer:
        'Finexa analyses your categorised transactions, budgets and goals to surface spending patterns, forecasts and suggestions. In this demo, every insight is generated from sample data.',
    },
    {
      id: 'faq-03',
      number: '03',
      question: 'Do I need financial expertise to use Finexa?',
      answer:
        'Not at all. Finexa is designed with an intuitive, clutter-free desk philosophy. Complex financial metrics are converted into plain-language summaries and actionable suggestions.',
    },
    {
      id: 'faq-04',
      number: '04',
      question: 'How is my data protected?',
      answer:
        'We enforce industry-standard TLS encryption in transit and AES-256 at rest, paired with multi-factor authentication and strict zero-knowledge principles. (This demonstration site uses client-side simulated data only).',
    },
    {
      id: 'faq-05',
      number: '05',
      question: 'Can I change or cancel my plan at any time?',
      answer:
        'Yes. You can switch between Monthly and Yearly billing, upgrade your tier, or downgrade whenever your requirements change without lock-in contracts or exit penalties.',
    },
  ],
}
