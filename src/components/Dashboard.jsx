import { Bell } from 'lucide-react'
import CreditCard from './CreditCard'
import DailyYield from './DailyYield'
import QuickActions from './QuickActions'
import TransactionList from './TransactionList'
import { account, user } from '../data/mockData'

export default function Dashboard({ onAnalizarGasto, onSoporteCredito }) {
  return (
    <div className="px-5 pt-14 pb-32 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <p className="text-white/50 text-xs">Bienvenido de vuelta</p>
          <h1 className="text-white text-xl font-extrabold">Hola, {user.name} 👋</h1>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
          <Bell className="w-4.5 h-4.5 text-white/80" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-banorte-red" />
        </button>
      </div>

      <CreditCard balance={account.balance} />
      <DailyYield />
      <QuickActions onAnalizarGasto={onAnalizarGasto} onSoporteCredito={onSoporteCredito} />
      <TransactionList />
    </div>
  )
}
