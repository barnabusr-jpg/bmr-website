return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      <main>
        <Hero />
        <CommercialVideo src="..." />
        <Sensors />
        <ServicesPreview />
        <Outcomes />
        {/* Only keep the Final Diagnostic CTA here */}
        <section className="py-32 bg-[#020617]">...</section>
      </main>
      <Footer />
    </div>
  );
