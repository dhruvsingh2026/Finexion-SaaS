export const HERO_DATA = {
  badge: 'AI-Powered Personal Finance',
  headlineLead: 'Manage Your ',
  headlineAccent: 'Money Smarter,',
  headlineTail: ' Powered by Real Insights',
  subparagraph:
    'Finexa brings your balances, transactions and goals into one place, with AI-driven insights that help you spend, save and plan with more confidence.',
  ctaPrimary: {
    label: 'Start Free Trial',
    href: '#pricing',
  },
  ctaSecondary: {
    label: 'Watch Demo',
    href: '#how-it-works',
  },
  phone: {
    userName: 'Oripio Sajibur',
    time: '9:41',
    balance: '$56,893.30',
    changePct: '+2.4%',
    maskedCard: '•••• •••• 2329',
    contacts: [
      { name: 'Noah', bg: 'bg-emerald-100 text-emerald-800' },
      { name: 'Mason', bg: 'bg-blue-100 text-blue-800' },
      { name: 'Oliver', bg: 'bg-amber-100 text-amber-800' },
      { name: 'Lucas', bg: 'bg-purple-100 text-purple-800' },
      { name: 'Mia', bg: 'bg-rose-100 text-rose-800' },
    ],
  },
  savingsCard: {
    title: 'My Savings Plan',
    items: [
      {
        label: 'Investment Goal',
        current: '$19,935',
        total: '$25,000',
        pct: 82,
        icon: 'target',
      },
      {
        label: 'Emergency Fund',
        current: '$12,000',
        total: '$20,000',
        pct: 60,
        icon: 'shield',
      },
    ],
  },
  transactionsCard: {
    title: 'Transaction History',
    items: [
      {
        title: 'Spotify',
        subtitle: 'Subscription',
        amount: '-$15.99',
        type: 'negative' as const,
        icon: 'music',
      },
      {
        title: 'PayPal Transfer',
        subtitle: 'Invoice payout',
        amount: '+$120.00',
        type: 'positive' as const,
        icon: 'send',
      },
      {
        title: 'Wayflow Payroll',
        subtitle: 'Direct deposit',
        amount: '+$650.00',
        type: 'positive' as const,
        icon: 'briefcase',
      },
    ],
  },
}
