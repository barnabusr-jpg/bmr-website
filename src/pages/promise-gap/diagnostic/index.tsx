import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const PromiseGapDiagnostic = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    aiInitiatives: "",
    stakeholderConcerns: "",
    expectationChallenges: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.company) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your name, email, and company.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Submit to /api/contact endpoint (placeholder for future implementation)
    // For now, just show success and redirect
    toast({
      title: "Diagnostic submitted",
      description: "We'll send your Promise Gap assessment shortly.",
    });

    // Redirect to thank you page
    router.push("/thank-you");
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-32 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* Header */}
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
              >
                <ClipboardCheck className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  Promise Gap Diagnostic
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold leading-tight"
              >
                Diagnose where your transformation is leaking trust and value.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-foreground/75 max-w-2xl mx-auto leading-[1.7]"
              >
                This diagnostic helps identify where your organization faces the
                greatest risk and provides specific guidance for closing the
                gap.
              </motion.p>

              {/* Framework Pillars */}
              <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto pt-8">
                {[
                  { title: "Trust", color: "accent" },
                  { title: "Govern", color: "secondary" },
                  { title: "Evolve", color: "accent" },
                ].map((pillar, i) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="space-y-3 text-center"
                  >
                    <div
                      className={`h-12 w-12 rounded-full bg-${pillar.color}/20 flex items-center justify-center mx-auto`}
                    >
                      <div
                        className={`h-6 w-6 rounded-full bg-${pillar.color}`}
                      ></div>
                    </div>
                    <h3 className="font-semibold">{pillar.title}</h3>
                  </motion.div>
                ))}
              </div>

              {/* Readiness Dial */}
              {step == 0 && <FormComponent setStep={setStep} />}
              {step == 1 && <ReadlessDialog />}
            </div>

            {/* Form */}
            {/* <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-10"
            >
              <div className="bg-accent/5 border border-border rounded-lg p-8 space-y-8">
                <h2 className="text-2xl font-semibold">Your Information</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Organization *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Your organization"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectationChallenges">Notes / Context</Label>
                  <Textarea
                    id="expectationChallenges"
                    value={formData.expectationChallenges}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expectationChallenges: e.target.value,
                      })
                    }
                    placeholder="Share any additional context about your transformation challenges..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="text-center space-y-5">
                <Button type="submit" size="lg" className="min-w-64">
                  Submit Diagnostic
                </Button>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Your responses help us provide tailored guidance for closing
                  your organization's Promise Gap.
                </p>
              </div>
            </motion.form> */}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromiseGapDiagnostic;

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  company: Yup.string().required("Organization is required"),
  expectationChallenges: Yup.string(),
});

const FormComponent = ({ setStep }: any) => {
  // Get initial values from localStorage or default to empty strings
  const initialValues = {
    name: "",
    email: "",
    company: "",
    expectationChallenges: "",
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
    // Save values to localStorage
    localStorage.setItem("formDataName", values.name);
    localStorage.setItem("formDataEmail", values.email);
    localStorage.setItem("formDataCompany", values.company);
    localStorage.setItem("formDataNotes", values.expectationChallenges);
    setStep(1);
    console.log("Saved values:", values);
    resetForm(); // optional: reset form after submit
  };

  useEffect(() => {
    const formDataName = localStorage.getItem("formDataName");
    const formDataEmail = localStorage.getItem("formDataEmail");
    const formDataCompany = localStorage.getItem("formDataCompany");
    const formDataNotes = localStorage.getItem("formDataNotes");
    if (formDataName || formDataEmail || formDataCompany || formDataNotes) {
      initialValues.name = formDataName || "";
      initialValues.email = formDataEmail || "";
      initialValues.company = formDataCompany || "";
      initialValues.expectationChallenges = formDataNotes || "";
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange }) => (
        <motion.div>
          <Form className="space-y-10">
            <div className="bg-accent/5 border border-border rounded-lg p-8 space-y-8">
              <h2 className="text-2xl font-semibold">Your Information</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-left">Name *</p>
                  <Field
                    id="name"
                    name="name"
                    as={Input}
                    placeholder="Your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-left">Email *</p>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    as={Input}
                    placeholder="your@email.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-left">Organization *</p>
                <Field
                  id="company"
                  name="company"
                  as={Input}
                  placeholder="Your organization"
                />
                <ErrorMessage
                  name="company"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <p className="text-left">Notes / Context</p>
                <Field
                  id="expectationChallenges"
                  name="expectationChallenges"
                  as={Textarea}
                  placeholder="Share any additional context about your transformation challenges..."
                  rows={4}
                />
              </div>
            </div>

            <div className="text-center space-y-5">
              <Button type="submit" size="lg" className="min-w-64">
                Submit Diagnostic
              </Button>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Your responses help us provide tailored guidance for closing
                your organization's Promise Gap.
              </p>
            </div>
          </Form>
        </motion.div>
      )}
    </Formik>
  );
};

const ReadlessDialog = () => {
  return (
    <>
      {" "}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex justify-center py-6"
      >
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="6"
              strokeDasharray="282.7"
              strokeDashoffset="70.7"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground text-center px-3 leading-tight">
              Pending
              <br />
              Diagnostic
              <br />
              Input
            </span>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="space-y-4"
      >
        <Link href="/promise-gap/diagnostic/flow">
          <Button
            variant="outline"
            className="gap-2 transition-all duration-200"
          >
            Start Interactive Diagnostic
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground italic">
          Complete the 12-step assessment for personalized results.
        </p>
      </motion.div>
    </>
  );
};
