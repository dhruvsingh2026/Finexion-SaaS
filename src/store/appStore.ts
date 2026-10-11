import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DisplayCurrency } from '../api/fx'
import type { AssetClass, Timeframe } from '../types/market'

interface PrefsState {
  currency: DisplayCurrency
  setCurrency: (currency: DisplayCurrency) => void
}

export const usePrefsStore = create<PrefsState>()(
  persist(
    (set) => ({
      currency: 'INR',
      setCurrency: (currency) => set({ currency }),
    }),
    { name: 'fairbook-prefs' },
  ),
)

interface SelectionState {
  selectedId: string
  selectedSymbol: string
  assetClass: AssetClass
  timeframe: Timeframe
  tab: 'crypto' | 'stocks' | 'watchlist'
  setSelection: (id: string, symbol: string, assetClass: AssetClass) => void
  setTimeframe: (tf: Timeframe) => void
  setTab: (tab: 'crypto' | 'stocks' | 'watchlist') => void
}

export const useSelectionStore = create<SelectionState>()((set) => ({
  selectedId: 'bitcoin',
  selectedSymbol: 'BTC',
  assetClass: 'crypto',
  timeframe: '1D',
  tab: 'crypto',
  setSelection: (id, symbol, assetClass) =>
    set((s) => ({
      selectedId: id,
      selectedSymbol: symbol,
      assetClass,
      timeframe: assetClass === 'stock' ? '1D' : s.timeframe,
    })),
  setTimeframe: (timeframe) => set({ timeframe }),
  setTab: (tab) => set({ tab }),
}))

interface WatchlistState {
  ids: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      ids: ['bitcoin', 'ethereum', 'AAPL', 'NVDA'],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
    }),
    { name: 'fairbook-watchlist' },
  ),
)

export interface Position {
  id: string
  symbol: string
  assetClass: AssetClass
  qty: number
  avgPrice: number
}

export interface Trade {
  id: string
  symbol: string
  side: 'buy' | 'sell'
  qty: number
  price: number
  at: number
}

interface PaperState {
  userId: string | null
  cash: number
  positions: Position[]
  trades: Trade[]
  hydrateForUser: (userId: string) => void
  addMoney: (usdAmount: number) => string | null
  buy: (symbol: string, assetClass: AssetClass, qty: number, price: number) => string | null
  sell: (symbol: string, qty: number, price: number) => string | null
  reset: () => void
}

/** New accounts start empty — use Add money (demo) to fund the wallet. */
const START_CASH = 0

function paperKey(userId: string) {
  return `fairbook-paper-${userId}`
}

function loadPaper(userId: string): Pick<PaperState, 'cash' | 'positions' | 'trades'> {
  try {
    const raw = localStorage.getItem(paperKey(userId))
    if (!raw) return { cash: START_CASH, positions: [], trades: [] }
    const parsed = JSON.parse(raw) as {
      cash?: number
      positions?: Position[]
      trades?: Trade[]
    }
    return {
      cash: typeof parsed.cash === 'number' ? parsed.cash : START_CASH,
      positions: parsed.positions ?? [],
      trades: parsed.trades ?? [],
    }
  } catch {
    return { cash: START_CASH, positions: [], trades: [] }
  }
}

function savePaper(
  userId: string,
  data: Pick<PaperState, 'cash' | 'positions' | 'trades'>,
) {
  localStorage.setItem(paperKey(userId), JSON.stringify(data))
}

export const usePaperStore = create<PaperState>()((set, get) => ({
  userId: null,
  cash: START_CASH,
  positions: [],
  trades: [],
  hydrateForUser: (userId) => {
    const prev = get().userId
    if (prev && prev !== userId) {
      savePaper(prev, {
        cash: get().cash,
        positions: get().positions,
        trades: get().trades,
      })
    }
    const next = loadPaper(userId)
    set({ userId, ...next })
  },
  addMoney: (usdAmount) => {
    const { userId, cash, positions, trades } = get()
    if (!userId) return 'Please log in'
    if (!Number.isFinite(usdAmount) || usdAmount <= 0) return 'Enter a valid amount'
    if (usdAmount > 1_000_000) return 'Demo max exceeded'
    const next = { cash: cash + usdAmount, positions, trades }
    savePaper(userId, next)
    set(next)
    return null
  },
  buy: (symbol, assetClass, qty, price) => {
    const cost = qty * price
    const { userId, cash, positions, trades } = get()
    if (!userId) return 'Please log in'
    if (qty <= 0 || price <= 0) return 'Invalid quantity'
    if (cost > cash) return 'Insufficient cash — add money to wallet'
    const existing = positions.find((p) => p.symbol === symbol)
    let nextPositions: Position[]
    if (existing) {
      const totalQty = existing.qty + qty
      const avgPrice = (existing.avgPrice * existing.qty + cost) / totalQty
      nextPositions = positions.map((p) =>
        p.symbol === symbol ? { ...p, qty: totalQty, avgPrice } : p,
      )
    } else {
      nextPositions = [
        ...positions,
        { id: symbol, symbol, assetClass, qty, avgPrice: price },
      ]
    }
    const trade: Trade = {
      id: crypto.randomUUID(),
      symbol,
      side: 'buy',
      qty,
      price,
      at: Date.now(),
    }
    const next = {
      cash: cash - cost,
      positions: nextPositions,
      trades: [trade, ...trades].slice(0, 50),
    }
    savePaper(userId, next)
    set(next)
    return null
  },
  sell: (symbol, qty, price) => {
    const { userId, cash, positions, trades } = get()
    if (!userId) return 'Please log in'
    const existing = positions.find((p) => p.symbol === symbol)
    if (!existing) return 'No position'
    if (qty <= 0 || price <= 0) return 'Invalid quantity'
    if (qty > existing.qty) return 'Not enough shares'
    const proceeds = qty * price
    const remaining = existing.qty - qty
    const nextPositions =
      remaining <= 1e-10
        ? positions.filter((p) => p.symbol !== symbol)
        : positions.map((p) => (p.symbol === symbol ? { ...p, qty: remaining } : p))
    const trade: Trade = {
      id: crypto.randomUUID(),
      symbol,
      side: 'sell',
      qty,
      price,
      at: Date.now(),
    }
    const next = {
      cash: cash + proceeds,
      positions: nextPositions,
      trades: [trade, ...trades].slice(0, 50),
    }
    savePaper(userId, next)
    set(next)
    return null
  },
  reset: () => {
    const { userId } = get()
    const next = { cash: START_CASH, positions: [] as Position[], trades: [] as Trade[] }
    if (userId) savePaper(userId, next)
    set(next)
  },
}))

