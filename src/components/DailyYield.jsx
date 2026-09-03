import { TrendingUp } from 'lucide-react'
import { account } from '../data/mockData'

export default function DailyYield() {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse-soft">
          <TrendingUp className="w-4.5 h-4.5 text-finance-green" />
        </div>
        <div>
          <p className="text-sm font-semibold text-finance-green">
            + ${account.dailyYield.toFixed(2)} MXN ganados hoy
          </p>
          <p className="text-xs text-white/50">Rendimiento a la vista · {account.annualRate}% anual</p>
        </div>
      </div>
      <span className="text-[11px] font-bold text-finance-green bg-emerald-500/15 px-2 py-1 rounded-full">
        En vivo
      </span>
    </div>
  )
}
