// Inside FooterCTA.tsx
<h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight italic uppercase">
  Initialize <span className="text-[#14b8a6]">Stability</span>
</h2>

<p className="text-slate-400 mb-12 max-w-2xl mx-auto font-light text-xl leading-relaxed">
  The first step in closing the Promise Gap is identifying the signals of systemic drift. 
  Connect with a strategist to review your diagnostic results and establish an operational baseline.
</p>

<div className="flex flex-col md:flex-row items-center justify-center gap-6">
  <Button 
    className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-16 px-12 text-lg transition-all duration-300 shadow-[0_0_30px_rgba(20,184,166,0.15)] group uppercase italic"
    onClick={() => window.location.href = 'mailto:hello@bmradvisory.co'}
  >
    Contact a Strategist 
    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
  </Button>
  
  <Link 
    href="/field-guide" 
    className="text-slate-500 hover:text-white text-sm font-medium uppercase tracking-widest transition-colors py-4 px-6 italic"
  >
    Access The Operational Protocol
  </Link>
</div>
