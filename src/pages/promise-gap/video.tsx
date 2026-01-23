import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const PromiseGapVideo = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                See How BMR Solutions Helps Organizations Close the Promise Gap™
              </h1>

              {/* <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                A 45-second visual introduction to why transformation
                initiatives fail—and how to fix them.
              </p> */}
            </div>

            {/* Video Section */}
            <div className="space-y-6">
              <div className="relative aspect-video bg-gradient-to-br from-muted/50 to-muted rounded-lg overflow-hidden border border-border">
                {/* Video Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="h-20 w-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                      <Play className="h-10 w-10 text-accent" />
                    </div>
                    <p className="text-muted-foreground">Videos coming soon.</p>
                  </div>
                </div>

                {/* Actual video embed will go here */}
                {/* <video 
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/promise-gap-intro.mp4" type="video/mp4" />
                </video> */}
              </div>

              <div className="text-center max-w-3xl mx-auto space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  &qout;The Promise Gap is not a theory. It is the silent
                  friction that erodes trust between what was promised and what
                  gets delivered. It is where good intentions meet real-world
                  complexity, and where transformation either breaks down or
                  breaks through.&qout;
                </p>

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground italic">
                    BMR Solutions helps leaders identify where these gaps form,
                    why they persist, and how to close them before they destroy
                    stakeholder confidence.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid md:grid-cols-2 gap-6 pt-8">
              <div className="border border-border rounded-lg p-8 space-y-4 text-center">
                <h3 className="text-2xl font-semibold">
                  Ready to Close Your Promise Gap?
                </h3>
                <p className="text-muted-foreground">
                  Take our diagnostic to identify where your transformation is
                  leaking trust and value.
                </p>
                <Button asChild size="lg" className="w-full">
                  <Link href="/promise-gap/diagnostic">
                    Take the Diagnostic <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="border border-border rounded-lg p-8 space-y-4 text-center">
                <h3 className="text-2xl font-semibold">
                  Explore Our Frameworks
                </h3>
                <p className="text-muted-foreground">
                  Learn how HAI and AVS work together to build trust, govern
                  responsibly, and measure what matters.
                </p>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link href="/frameworks">
                    View Frameworks <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromiseGapVideo;
