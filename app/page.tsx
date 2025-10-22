'use client';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle, Shield, Network, LineChart, ArrowRight, Mail, Phone, MapPin, BookOpen, FileCheck2, Sparkles } from 'lucide-react';
export default function Page() {
  return (
    <div>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-teal-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold">B</span>
            </div>
            <div>
              <p className="font-semibold tracking-tight">BMR Solutions</p>
              <p className="text-xs text-gray-500">Trust → Govern → Evolve</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-teal-700">Services</a>
            <a href="#frameworks" className="hover:text-teal-700">Frameworks</a>
            <a href="#outcomes" className="hover:text-teal-700">Outcomes</a>
            <a href="#insights" className="hover:text-teal-700">Insights</a>
            <a href="#contact" className="hover:text-teal-700">Contact</a>
          </nav>
          <div className="hidden md:block">
            <a href="#contact"><Button className="rounded-2xl">Start a conversation</Button></a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-teal-200 via-white to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              Responsible AI and delivery systems that actually ship value
            </h1>
            <p className="mt-5 text-lg text-gray-600 max-w-xl">
              We help CIOs and CTOs in healthcare, public sector, and regulated industries adopt AI responsibly, modernize delivery, and reduce risk.
              Clear governance. Human-centered adoption. Repeatable outcomes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#services"><Button className="rounded-2xl" >Explore services</Button></a>
              <a href="#frameworks" className="inline-flex items-center gap-2 text-teal-700 font-medium">
                See our frameworks <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600">
              {["NIST AI RMF aligned","Healthcare and public sector","Algorithmic Impact Assessments","HAI and AVS toolkits","Delivery readiness scans","Executive enablement"].map(item => (
                <div key={item} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-teal-600"/>{item}</div>
              ))}
            </div>
          </div>
          <div className="lg:pl-8">
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5"/>Outcome Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3"><Shield className="h-5 w-5 text-teal-700"/><p><span className="font-semibold">Governance in weeks, not quarters.</span> Rapidly established AI intake and review, mapped to policy and risk controls.</p></div>
                <div className="flex items-start gap-3"><Network className="h-5 w-5 text-teal-700"/><p><span className="font-semibold">Human-in-the-loop adoption.</span> HAI playbooks increased workforce readiness and trust.</p></div>
                <div className="flex items-start gap-3"><LineChart className="h-5 w-5 text-teal-700"/><p><span className="font-semibold">Delivery reliability up.</span> Clear SLAs, escalation paths, and portfolio signals that prevent silent failure.</p></div>
                <a href="#contact"><Button className="w-full rounded-2xl">Talk about your portfolio</Button></a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Services</h2>
          <p className="mt-2 text-gray-600 max-w-3xl">Built for regulated environments. Designed to cut risk and accelerate value.</p>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Responsible AI Governance", desc: "Intake, go or no-go criteria, model risk policy mapping, AI review boards, and documentation that stands up to audit."},
              { title: "Delivery Readiness & Modernization", desc: "Portfolio diagnostics, playbooks, and operating cadences that stabilize delivery and improve predictability."},
              { title: "Algorithmic Impact Assessment", desc: "Structured AIA process to surface risks, harms, and mitigations before deployment."},
              { title: "Human–AI Interaction (HAI) Enablement", desc: "Workforce training, role design, and change support to make AI usable and trusted."},
              { title: "Adoption Value System (AVS)", desc: "Value mapping and outcome tracking so investments align to mission and measurable gains."},
              { title: "Executive Advisory", desc: "C-suite counsel, board prep, and vendor alignment that balances innovation with oversight."},
            ].map(s => (
              <Card key={s.title} className="rounded-2xl">
                <CardHeader><CardTitle className="text-lg">{s.title}</CardTitle></CardHeader>
                <CardContent className="text-sm text-gray-700">{s.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="frameworks" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Frameworks</h2>
          <p className="mt-2 text-gray-600">Proprietary methods that make change concrete and auditable.</p>
          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            {[
              {title:"Trust → Govern → Evolve", points:["Trust: transparency, documentation, workforce readiness","Govern: policies, controls, approvals, oversight","Evolve: iterate with metrics and feedback loops"]},
              {title:"HAI Playbooks", points:["Role and task mapping","Decision boundaries with human oversight","Usability, training, and support paths"]},
              {title:"Adoption Value System (AVS)", points:["Value hypotheses and success metrics","Signal detection and risk flags","Portfolio scorecards for execs"]},
            ].map(f => (
              <Card key={f.title} className="rounded-2xl">
                <CardHeader><CardTitle>{f.title}</CardTitle></CardHeader>
                <CardContent className="text-sm text-gray-700 space-y-2">
                  <p>From pilots to scaled adoption with clear guardrails and evidence of value.</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {f.points.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="outcomes" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Outcomes we optimize</h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { k: "+CSAT, lower variance", d: "Stabilized delivery through clearer SLAs and escalation." },
              { k: "Faster approvals", d: "Standing AI governance with intake and review cycles." },
              { k: "Risk visibility", d: "AIA and scorecards expose bias and misuse early." },
              { k: "Adoption that sticks", d: "HAI training aligned to real roles and tasks." },
              { k: "Predictable value", d: "AVS ties spend to measurable impact." },
              { k: "Audit ready", d: "Documentation that satisfies compliance teams." },
            ].map(o => (
              <Card key={o.k} className="rounded-2xl">
                <CardHeader><CardTitle className="text-lg">{o.k}</CardTitle></CardHeader>
                <CardContent className="text-sm text-gray-700">{o.d}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="insights" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Latest insights</h2>
          <p className="mt-2 text-gray-600">Articles, field guides, and tools from the work.</p>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {title:"Field Guide: Trust → Govern → Evolve",desc:"A practical blueprint to move from pilots to scaled AI adoption in regulated orgs.",cta:"Read the guide",href:"/insights/tge-field-guide"},
              {title:"Playbook: Human–AI Interaction (HAI)",desc:"Make AI useful and safe in daily workflows with role-based design.",cta:"Open playbook",href:"/insights/hai-playbook"},
              {title:"Template: Algorithmic Impact Assessment",desc:"Identify risks, harms, mitigations, and controls before deployment.",cta:"Download template",href:"/insights/aia-template"},
            ].map(p => (
              <Card key={p.title} className="rounded-2xl">
                <CardHeader><CardTitle className="text-lg">{p.title}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{p.desc}</p>
                  <a href={p.href}><Button variant="secondary" className="mt-4 rounded-2xl">{p.cta}</Button></a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 lg:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Start a conversation</h2>
              <p className="mt-3 text-gray-300 max-w-xl">
                Tell us where you want stronger governance, better adoption, or more predictable delivery. We will share a simple path forward in the first call.
              </p>
              <div className="mt-6 space-y-2 text-sm">
                <p className="flex items-center gap-2"><Mail className="h-4 w-4"/><a href="mailto:barnabusr@outlook.com" className="hover:underline">barnabusr@outlook.com</a></p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4"/><a href="tel:+15712915296" className="hover:underline">(571) 291-5296</a></p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4"/><span>Washington, DC Metro</span></p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 text-gray-200">
                <div className="flex items-center gap-2"><FileCheck2 className="h-4 w-4"/>Top-Secret clearance</div>
                <div className="flex items-center gap-2"><BookOpen className="h-4 w-4"/>Microsoft Responsible AI Leader</div>
              </div>
            </div>
            <form action="/api/contact" method="post" className="bg-white/5 rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input name="name" className="w-full rounded-xl bg-white text-gray-900 px-3 py-2 outline-none border focus:ring-2 focus:ring-teal-500" placeholder="Your name" required />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input type="email" name="email" className="w-full rounded-xl bg-white text-gray-900 px-3 py-2 outline-none border focus:ring-2 focus:ring-teal-500" placeholder="you@example.com" required />
              </div>
              <div>
                <label className="block text-sm mb-1">How can we help?</label>
                <textarea rows={4} name="message" className="w-full rounded-xl bg-white text-gray-900 px-3 py-2 outline-none border focus:ring-2 focus:ring-teal-500" placeholder="Short description" required />
              </div>
              <Button className="rounded-2xl w-full" type="submit">Send</Button>
              <p className="text-xs text-gray-300">Submitting this form shares your details with BMR Solutions. We respect privacy and keep things confidential.</p>
            </form>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "BMR Solutions",
            url: "https://www.bmrsolutions.example",
            slogan: "Trust → Govern → Evolve",
            email: "barnabusr@outlook.com",
            address: { "@type": "PostalAddress", addressLocality: "Washington", addressRegion: "DC", addressCountry: "US" },
            areaServed: ["US"],
            sameAs: []
          })
        }}
      />

      <footer className="py-8 border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} BMR Solutions. All rights reserved.</p>
          <div className="text-sm text-gray-600 flex gap-4">
            <a href="/privacy" className="hover:text-teal-700">Privacy</a>
            <a href="/terms" className="hover:text-teal-700">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
