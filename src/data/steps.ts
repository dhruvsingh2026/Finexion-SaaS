export interface StepItem {
  number: string
  title: string
  description: string
}

export const STEPS_DATA = {
  eyebrow: 'How it works',
  headingLead: 'Simple Steps to ',
  headingAccent: 'Smarter Finance',
  subparagraph:
    'Automate your financial operations, track performance in real time, and make confident decisions backed by clear insights.',
  steps: [
    {
      step: 'Step 01',
      title: 'Smart Wallet Overview',
      description: 'Track balance, rewards, and transfers in one secure place.',
    },
    {
      step: 'Step 02',
      title: 'Financial Performance Insights',
      description: 'Monitor trends and make smarter financial decisions.',
    },
    {
      step: 'Step 03',
      title: 'Flexible Pricing Plans',
      description: 'Pick the right plan with clear, transparent pricing.',
    },
  ],
}
