import { useEffect, useRef, useState } from 'react'
import { Sparkles, X, Send, ShoppingBag, CreditCard as CreditCardIcon, Bot, User } from 'lucide-react'
import { account, fixedMonthlyExpenses, weeklyBudget } from '../data/mockData'

const currency = (n) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)

// Respuestas simuladas del asesor — en producción vendrían de un LLM conectado al core bancario.
function buildSpendingVerdict() {
  return (
    `Ya revisé tu saldo actual (${currency(account.balance)}), tus gastos fijos del mes ` +
    `(${currency(fixedMonthlyExpenses)}) y tu presupuesto libre semanal (${currency(weeklyBudget)}).\n\n` +
    `Comprar los tenis de $3,200 hoy dejaría tu semana muy ajustada 😬. Te sugerimos esperar ` +
    `10 días, cuando baje tu gasto variable, o usar ${currency(1000)} de tu Fondo de Rendimiento ` +
    `para no apretar tu presupuesto semanal.`
  )
}

function buildCreditRejectionExplanation() {
  return (
    `Identificamos que aún no tienes suficiente historial en Banorte.\n\n` +
    `Si recibes tu nómina aquí o mantienes un saldo promedio de $2,000 durante 2 meses, ` +
    `podrás solicitarla de nuevo con un 95% de probabilidad de aprobación. ¡Vas por buen camino! 💪`
  )
}

function genericFallback(text) {
  const t = text.toLowerCase()
  if (/(tenis|comprar|gasto|compra)/.test(t)) return buildSpendingVerdict()
  if (/(tarjeta|crédito|credito|rechaz)/.test(t)) return buildCreditRejectionExplanation()
  return (
    `Puedo ayudarte a decidir si un gasto te conviene, explicarte por qué se rechazó un ` +
    `producto, o resolver dudas de tu cuenta. Prueba con una de las preguntas rápidas 👇`
  )
}

const quickPrompts = [
  {
    id: 'gasto',
    label: '¿Puedo comprarme unos tenis de $3,200?',
    icon: ShoppingBag,
    userText: '¿Puedo comprarme unos tenis de $3,200?',
    response: buildSpendingVerdict,
  },
  {
    id: 'credito',
    label: '¿Por qué me rechazaron la Tarjeta de Crédito?',
    icon: CreditCardIcon,
    userText: '¿Por qué me rechazaron la Tarjeta de Crédito?',
    response: buildCreditRejectionExplanation,
  },
]

function Message({ role, text }) {
  const isAI = role === 'ai'
  return (
    <div className={`flex gap-2 ${isAI ? '' : 'flex-row-reverse'} animate-slide-up`}>
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
          isAI ? 'bg-gradient-to-br from-banorte-red to-banorte-redDark' : 'bg-white/10'
        }`}
      >
        {isAI ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white/80" />}
      </div>
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
          isAI
            ? 'bg-white/[0.07] border border-white/10 text-white/90 rounded-tl-sm'
            : 'bg-banorte-red text-white rounded-tr-sm'
        }`}
      >
        {text}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-2 animate-slide-up">
      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-banorte-red to-banorte-redDark">
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="bg-white/[0.07] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function AIAssistant({ isOpen, onOpen, onClose, autoPrompt, onAutoPromptHandled }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'ai',
      text: `Hola Alex 👋 Soy tu Asesor Financiero IA. Puedo evaluar si un gasto te conviene o explicarte decisiones de crédito en lenguaje simple. ¿En qué te ayudo?`,
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)

  const sendExchange = (userText, responseFn) => {
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: userText }])
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'ai', text: responseFn(userText) }])
    }, 1100)
  }

  const handleQuickPrompt = (prompt) => sendExchange(prompt.userText, prompt.response)

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setInput('')
    sendExchange(text, genericFallback)
  }

  // Dispara automáticamente un escenario cuando se abre desde un acceso directo del Dashboard
  useEffect(() => {
    if (isOpen && autoPrompt) {
      const prompt = quickPrompts.find((p) => p.id === autoPrompt)
      if (prompt) handleQuickPrompt(prompt)
      onAutoPromptHandled?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, autoPrompt])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping, isOpen])

  return (
    <>
      {/* Botón flotante destacado */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="absolute bottom-24 right-5 z-40 flex items-center gap-2 pl-3.5 pr-4 py-3 rounded-full bg-gradient-to-br from-banorte-red to-banorte-redDark shadow-lg shadow-banorte-red/40 active:scale-95 transition-transform animate-fade-in"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-xs font-bold text-white">Asesor IA</span>
        </button>
      )}

      {/* Panel de chat */}
      <div
        className={`absolute inset-0 z-50 flex flex-col bg-banorte-dark transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-12 pb-4 border-b border-white/10 bg-banorte-charcoal/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-banorte-red to-banorte-redDark flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Asesor Financiero IA</p>
              <p className="text-[11px] text-finance-green flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-finance-green" /> En línea
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mensajes */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 flex flex-col gap-3.5">
          {messages.map((m) => (
            <Message key={m.id} role={m.role} text={m.text} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>

        {/* Quick prompts + input */}
        <div className="border-t border-white/10 bg-banorte-charcoal/60 px-4 pt-3 pb-5">
          <div className="flex flex-col gap-2 mb-3">
            {quickPrompts.map((p) => (
              <button
                key={p.id}
                onClick={() => handleQuickPrompt(p)}
                disabled={isTyping}
                className="flex items-center gap-2 text-left rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2.5 text-[12.5px] text-white/85 font-medium hover:bg-white/[0.1] transition-colors disabled:opacity-40"
              >
                <p.icon className="w-4 h-4 text-banorte-red shrink-0" />
                {p.label}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-banorte-red/60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-banorte-red flex items-center justify-center text-white disabled:opacity-30 active:scale-90 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
