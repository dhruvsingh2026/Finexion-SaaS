export interface PricingPlan {
  id: string
  name: string
  monthlyPrice: number
  yearlyPricePerMonth: number
  yearlyBilledTotal: number
  description: string
  features: string[]
  cta: string
  isPopular?: boolean
}

export const PRICING_DATA = {
  eyebrow: 'Pricing Plan',
  headingLead: 'Simple and ',
  headingAccent: 'Transparent Pricing',
  subparagraph: 'Choose a plan that fits your financial journey.',
  plans: [
    {
      id: 'starter',
      name: 'Starter (Free)',
      monthlyPrice: 0,
      yearlyPricePerMonth: 0,
      yearlyBilledTotal: 0,
      description: 'Perfect for tracking your basic expenses and getting real-time insights.',
      features: [
        'Basic expense and income tracking',
        'Automatic transaction categorisation',
        'Monthly spending summary',
        'One linked account (demo)',
        'Standard customer support',
      ],
      cta: 'Get Started Free',
      isPopular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      monthlyPrice: 99,
      yearlyPricePerMonth: 84,
      yearlyBilledTotal: 1010,
      description: 'Unlock advanced features for smarter financial decisions.',
      features: [
        'Unlimited expense and income tracking',
        'Advanced budgeting tools',
        'Detailed financial reports',
        'Multi-account support',
        'Priority customer support',
        'Bank-level security',
      ],
      cta: 'Upgrade to Pro',
      isPopular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: 399,
      yearlyPricePerMonth: 339,
      yearlyBilledTotal: 4070,
      description: 'Built for teams, startups, and professionals with complex needs.',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Advanced user roles and permissions',
        'Dedicated account manager',
        'Custom reports and dashboards',
      ],
      cta: 'Contact Sales',
      isPopular: false,
    },
  ],
}
