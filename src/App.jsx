import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame'
import Dashboard from './components/Dashboard'
import BottomNav from './components/BottomNav'
import AIAssistant from './components/AIAssistant'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [autoPrompt, setAutoPrompt] = useState(null)

  const openAssistant = (promptId = null) => {
    setAutoPrompt(promptId)
    setIsAssistantOpen(true)
  }

  return (
    <PhoneFrame
      overlay={
        <>
          <BottomNav
            active={activeTab}
            onChange={setActiveTab}
            onOpenAssistant={() => openAssistant(null)}
          />
          <AIAssistant
            isOpen={isAssistantOpen}
            onOpen={() => openAssistant(null)}
            onClose={() => setIsAssistantOpen(false)}
            autoPrompt={autoPrompt}
            onAutoPromptHandled={() => setAutoPrompt(null)}
          />
        </>
      }
    >
      <Dashboard
        onAnalizarGasto={() => openAssistant('gasto')}
        onSoporteCredito={() => openAssistant('credito')}
      />
    </PhoneFrame>
  )
}
