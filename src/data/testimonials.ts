export interface TestimonialItem {
  id: string
  quote: string
  name: string
  role: string
  company: string
  photo: string
  initials: string
}

export const TESTIMONIALS_DATA = {
  eyebrow: 'Testimonials',
  headingLead: 'Real Stories Shared ',
  headingAccent: 'by Our Customers',
  subparagraph:
    'Hear directly from investors, traders, and professionals who use our platform daily to manage finances and grow wealth.',
  items: [
    {
      id: 'test-1',
      quote:
        '“Real-time insights completely changed how I manage my portfolio. I’m making smarter decisions and seeing consistent growth month after month.”',
      name: 'Sarah Williams',
      role: 'Financial Analyst',
      company: 'Retail Firm',
      photo: '/images/testimonial-1.svg',
      initials: 'SW',
    },
    {
      id: 'test-2',
      quote:
        '“The platform was incredibly easy to set up and delivered value instantly. Within the first few weeks, I gained better control and started investing with confidence.”',
      name: 'David Carter',
      role: 'Retail Investor',
      company: 'Adobe',
      photo: '/images/testimonial-2.svg',
      initials: 'DC',
    },
    {
      id: 'test-3',
      quote:
        '“I finally understand where my money goes each month, and the weekly insights keep me on track without spreadsheets.”',
      name: 'Priya Nair',
      role: 'Freelance Designer',
      company: 'TerraFinance',
      photo: '/images/testimonial-3.svg',
      initials: 'PN',
    },
  ],
  brands: [
    'Retail Firm',
    'TerraDigital',
    'FinLogic',
    'FinanceSync',
    'Brightline',
  ],
}
