---
name: fairbook
description: >-
  Build and extend Fairbook, a frontend-only cream/off-white market terminal with
  live crypto/stock updates, TradingView-style charts, watchlists, and paper
  trading. Use when working on Fairbook UI, market APIs, charts, or local state.
---

# Fairbook

Frontend-only market terminal. No backend. Paper trading only — never real order routing.

## Brand

- Name: **Fairbook**
- Tagline: Clear markets. Quiet desk.
- Palette: cream `#F7F4EF`, off-white `#FFFCF8`, ink `#1C1B19`, muted teal accent `#3D5A5B`, up `#1F7A4C`, down `#B42318`
- Type: Outfit (UI), IBM Plex Mono (prices)
- Icons: Lucide only, thin stroke
- Layout: terminal — left symbols, center chart hero, right ticket, bottom positions
- No purple gradients, no terracotta+serif editorial look, no emoji

## APIs (browser, free)

| Asset | Source | Use |
|-------|--------|-----|
| Crypto list / live prices | CoinGecko REST via Vite `/api/coingecko` proxy | Markets, search, polling |
| Crypto OHLC | Binance `data-api.binance.vision` klines (primary); CoinGecko OHLC fallback | Candles |
| FX USD→INR | Frankfurter / open.er-api | Live rupee conversion |
| Crypto global | CoinGecko `/global` via proxy | Mkt cap, BTC dominance |

Default display currency: **INR** (en-IN formatting). Toggle ₹ INR / $ USD in the header.
Paper ledger stays USD internally; UI converts for display.
Market pulse: USD→INR, crypto mkt cap, BTC dominance, top gainer/loser, IST clock.

## Demo payment (no real money)

`PaymentDemo` modal simulates UPI / card / net banking. Never call real gateways.
Flow: validate ticket → open sheet → fake processing → paper fill.
Always keep the "DEMO ONLY · no real money" badge.

## Auth + wallet (demo, local only)

Route flow: `/` landing → `/signup` or `/login` → `/app` terminal.
Auth is browser-local (`fairbook-auth`). Paper wallet is per user id.
New wallets start at **0** — use **Add money** (demo payment) before trading.

Rules:
- Prefer keyless endpoints. Optional keys only via user Settings (never commit keys).
- Cache aggressively (React Query). Respect rate limits.
- Attribute Fin-node when showing its data.
- Show disclaimer: not financial advice; paper trading only.

## Charts

Use `lightweight-charts` v5:
- Candlesticks + volume histogram
- Crosshair, OHLC readout, right price scale
- Timeframes mapped to API day/interval params
- Up/down colors from CSS tokens

## State

- Watchlist + paper portfolio: Zustand + `localStorage`
- Starting paper cash: `$100,000`
- Selected symbol + asset class in app store

## Commands

```bash
npm run dev
npm run build
```
