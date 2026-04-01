export default function Footer() {
  return (
    <footer className="bg-[#f5edde] w-full py-16 px-6 relative overflow-hidden flex-shrink-0 z-10 border-t border-[#8f4e00]/10">
      <div className="flex flex-col items-center justify-center gap-6 text-center w-full max-w-screen-xl mx-auto relative z-10">
        
        {/* Monogram / Initials */}
        <div className="font-noto-serif italic text-3xl md:text-4xl text-[#af101a] tracking-wider mb-2">
          P <span className="text-[#8f4e00] font-normal mx-1">&amp;</span> S
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-[#af101a]/30 my-2"></div>

        {/* Credits */}
        <div className="font-plus-jakarta text-[11px] md:text-xs tracking-[0.25em] text-[#8f4e00] uppercase flex flex-col gap-3 items-center">
          <p className="opacity-80">Made with Love</p>
          <div className="mt-1">
            <span
              className="material-symbols-outlined text-sm text-[#af101a] animate-pulse"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
          </div>
        </div>

      </div>
      
      {/* Decorative large faint heart */}
      <div className="absolute -right-20 -bottom-20 opacity-[0.03] rotate-12 pointer-events-none select-none">
          <span
            className="material-symbols-outlined text-[300px]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 100" }}
          >
            favorite
          </span>
      </div>
    </footer>
  );
}
