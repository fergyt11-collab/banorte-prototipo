import { ArrowLeftRight, Smartphone, Sparkles, LifeBuoy } from 'lucide-react'

export default function QuickActions({ onAnalizarGasto, onSoporteCredito }) {
  const actions = [
    { label: 'Transferir', icon: ArrowLeftRight, onClick: undefined },
    { label: 'Tarjeta Digital', icon: Smartphone, onClick: undefined },
    { label: 'Analizar Gasto', icon: Sparkles, onClick: onAnalizarGasto, accent: true },
    { label: 'Soporte Crédito', icon: LifeBuoy, onClick: onSoporteCredito },
  ]

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {actions.map(({ label, icon: Icon, onClick, accent }) => (
        <button
          key={label}
          onClick={onClick}
          className="flex flex-col items-center gap-2 group"
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-active:scale-90 ${
              accent
                ? 'bg-gradient-to-br from-banorte-red to-banorte-redDark shadow-lg shadow-banorte-red/30'
                : 'bg-white/[0.06] border border-white/10'
            }`}
          >
            <Icon className={`w-5 h-5 ${accent ? 'text-white' : 'text-white/80'}`} strokeWidth={2} />
          </div>
          <span className="text-[10.5px] text-white/70 font-medium text-center leading-tight">
            {label}
          </span>
        </button>
      ))}
    </div>
  )
}
