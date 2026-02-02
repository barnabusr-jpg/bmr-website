const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // This path MUST match the location of your working API file
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message
        }),
      });

      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out. A strategist will be in touch soon.",
        });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      toast({
        title: "Submission Error",
        description: "Please try again or email hello@bmradvisory.co directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
