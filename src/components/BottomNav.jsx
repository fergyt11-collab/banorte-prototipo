import { Home, PieChart, Sparkles, CreditCard as CreditCardIcon, User } from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'insights', label: 'Gastos', icon: PieChart },
  { id: 'ai', label: 'Asesor IA', icon: Sparkles, accent: true },
  { id: 'cards', label: 'Tarjetas', icon: CreditCardIcon },
  { id: 'profile', label: 'Perfil', icon: User },
]

export default function BottomNav({ active, onChange, onOpenAssistant }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 bg-banorte-charcoal/90 backdrop-blur-xl border-t border-white/10 px-2 pt-2 pb-6">
      <div className="flex items-center justify-between">
        {tabs.map(({ id, label, icon: Icon, accent }) => {
          const isActive = active === id
          if (accent) {
            return (
              <button
                key={id}
                onClick={onOpenAssistant}
                className="flex flex-col items-center gap-1 -mt-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-banorte-red to-banorte-redDark flex items-center justify-center shadow-lg shadow-banorte-red/40 active:scale-90 transition-transform">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-banorte-red">{label}</span>
              </button>
            )
          }
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="flex flex-col items-center gap-1 px-3 py-1"
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/40'}`} strokeWidth={isActive ? 2.4 : 2} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-white' : 'text-white/40'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
