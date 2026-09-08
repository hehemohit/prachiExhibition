"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";

// ─── ANIMATED STATS COUNTER ──────────────────────────────────
function AnimatedCounter({
  end,
  suffix = "",
  duration = 1800,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(easedProgress * end));

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          };

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function PrachiWorldExhibition() {
  const [submitted, setSubmitted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // ─── SCROLL REVEAL OBSERVER ────────────────────────────────
  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(
      "[data-reveal], .border-draw, .stage-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeFilter]);

  // ─── HEADER SHRINK ON SCROLL ───────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const projects = [
    {
      id: "biomed",
      category: "mezzanine",
      colSpan: "lg:col-span-7",
      aspectRatio: "aspect-[16/10]",
      venue: "Arab Health • Sheikh Saeed Hall",
      specs: "360 m² Double Decker",
      title: "BioMed Global Multi-Tier Pavilion",
      description:
        "Engineered structural steel mezzanine, soundproof executive negotiation suites, and integrated 360-degree cylindrical LED stage.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAmcaA9B3kDDtgOkofuwmQCiA6pxKkkG1rZUrRvtLM4NyM8mKv660_wphAk2JouXALmk9wP1LK-ZUE3CwSAeK8FCd5LKf4AyyFSrrdPLAtgQj6xnFDwo9BongYON7-mZ9vERClFrAn9tvKYIYtkytGCzGGZiT7eXKp7SX7lr8l7LsVTynd0l1q4nUS3JRf2OJdGiNTsY5Kav-E4z3JIeJr5vuU6YRBEWGDVVBSRhnNkqecjptA2IdE2-g",
      alt: "Double-decker medical technology trade stand at Arab Health",
    },
    {
      id: "cyberfortress",
      category: "joinery",
      colSpan: "lg:col-span-5",
      aspectRatio: "aspect-[16/11]",
      venue: "GITEX Global • DWTC Za'abeel",
      specs: "108 m² Island",
      title: "CyberFortress Architectural Nexus",
      description:
        "Thermoformed Corian reception consoles, suspended overhead kinetic truss, and private acoustic consultation chambers.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCy0-oHJ3vYBR7Lyqqyea46eZbYI7_qIBPvFzoLd9pxv6dr96snT2O6u2UwGls-cyypNAm9WgxnAb4qFayK2Lm2sZlv21iFRb4hirJe9HjDSV1a8u2T_PSJK7UeW57TAk1tnpF0hTXPYEY-VF1vnF6nqIZfT1a1dJbDCjYU_bB3uUtw9ofZk2C8duZizKkSn4CMuLlVqjKRQ0lAYLa3-SIpjLWKwE_LXlPoo1zXbP0V8J_SxNwuKi5QUQ",
      alt: "Futuristic curved cybersecurity exhibition stand at GITEX",
    },
    {
      id: "petroglobal",
      category: "country",
      colSpan: "lg:col-span-5",
      aspectRatio: "aspect-[16/11]",
      venue: "ADIPEC Abu Dhabi • ADNEC",
      specs: "150 m² Corner",
      title: "PetroGlobal Industrial Hub",
      description:
        "Heavy-duty reinforced floor loadings (1,500 kg/m²) custom designed to display functional turbine valve assemblies and heavy equipment.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBhPQK-zmxiqmDOcWqM1N9YBS8nwKoJMwdDCIVpqLh3s7OAndTDKnMnnqQ8eJpaBS1R0CHF0A2cwkmMF_SWC8sd1_b2VHq9My-878z0V1O84WKszn4EZJJRjk4Flzb7gaUhWDTbpqe4lOrOM96KDV5MT35ZyMMy6VwdZLkVOwcZweuhgmiULfF_kJNXXwuJvXZjt2LTGlLEsHVz9FrsqF3_WoChDfc6lFDf78d1Ef2scWfr8qA3ZORCow",
      alt: "Heavy industrial oil and gas trade show pavilion at ADIPEC",
    },
    {
      id: "alzahra",
      category: "joinery",
      colSpan: "lg:col-span-7",
      aspectRatio: "aspect-[16/10]",
      venue: "Gulfood Dubai • DWTC Hall 2",
      specs: "200 m² Peninsula",
      title: "Al-Zahra Gourmet International Pavilion",
      description:
        "Commercial-grade live preparation suites certified with Dubai Civil Defense and Municipality, finished with honed travertine and brass detailing.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBWzJKengEmfxCn4rIfE0TBMk1SBUgkUcuYih0m2Zd_krJZtqkI_NklbU3nS6DlSrcq-21QNb_hFwY9kXCKSc5-7-6Fk4vYqCaPraLMfIIKI6qJY3eFeegfCkEB_43oFFbupzueSm72oLoR9EYXpYsOyTBrfL4trnPInP6SPG9z3LzveFygueULBps4I2iCMXnKkdrcwNOC_yYafV6ffVJh8fMMHLt3RiuWo4m9JnhsX9i5TsXNMv_tCQ",
      alt: "Luxury food and beverage brand pavilion at Gulfood",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-[#121212] text-[#EDEDEA] font-sans antialiased selection:bg-[#C5B8A5] selection:text-[#121212] relative">
      {/* ─── TOP MARQUEE TICKER (DARK) ────────────────────────── */}
      <div className="w-full border-b border-white/[0.08] text-[#9D9A93] text-[11px] font-sans tracking-widest uppercase py-2 bg-[#101010] marquee-wrapper">
        <div className="marquee-track flex items-center space-x-12 pr-12">
          <span className="flex items-center gap-2 text-[#F7F5F0]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5B8A5] animate-pulse"></span>
            <span>Dubai Studio: +971 0585047305</span>
          </span>
          <span className="text-[#9D9A93]/40">/</span>
          <span className="text-[#9D9A93]">+971 529783732</span>
          <span className="text-[#9D9A93]/40">/</span>
          <span className="text-[#9D9A93]">India Atelier: +91 8003959949</span>
          <span className="text-[#9D9A93]/40">•</span>
          <a
            className="hover:text-[#DDD3C4] transition-colors duration-200"
            href="mailto:bkccdubai@gmail.com"
          >
            bkccdubai@gmail.com
          </a>
          <span className="text-[#9D9A93]/40">•</span>
          <span className="text-[#9D9A93]">Emarat Atrium, Al Wasl, Dubai</span>
          <span className="text-[#9D9A93]/40">•</span>
          <span className="text-[#C5B8A5]">DWTC • ADNEC • Riyadh Front Official Partner</span>
        </div>

        <div className="marquee-track flex items-center space-x-12 pr-12" aria-hidden="true">
          <span className="flex items-center gap-2 text-[#F7F5F0]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5B8A5] animate-pulse"></span>
            <span>Dubai Studio: +971 0585047305</span>
          </span>
          <span className="text-[#9D9A93]/40">/</span>
          <span className="text-[#9D9A93]">+971 529783732</span>
          <span className="text-[#9D9A93]/40">/</span>
          <span className="text-[#9D9A93]">India Atelier: +91 8003959949</span>
          <span className="text-[#9D9A93]/40">•</span>
          <a
            className="hover:text-[#DDD3C4] transition-colors duration-200"
            href="mailto:bkccdubai@gmail.com"
          >
            bkccdubai@gmail.com
          </a>
          <span className="text-[#9D9A93]/40">•</span>
          <span className="text-[#9D9A93]">Emarat Atrium, Al Wasl, Dubai</span>
          <span className="text-[#9D9A93]/40">•</span>
          <span className="text-[#C5B8A5]">DWTC • ADNEC • Riyadh Front Official Partner</span>
        </div>
      </div>

      {/* ─── ARCHITECTURAL ATELIER HEADER (DARK) ───────────────── */}
      <header
        className={`sticky top-0 z-50 border-b border-white/[0.08] header-transition backdrop-blur-md ${
          isScrolled
            ? "h-18 bg-[#121212]/95 shadow-xl shadow-black/40"
            : "h-24 bg-[#121212]/85"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex items-center justify-between h-full">
          <a className="flex flex-col group" href="#">
            <span
              className={`font-serif tracking-[0.2em] uppercase font-normal text-[#F7F5F0] group-hover:text-[#DDD3C4] transition-all duration-300 ${
                isScrolled ? "text-xl" : "text-2xl"
              }`}
            >
              PRACHI WORLD
            </span>
            <span className="text-[9px] tracking-[0.22em] uppercase text-[#9D9A93] font-light mt-0.5">
              Exhibition Organizing • Dubai &amp; India
            </span>
          </a>

          <nav className="hidden lg:flex items-center space-x-10 text-[11px] uppercase tracking-widest font-normal text-[#9D9A93]">
            {[
              { label: "Selected Works", href: "#work" },
              { label: "Capabilities", href: "#capabilities" },
              { label: "Process", href: "#process" },
              { label: "Global Hubs", href: "#hubs" },
              { label: "Inquiries", href: "#inquiry" },
            ].map((link) => (
              <a
                key={link.href}
                className="relative py-1 hover:text-[#F7F5F0] transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5B8A5] hover:after:w-full after:transition-all after:duration-300"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-white/[0.12] text-[11px] uppercase tracking-widest text-[#9D9A93] hover:text-[#F7F5F0] hover:border-[#C5B8A5] hover:bg-white/[0.02] transition-all duration-300"
              href="https://wa.me/971529783732"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5B8A5] animate-pulse"></span>
              <span>Direct Desk</span>
            </a>
            <a
              className="px-5 py-2.5 bg-[#F7F5F0] text-[#121212] text-[11px] uppercase tracking-widest font-medium hover:bg-[#DDD3C4] transition-all duration-300 shadow-sm shimmer-btn"
              href="#inquiry"
            >
              Request Consultation
            </a>
          </div>
        </div>
      </header>

      {/* ─── SECTION 1: HERO (DARK) ────────────────────────────── */}
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-36 border-b border-white/[0.08] bg-[#121212] overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[600px] h-[400px] bg-[#C5B8A5]/[0.03] rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div data-reveal className="flex items-center gap-4 mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5B8A5] font-medium">
              Bespoke Spatial Architecture
            </span>
            <span className="h-px w-12 bg-white/[0.12]"></span>
            <span className="text-[10px] tracking-widest uppercase text-[#9D9A93] hidden sm:inline">
              DWTC • ADNEC • Riyadh Front Official Partner
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Headline & Philosophy */}
            <div className="lg:col-span-7 space-y-8">
              <h1
                data-reveal
                className="delay-100 font-serif text-4xl sm:text-5xl lg:text-[68px] leading-[1.08] font-normal tracking-[-0.01em] text-[#F7F5F0]"
              >
                Spatial Architecture &amp; Bespoke Exhibition Pavilions
              </h1>
              <p
                data-reveal
                className="delay-200 font-sans font-light text-[#9D9A93] text-base lg:text-lg leading-relaxed max-w-xl"
              >
                We conceive, fabricate, and install turnkey environments for discerning international brands across
                Dubai World Trade Centre, Abu Dhabi, and Saudi Arabia.
              </p>
              <div data-reveal className="delay-300 flex flex-wrap items-center gap-5 pt-2">
                <a
                  className="px-7 py-3.5 bg-[#F7F5F0] text-[#121212] text-xs uppercase tracking-widest hover:bg-[#DDD3C4] transition-all duration-300 inline-flex items-center gap-3 shimmer-btn group"
                  href="#work"
                >
                  <span>View Selected Commissions</span>
                  <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <a
                  className="px-7 py-3.5 border border-white/[0.14] text-[#F7F5F0] text-xs uppercase tracking-widest hover:border-[#C5B8A5] hover:text-[#DDD3C4] hover:bg-white/[0.02] transition-all duration-300 inline-flex items-center gap-2"
                  href="#inquiry"
                >
                  <span>Submit Exhibition Brief</span>
                </a>
              </div>

              {/* Quiet Venues Index */}
              <div data-reveal className="delay-400 pt-10 border-t border-white/[0.08] mt-10">
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#9D9A93] mb-4">
                  Accredited Venues &amp; Summits
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-light text-[#9D9A93]">
                  {["GITEX Global", "Arab Health", "ADIPEC Abu Dhabi", "Gulfood", "LEAP Riyadh", "The Big 5"].map(
                    (summit, idx) => (
                      <span key={summit} className="flex items-center gap-5">
                        <span className="text-[#F7F5F0]/90 hover:text-[#C5B8A5] transition-colors cursor-default">
                          {summit}
                        </span>
                        {idx < 5 && <span className="text-white/20">•</span>}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right: Architectural Curated Showcase Frame */}
            <div data-reveal="right" className="delay-200 lg:col-span-5">
              <div className="border border-white/[0.14] bg-[#181817] p-2 hover:border-[#C5B8A5]/50 transition-colors duration-500 shadow-2xl">
                <div className="aspect-[4/3] relative overflow-hidden bg-[#161616] group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Architectural exhibition stand design with warm interior illumination"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 ken-burns transition-all duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHul7UI2Mo4KVT9SyXuthpOWZIFPO3natZN66KAUYiZWE9_ulP_B8s6kYmYQ5ZI5NHlzyoSiESnJ_xw-BowioSycuXGdnUNYM8QTefxoGJAfHh5Z5xwtI68KX1zXt1AYDIUw-1njdWiEpKiWYTWg13gxnF1r0dersPPo_lT2pgVcnizEj2s3fJurAGaWLAtg5mYSUVODO6r96MQKm1Ugamx_fpd5QGz37sJHdbcnzp5yUXOCT6DEtwxQ"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs">
                    <div>
                      <span className="text-[9px] tracking-widest uppercase text-[#C5B8A5] block font-mono">
                        Commission 2024
                      </span>
                      <span className="font-serif text-base text-[#F7F5F0]">Quantum Pavilion, GITEX</span>
                    </div>
                    <span className="text-[10px] tracking-widest text-[#9D9A93] uppercase font-mono">
                      216 m² Island
                    </span>
                  </div>
                </div>
                <div className="py-3 px-2 flex items-center justify-between text-[11px] text-[#9D9A93] border-t border-white/[0.08] mt-2">
                  <span>Dubai World Trade Centre</span>
                  <span>Turnkey Fabrication</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Performance Metrics */}
          <div
            data-reveal
            className="delay-300 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 mt-16 border-t border-white/[0.08]"
          >
            <div className="space-y-1">
              <span className="font-serif text-3xl lg:text-4xl text-[#F7F5F0] block font-normal">
                <AnimatedCounter end={850} suffix="+" />
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#9D9A93] block">
                Commissions Delivered
              </span>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl lg:text-4xl text-[#F7F5F0] block font-normal">
                <AnimatedCounter end={15} suffix=" Yrs" />
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#9D9A93] block">
                International Practice
              </span>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl lg:text-4xl text-[#F7F5F0] block font-normal">
                <AnimatedCounter end={100} suffix="%" />
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#9D9A93] block">
                In-House Workshops (UAE &amp; India)
              </span>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl lg:text-4xl text-[#F7F5F0] block font-normal">
                <AnimatedCounter end={24} suffix="h Early" />
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#9D9A93] block">
                Guaranteed Handover Pre-Show
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: CURATED WORKS (OFF-WHITE) ──────────────── */}
      <section className="py-24 lg:py-32 border-b border-black/[0.08] bg-[#F7F5F0] text-[#121212]" id="work">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div
            data-reveal
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8F7D66] block mb-2 font-medium">
                Portfolio of Work
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-normal text-[#121212]">
                Selected Exhibition Pavilions
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] tracking-widest uppercase text-[#736E66]">
              {[
                { label: "All Projects", key: "all" },
                { label: "Multi-Tier & Mezzanines", key: "mezzanine" },
                { label: "Custom Joinery", key: "joinery" },
                { label: "Country Pavilions", key: "country" },
              ].map((filter, index) => (
                <div key={filter.key} className="inline-flex items-center">
                  <button
                    onClick={() => setActiveFilter(filter.key)}
                    className={`transition-all duration-300 py-1 ${
                      activeFilter === filter.key
                        ? "text-[#121212] font-medium border-b border-[#8F7D66]"
                        : "hover:text-[#121212]"
                    }`}
                  >
                    {filter.label}
                  </button>
                  {index < 3 && <span className="mx-3 text-black/15">/</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                data-reveal
                className={`${project.colSpan} flex flex-col justify-between group delay-${
                  (idx + 1) * 100
                }`}
              >
                <div className="overflow-hidden border border-black/[0.08] bg-[#EDEAE3]/60 group-hover:border-[#8F7D66] transition-colors duration-500 shadow-sm">
                  <div className={`${project.aspectRatio} overflow-hidden`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={project.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      src={project.image}
                    />
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flex items-center justify-between text-[11px] text-[#736E66] uppercase tracking-widest mb-2 font-mono">
                    <span>{project.venue}</span>
                    <span>{project.specs}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-[#121212] group-hover:text-[#8F7D66] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-sans font-light text-sm text-[#5C5852] mt-2 leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: CAPABILITIES (DARK) ────────────────────── */}
      <section className="py-24 lg:py-32 border-b border-white/[0.08] bg-[#121212] text-[#EDEDEA]" id="capabilities">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div data-reveal className="max-w-2xl mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5B8A5] block mb-2 font-medium">
              Atelier Capabilities
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-normal text-[#F7F5F0]">
              Comprehensive In-House Exhibition Practice
            </h2>
            <p className="font-sans font-light text-[#9D9A93] text-base mt-3 leading-relaxed">
              We eliminate contractor intermediaries. Everything is engineered and fabricated within our dedicated
              Dubai and India facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Bespoke 3D Stand Architecture",
                desc: "Photorealistic spatial renders, structural engineering assessments, traffic flow planning, and DWTC authority-compliant CAD filings.",
                bullets: ["— 48h Concept Delivery", "— Structural Load Calculations", "— Interactive VR Previews"],
              },
              {
                num: "02",
                title: "Precision Joinery & Metalwork",
                desc: "In-house 5-axis CNC routing, luxury wood veneers, polyurethane lacquer finishing, and structural double-decker steel frame engineering.",
                bullets: ["— 25,000 sq.ft Production Studio", "— Architectural Carpentry", "— Double-Decker Steel Framework"],
              },
              {
                num: "03",
                title: "Integrated Lighting & AV",
                desc: "Seamless curved fine-pitch LED screens (P1.9 / P2.5), architectural museum-grade lighting trusses, and interactive digital touch consoles.",
                bullets: ["— Curved Video Wall Solutions", "— Calibrated 3000K Warm Lighting", "— Dedicated On-Site AV Engineers"],
              },
              {
                num: "04",
                title: "Turnkey Approvals & Handover",
                desc: "Full venue registrations, Civil Defense sign-offs, utilities connections, on-site live show standby stewards, and post-expo dismantling.",
                bullets: ["— Complete Authority Clearances", "— 24h Early Handover Guarantee", "— Dismantling & Safe Storage"],
              },
            ].map((cap, i) => (
              <div
                key={cap.num}
                data-reveal
                className={`border-draw delay-${(i + 1) * 100} group`}
              >
                <span className="font-serif text-sm text-[#C5B8A5] mb-3 block font-mono">
                  {cap.num}
                </span>
                <h3 className="font-serif text-xl font-normal text-[#F7F5F0] mb-3 group-hover:text-[#C5B8A5] transition-colors">
                  {cap.title}
                </h3>
                <p className="font-sans font-light text-[#9D9A93] text-xs leading-relaxed">
                  {cap.desc}
                </p>
                <ul className="mt-6 space-y-2 text-[11px] text-[#9D9A93]/80 font-light">
                  {cap.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: 4-STEP METHODOLOGY (OFF-WHITE) ──────────── */}
      <section className="py-24 lg:py-32 border-b border-black/[0.08] bg-[#F7F5F0] text-[#121212]" id="process">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div
            data-reveal
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
          >
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8F7D66] block mb-2 font-medium">
                Methodology
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-normal text-[#121212]">
                The 4-Stage Execution Workflow
              </h2>
            </div>
            <p className="text-[#5C5852] text-xs font-light max-w-sm">
              A rigorous architectural protocol delivering zero-snag stand handovers across major exhibition venues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                stage: "Stage 01",
                title: "Consultation & Venue Brief",
                desc: "Analysis of booth dimensions, hall orientation, sightlines, structural regulations, and commercial targets.",
              },
              {
                stage: "Stage 02",
                title: "3D Spatial Architecture",
                desc: "Bespoke 3D photorealistic renderings, material sample approvals, and formal Civil Defense engineering filings.",
              },
              {
                stage: "Stage 03",
                title: "In-House Pre-Build",
                desc: "Trial dry-assembly in our workshop to test structural joints, electrical routing, and finish tolerances prior to dispatch.",
              },
              {
                stage: "Stage 04",
                title: "On-Site Turnkey Handover",
                desc: "Delivered pristine and cleaned 24 hours prior to expo commencement, backed by standby technical personnel.",
              },
            ].map((step, idx) => (
              <div
                key={step.stage}
                data-reveal
                className={`border-l border-black/[0.12] pl-6 space-y-3 delay-${
                  (idx + 1) * 100
                } hover:border-[#8F7D66] transition-colors`}
              >
                <span className="text-[11px] tracking-widest text-[#8F7D66] uppercase font-mono block">
                  {step.stage}
                </span>
                <h4 className="font-serif text-lg text-[#121212]">{step.title}</h4>
                <p className="text-xs font-light text-[#5C5852] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: GLOBAL HUBS (DARK) ─────────────────────── */}
      <section className="py-24 lg:py-32 border-b border-white/[0.08] bg-[#121212] text-[#EDEDEA]" id="hubs">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div data-reveal className="max-w-2xl mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5B8A5] block mb-2 font-medium">
              Global Operations
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-normal text-[#F7F5F0]">
              Dual Hub Network: Dubai &amp; India
            </h2>
            <p className="font-sans font-light text-[#9D9A93] text-base mt-3 leading-relaxed">
              Seamless Middle East exhibition management coupled with high-capacity bespoke joinery fabrication.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Dubai Studio */}
            <div
              data-reveal="left"
              className="delay-150 p-8 lg:p-12 border border-white/[0.08] bg-[#181817] flex flex-col justify-between hover:border-[#C5B8A5]/40 transition-colors duration-500 shadow-lg"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <span className="text-[10px] tracking-widest uppercase text-[#C5B8A5] font-medium">
                    Headquarters
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-[#9D9A93] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5B8A5] animate-ping"></span>
                    <span>Active Studio</span>
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#F7F5F0] font-normal">
                  Dubai, United Arab Emirates
                </h3>
                <div className="space-y-2 text-xs font-light text-[#9D9A93] leading-relaxed">
                  <p>
                    <strong className="text-[#F7F5F0] font-normal">Facility:</strong> Emarat Atrium Building
                  </p>
                  <p>
                    <strong className="text-[#F7F5F0] font-normal">Location:</strong> Al Wasl Plot No: 1116-0,
                    Dubai, UAE
                  </p>
                  <p>
                    <strong className="text-[#F7F5F0] font-normal">Desk Email:</strong>{" "}
                    <a
                      className="text-[#F7F5F0] underline hover:text-[#C5B8A5] transition-colors"
                      href="mailto:bkccdubai@gmail.com"
                    >
                      bkccdubai@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="pt-8 mt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs">
                  <span className="text-[10px] uppercase tracking-widest text-[#9D9A93] block mb-1">
                    Direct Lines
                  </span>
                  <span className="font-mono text-[#F7F5F0]">+971 0585047305 / +971 529783732</span>
                </div>
                <a
                  className="text-xs uppercase tracking-widest text-[#C5B8A5] hover:text-[#F7F5F0] underline transition-colors"
                  href="https://wa.me/971529783732"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Desk →
                </a>
              </div>
            </div>

            {/* India Workshop */}
            <div
              data-reveal="right"
              className="delay-250 p-8 lg:p-12 border border-white/[0.08] bg-[#181817] flex flex-col justify-between hover:border-[#C5B8A5]/40 transition-colors duration-500 shadow-lg"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <span className="text-[10px] tracking-widest uppercase text-[#C5B8A5] font-medium">
                    Regional Production
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-[#9D9A93]">
                    Fabrication Unit
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#F7F5F0] font-normal">Rajasthan, India</h3>
                <div className="space-y-2 text-xs font-light text-[#9D9A93] leading-relaxed">
                  <p>
                    <strong className="text-[#F7F5F0] font-normal">Workshop:</strong> Office No. 201, Jangir Tower
                  </p>
                  <p>
                    <strong className="text-[#F7F5F0] font-normal">Address:</strong> Bhojasar, Jhunjhunu (Raj.) -
                    333041, India
                  </p>
                  <p>
                    <strong className="text-[#F7F5F0] font-normal">Capability:</strong> High-Volume Modular CNC
                    Joinery &amp; Heavy Frameworks
                  </p>
                </div>
              </div>
              <div className="pt-8 mt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs">
                  <span className="text-[10px] uppercase tracking-widest text-[#9D9A93] block mb-1">
                    Direct Office Line
                  </span>
                  <span className="font-mono text-[#F7F5F0]">+91 8003959949</span>
                </div>
                <a
                  className="text-xs uppercase tracking-widest text-[#C5B8A5] hover:text-[#F7F5F0] underline transition-colors"
                  href="tel:+918003959949"
                >
                  Call India Office →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: INQUIRY / CONSULTATION (OFF-WHITE) ─────── */}
      <section className="py-24 lg:py-32 border-b border-black/[0.08] bg-[#F7F5F0] text-[#121212]" id="inquiry">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Text & Information */}
            <div data-reveal="left" className="lg:col-span-5 space-y-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8F7D66] block font-medium">
                Initiate a Project
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-normal text-[#121212] leading-tight">
                Request a Bespoke Proposal &amp; 3D Concept
              </h2>
              <p className="font-sans font-light text-[#5C5852] text-sm leading-relaxed">
                Provide your exhibition venue, booth dimensions, and architectural requirements. Our design team
                will respond within 4 business hours.
              </p>
              <div className="pt-8 border-t border-black/[0.08] space-y-4 text-xs font-light text-[#5C5852]">
                <div className="flex items-center gap-3">
                  <span className="text-[#8F7D66] text-sm">—</span>
                  <span>Turnkey fabrication, graphics, painting &amp; authority permits included</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#8F7D66] text-sm">—</span>
                  <span>Full DWTC &amp; ADNEC structural compliance certification</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#8F7D66] text-sm">—</span>
                  <span>Dedicated standby engineer during live show days</span>
                </div>
              </div>
              <div className="pt-6">
                <span className="text-[10px] uppercase tracking-widest text-[#736E66] block mb-2">
                  Direct Principal Inquiries
                </span>
                <a
                  className="font-serif text-xl text-[#121212] hover:text-[#8F7D66] transition-colors block"
                  href="mailto:bkccdubai@gmail.com"
                >
                  bkccdubai@gmail.com
                </a>
                <span className="font-mono text-xs text-[#736E66] mt-1 block">
                  +971 0585047305 / +971 529783732
                </span>
              </div>
            </div>

            {/* Right: Architectural Minimal Form (Off-White/Warm Card) */}
            <div
              data-reveal="right"
              className="delay-150 lg:col-span-7 bg-[#EDEAE3] border border-black/[0.08] p-8 lg:p-12 shadow-lg"
            >
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4 success-pop">
                  <div className="w-12 h-12 rounded-full border border-[#8F7D66] flex items-center justify-center text-[#8F7D66]">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl text-[#121212]">Brief Received</h3>
                  <p className="font-sans text-sm text-[#5C5852] max-w-md">
                    Your brief has been forwarded directly to our principal partners in Dubai. A bespoke 3D proposal will be delivered within 4 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs tracking-widest uppercase text-[#8F7D66] hover:text-[#121212] underline"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-[#736E66] mb-2">
                      Format
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        { label: "Custom Wood", value: "custom_wood", defaultChecked: true },
                        { label: "Double Decker", value: "double_decker" },
                        { label: "Island Stand", value: "island_stand" },
                        { label: "Country Pavilion", value: "pavilion" },
                      ].map((type) => (
                        <label key={type.value} className="cursor-pointer">
                          <input
                            className="peer sr-only"
                            name="stand_type"
                            type="radio"
                            value={type.value}
                            defaultChecked={type.defaultChecked}
                          />
                          <div className="p-3 border border-black/[0.1] bg-white/70 peer-checked:border-[#121212] peer-checked:bg-[#121212] peer-checked:text-[#F7F5F0] text-[#5C5852] text-center transition-all duration-200 hover:border-black/30">
                            {type.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-[#736E66] mb-2">
                        Footprint Area
                      </label>
                      <input
                        className="w-full bg-white border border-black/[0.12] text-[#121212] text-xs px-4 py-3 focus:outline-none focus:border-[#121212] placeholder:text-[#9D9A93] transition-all"
                        placeholder="e.g. 54 sqm (6m x 9m)"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-[#736E66] mb-2">
                        Exhibition Name &amp; Venue
                      </label>
                      <input
                        className="w-full bg-white border border-black/[0.12] text-[#121212] text-xs px-4 py-3 focus:outline-none focus:border-[#121212] placeholder:text-[#9D9A93] transition-all"
                        placeholder="e.g. GITEX Global / DWTC"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-[#736E66] mb-2">
                        Company / Organization
                      </label>
                      <input
                        className="w-full bg-white border border-black/[0.12] text-[#121212] text-xs px-4 py-3 focus:outline-none focus:border-[#121212] placeholder:text-[#9D9A93] transition-all"
                        placeholder="e.g. Apex Global"
                        required
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-[#736E66] mb-2">
                        Corporate Email
                      </label>
                      <input
                        className="w-full bg-white border border-black/[0.12] text-[#121212] text-xs px-4 py-3 focus:outline-none focus:border-[#121212] placeholder:text-[#9D9A93] transition-all"
                        placeholder="name@company.com"
                        required
                        type="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-[#736E66] mb-2">
                      WhatsApp or Mobile Hotline
                    </label>
                    <input
                      className="w-full bg-white border border-black/[0.12] text-[#121212] text-xs px-4 py-3 focus:outline-none focus:border-[#121212] placeholder:text-[#9D9A93] transition-all"
                      placeholder="+971 50 000 0000"
                      required
                      type="tel"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      className="w-full py-4 bg-[#121212] text-[#F7F5F0] text-xs uppercase tracking-widest font-medium hover:bg-[#252422] transition-colors duration-300 shimmer-btn shadow-md"
                      type="submit"
                    >
                      Submit Exhibition Inquiry
                    </button>
                  </div>

                  <p className="text-[10px] text-[#736E66] text-center font-light">
                    All details are handled under strict non-disclosure. 3D concepts and spatial blueprints provided
                    within 48 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER (DARK) ─────────────────────────────────────── */}
      <footer className="bg-[#0E0E0D] text-[#9D9A93] py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-6 space-y-4">
              <span className="font-serif text-2xl text-[#F7F5F0] tracking-[0.2em] uppercase font-normal block">
                PRACHI WORLD
              </span>
              <p className="font-sans font-light text-xs text-[#9D9A93] max-w-md leading-relaxed">
                Exhibition organizing, turnkey pavilion fabrication, and bespoke spatial architecture. Serving Dubai,
                Abu Dhabi, Saudi Arabia, and international exhibitions.
              </p>
              <div className="text-[11px] font-light space-y-1 text-[#9D9A93] pt-2">
                <p>Dubai HQ: Emarat Atrium, Al Wasl Plot No. 1116-0, Dubai, UAE</p>
                <p>India Atelier: Jangir Tower, Bhojasar, Jhunjhunu (Raj.) - 333041, India</p>
              </div>
            </div>
            <div className="md:col-span-3 space-y-3">
              <span className="text-[10px] tracking-widest uppercase text-[#F7F5F0] block">Directory</span>
              <ul className="space-y-2 text-xs font-light">
                <li>
                  <a className="hover:text-[#F7F5F0] transition-colors" href="#work">
                    Selected Works
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F7F5F0] transition-colors" href="#capabilities">
                    Atelier Capabilities
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F7F5F0] transition-colors" href="#process">
                    4-Stage Process
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F7F5F0] transition-colors" href="#hubs">
                    Dubai &amp; India Hubs
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F7F5F0] transition-colors" href="#inquiry">
                    Request Consultation
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:col-span-3 space-y-3">
              <span className="text-[10px] tracking-widest uppercase text-[#F7F5F0] block">Direct Contact</span>
              <div className="space-y-2 text-xs font-light">
                <p>
                  <a className="text-[#F7F5F0] hover:text-[#C5B8A5] transition-colors" href="mailto:bkccdubai@gmail.com">
                    bkccdubai@gmail.com
                  </a>
                </p>
                <p className="font-mono">+971 0585047305</p>
                <p className="font-mono">+971 529783732</p>
                <p className="font-mono">+91 8003959949</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-[11px] font-light gap-4">
            <p>© 2025 Prachi World Exhibition Organizing LLC. All rights reserved.</p>
            <p className="text-[#9D9A93]/70">Dubai • Abu Dhabi • Riyadh • India</p>
          </div>
        </div>
      </footer>

      {/* ─── MINIMAL FLOATING WHATSAPP CONCIERGE BUTTON ────────── */}
      <a
        className="fixed bottom-6 right-6 z-50 bg-[#1A1918]/90 backdrop-blur-md border border-white/[0.12] hover:border-[#C5B8A5] text-[#F7F5F0] px-4 py-2.5 shadow-2xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2.5 hover:-translate-y-1 group"
        href="https://wa.me/971529783732"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5B8A5] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5B8A5]"></span>
        </span>
        <span className="text-[11px] font-medium group-hover:text-[#C5B8A5] transition-colors">
          WhatsApp Concierge
        </span>
      </a>
    </div>
  );
}
