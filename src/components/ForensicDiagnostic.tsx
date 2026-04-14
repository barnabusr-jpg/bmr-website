const init = async () => {
  const params = new URLSearchParams(window.location.search);
  const rawCode = params.get('code')?.trim();

  if (!rawCode) {
    setStep("invalid");
    return;
  }

  // --- THE FUZZY HANDSHAKE ---
  // We force uppercase AND convert all zeros to 'O's 
  // because BMR access codes use letters, not numbers for clarity.
  const sanitizedCode = rawCode.toUpperCase().replace(/0/g, "O");

  console.log(`BMR_HANDSHAKE: URL[${rawCode}] -> SANITIZED[${sanitizedCode}]`);

  const { data: results, error } = await supabase
    .from('operators')
    .select('*, diagnostic_groups(org_name)')
    .eq('access_code', sanitizedCode);

  if (error || !results || results.length === 0) {
    // FALLBACK: If 'O' to '0' swap failed, try a direct match just in case
    const { data: fallback } = await supabase
      .from('operators')
      .select('*, diagnostic_groups(org_name)')
      .eq('access_code', rawCode.toUpperCase());

    if (!fallback || fallback.length === 0) {
      setStep("invalid");
      return;
    }
    
    // If fallback worked, use it
    const op = fallback[0];
    proceedWithNode(op);
  } else {
    const op = results[0];
    proceedWithNode(op);
  }
};

const proceedWithNode = (op: any) => {
  if (op.status?.toLowerCase() === 'completed') {
    setOperator(op);
    setStep("finalized");
    return;
  }

  const filtered = FORENSIC_MATRIX.filter(q => q.lens === op.persona_type);
  setOperator(op);
  setQuestions(filtered);
  setStep("intro");
};
