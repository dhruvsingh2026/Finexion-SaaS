import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'Starter' | 'Pro' | 'Enterprise'
  balance: number
  currency: string
  createdAt: string
}

export interface Transaction {
  id: string
  title: string
  category: string
  amount: number
  type: 'credit' | 'debit'
  date: string
  status: 'Completed' | 'Pending'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  transactions: Transaction[]
  login: (email: string, password: string) => { success: boolean; error?: string }
  signup: (name: string, email: string, password: string, plan?: 'Starter' | 'Pro' | 'Enterprise') => { success: boolean; error?: string }
  logout: () => void
  deposit: (amount: number, note?: string) => void
  transfer: (amount: number, recipient: string) => { success: boolean; error?: string }
  updatePlan: (plan: 'Starter' | 'Pro' | 'Enterprise') => void
}

const DEFAULT_DEMO_USER: User = {
  id: 'usr_demo_01',
  name: 'Alex Vance',
  email: 'alex@finexa.finance',
  avatar: 'AV',
  plan: 'Pro',
  balance: 56893.30,
  currency: 'USD',
  createdAt: '2026-01-15',
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_01',
    title: 'Apple Store Purchase',
    category: 'Hardware & Tech',
    amount: 129.00,
    type: 'debit',
    date: 'Today, 2:45 PM',
    status: 'Completed',
  },
  {
    id: 'tx_02',
    title: 'Salary Deposit (TechCorp)',
    category: 'Direct Deposit',
    amount: 6450.00,
    type: 'credit',
    date: 'Oct 10, 2026',
    status: 'Completed',
  },
  {
    id: 'tx_03',
    title: 'AWS Cloud Infrastructure',
    category: 'Business Services',
    amount: 342.15,
    type: 'debit',
    date: 'Oct 08, 2026',
    status: 'Completed',
  },
  {
    id: 'tx_04',
    title: 'Dividend Yield (Vanguard ETF)',
    category: 'Investments',
    amount: 512.40,
    type: 'credit',
    date: 'Oct 05, 2026',
    status: 'Completed',
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      transactions: INITIAL_TRANSACTIONS,

      login: (email, password) => {
        const cleanEmail = email.trim().toLowerCase()
        if (!cleanEmail || !password) {
          return { success: false, error: 'Please provide both email and password.' }
        }

        // Demo user shortcut or registered users check
        const storedUsersRaw = localStorage.getItem('finexa_registered_users')
        const registeredUsers: Array<{ name: string; email: string; password: string; plan?: User['plan'] }> = storedUsersRaw
          ? JSON.parse(storedUsersRaw)
          : []

        const foundUser = registeredUsers.find(
          (u) => u.email.toLowerCase() === cleanEmail && u.password === password
        )

        if (foundUser) {
          const userObj: User = {
            id: `usr_${Date.now()}`,
            name: foundUser.name,
            email: foundUser.email,
            avatar: foundUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
            plan: foundUser.plan || 'Pro',
            balance: 12450.00,
            currency: 'USD',
            createdAt: new Date().toISOString().split('T')[0],
          }
          set({ user: userObj, isAuthenticated: true })
          return { success: true }
        }

        // If user enters the default demo credentials or any demo test
        if (cleanEmail === DEFAULT_DEMO_USER.email.toLowerCase() || (cleanEmail === 'demo@finexa.finance' && password.length >= 4)) {
          set({ user: DEFAULT_DEMO_USER, isAuthenticated: true })
          return { success: true }
        }

        // Allow instant login for demo simplicity if password is at least 4 chars
        if (cleanEmail.includes('@') && password.length >= 4) {
          const namePart = cleanEmail.split('@')[0].replace(/[._]/g, ' ')
          const capitalizedName = namePart
            .split(' ')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ') || 'Finance User'

          const userObj: User = {
            id: `usr_${Date.now()}`,
            name: capitalizedName,
            email: cleanEmail,
            avatar: capitalizedName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
            plan: 'Pro',
            balance: 24500.00,
            currency: 'USD',
            createdAt: new Date().toISOString().split('T')[0],
          }
          set({ user: userObj, isAuthenticated: true })
          return { success: true }
        }

        return {
          success: false,
          error: 'Invalid credentials. Password must be at least 4 characters, or click "Quick Demo Login".',
        }
      },

      signup: (name, email, password, plan = 'Pro') => {
        const cleanName = name.trim()
        const cleanEmail = email.trim().toLowerCase()

        if (!cleanName) {
          return { success: false, error: 'Please enter your full name.' }
        }
        if (!cleanEmail || !cleanEmail.includes('@')) {
          return { success: false, error: 'Please provide a valid email address.' }
        }
        if (password.length < 4) {
          return { success: false, error: 'Password must be at least 4 characters long.' }
        }

        // Save into local registered users
        const storedUsersRaw = localStorage.getItem('finexa_registered_users')
        const registeredUsers: Array<{ name: string; email: string; password: string; plan?: User['plan'] }> = storedUsersRaw
          ? JSON.parse(storedUsersRaw)
          : []

        if (registeredUsers.some((u) => u.email.toLowerCase() === cleanEmail)) {
          return { success: false, error: 'An account with this email already exists. Please log in.' }
        }

        registeredUsers.push({ name: cleanName, email: cleanEmail, password, plan })
        localStorage.setItem('finexa_registered_users', JSON.stringify(registeredUsers))

        const newUser: User = {
          id: `usr_${Date.now()}`,
          name: cleanName,
          email: cleanEmail,
          avatar: cleanName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
          plan,
          balance: 10000.00,
          currency: 'USD',
          createdAt: new Date().toISOString().split('T')[0],
        }

        set({ user: newUser, isAuthenticated: true })
        return { success: true }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      deposit: (amount, note = 'Deposit to Balance') => {
        const { user, transactions } = get()
        if (!user || amount <= 0) return

        const newBalance = user.balance + amount
        const newTx: Transaction = {
          id: `tx_${Date.now()}`,
          title: note,
          category: 'Account Funding',
          amount,
          type: 'credit',
          date: 'Just now',
          status: 'Completed',
        }

        set({
          user: { ...user, balance: newBalance },
          transactions: [newTx, ...transactions],
        })
      },

      transfer: (amount, recipient) => {
        const { user, transactions } = get()
        if (!user) return { success: false, error: 'You must be logged in.' }
        if (amount <= 0) return { success: false, error: 'Please enter a valid amount.' }
        if (user.balance < amount) return { success: false, error: 'Insufficient funds for this transfer.' }

        const newBalance = user.balance - amount
        const newTx: Transaction = {
          id: `tx_${Date.now()}`,
          title: `Transfer to ${recipient.trim() || 'Beneficiary'}`,
          category: 'Wire & Transfer',
          amount,
          type: 'debit',
          date: 'Just now',
          status: 'Completed',
        }

        set({
          user: { ...user, balance: newBalance },
          transactions: [newTx, ...transactions],
        })

        return { success: true }
      },

      updatePlan: (plan) => {
        const { user } = get()
        if (!user) return
        set({ user: { ...user, plan } })
      },
    }),
    {
      name: 'finexa_auth_storage',
    }
  )
)
