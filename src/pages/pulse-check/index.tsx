const initiateVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // 🛡️ B2B Filter
    const blocked = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    if (blocked.includes(email.split("@")[1])) {
      setError("CORPORATE_DOMAIN_REQUIRED_FOR_DIAGNOSTIC_INTEGRITY");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/generate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setAccessState("verifying");
      } else {
        setError("BMR_NODE_CONNECTION_FAILED");
      }
    } catch (err) {
      setError("NETWORK_LOGIC_ERROR");
    } finally {
      setIsSubmitting(false);
    }
  };
