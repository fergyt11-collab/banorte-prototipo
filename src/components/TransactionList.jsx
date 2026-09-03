import { useState } from 'react'
import {
  UtensilsCrossed,
  GraduationCap,
  Clapperboard,
  TrendingUp,
  Car,
  ArrowDownLeft,
  ArrowUpRight,
} from 'lucide-react'
import { transactions, categories } from '../data/mockData'

const iconByCategory = {
  Comida: UtensilsCrossed,
  Educación: GraduationCap,
  Entretenimiento: Clapperboard,
  'Rendimiento Banorte': TrendingUp,
  Transporte: Car,
}

const filters = ['Todos', ...Object.keys(categories)]

export default function TransactionList() {
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filtered =
    activeFilter === 'Todos'
      ? transactions
      : transactions.filter((t) => t.category === activeFilter)

  const currency = (n) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Math.abs(n))

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-bold text-base">Movimientos recientes</h2>
        <span className="text-xs text-white/40">{filtered.length} de {transactions.length}</span>
      </div>

      {/* Filtros por categoría */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-5 px-5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeFilter === f
                ? 'bg-white text-banorte-dark'
                : 'bg-white/[0.06] text-white/60 border border-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-1.5">
        {filtered.map((t) => {
          const Icon = iconByCategory[t.category]
          const style = categories[t.category]
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-white/[0.04] transition-colors"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${style.bg}`}>
                <Icon className={`w-4.5 h-4.5 ${style.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{t.merchant}</p>
                <p className="text-xs text-white/40">{t.category} · {t.date}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {t.type === 'in' ? (
                  <ArrowDownLeft className="w-3.5 h-3.5 text-finance-green" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/30" />
                )}
                <span
                  className={`text-sm font-bold tabular-nums ${
                    t.type === 'in' ? 'text-finance-green' : 'text-white/85'
                  }`}
                >
                  {t.type === 'in' ? '+' : '-'}{currency(t.amount)}
                </span>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <p className="text-center text-white/40 text-sm py-8">Sin movimientos en esta categoría.</p>
        )}
      </div>
    </div>
  )
}
