import { useState, useEffect, useRef } from "react";

const data = {
  name: "Eduardo Robles Escoda",
  title: "Técnico en Sistemas & Ciberseguridad",
  location: "Alicante, España",
  email: "edurobles2001@gmail.com",
  phone: "+34 601 393 740",
  linkedin: "https://www.linkedin.com/in/eduardo-robles-escoda-299737209",
  about:
    "Técnico en sistemas con orientación hacia la ciberseguridad. Me adapto rápido a nuevas tecnologías, entiendo los conceptos con facilidad y me organizo bien incluso bajo presión. Disfruto trabajando en equipo y tengo buenas habilidades para comunicarme con personas técnicas y no técnicas. Sigo aprendiendo cada día, actualmente preparando certificaciones en HackTheBox Academy.",
  experience: [
    {
      role: "Soporte Técnico — Centros Educativos",
      company: "Inelcom",
      period: "Mar 2025 – Actualidad",
      duration: "1 año y 2 meses",
      desc: "Resolución de incidencias técnicas en entornos educativos, mantenimiento de hardware/software y atención presencial a usuarios no técnicos.",
      tags: ["Soporte L1/L2", "Hardware", "Redes"],
    },
    {
      role: "Analista de Ciberseguridad",
      company: "Prácticas TSS Ciberseguridad",
      period: "Oct 2024 - Ene 2025",
      duration: "4 meses",
      desc: "Análisis de vulnerabilidades, monitorización de sistemas y primera aproximación al entorno real de ciberseguridad ofensiva y defensiva.",
      tags: ["Pentesting", "Análisis", "Seguridad"],
    },
    {
      role: "Hospitality & Customer Service",
      company: "The Address Connolly — Irlanda",
      period: "Ago 2023 – Jun 2024",
      duration: "10 meses",
      desc: "Experiencia internacional. Mejoré el inglés, trabajo en equipo multicultural y atención al cliente bajo presión.",
      tags: ["Inglés", "Trabajo en equipo", "Internacional"],
    },
    {
      role: "Técnico en Operaciones de Sistemas",
      company: "Marhuenda S.L",
      period: "Jul 2022 – Feb 2023",
      duration: "8 meses",
      desc: "Gestión y mantenimiento de infraestructura de sistemas, monitorización de servidores y soporte a usuarios internos.",
      tags: ["Linux", "Servidores", "Monitorización"],
    },
    {
      role: "Técnico Informático",
      company: "MetaEnlace Sistemas de Información",
      period: "Mar 2022 - Jun 2022",
      duration: "4 meses",
      desc: "Prácticas de fin de grado: soporte técnico, configuración de equipos y redes, resolución de incidencias.",
      tags: ["Redes", "Soporte", "Configuración"],
    },
  ],
  education: [
    { title: "Grado Superior ASIR", sub: "Administración de Sistemas Informáticos en Red", year: "2022", done: true },
    { title: "Curso Superior de Ciberseguridad", sub: "Universidad de Deusto", year: "2024", done: true },
    { title: "Certificación CJCA / CPTS", sub: "HackTheBox Academy", year: "En curso", done: false },
  ],
  skills: {
    "Sistemas & Redes": ["Linux", "Windows Server", "Active Directory", "TCP/IP", "Virtualización"],
    Ciberseguridad: ["Pentesting", "OSINT", "CTF", "Análisis de vulnerabilidades", "HackTheBox"],
    Soporte: ["Ticketing", "Soporte L1/L2", "Diagnóstico", "Atención al usuario"],
  },
  languages: [
    { lang: "Español", level: "Nativo", pct: 100 },
    { lang: "Valenciano", level: "Nativo", pct: 100 },
    { lang: "Inglés", level: "Intermedio-Alto B2", pct: 72 },
  ],
  softSkills: ["Aprendizaje autónomo", "Resolución de problemas", "Comunicación directa", "Trabajo en equipo", "Organización", "Adaptabilidad"],
};

const NAV = ["Inicio", "Experiencia", "Formación", "Habilidades", "Contacto"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const sectionId = (n) => n.toLowerCase().replace("ó", "o").replace("é", "e").replace("á", "a");

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; background: #0a0e1a; }
        body { overflow-x: hidden; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        button:hover { opacity: 0.85; }

        .nav-links { display: flex; gap: 2rem; }
        .nav-hamburger { display: none; background: none; border: none; color: #e8eaf0; font-size: 22px; cursor: pointer; position: absolute; right: 1.5rem; }
        .mobile-menu { display: none; position: fixed; top: 60px; left: 0; right: 0; z-index: 99; background: rgba(10,14,26,0.98); border-bottom: 1px solid rgba(255,255,255,0.07); flex-direction: column; align-items: center; padding: 1.5rem 0; gap: 1.2rem; }
        .mobile-menu.open { display: flex; }

        @media (max-width: 640px) {
          .nav-links { display: none; }
          .nav-hamburger { display: block; }
        }
      `}</style>

      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#0a0e1a",
        color: "#e8eaf0",
        minHeight: "100vh",
        width: "100%",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

        {/* NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(10,14,26,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
          transition: "all 0.4s ease",
          padding: "0 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "center", height: "60px",
        }}>
          <div className="nav-links">
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(sectionId(n))} style={{
                background: "none", border: "none", color: active === n ? "#4ade80" : "rgba(232,234,240,0.6)",
                fontFamily: "'DM Sans', sans-serif", fontSize: "14px", cursor: "pointer",
                letterSpacing: "0.03em", transition: "color 0.2s",
                padding: "4px 0", borderBottom: active === n ? "1px solid #4ade80" : "1px solid transparent",
              }}>{n}</button>
            ))}
          </div>
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {NAV.map(n => (
            <button key={n} onClick={() => scrollTo(sectionId(n))} style={{
              background: "none", border: "none", color: "rgba(232,234,240,0.8)",
              fontFamily: "'DM Sans', sans-serif", fontSize: "16px", cursor: "pointer",
            }}>{n}</button>
          ))}
        </div>

        {/* HERO */}
        <section id="inicio" style={{
          minHeight: "100vh", display: "flex", alignItems: "center",
          position: "relative", padding: "80px 1.5rem 2rem", width: "100%",
        }}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: "linear-gradient(rgba(96,165,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
          <div style={{ position: "absolute", top: "20%", left: "5%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "30%", right: "5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0, pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "900px", margin: "0 auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: "20px", padding: "6px 14px", marginBottom: "2rem",
              fontSize: "12px", color: "#4ade80", fontFamily: "'Space Mono', monospace",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
              Disponible para nuevas oportunidades
            </div>

            <h1 style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", fontWeight: "300", lineHeight: 1.05, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
              Eduardo<br />
              <span style={{ color: "#60a5fa" }}>Robles</span>{" "}
              <span style={{ color: "rgba(232,234,240,0.35)", fontWeight: "300" }}>Escoda</span>
            </h1>

            <p style={{ fontSize: "clamp(15px, 2.5vw, 20px)", color: "rgba(232,234,240,0.6)", marginBottom: "0.5rem", fontWeight: "300" }}>
              Técnico en Sistemas & Ciberseguridad
            </p>
            <p style={{ fontSize: "13px", color: "rgba(232,234,240,0.35)", marginBottom: "2rem", fontFamily: "'Space Mono', monospace" }}>
              Alicante, España · HackTheBox Academy
            </p>

            <p style={{ fontSize: "clamp(14px, 1.8vw, 17px)", color: "rgba(232,234,240,0.65)", lineHeight: 1.8, maxWidth: "600px", marginBottom: "2.5rem", fontWeight: "300" }}>
              {data.about}
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("contacto")} style={{
                background: "#4ade80", color: "#0a0e1a", border: "none", borderRadius: "8px",
                padding: "13px 26px", fontSize: "15px", fontWeight: "500", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
              }}>Contactar</button>
              <button onClick={() => scrollTo("experiencia")} style={{
                background: "transparent", color: "#e8eaf0", border: "1px solid rgba(232,234,240,0.2)", borderRadius: "8px",
                padding: "13px 26px", fontSize: "15px", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
              }}>Ver experiencia</button>
            </div>
          </div>
        </section>

        {/* EXPERIENCIA */}
        <section id="experiencia" style={{ padding: "5rem 1.5rem", width: "100%" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#4ade80" }}>01</span>
                <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "300", letterSpacing: "-0.02em" }}>Experiencia</h2>
                <div style={{ flex: 1, height: "1px", background: "rgba(232,234,240,0.08)" }} />
              </div>
            </Reveal>
            <div style={{ position: "relative", paddingLeft: "1.5rem" }}>
              <div style={{ position: "absolute", left: "0", top: "8px", bottom: "8px", width: "1px", background: "linear-gradient(to bottom, #4ade80, #60a5fa, transparent)" }} />
              {data.experience.map((e, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div style={{
                    position: "relative", marginBottom: "1.5rem",
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px", padding: "1.25rem", transition: "border-color 0.3s, background 0.3s",
                  }}
                    onMouseEnter={e2 => { e2.currentTarget.style.borderColor = "rgba(74,222,128,0.2)"; e2.currentTarget.style.background = "rgba(74,222,128,0.02)"; }}
                    onMouseLeave={e2 => { e2.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e2.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                  >
                    <div style={{ position: "absolute", left: "-2rem", top: "1.25rem", width: "10px", height: "10px", borderRadius: "50%", background: "#4ade80", border: "2px solid #0a0e1a" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: "500", color: "#e8eaf0", marginBottom: "2px" }}>{e.role}</div>
                        <div style={{ fontSize: "13px", color: "#4ade80" }}>{e.company}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "11px", color: "rgba(232,234,240,0.4)", fontFamily: "'Space Mono', monospace" }}>{e.period}</div>
                        <div style={{ fontSize: "11px", color: "rgba(232,234,240,0.3)", marginTop: "2px" }}>{e.duration}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: "13px", color: "rgba(232,234,240,0.6)", lineHeight: 1.65, marginBottom: "10px", fontWeight: "300" }}>{e.desc}</p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {e.tags.map(t => (
                        <span key={t} style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "4px", background: "rgba(96,165,250,0.1)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.2)", fontFamily: "'Space Mono', monospace" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FORMACIÓN */}
        <section id="formacion" style={{ padding: "4rem 1.5rem 5rem", width: "100%" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#4ade80" }}>02</span>
                <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "300", letterSpacing: "-0.02em" }}>Formación</h2>
                <div style={{ flex: 1, height: "1px", background: "rgba(232,234,240,0.08)" }} />
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {data.education.map((ed, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{
                    background: "rgba(255,255,255,0.02)", border: `1px solid ${ed.done ? "rgba(255,255,255,0.06)" : "rgba(74,222,128,0.25)"}`,
                    borderRadius: "12px", padding: "1.25rem", position: "relative", overflow: "hidden",
                  }}>
                    {!ed.done && (
                      <div style={{ position: "absolute", top: "12px", right: "12px", fontSize: "10px", background: "rgba(74,222,128,0.15)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)", borderRadius: "4px", padding: "2px 8px", fontFamily: "'Space Mono', monospace" }}>
                        En curso
                      </div>
                    )}
                    <div style={{ fontSize: "22px", marginBottom: "10px" }}>{ed.done ? "🎓" : "⚡"}</div>
                    <div style={{ fontSize: "14px", fontWeight: "500", color: "#e8eaf0", marginBottom: "6px" }}>{ed.title}</div>
                    <div style={{ fontSize: "12px", color: "rgba(232,234,240,0.5)", marginBottom: "10px", fontWeight: "300" }}>{ed.sub}</div>
                    <div style={{ fontSize: "12px", color: ed.done ? "#60a5fa" : "#4ade80", fontFamily: "'Space Mono', monospace" }}>{ed.year}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* HABILIDADES */}
        <section id="habilidades" style={{ padding: "4rem 1.5rem 5rem", width: "100%" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#4ade80" }}>03</span>
                <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "300", letterSpacing: "-0.02em" }}>Habilidades</h2>
                <div style={{ flex: 1, height: "1px", background: "rgba(232,234,240,0.08)" }} />
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
              {Object.entries(data.skills).map(([cat, skills], i) => {
                const colors = [
                  { bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.2)", text: "#60a5fa", head: "rgba(96,165,250,0.15)" },
                  { bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.2)", text: "#4ade80", head: "rgba(74,222,128,0.15)" },
                  { bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.2)", text: "#a78bfa", head: "rgba(167,139,250,0.15)" },
                ];
                const c = colors[i % colors.length];
                return (
                  <Reveal key={cat} delay={i * 0.1}>
                    <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${c.border}`, borderRadius: "12px", overflow: "hidden" }}>
                      <div style={{ background: c.head, padding: "12px 16px", borderBottom: `1px solid ${c.border}` }}>
                        <span style={{ fontSize: "13px", fontWeight: "500", color: c.text }}>{cat}</span>
                      </div>
                      <div style={{ padding: "14px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {skills.map(s => (
                          <span key={s} style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "6px", background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1rem" }}>
                <div style={{ fontSize: "12px", fontWeight: "500", color: "rgba(232,234,240,0.5)", marginBottom: "1.2rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Idiomas</div>
                {data.languages.map((l, i) => (
                  <div key={i} style={{ marginBottom: i < data.languages.length - 1 ? "1rem" : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "14px", color: "#e8eaf0" }}>{l.lang}</span>
                      <span style={{ fontSize: "11px", color: "rgba(232,234,240,0.4)", fontFamily: "'Space Mono', monospace" }}>{l.level}</span>
                    </div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                      <div style={{ height: "3px", width: `${l.pct}%`, background: "linear-gradient(90deg, #4ade80, #60a5fa)", borderRadius: "2px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ fontSize: "12px", fontWeight: "500", color: "rgba(232,234,240,0.5)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Competencias personales</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {data.softSkills.map(s => (
                    <span key={s} style={{ fontSize: "13px", padding: "6px 14px", borderRadius: "20px", background: "rgba(255,255,255,0.04)", color: "rgba(232,234,240,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}>{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" style={{ padding: "4rem 1.5rem 7rem", width: "100%" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#4ade80" }}>04</span>
                <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "300", letterSpacing: "-0.02em" }}>Contacto</h2>
                <div style={{ flex: 1, height: "1px", background: "rgba(232,234,240,0.08)" }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "15px", color: "rgba(232,234,240,0.5)", marginBottom: "2.5rem", fontWeight: "300", lineHeight: 1.7 }}>
                Estoy abierto a nuevas oportunidades en ciberseguridad, soporte técnico avanzado o roles de sistemas. No dudes en escribirme.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
                <button onClick={copyEmail} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: copiedEmail ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${copiedEmail ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "10px", padding: "14px 28px", color: copiedEmail ? "#4ade80" : "#e8eaf0",
                  cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "13px",
                  transition: "all 0.3s", width: "100%", maxWidth: "380px", justifyContent: "center",
                }}>
                  {copiedEmail ? "✓ ¡Copiado!" : data.email}
                </button>
                <a href={`tel:${data.phone}`} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px", padding: "14px 28px", color: "#e8eaf0",
                  textDecoration: "none", fontFamily: "'Space Mono', monospace", fontSize: "13px",
                  width: "100%", maxWidth: "380px", justifyContent: "center",
                }}>
                  {data.phone}
                </a>
                <a href={data.linkedin} target="_blank" rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)",
                  borderRadius: "10px", padding: "14px 28px", color: "#60a5fa",
                  textDecoration: "none", fontSize: "13px",
                  width: "100%", maxWidth: "380px", justifyContent: "center", fontWeight: "500",
                }}>
                  LinkedIn →
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem", textAlign: "center" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "rgba(232,234,240,0.2)" }}>
            © 2026 Eduardo Robles Escoda · Alicante, España
          </span>
        </footer>
      </div>
    </>
  );
}