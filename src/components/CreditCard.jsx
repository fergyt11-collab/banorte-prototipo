import { useState } from 'react'
import { Eye, EyeOff, Wifi } from 'lucide-react'
import { user } from '../data/mockData'

export default function CreditCard({ balance }) {
  const [hidden, setHidden] = useState(false)

  const formatted = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(balance)

  return (
    <div className="relative rounded-3xl p-6 h-[190px] overflow-hidden shadow-card animate-fade-in">
      {/* Fondo con gradiente + glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-banorte-red via-banorte-redDark to-banorte-dark" />
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-black/20 blur-2xl" />
      <div className="absolute inset-0 backdrop-blur-[1px] bg-white/[0.02] border border-white/10 rounded-3xl" />

      <div className="relative h-full flex flex-col justify-between text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/70 font-medium">Cuenta Débito</p>
            <p className="text-lg font-bold leading-tight">Banorte Next</p>
          </div>
          <Wifi className="w-6 h-6 text-white/80 rotate-90" strokeWidth={2} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[11px] text-white/70">Saldo disponible</p>
            <button
              onClick={() => setHidden((h) => !h)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Mostrar u ocultar saldo"
            >
              {hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-3xl font-extrabold tracking-tight tabular-nums">
            {hidden ? '••••••' : formatted}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <p className="text-sm font-mono tracking-[0.2em] text-white/90">
            •••• •••• •••• {user.cardNumberLast4}
          </p>
          <p className="text-sm font-bold italic tracking-tight">Banorte</p>
        </div>
      </div>
    </div>
  )
}
