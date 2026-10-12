import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { FinexaLogo } from './FinexaLogo'

interface AccountModalProps {
  isOpen: boolean
  onClose: () => void
  onToast: (msg: string) => void
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onToast,
}) => {
  const { user, transactions, logout, deposit, transfer } = useAuthStore()
  const [depositAmount, setDepositAmount] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [transferRecipient, setTransferRecipient] = useState('')
  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'transfer'>('overview')
  const [actionError, setActionError] = useState<string | null>(null)

  if (!isOpen || !user) return null

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(depositAmount)
    if (isNaN(amt) || amt <= 0) {
      setActionError('Please enter a valid deposit amount.')
      return
    }
    deposit(amt, 'Simulated Bank Transfer Deposit')
    setDepositAmount('')
    setActionError(null)
    setActiveTab('overview')
    onToast(`Added $${amt.toLocaleString()} to your balance!`)
  }

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(transferAmount)
    if (isNaN(amt) || amt <= 0) {
      setActionError('Please enter a valid transfer amount.')
      return
    }
    const res = transfer(amt, transferRecipient || 'External Beneficiary')
    if (res.success) {
      setTransferAmount('')
      setTransferRecipient('')
      setActionError(null)
      setActiveTab('overview')
      onToast(`Transferred $${amt.toLocaleString()} successfully!`)
    } else {
      setActionError(res.error || 'Transfer failed.')
    }
  }

  const handleSignOut = () => {
    logout()
    onClose()
    onToast('You have been logged out.')
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl border border-black/10 overflow-hidden relative max-h-[90vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="bg-[#080D16] text-white p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <FinexaLogo size="sm" textColor="text-white" />
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#D8FF4F] text-[#080D16] font-bold text-lg flex items-center justify-center shadow-sm">
                {user.avatar || user.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base sm:text-lg text-white">
                    {user.name}
                  </h3>
                  <span className="bg-[#D8FF4F] text-[#080D16] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {user.plan}
                  </span>
                </div>
                <div className="text-xs text-white/60">{user.email}</div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="text-xs text-rose-300 hover:text-rose-200 border border-rose-400/30 px-3 py-1.5 rounded-xl hover:bg-rose-500/10 transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Balance Display */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-end justify-between">
            <div>
              <span className="text-[11px] text-white/70 block uppercase tracking-wider">
                Total Account Balance
              </span>
              <div className="font-display text-3xl sm:text-4xl text-white mt-0.5 leading-none">
                ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveTab(activeTab === 'deposit' ? 'overview' : 'deposit')
                  setActionError(null)
                }}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'deposit'
                    ? 'bg-white text-[#080D16]'
                    : 'bg-[#D8FF4F] text-[#080D16] hover:brightness-105'
                }`}
              >
                + Deposit
              </button>
              <button
                onClick={() => {
                  setActiveTab(activeTab === 'transfer' ? 'overview' : 'transfer')
                  setActionError(null)
                }}
                className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'transfer'
                    ? 'bg-white text-[#080D16]'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {actionError && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <span>⚠️</span>
              <span>{actionError}</span>
            </div>
          )}

          {/* Deposit Form */}
          {activeTab === 'deposit' && (
            <div className="bg-[#F5F6F7] rounded-2xl p-4 sm:p-5 border border-black/5 animate-fade-in">
              <h4 className="font-semibold text-sm text-[#080D16] mb-2">
                Deposit Demo Funds
              </h4>
              <p className="text-xs text-[#5B6470] mb-4">
                Instantly simulate a bank deposit into your Finexa balance.
              </p>
              <form onSubmit={handleDepositSubmit} className="space-y-3">
                <div className="flex gap-2 mb-2">
                  {[250, 500, 1000, 5000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setDepositAmount(preset.toString())}
                      className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-white border border-black/10 hover:border-[#129FE3] text-[#080D16]"
                    >
                      +${preset}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  step="any"
                  required
                  placeholder="Or enter custom amount in USD"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full bg-white border border-black/10 focus:border-[#129FE3] px-3.5 py-2.5 rounded-xl text-sm"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#080D16] hover:bg-black text-white text-xs font-semibold py-2.5 rounded-xl"
                  >
                    Confirm Deposit
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className="px-4 py-2.5 text-xs font-semibold text-[#5B6470] hover:text-[#080D16]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Transfer Form */}
          {activeTab === 'transfer' && (
            <div className="bg-[#F5F6F7] rounded-2xl p-4 sm:p-5 border border-black/5 animate-fade-in">
              <h4 className="font-semibold text-sm text-[#080D16] mb-2">
                Send Money (Instant Transfer)
              </h4>
              <p className="text-xs text-[#5B6470] mb-4">
                Simulate a wire or peer transfer using your available balance.
              </p>
              <form onSubmit={handleTransferSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#080D16] mb-1">Recipient</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe / Account #8821"
                    value={transferRecipient}
                    onChange={(e) => setTransferRecipient(e.target.value)}
                    className="w-full bg-white border border-black/10 focus:border-[#129FE3] px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#080D16] mb-1">Amount ($)</label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    required
                    placeholder="Enter amount"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full bg-white border border-black/10 focus:border-[#129FE3] px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-[#080D16] hover:bg-black text-white text-xs font-semibold py-2.5 rounded-xl"
                  >
                    Send Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className="px-4 py-2.5 text-xs font-semibold text-[#5B6470] hover:text-[#080D16]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Transactions Feed */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-[#080D16]">
                Recent Transactions
              </h4>
              <span className="text-[11px] text-[#5B6470]">
                {transactions.length} entries
              </span>
            </div>

            <div className="space-y-2.5">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-2xl bg-[#F5F6F7] border border-black/5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        tx.type === 'credit'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-[#080D16]'
                      }`}
                    >
                      {tx.type === 'credit' ? '↓' : '↑'}
                    </div>
                    <div>
                      <div className="font-semibold text-[#080D16]">{tx.title}</div>
                      <div className="text-[10px] text-[#5B6470]">
                        {tx.category} • {tx.date}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`font-semibold tabular-nums text-xs sm:text-sm ${
                      tx.type === 'credit' ? 'text-emerald-700' : 'text-[#080D16]'
                    }`}
                  >
                    {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5F6F7] border-t border-black/5 flex justify-between items-center text-xs text-[#5B6470]">
          <span>Plan: Finexa {user.plan}</span>
          <button
            onClick={onClose}
            className="font-semibold text-[#080D16] hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
