"use client";

import { useEffect, useState, useRef } from "react";
import HomeSection1 from "@/modules/home/HomeSection1";
import HomeSection2 from "@/modules/home/HomeSection2";
import Benefits from "@/modules/home/Benefits";

import HomeSection3Loader from "@/modules/home/HomeSection3Loader";
import TemplatesShowcase from "@/modules/home/TemplatesShowcase";
import ResponsiveTemplatesSection from "@/modules/home/ResponsiveTemplatesSection";
import PricesSection from "@/modules/home/Prices";
import FaqSection from "@/modules/home/FaqSection";
import MapSection from "@/modules/home/MapSection";

// simple LazyLoad wrapper
function LazyLoad({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return <div ref={ref}>{inView ? children : null}</div>;
}

export default function Home() {
  return (
    <div className="min-h-screen width-full">
      <HomeSection1 />
      <HomeSection2 />
      <Benefits />
      <LazyLoad>
        <HomeSection3Loader />
      </LazyLoad>
      <LazyLoad>
        <TemplatesShowcase />
      </LazyLoad>
      <LazyLoad>
        <ResponsiveTemplatesSection />
      </LazyLoad>
      <LazyLoad>
        <PricesSection />
      </LazyLoad>
      <LazyLoad>
        <FaqSection />
      </LazyLoad>
      <LazyLoad>
        <MapSection />
      </LazyLoad>
    </div>
  );
}
