// ... (logic above remains the same)

    // 4. Finalize Audit Record in Supabase
    // SAFETY: Ensure fractures is at least an empty array to avoid null errors
    const finalFractures = fractures.length > 0 ? fractures : [];

    console.log(`[DB_UPDATE_ATTEMPT] AuditID: ${auditId} | SFI: ${frictionScore}`);

    const { error: finalUpdateError } = await supabase
      .from('audits')
      .update({ 
        // Ensure column names exactly match your Supabase Table
        fractures: finalFractures, 
        sfi_score: Math.min(frictionScore, 100),
        status: 'COMPLETE',
        last_synthesized: new Date().toISOString()
      })
      .eq('id', auditId);

    if (finalUpdateError) {
       console.error("[SUPABASE_UPDATE_FAIL]:", finalUpdateError.message);
       // This will help us see the exact DB error in the response
       return res.status(500).json({ error: 'DATABASE_UPDATE_FAILED', details: finalUpdateError.message });
    }

    return res.status(200).json({ 
      status: 'SYNTHESIS_COMPLETE', 
      sfi: frictionScore,
      org: parentAudit.org_name 
    });

  } catch (error: any) {
    console.error("[SYNTHESIS_CRITICAL_FAILURE]:", error);
    return res.status(500).json({ 
        error: 'INTERNAL_SERVER_ERROR', 
        message: error.message,
        stack: error.stack // Added for deeper debugging
    });
  }
}
