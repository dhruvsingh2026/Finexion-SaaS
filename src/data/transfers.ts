export interface TransferRow {
  id: string
  code: string
  currency: string
  country: string
  amount: string
  status?: 'Pending' | 'Completed'
  flag: 'us' | 'fr' | 'gb'
}

export const CORE_FEATURES = [
  {
    id: 'feat-1',
    title: 'Built for Individuals and Businesses',
    description:
      'Whether you are managing personal budgets or handling business accounts, our tools adapt to your financial goals.',
    defaultExpanded: true,
  },
  {
    id: 'feat-2',
    title: 'Real-Time Financial Insights',
    description:
      'Get instant alerts, categorised spending telemetry, and AI-predicted cash flow balances before month-end.',
    defaultExpanded: false,
  },
  {
    id: 'feat-3',
    title: 'Secure and Reliable Infrastructure',
    description:
      'Bank-grade TLS 1.3 encryption, biometric session authentication, and isolated zero-knowledge vaults.',
    defaultExpanded: false,
  },
]

export const TRANSFER_ROWS: TransferRow[] = [
  {
    id: 'inv-384',
    code: 'INV384',
    currency: 'USD',
    country: 'United States',
    amount: '$1,500',
    flag: 'us',
    status: 'Completed',
  },
  {
    id: 'inv-385',
    code: 'INV385',
    currency: 'EUR',
    country: 'France',
    amount: '€1,200',
    flag: 'fr',
    status: 'Pending',
  },
  {
    id: 'inv-386',
    code: 'INV386',
    currency: 'GBP',
    country: 'United Kingdom',
    amount: '£900',
    flag: 'gb',
    status: 'Completed',
  },
]
