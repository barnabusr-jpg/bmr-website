import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";

const ThankYou = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-12"
          >
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-accent" />
              </div>
            </div>

            {/* Main Message */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Thank you for taking the Promise Gap™ Diagnostic.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                You have just taken the first step toward understanding where
                your transformation efforts may be leaking trust and value…
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We will review your responses and follow up within 48 hours with
                a personalized assessment that includes specific recommendations
                for closing the identified gaps.
              </p>
            </div>

            {/* What's Next */}
            <div className="bg-accent/5 border border-border rounded-lg p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-center">
                What Happens Next
              </h2>

              <div className="space-y-6 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                <p>
                  In the meantime, we encourage you to explore the resources
                  below. Each one is designed to help you think differently
                  about how transformation succeeds or stalls within your
                  organization.
                </p>

                <p>
                  If you have any immediate questions or want to schedule a
                  conversation sooner, don't hesitate to reach out directly.
                </p>

                <p className="text-center font-medium text-foreground pt-4">
                  We're here to help you close the gap.
                </p>
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Explore More</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-border rounded-lg p-6 space-y-3 text-left">
                  <h3 className="font-semibold">Our Frameworks</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn how HAI and AVS work together to build trust, govern
                    responsibly, and measure value
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/frameworks">
                      View Frameworks <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="border border-border rounded-lg p-6 space-y-3 text-left">
                  <h3 className="font-semibold">Latest Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Read articles on AI governance, trust-building, and
                    leadership readiness
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/insights">
                      Read Insights <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="border border-border rounded-lg p-6 space-y-3 text-left">
                  <h3 className="font-semibold">Start a Conversation</h3>
                  <p className="text-sm text-muted-foreground">
                    Have questions now? Reach out directly and we'll connect you
                    with the right person
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="pt-8">
              <Button asChild size="lg">
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
