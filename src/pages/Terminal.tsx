import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CandlestickChart } from 'lucide-react'
import { fetchCryptoMarkets, fetchCryptoOhlc } from '../api/coingecko'
import { fetchStockCandles, fetchStockUniverse } from '../api/finnode'
import { Header } from '../components/Header'
import { MarketPulse } from '../components/MarketPulse'
import { OrderTicket } from '../components/OrderTicket'
import { PositionsBar } from '../components/PositionsBar'
import { Sidebar } from '../components/Sidebar'
import { TradingChart } from '../components/TradingChart'
import { useMoney } from '../hooks/useMoney'
import { formatPct } from '../lib/format'
import { usePaperStore, useSelectionStore } from '../store/appStore'
import { useAuthStore } from '../store/authStore'
import type { Candle, OhlcReadout, Timeframe } from '../types/market'

const TIMEFRAMES: Timeframe[] = ['1H', '4H', '1D', '1W', '1M']

function formatAxisPrice(value: number, currency: 'INR' | 'USD') {
  if (!Number.isFinite(value)) return '—'
  const locale = currency === 'INR' ? 'en-IN' : 'en-US'
  const abs = Math.abs(value)
  return value.toLocaleString(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: abs >= 1 ? 2 : 6,
  })
}

export default function Terminal() {
  const [query, setQuery] = useState('')
  const [ohlc, setOhlc] = useState<OhlcReadout | null>(null)
  const session = useAuthStore((s) => s.session)
  const hydrateForUser = usePaperStore((s) => s.hydrateForUser)
  const selectedId = useSelectionStore((s) => s.selectedId)
  const selectedSymbol = useSelectionStore((s) => s.selectedSymbol)
  const assetClass = useSelectionStore((s) => s.assetClass)
  const timeframe = useSelectionStore((s) => s.timeframe)
  const setTimeframe = useSelectionStore((s) => s.setTimeframe)
  const { money, currency, convert } = useMoney()

  useEffect(() => {
    if (session?.id) hydrateForUser(session.id)
  }, [session?.id, hydrateForUser])

  const cryptoQuery = useQuery({
    queryKey: ['crypto-markets'],
    queryFn: () => fetchCryptoMarkets(40),
    refetchInterval: 60_000,
    staleTime: 30_000,
  })

  const stocksQuery = useQuery({
    queryKey: ['stock-markets'],
    queryFn: fetchStockUniverse,
    staleTime: 5 * 60_000,
  })

  const candlesQuery = useQuery({
    queryKey: ['candles', assetClass, selectedId, selectedSymbol, timeframe],
    queryFn: async () => {
      if (assetClass === 'crypto') {
        return fetchCryptoOhlc(selectedId, timeframe, selectedSymbol)
      }
      return fetchStockCandles(selectedId)
    },
    staleTime: 60_000,
    retry: 2,
  })

  const crypto = cryptoQuery.data ?? []
  const stocks = stocksQuery.data ?? []
  const all = useMemo(() => [...crypto, ...stocks], [crypto, stocks])
  const current = all.find((s) => s.id === selectedId) ?? crypto[0]

  const displayCandles: Candle[] = useMemo(() => {
    const rows = candlesQuery.data ?? []
    if (currency === 'USD') return rows
    return rows.map((c) => ({
      ...c,
      open: convert(c.open),
      high: convert(c.high),
      low: convert(c.low),
      close: convert(c.close),
    }))
  }, [candlesQuery.data, currency, convert])

  const onCrosshair = useCallback((value: OhlcReadout | null) => setOhlc(value), [])

  const lastCandle = displayCandles.at(-1)
  const display =
    ohlc ??
    (lastCandle
      ? {
          open: lastCandle.open,
          high: lastCandle.high,
          low: lastCandle.low,
          close: lastCandle.close,
          time: lastCandle.time,
        }
      : null)

  const changePct = current?.changePct24h ?? 0
  const up = changePct >= 0

  return (
    <div className="app-shell">
      <Header query={query} onQuery={setQuery} />
      <MarketPulse crypto={crypto} />

      <div className="workspace">
        <Sidebar crypto={crypto} stocks={stocks} query={query} />

        <main className="chart-panel">
          <div className="chart-toolbar">
            <div className="chart-identity">
              <CandlestickChart size={18} strokeWidth={1.75} />
              <div>
                <div className="chart-symbol">
                  {selectedSymbol}
                  <span className="asset-pill">{assetClass}</span>
                  <span className="asset-pill muted-pill">{currency}</span>
                </div>
                <div className="chart-name">{current?.name ?? '—'}</div>
              </div>
              <div className="chart-last">
                <span className="mono price">{money(current?.price ?? 0)}</span>
                <span className={up ? 'pct up mono' : 'pct down mono'}>
                  {formatPct(changePct)}
                </span>
              </div>
            </div>

            <div className="tf-group" role="group" aria-label="Timeframe">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  type="button"
                  className={timeframe === tf ? 'tf active' : 'tf'}
                  onClick={() => setTimeframe(tf)}
                  disabled={assetClass === 'stock' && tf !== '1D'}
                  title={
                    assetClass === 'stock' && tf !== '1D'
                      ? 'Stocks use daily Fin-node history'
                      : undefined
                  }
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {display && (
            <div className="ohlc-row mono">
              <span>
                O <strong>{formatAxisPrice(display.open, currency)}</strong>
              </span>
              <span>
                H <strong>{formatAxisPrice(display.high, currency)}</strong>
              </span>
              <span>
                L <strong>{formatAxisPrice(display.low, currency)}</strong>
              </span>
              <span>
                C <strong>{formatAxisPrice(display.close, currency)}</strong>
              </span>
            </div>
          )}

          <div className="chart-frame">
            {candlesQuery.isLoading && <div className="chart-status">Loading chart…</div>}
            {candlesQuery.isError && (
              <div className="chart-status error">Could not load candles. Try another symbol.</div>
            )}
            {displayCandles.length > 0 && (
              <TradingChart
                key={`${selectedId}-${currency}-${timeframe}`}
                candles={displayCandles}
                onCrosshair={onCrosshair}
              />
            )}
          </div>

          {(cryptoQuery.isError || stocksQuery.isError) && (
            <p className="banner-warn">
              Some market feeds are slow or rate-limited. Data will retry automatically.
            </p>
          )}
        </main>

        <OrderTicket current={current} />
      </div>

      <PositionsBar symbols={all} />
    </div>
  )
}
