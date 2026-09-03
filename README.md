# Banorte Next — Prototipo funcional

Prototipo de la nueva app móvil de Banorte, rediseñada para jóvenes universitarios.
React + Vite + Tailwind CSS + `lucide-react`, dentro de un mockup de smartphone.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`).

## Estructura

```
src/
  App.jsx                 # Orquesta estado global (tab activo, chat abierto, prompt automático)
  data/mockData.js         # Datos simulados: usuario, cuenta, transacciones, categorías
  components/
    PhoneFrame.jsx          # Marco de smartphone (mockup) + status bar + home indicator
    Dashboard.jsx            # Header, tarjeta, rendimiento diario, accesos rápidos, movimientos
    CreditCard.jsx           # Tarjeta de débito con diseño glassmorphism
    DailyYield.jsx           # Indicador de rendimiento diario (interés compuesto) en vivo
    QuickActions.jsx         # Accesos directos: Transferir, Tarjeta Digital, Analizar Gasto, Soporte Crédito
    TransactionList.jsx      # Movimientos categorizados con filtros
    BottomNav.jsx            # Barra de navegación inferior con acceso destacado al Asesor IA
    AIAssistant.jsx          # Chat flotante del Asesor Financiero IA (los dos escenarios pedidos)
```

## Escenarios del Asesor IA

1. **Evaluación de gasto** — botón rápido "¿Puedo comprarme unos tenis de $3,200?": la IA
   simula analizar saldo, gastos fijos y presupuesto semanal, y da un veredicto amigable.
2. **Crédito rechazado** — botón rápido "¿Por qué me rechazaron la Tarjeta de Crédito?": la IA
   explica la causa (historial insuficiente) y la ruta de solución (nómina o saldo promedio de
   $2,000 durante 2 meses → 95% de probabilidad de aprobación).

También puedes abrir el Asesor desde la pestaña central de la barra inferior, o desde los
accesos rápidos "Analizar Gasto" / "Soporte Crédito" del dashboard (que disparan el escenario
correspondiente automáticamente).
