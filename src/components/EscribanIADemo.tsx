"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"

const AMBER = "#f59e0b"
const AMBER_DIM = "#92400e"
const BG = "#0a0a0a"
const CARD = "#181818"
const BORDER = "#2a2a2a"
const TEXT = "#f5f5f5"
const MUTED = "#666"
const H = 440

interface Tramite {
  ini: string
  name: string
  type: string
  date: string
  status: string
}

const tramites: Tramite[] = [
  { ini: "R", name: "RODRIGUEZ, LAURA B.", type: "CERT. REPRESENTACION", date: "30/03/2026", status: "Listo" },
  { ini: "G", name: "GOMEZ, MARTIN A.", type: "CERT. REPRESENTACION", date: "30/03/2026", status: "Listo" },
  { ini: "—", name: "En espera…", type: "CERT. REPRESENTACION", date: "30/03/2026", status: "Pendiente" },
  { ini: "F", name: "FERNANDEZ, CLAUDIA M.", type: "CERT. REPRESENTACION", date: "30/03/2026", status: "Listo" },
]

interface ChatMessage {
  role: "bot" | "user"
  text: string
  delay?: number
}

const chatScript: ChatMessage[] = [
  { role: "bot", text: "¡Hola! Soy el asistente de la escribanía. Ya procesé tu DNI correctamente." },
  { role: "bot", text: "Te identifiqué como CARLOS MENDEZ, DNI 28.741.302, domiciliado en Av. Corrientes 1580, CABA.", delay: 1400 },
  { role: "bot", text: "Para la Certificación de Firma no necesito datos adicionales. ¿Confirmás que estos datos son correctos?", delay: 2400 },
  { role: "user", text: "Sí, son correctos.", delay: 1200 },
  { role: "bot", text: "✅ ¡Todo listo, Carlos! El escribano te contactará pronto para coordinar la firma.", delay: 1000 },
]

function StatusBadge({ s }: { s: string }) {
  const ok = s === "Listo"
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: "2px 8px",
      borderRadius: 20, letterSpacing: .3,
      background: ok ? "#052e16" : "#422006",
      color: ok ? "#4ade80" : "#fb923c",
      border: `1px solid ${ok ? "#166534" : "#9a3412"}`
    }}>{s}</span>
  )
}

function Avatar({ ini }: { ini: string }) {
  return (
    <div style={{
      width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
      background: ini === "—" ? "#222" : "#1c1917",
      border: `1px solid ${BORDER}`, display: "flex",
      alignItems: "center", justifyContent: "center",
      fontSize: 10, fontWeight: 700, color: AMBER
    }}>{ini}</div>
  )
}

function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 6,
      background: AMBER, display: "flex",
      alignItems: "center", justifyContent: "center",
      fontSize: size * 0.55, flexShrink: 0
    }}>⚖️</div>
  )
}

export default function EscribanIADemo() {
  const [screen, setScreen] = useState<"dashboard" | "client" | "chat">("dashboard")
  const [dropOpen, setDropOpen] = useState(false)
  const [frente, setFrente] = useState(false)
  const [dorso, setDorso] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const chatContainer = useRef<HTMLDivElement>(null)
  const mounted = useRef(true)
  const hasStartedRef = useRef(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 760)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTo({
        top: chatContainer.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [messages, typing])

  const safe = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(() => { if (mounted.current) fn() }, ms)
    timers.current.push(t)
    return t
  }, [])

  const runChat = useCallback(() => {
    let cursor = 0
    const next = () => {
      const msg = chatScript[cursor]
      if (!msg) {
        safe(() => setDone(true), 400)
        return
      }
      cursor++
      const extra = msg.delay ? msg.delay * 0.6 : 0 // Speed up delays
      if (msg.role === "bot") {
        safe(() => {
          setTyping(true)
          const typingTime = Math.min((msg.text.length) * 10 + 200, 1200) // Faster typing
          safe(() => {
            setTyping(false)
            setMessages(prev => [...prev, msg])
            safe(next, 300)
          }, typingTime)
        }, extra)
      } else {
        safe(() => {
          setMessages(prev => [...prev, msg])
          safe(next, 400)
        }, extra)
      }
    }
    next()
  }, [safe])

  const runProgress = useCallback(() => {
    setProcessing(true)
    setProgress(0)
    let p = 0
    const tick = () => {
      if (!mounted.current) return
      p += 5 // Faster progress
      setProgress(Math.min(p, 100))
      if (p < 100) {
        const t = setTimeout(tick, 15) // Faster interval
        timers.current.push(t)
      } else {
        safe(() => {
          setProcessing(false)
          setScreen("chat")
          safe(runChat, 200)
        }, 300)
      }
    }
    const t = setTimeout(tick, 15)
    timers.current.push(t)
  }, [safe, runChat])

  const runSequence = useCallback((mobile?: boolean) => {
    hasStartedRef.current = true
    setDropOpen(false)
    setFrente(false)
    setDorso(false)
    setProcessing(false)
    setProgress(0)
    setMessages([])
    setTyping(false)
    setDone(false)

    if (mobile) {
      // Mobile: ir directo al chat
      setScreen("chat")
      safe(runChat, 600)
    } else {
      // Desktop: secuencia completa
      setScreen("dashboard")
      safe(() => setDropOpen(true), 1200)
      safe(() => {
        setDropOpen(false)
        setScreen("client")
      }, 2200)
      safe(() => setFrente(true), 3200)
      safe(() => setDorso(true), 4000)
      safe(runProgress, 4800)
    }
  }, [safe, runProgress, runChat])

  useEffect(() => {
    mounted.current = true
    const mobile = window.innerWidth <= 760

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStartedRef.current) {
          runSequence(mobile)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      mounted.current = false
      timers.current.forEach(clearTimeout)
      observer.disconnect()
    }
  }, [runSequence])

  return (
    <div ref={containerRef} style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: BG, color: TEXT,
      position: "absolute", inset: 0,
      overflow: "hidden",
      display: "flex", flexDirection: "column"
    }}>

      {/* ─── PANTALLA DASHBOARD ─── */}
      {screen === "dashboard" && (
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

          {/* Sidebar */}
          <div style={{
            width: 110, background: "#0d0d0d", borderRight: `1px solid ${BORDER}`,
            padding: "12px 8px", display: "flex", flexDirection: "column", gap: 18, flexShrink: 0,
            overflow: "hidden"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 4px" }}>
              <LogoMark size={18} />
              <div style={{ fontWeight: 700, fontSize: 10 }}>escribanIA</div>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ fontSize: 7, color: MUTED, letterSpacing: 1, padding: "0 4px", marginBottom: 3 }}>PRINCIPAL</div>
              <div style={{
                display: "flex", alignItems: "center", gap: 6, padding: "6px 8px",
                borderRadius: 7, background: "#1c1200", color: AMBER,
                border: `1px solid ${AMBER_DIM}`, fontSize: 10, fontWeight: 700
              }}>
                <span>▦</span> Dash
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", color: "#555", fontSize: 10 }}>
                <span>👥</span> Clien
              </div>
              <div style={{ fontSize: 7, color: MUTED, letterSpacing: 1, padding: "10px 4px 3px" }}>CONFIG</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", color: "#555", fontSize: 10 }}>
                <span>⚙</span> Ajuste
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", color: "#555", fontSize: 10 }}>
                <span>🛡</span> Segur
              </div>
            </nav>

            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 7, padding: "7px 10px", color: "#555", fontSize: 11 }}>
              <span>→</span> Salir
            </div>
          </div>

          {/* Main */}
          <div style={{ flex: 1, minWidth: 0, padding: "14px 14px 10px", overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 15, fontWeight: 700, fontStyle: "italic", margin: 0, fontFamily: "Georgia, serif" }}>
                Buenas noches, Administrador
              </h1>
              <p style={{ margin: "3px 0 0", color: MUTED, fontSize: 10 }}>Marzo de 2026</p>
            </div>

            {/* Accesos rápidos */}
            <div>
              <p style={{ fontSize: 9, color: MUTED, letterSpacing: 1, marginBottom: 8 }}>Generar acceso rápido</p>
              <div style={{ display: "flex", gap: 6, position: "relative", overflow: "hidden" }}>
                {[
                  { icon: "✈️", title: "Autorización de Viaje", sub: "Menores al exterior" },
                  { icon: "📋", title: "Poder Notarial", sub: "Especial o General" },
                  { icon: "🏠", title: "Contrato Alquiler", sub: "Vivienda o Comercial" },
                ].map((c, i) => (
                  <div key={i} style={{
                    flex: 1, minWidth: 0, padding: "10px 8px", borderRadius: 10,
                    background: CARD, border: `1px solid ${BORDER}`,
                  }}>
                    <div style={{ fontSize: 16, marginBottom: 6 }}>{c.icon}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 2 }}>{c.title}</div>
                    <div style={{ fontSize: 9, color: MUTED, marginBottom: 8 }}>{c.sub}</div>
                    <div style={{ fontSize: 9, color: AMBER, fontWeight: 700, letterSpacing: .5 }}>
                      📄 GENERAR
                    </div>
                  </div>
                ))}

                {/* CERTIFICACIÓN FIRMA — con dropdown */}
                <div style={{ flex: 1, position: "relative" }}>
                  <div style={{
                    padding: "12px 10px", borderRadius: 10,
                    background: CARD, border: `1.5px solid ${dropOpen ? AMBER : BORDER}`,
                    transition: "border .2s"
                  }}>
                    <div style={{ fontSize: 16, marginBottom: 6 }}>✍️</div>
                    <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 2 }}>Certif. Firma</div>
                    <div style={{ fontSize: 9, color: MUTED, marginBottom: 8 }}>Varios firmantes</div>
                    <div style={{ fontSize: 9, color: AMBER, fontWeight: 700, letterSpacing: .5 }}>
                      ∨ OPCIONES
                    </div>
                  </div>

                  {dropOpen && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 10,
                      background: "#141414", border: `1px solid ${BORDER}`,
                      borderRadius: 8, overflow: "hidden",
                      boxShadow: "0 8px 32px rgba(0,0,0,.6)"
                    }}>
                      <div style={{
                        padding: "10px 12px", borderBottom: `1px solid ${BORDER}`,
                        display: "flex", alignItems: "center", gap: 8, fontSize: 11,
                        background: "#1c1200"
                      }}>
                        <span style={{ fontSize: 13 }}>👤</span>
                        <div>
                          <div style={{ fontWeight: 700 }}>Persona Humana</div>
                          <div style={{ fontSize: 9, color: MUTED }}>Solo escanea el DNI</div>
                        </div>
                      </div>
                      <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
                        <span style={{ fontSize: 13 }}>🏛</span>
                        <div>
                          <div style={{ fontWeight: 700 }}>Representación Legal</div>
                          <div style={{ fontSize: 9, color: MUTED }}>Auditoría de Estatuto/Poder</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabla */}
            <div style={{ background: CARD, borderRadius: 10, border: `1px solid ${BORDER}`, overflow: "hidden", flex: 1 }}>
              <div style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                <span style={{ fontSize: 11, fontWeight: 700 }}>Trámites Recientes</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                    {["CLIENTE", "FECHA", "ESTADO", "DOC.", ""].map(h => (
                      <th key={h} style={{ padding: "8px 16px", textAlign: "left", color: MUTED, fontWeight: 600, letterSpacing: .5, fontSize: 9 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tramites.map((t, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <td style={{ padding: "10px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Avatar ini={t.ini} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 10 }}>{t.name}</div>
                            <div style={{ fontSize: 9, color: MUTED }}>{t.type}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "10px 16px", color: MUTED, fontSize: 10 }}>{t.date}</td>
                      <td style={{ padding: "10px 16px" }}><StatusBadge s={t.status} /></td>
                      <td style={{ padding: "10px 16px" }}>
                        <button style={{
                          background: t.status === "Listo" ? AMBER : "#1a1a1a",
                          color: t.status === "Listo" ? "#000" : MUTED,
                          border: "none", borderRadius: 6, padding: "4px 10px",
                          fontSize: 10, fontWeight: 700, cursor: "default",
                        }}>↓ Descargar</button>
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <div style={{ display: "flex", gap: 8, color: MUTED }}>
                          <span>⧉</span>
                          <span>🗑</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── PANTALLA CLIENTE — IDENTIFICACIÓN ─── */}
      {screen === "client" && (
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          justifyContent: "center", background: "#050505", padding: 15
        }}>
          <div style={{
            width: "100%", maxWidth: 340, background: CARD, border: `1px solid ${BORDER}`,
            borderRadius: 16, padding: "20px 18px", display: "flex",
            flexDirection: "column", alignItems: "center", gap: 14
          }}>
            <LogoMark size={40} />
            <div style={{ textAlign: "center" }}>
              <h2 style={{ margin: 0, fontSize: 17, fontFamily: "Georgia, serif", fontWeight: 700 }}>Identificación</h2>
              <p style={{ margin: "6px 0 0", color: MUTED, fontSize: 11 }}>
                Subí tu DNI para que la IA extraiga tus datos automáticamente.
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, width: "100%" }}>
              {/* Frente */}
              <div style={{
                flex: 1, padding: "20px 12px", borderRadius: 12,
                border: frente ? `1.5px solid ${AMBER}` : `1.5px dashed #333`,
                background: frente ? "#1c1200" : "#111",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                transition: "all .25s"
              }}>
                <div style={{ fontSize: 22 }}>{frente ? "✅" : "📷"}</div>
                <span style={{ fontSize: 10, color: frente ? AMBER : MUTED, fontWeight: 700, letterSpacing: 1 }}>FRENTE DNI</span>
                <span style={{ fontSize: 9, color: frente ? "#a16207" : "#444" }}>{frente ? "Cargado" : "Esperando…"}</span>
              </div>
              {/* Dorso */}
              <div style={{
                flex: 1, padding: "20px 12px", borderRadius: 12,
                border: dorso ? `1.5px solid ${AMBER}` : `1.5px dashed #333`,
                background: dorso ? "#1c1200" : "#111",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                transition: "all .25s"
              }}>
                <div style={{ fontSize: 22 }}>{dorso ? "✅" : "📷"}</div>
                <span style={{ fontSize: 10, color: dorso ? AMBER : MUTED, fontWeight: 700, letterSpacing: 1 }}>DORSO DNI</span>
                <span style={{ fontSize: 9, color: dorso ? "#a16207" : "#444" }}>{dorso ? "Cargado" : "Esperando…"}</span>
              </div>
            </div>

            {processing && (
              <div style={{ width: "100%" }}>
                <div style={{ height: 3, background: "#222", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", background: AMBER, borderRadius: 4,
                    width: `${progress}%`, transition: "width .05s linear"
                  }} />
                </div>
                <p style={{ textAlign: "center", fontSize: 10, color: MUTED, margin: "6px 0 0" }}>
                  Procesando con IA… {progress}%
                </p>
              </div>
            )}

            <div style={{
              width: "100%", padding: "11px 0", borderRadius: 8, textAlign: "center",
              background: frente && dorso ? AMBER : "#1a1a1a",
              color: frente && dorso ? "#000" : MUTED,
              fontWeight: 700, fontSize: 12,
              transition: "all .2s"
            }}>
              {processing ? "Procesando…" : frente && dorso ? "Comenzar trámite" : "Cargando documentos…"}
            </div>
          </div>
        </div>
      )}

      {/* ─── PANTALLA CHAT ─── */}
      {screen === "chat" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#050505", minHeight: 0 }}>

          {/* Header */}
          <div style={{
            padding: "10px 16px", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: CARD
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, background: AMBER,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14
              }}>🏛</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 11 }}>Asistente escribanIA</div>
                <div style={{ fontSize: 9, color: MUTED }}>Trámite en curso</div>
              </div>
            </div>
            <div style={{ fontSize: 10, color: "#4ade80", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              🛡 Encriptado
            </div>
          </div>

          {/* Mensajes */}
          <div ref={chatContainer} style={{ flex: 1, overflowY: "auto", padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "78%", padding: "9px 13px", borderRadius: 12, fontSize: 11, lineHeight: 1.5,
                  background: m.role === "user" ? AMBER : "#1a1a1a",
                  color: m.role === "user" ? "#000" : TEXT,
                  border: m.role === "bot" ? `1px solid ${BORDER}` : "none",
                  borderBottomLeftRadius: m.role === "bot" ? 4 : 12,
                  borderBottomRightRadius: m.role === "user" ? 4 : 12,
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 12px" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: "50%", background: MUTED,
                    animation: `bounce 1s ease-in-out ${i * 0.18}s infinite`
                  }} />
                ))}
              </div>
            )}

            {done && (
              <div style={{
                background: "#0a1f0a", border: "1px solid #166534",
                borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 16 }}>✅</span>
                    <span style={{ fontWeight: 700, color: "#4ade80", fontSize: 12 }}>¡Trámite Completado!</span>
                  </div>
                  <p style={{ margin: "5px 0 0", fontSize: 10, color: "#86efac", lineHeight: 1.5 }}>
                    El documento fue generado y enviado a la escribanía.<br />
                    Te contactarán pronto. Recordá traer tu <strong>DNI original</strong>.
                  </p>
                </div>

                <button 
                  onClick={() => {
                    timers.current.forEach(clearTimeout)
                    timers.current = []
                    runSequence(isMobile)
                  }}
                  style={{
                    alignSelf: "flex-start",
                    background: "#166534",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontSize: 10,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "opacity 0.2s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = "0.8"}
                  onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
                >
                  <span>↺</span> REPRODUCIR NUEVAMENTE
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ padding: "10px 16px", borderTop: `1px solid ${BORDER}`, background: CARD }}>
            <span style={{ fontSize: 10, color: "#444" }}>Trámite gestionado automáticamente por IA</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: .4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
