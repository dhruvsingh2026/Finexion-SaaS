export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  {
    label: 'Features',
    href: '#features',
    children: [
      { label: 'Smart Budgeting', href: '#features', description: 'Adaptive categorisation and threshold warnings' },
      { label: 'AI Forecasting', href: '#global-finance', description: 'Predict future expenses with generative trends' },
      { label: 'Multi-Currency Hub', href: '#features', description: 'Zero-fee conversion tracking across 50+ countries' },
    ],
  },
  { label: 'Solutions', href: '#how-it-works' },
  { label: 'Analytics', href: '#global-finance' },
  { label: 'Pricing', href: '#pricing' },
]
