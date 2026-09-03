export default function PhoneFrame({ children, overlay }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_#2A2A30,_#0E0E11)] py-8 px-4">
      {/* Marco del smartphone */}
      <div className="relative w-[390px] max-w-full h-[844px] max-h-[92vh] rounded-[3rem] bg-banorte-dark shadow-2xl ring-1 ring-white/10 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-40 h-7 bg-black rounded-b-2xl" />
        {/* Barra de estado */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 pt-3 text-white text-xs font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-3 border border-white/70 rounded-sm relative">
              <span className="absolute inset-[1.5px] bg-white/90 rounded-[1px]" />
            </span>
          </span>
        </div>
        {/* Contenido scrollable */}
        <div className="h-full w-full overflow-y-auto no-scrollbar bg-banorte-dark">
          {children}
        </div>
        {/* Overlay fijo: barra de navegación inferior y panel del Asesor IA.
            Vive fuera del contenedor con scroll para no desplazarse con el contenido. */}
        {overlay}
        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 rounded-full bg-white/40 z-30" />
      </div>
    </div>
  )
}
