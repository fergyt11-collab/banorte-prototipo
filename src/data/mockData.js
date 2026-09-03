// Datos simulados para el prototipo — en producción vendrían del backend/core bancario.

export const user = {
  name: 'Alex',
  fullName: 'Alex Fernández',
  cardNumberLast4: '4821',
}

export const account = {
  balance: 8340.75,
  dailyYield: 12.5,
  annualRate: 11,
  yieldFund: 1000, // fondo disponible del rendimiento diario
}

export const fixedMonthlyExpenses = 4200 // renta, colegiatura, suscripciones, etc.
export const weeklyBudget = 900 // presupuesto libre semanal estimado tras gastos fijos

export const categories = {
  Comida: { color: '#F59E0B', bg: 'bg-amber-500/15', text: 'text-amber-400' },
  Educación: { color: '#3D7BFF', bg: 'bg-blue-500/15', text: 'text-blue-400' },
  Entretenimiento: { color: '#A855F7', bg: 'bg-purple-500/15', text: 'text-purple-400' },
  'Rendimiento Banorte': { color: '#00C48C', bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
  Transporte: { color: '#EC4899', bg: 'bg-pink-500/15', text: 'text-pink-400' },
}

export const transactions = [
  {
    id: 1,
    merchant: 'Rendimiento diario Banorte',
    category: 'Rendimiento Banorte',
    amount: 12.5,
    type: 'in',
    date: 'Hoy, 07:00',
  },
  {
    id: 2,
    merchant: 'Starbucks Reforma',
    category: 'Comida',
    amount: -145,
    type: 'out',
    date: 'Hoy, 09:12',
  },
  {
    id: 3,
    merchant: 'Copias e impresiones ITESM',
    category: 'Educación',
    amount: -80,
    type: 'out',
    date: 'Ayer, 16:40',
  },
  {
    id: 4,
    merchant: 'Netflix',
    category: 'Entretenimiento',
    amount: -229,
    type: 'out',
    date: 'Ayer, 12:05',
  },
  {
    id: 5,
    merchant: 'DiDi',
    category: 'Transporte',
    amount: -96,
    type: 'out',
    date: '31 ago, 20:18',
  },
  {
    id: 6,
    merchant: 'Tacos El Güero',
    category: 'Comida',
    amount: -180,
    type: 'out',
    date: '31 ago, 14:30',
  },
  {
    id: 7,
    merchant: 'Rendimiento diario Banorte',
    category: 'Rendimiento Banorte',
    amount: 11.9,
    type: 'in',
    date: '31 ago, 07:00',
  },
]
