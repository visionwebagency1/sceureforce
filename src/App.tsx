import React, { useEffect, useRef, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import {
  motion, useScroll, useTransform, useInView,
  AnimatePresence, useMotionValue, useSpring
} from 'framer-motion'
import {
  Phone, Mail, MessageCircle, MapPin, ChevronRight, ChevronDown,
  ArrowUp, Menu, X, Shield, Eye, Award, Zap, Users, Star,
  CheckCircle2, ArrowRight
} from 'lucide-react'

const IMG = {
  hero:     '/img/hero.jpg',
  event:    '/img/event.jpg',
  object:   '/img/object.jpg',
  receptie: '/img/receptie.jpg',
  team:     '/img/team.jpg',
}

const DIENSTEN = [
  {
    slug: 'objectbeveiliging',
    icon: <Shield size={18} color="var(--gold)" />,
    iconLg: <Shield size={26} color="var(--gold)" />,
    num: '01', title: 'Objectbeveiliging',
    short: 'Permanente bewaking van uw pand, dag en nacht.',
    img: IMG.object, imgPos: 'center center',
    hero: 'Uw pand altijd in veilige handen.',
    intro: 'SecureForce biedt professionele objectbeveiliging voor bedrijfspanden, kantoren, industrieterreinen en datacenters. Onze VBV-gecertificeerde beveiligers zijn dag en nacht aanwezig om uw eigendommen en medewerkers te beschermen.',
    punten: ['24/7 aanwezigheid op locatie','VBV-gecertificeerde beveiligers','Koppeling met eigen meldkamer','Toegangscontrole en bezoekersregistratie','Periodieke surveillance-rondes','Direct alarm- en incidentrespons'],
    sectoren: ['Kantoren & bedrijfspanden','Industrieterreinen','Datacenters','Distributiecentra','Bouwlocaties'],
    cta: 'Vraag offerte objectbeveiliging aan',
  },
  {
    slug: 'evenementenbeveiliging',
    icon: <Zap size={18} color="var(--gold)" />,
    iconLg: <Zap size={26} color="var(--gold)" />,
    num: '02', title: 'Evenementenbeveiliging',
    short: 'Schaalbare teams voor elk evenement, elke omvang.',
    img: IMG.event, imgPos: 'center 35%',
    hero: 'Veiligheid op elk evenement, elke schaal.',
    intro: 'Van intieme bedrijfsborrel tot festival met tienduizenden bezoekers — SecureForce levert schaalbare beveiligingsteams die uw evenement van begin tot eind beveiligen. Wij coördineren crowdcontrol, toegangsmanagement en crisisrespons.',
    punten: ['Van 50 tot 50.000 bezoekers','Crowdcontrol en barrièrebeheer','Toegangscontrole en ticketscanning','Coördinatie met hulpdiensten','Gecertificeerde crisismanagers','Pre-event security scan en risicoanalyse'],
    sectoren: ['Muziekfestivals','Congressen & beurzen','Sportevenementen','Corporate events','Overheidsbijeenkomsten'],
    cta: 'Plan evenementenbeveiliging',
  },
  {
    slug: 'receptie-hosting',
    icon: <Users size={18} color="var(--gold)" />,
    iconLg: <Users size={26} color="var(--gold)" />,
    num: '03', title: 'Receptie & Hosting',
    short: 'Representatieve beveiliging bij de voordeur.',
    img: IMG.receptie, imgPos: 'center center',
    hero: 'De perfecte eerste indruk — veilig en professioneel.',
    intro: 'Onze receptie- en hostingmedewerkers combineren de warmte van gastvrijheid met de waakzaamheid van professionele beveiliging. Zij zijn het visitekaartje van uw organisatie en zorgen tegelijkertijd voor een veilige toegangscontrole.',
    punten: ['Professioneel en representatief optreden','Toegangscontrole en ID-verificatie','Bezoekersregistratie en -begeleiding','VIP-ontvangst en escortering','Meertalige medewerkers beschikbaar','Koppeling met back-office beveiliging'],
    sectoren: ['Hoofdkantoren','Hotels & congrescentra','Ziekenhuizen','Overheidsgebouwen','Luxe retail'],
    cta: 'Vraag offerte receptie aan',
  },
  {
    slug: 'camera-alarm',
    icon: <Eye size={18} color="var(--gold)" />,
    iconLg: <Eye size={26} color="var(--gold)" />,
    num: '04', title: 'Camera & Alarmopvolging',
    short: 'Eigen meldkamer, 24/7 bewaking op afstand.',
    img: IMG.object, imgPos: 'center 60%',
    hero: 'Altijd een oog op uw locatie — ook op afstand.',
    intro: 'Via onze eigen beveiligde 24/7 meldkamer bewaken wij uw locatie op afstand. Bij een alarm wordt direct actie ondernomen: interventie ter plaatse, politie-inschakeling of melding aan uw contactpersoon — afhankelijk van het protocol.',
    punten: ['Eigen VBV-gecertificeerde meldkamer','HD-camerabewaking en -opslag','Directe alarmopvolging en interventie','Toegangscontrole op afstand','Geautomatiseerde alarmsystemen','Maandelijkse rapportage en analyses'],
    sectoren: ['Kantoren & bedrijven','Magazijnen & logistiek','Retail & winkelcentra','Wooncomplexen','Parkeergarages'],
    cta: 'Vraag offerte camera-bewaking aan',
  },
]

// ─── HELPERS ───
const ScrollTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const FU = ({ children, delay = 0, style = {}, className = '' }: any) => {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} style={style} className={className}
      initial={{ opacity: 0, y: 28 }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}
const FL = ({ children, delay = 0, style = {} }: any) => {
  const ref = useRef(null); const v = useInView(ref, { once: true, margin: '-50px' })
  return <motion.div ref={ref} style={style} initial={{ opacity: 0, x: -32 }} animate={v ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}
const FR = ({ children, delay = 0, style = {} }: any) => {
  const ref = useRef(null); const v = useInView(ref, { once: true, margin: '-50px' })
  return <motion.div ref={ref} style={style} initial={{ opacity: 0, x: 32 }} animate={v ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}
const CU = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const ref = useRef(null); const v = useInView(ref, { once: true }); const [n, setN] = useState(0)
  useEffect(() => {
    if (!v) return; let s = 0; const step = end / 55
    const t = setInterval(() => { s += step; if (s >= end) { setN(end); clearInterval(t) } else setN(Math.floor(s)) }, 18)
    return () => clearInterval(t)
  }, [v, end])
  return <span ref={ref}>{n}{suffix}</span>
}

// ─── WHATSAPP ───
const WA = () => {
  const [open, setOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const [btns, setBtns] = useState(false)
  const msg = 'Goedemiddag! Ik ben Mark van SecureForce. Hoe kan ik u helpen?'
  useEffect(() => {
    if (!open) { setTyped(''); setBtns(false); return }
    let i = 0
    const t = setInterval(() => { i++; setTyped(msg.slice(0, i)); if (i >= msg.length) { clearInterval(t); setTimeout(() => setBtns(true), 350) } }, 24)
    return () => clearInterval(t)
  }, [open])
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, scale: 0.88, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.88, y: 18 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            style={{ position: 'fixed', bottom: 88, right: 20, zIndex: 499, width: 292, background: 'var(--bg2)', border: '1px solid rgba(240,165,0,0.2)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
            <div style={{ background: 'rgba(240,165,0,0.07)', borderBottom: '1px solid rgba(240,165,0,0.14)', padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Shield size={18} color="#000" fill="#000" /></div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>SecureForce</div>
                <div style={{ fontSize: 11, color: '#25d366', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#25d366' }} />24/7 beschikbaar
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--gray2)', cursor: 'pointer', fontSize: 20 }}>x</button>
            </div>
            <div style={{ background: '#080a0f', padding: '16px 13px', minHeight: 85 }}>
              <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '3px 12px 12px 12px', padding: '10px 12px', maxWidth: '88%' }}>
                <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.55, minHeight: 18 }}>
                  {typed}{typed.length < msg.length && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }} style={{ color: 'var(--gold)', fontWeight: 700 }}>|</motion.span>}
                </div>
                <div style={{ fontSize: 10, color: 'var(--gray2)', marginTop: 4, textAlign: 'right' }}>Nu</div>
              </div>
            </div>
            <AnimatePresence>
              {btns && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ padding: '12px 13px 15px', display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
                  <motion.a href="https://wa.me/31612345678" target="_blank" rel="noopener" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    style={{ background: '#25d366', color: '#fff', padding: '11px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, textAlign: 'center', display: 'block' }}>
                    Stuur direct bericht
                  </motion.a>
                  <Link to="/contact" onClick={() => setOpen(false)}
                    style={{ background: 'var(--gold)', color: '#000', padding: '11px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, textAlign: 'center', display: 'block' }}>
                    Contactformulier
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button onClick={() => setOpen(o => !o)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
        animate={!open ? { boxShadow: ['0 0 0 0 rgba(37,211,102,0.5)', '0 0 0 12px rgba(37,211,102,0)', '0 0 0 0 rgba(37,211,102,0)'] } : {}}
        transition={!open ? { duration: 2.5, repeat: Infinity } : {}}
        style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 500, width: 56, height: 56, borderRadius: '50%', background: '#25d366', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}>
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={22} color="#fff" /></motion.div>
            : <motion.div key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={24} fill="white" color="white" /></motion.div>}
        </AnimatePresence>
      </motion.button>
    </>
  )
}

// ─── BACK TO TOP ───
const BackToTop = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ position: 'fixed', bottom: 88, right: 20, zIndex: 300, width: 44, height: 44, borderRadius: 4, background: 'var(--gold)', color: '#000', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(240,165,0,0.35)' }}>
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ─── NAV ───
const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [mobDrop, setMobDrop] = useState(false)
  const { pathname } = useLocation()
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => { if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  useEffect(() => { setMobileOpen(false); setMobDrop(false); setDropOpen(false) }, [pathname])

  const ia = (p: string) => p === '/' ? pathname === '/' : pathname.startsWith(p)
  const gc = (p: string) => ia(p) ? 'var(--gold)' : 'var(--gray)'

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300, height: 64, background: 'var(--bg)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>
        <div className="wrap" style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          {/* Desktop logo */}
          <Link to="/" className="d-logo" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 18, color: '#fff' }}>
            <div style={{ width: 32, height: 32, background: 'var(--gold)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={17} color="#000" fill="#000" />
            </div>
            SECURE<span style={{ color: 'var(--gold)' }}>FORCE</span>
          </Link>

          {/* Desktop links */}
          <div className="d-links" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 32 }}>
            {/* Diensten with dropdown */}
            <div ref={dropRef} style={{ position: 'relative' }}>
              <button onClick={() => setDropOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: ia('/diensten') ? 'var(--gold)' : 'var(--gray)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.07em', textTransform: 'uppercase', padding: 0 }}>
                Diensten
                <motion.div animate={{ rotate: dropOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={13} />
                </motion.div>
              </button>
              <AnimatePresence>
                {dropOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.16 }}
                    style={{ position: 'absolute', top: 'calc(100% + 18px)', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg2)', border: '1px solid var(--border)', borderTop: '2px solid var(--gold)', borderRadius: '0 0 8px 8px', padding: '6px 0', minWidth: 270, boxShadow: '0 16px 48px rgba(0,0,0,0.6)', zIndex: 50 }}>
                    {DIENSTEN.map(d => (
                      <Link key={d.slug} to={`/diensten/${d.slug}`}
                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 18px', color: ia(`/diensten/${d.slug}`) ? 'var(--gold)' : 'var(--gray)', fontSize: 14, fontWeight: 500, transition: 'all 0.14s', background: 'transparent' }}
                        onMouseEnter={e => { (e.currentTarget as any).style.background = 'rgba(240,165,0,0.06)'; (e.currentTarget as any).style.color = 'var(--gold)' }}
                        onMouseLeave={e => { (e.currentTarget as any).style.background = 'transparent'; (e.currentTarget as any).style.color = ia(`/diensten/${d.slug}`) ? 'var(--gold)' : 'var(--gray)' }}>
                        <div style={{ width: 30, height: 30, background: 'var(--gold2)', border: '1px solid var(--gold3)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {d.icon}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{d.title}</div>
                          <div style={{ fontSize: 11, color: 'var(--gray2)', marginTop: 1 }}>{d.short}</div>
                        </div>
                      </Link>
                    ))}
                    <div style={{ margin: '6px 12px 6px', paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                      <Link to="/diensten"
                        style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--gold)', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '6px 6px' }}>
                        Alle diensten <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[{ l: 'Over ons', to: '/over-ons' }, { l: 'Contact', to: '/contact' }].map(lnk => (
              <Link key={lnk.to} to={lnk.to}
                style={{ fontSize: 13, fontWeight: 600, color: gc(lnk.to), letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'color 0.14s' }}
                onMouseEnter={e => (e.currentTarget as any).style.color = 'var(--gold)'}
                onMouseLeave={e => (e.currentTarget as any).style.color = gc(lnk.to)}>
                {lnk.l}
              </Link>
            ))}
            <motion.a href="tel:0612345678" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{ background: 'var(--gold)', color: '#000', padding: '9px 22px', borderRadius: 6, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 7 }}>
              <Phone size={13} /> Bel direct
            </motion.a>
          </div>

          {/* Mobile controls */}
          <button onClick={() => setMobileOpen(o => !o)} className="m-hb"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link to="/" className="m-logo"
            style={{ display: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontWeight: 700, fontSize: 16, color: '#fff', alignItems: 'center', gap: 7 }}>
            <Shield size={14} color="var(--gold)" fill="var(--gold)" />SECURE<span style={{ color: 'var(--gold)' }}>FORCE</span>
          </Link>
          <a href="tel:0612345678" className="m-phone"
            style={{ display: 'none', marginLeft: 'auto', color: 'var(--gold)', padding: 8, alignItems: 'center' }}>
            <Phone size={22} color="var(--gold)" />
          </a>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 299, background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '12px 20px 24px', display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
            <button onClick={() => setMobDrop(o => !o)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 12px', fontSize: 17, fontWeight: 600, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 6 }}>
              Diensten
              <motion.div animate={{ rotate: mobDrop ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={18} color="var(--gray)" />
              </motion.div>
            </button>
            <AnimatePresence>
              {mobDrop && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden', paddingLeft: 12 }}>
                  {DIENSTEN.map(d => (
                    <Link key={d.slug} to={`/diensten/${d.slug}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', fontSize: 15, fontWeight: 500, color: 'var(--gray)', borderRadius: 6 }}>
                      <div style={{ width: 28, height: 28, background: 'var(--gold2)', border: '1px solid var(--gold3)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {d.icon}
                      </div>
                      {d.title}
                    </Link>
                  ))}
                  <Link to="/diensten" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px', fontSize: 12, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em' }}>
                    Alle diensten <ArrowRight size={13} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            {[{ l: 'Over ons', to: '/over-ons' }, { l: 'Contact', to: '/contact' }].map(lnk => (
              <Link key={lnk.to} to={lnk.to} style={{ padding: '14px 12px', fontSize: 17, fontWeight: 600, color: '#fff', borderRadius: 6, display: 'block' }}>{lnk.l}</Link>
            ))}
            <motion.a href="tel:0612345678"
              style={{ marginTop: 10, background: 'var(--gold)', color: '#000', padding: '14px 20px', borderRadius: 6, textAlign: 'center', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Phone size={16} /> 06-12345678
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(min-width:769px){.m-hb,.m-logo,.m-phone{display:none!important}.d-logo,.d-links{display:flex!important}}
        @media(max-width:768px){.d-logo,.d-links{display:none!important}.m-hb,.m-logo,.m-phone{display:flex!important}}
      `}</style>
    </>
  )
}

// ─── FOOTER ───
const Footer = () => (
  <footer style={{ background: '#030405', borderTop: '1px solid var(--border)', padding: '52px 0 28px' }}>
    <div className="wrap">
      <div className="fg" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 36, paddingBottom: 36, borderBottom: '1px solid var(--border)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 30, height: 30, background: 'var(--gold)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={15} color="#000" fill="#000" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 17, color: '#fff' }}>SECURE<span style={{ color: 'var(--gold)' }}>FORCE</span></span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--gray2)', lineHeight: 1.75, maxWidth: 200, marginBottom: 16 }}>
            Professionele beveiligingsdiensten voor bedrijven en evenementen in heel Nederland.
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['VBV', 'ISO 9001', 'ECABO'].map(b => (
              <div key={b} style={{ background: 'var(--gold2)', border: '1px solid var(--gold3)', color: 'var(--gold)', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 3 }}>{b}</div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray2)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>Diensten</div>
          {DIENSTEN.map(d => (
            <Link key={d.slug} to={`/diensten/${d.slug}`}
              style={{ display: 'block', fontSize: 13, color: 'var(--gray2)', marginBottom: 8 }}
              onMouseEnter={e => (e.currentTarget as any).style.color = 'var(--gold)'}
              onMouseLeave={e => (e.currentTarget as any).style.color = 'var(--gray2)'}>{d.title}</Link>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray2)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>Bedrijf</div>
          {[{ l: 'Over ons', to: '/over-ons' }, { l: 'Contact', to: '/contact' }, { l: 'Alle diensten', to: '/diensten' }].map(i => (
            <Link key={i.to} to={i.to} style={{ display: 'block', fontSize: 13, color: 'var(--gray2)', marginBottom: 8 }}
              onMouseEnter={e => (e.currentTarget as any).style.color = 'var(--gold)'}
              onMouseLeave={e => (e.currentTarget as any).style.color = 'var(--gray2)'}>{i.l}</Link>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray2)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>Contact</div>
          <div style={{ fontSize: 13, color: 'var(--gray2)', marginBottom: 7 }}>06-12345678</div>
          <div style={{ fontSize: 13, color: 'var(--gray2)', marginBottom: 7 }}>info@secureforce.nl</div>
          <div style={{ fontSize: 13, color: 'var(--gray2)', marginBottom: 14 }}>Amsterdam, NL</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#25d366', fontWeight: 600 }}>
            <div style={{ width: 6, height: 6, background: '#25d366', borderRadius: '50%', animation: 'pulse 2s infinite' }} />24/7
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ fontSize: 12, color: 'var(--gray2)' }}>© 2026 SecureForce BV · KvK: 87654321 · Gebouwd door Vision Builder</div>
        <div style={{ display: 'flex', gap: 18 }}>
          {['Privacy', 'Voorwaarden', 'Cookies'].map(l => <Link key={l} to="/contact" style={{ fontSize: 12, color: 'var(--gray2)' }}>{l}</Link>)}
        </div>
      </div>
    </div>
    <style>{`
      @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4)}50%{box-shadow:0 0 0 6px rgba(37,211,102,0)}}
      @media(max-width:768px){.fg{grid-template-columns:1fr 1fr!important;gap:28px!important}.fg>div:first-child{grid-column:1/-1}}
      @media(max-width:480px){.fg{grid-template-columns:1fr!important}}
    `}</style>
  </footer>
)

// ──────────────────────────────────────────────
// SHARED: Page hero banner
// ──────────────────────────────────────────────
const PageHero = ({ label, title, sub, img, imgPos = 'center center', breadcrumb }: any) => (
  <div style={{ paddingTop: 64 }}>
    {img ? (
      <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        <img src={img} alt={title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: imgPos }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,7,10,1) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gold)' }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 44 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {breadcrumb && <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>{breadcrumb}</div>}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 3, height: 18, background: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(28px,4vw,52px)', marginBottom: sub ? 12 : 0 }}>{title}</h1>
            {sub && <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 560, fontWeight: 300, lineHeight: 1.7 }}>{sub}</p>}
          </motion.div>
        </div>
      </div>
    ) : (
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '56px 0 44px' }}>
        <div className="wrap">
          <FU>
            {breadcrumb && <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>{breadcrumb}</div>}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 3, height: 18, background: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(28px,4vw,52px)', marginBottom: sub ? 14 : 0 }}>{title}</h1>
            {sub && <p style={{ fontSize: 16, color: 'var(--gray)', maxWidth: 560, fontWeight: 300, lineHeight: 1.75 }}>{sub}</p>}
          </FU>
        </div>
      </div>
    )}
  </div>
)

// ──────────────────────────────────────────────
// HOME
// ──────────────────────────────────────────────
const Home = () => {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 700], [0, 80])
  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 640, display: 'flex', alignItems: 'flex-start', overflow: 'hidden' }}>
        <motion.div style={{y:bgY,position:'absolute',inset:'0',zIndex:0}}>      
          <img src={IMG.hero} alt="SecureForce" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top',display:'block'}}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.28) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,7,10,0.97) 0%, rgba(6,7,10,0.2) 40%, transparent 65%)' }} />
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold) 0%, transparent 70%)', transformOrigin: 'left' }} />
        </motion.div>
        <div className="wrap" style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: 'calc(64px + 24px)', paddingBottom: 80 }}>
          <div style={{ maxWidth: 620 }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
              <div style={{ width: 3, height: 20, background: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)' }}>VBV-Gecertificeerd · Nederland</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: '#fff', marginBottom: 22, letterSpacing: '-0.02em', lineHeight: 1.06 }}>
              Beveiliging die<br />
              <span style={{ color: 'var(--gold)', position: 'relative', display: 'inline-block' }}>
                resultaten levert.
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
                  style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, background: 'var(--gold)', transformOrigin: 'left', opacity: 0.5 }} />
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 40, fontWeight: 300, maxWidth: 500 }}>
              Professionele bewaking, receptiebeveiliging en evenementenbeveiliging voor bedrijven in heel Nederland.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ background: 'var(--gold)', color: '#000', padding: '14px 28px', borderRadius: 6, fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(240,165,0,0.3)' }}>
                Gratis offerte <ChevronRight size={16} />
              </Link>
              <Link to="/diensten" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 6, fontSize: 15, fontWeight: 600, border: '1px solid rgba(255,255,255,0.22)', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as any).style.borderColor = 'var(--gold)'; (e.currentTarget as any).style.color = 'var(--gold)' }}
                onMouseLeave={e => { (e.currentTarget as any).style.borderColor = 'rgba(255,255,255,0.22)'; (e.currentTarget as any).style.color = '#fff' }}>
                Onze diensten
              </Link>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ChevronDown size={20} color="rgba(255,255,255,0.4)" />
          </motion.div>
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="wrap">
          <div className="tg" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[{ n: 15, s: '+', l: 'Jaar actief' }, { n: 850, s: '+', l: 'Beveiligde objecten' }, { n: 120, s: '+', l: 'Medewerkers' }, { n: 24, s: '/7', l: 'Bereikbaar' }].map((s, i) => (
              <FU key={i} delay={i * 0.09}>
                <div style={{ textAlign: 'center', padding: '0 12px', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontSize: 38, fontWeight: 700, color: 'var(--gold)', lineHeight: 1, marginBottom: 8 }}><CU end={s.n} suffix={s.s} /></div>
                  <div style={{ fontSize: 12, color: 'var(--gray)', letterSpacing: '0.07em', textTransform: 'uppercase', fontWeight: 500 }}>{s.l}</div>
                </div>
              </FU>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:600px){.tg{grid-template-columns:repeat(2,1fr)!important;gap:1px!important;background:var(--border)!important}.tg>div{background:var(--bg2);padding:20px 8px!important;border-right:none!important}}`}</style>
      </section>

      {/* DIENSTEN CARDS */}
      <section style={{ padding: '88px 0', background: 'var(--bg)' }}>
        <div className="wrap">
          <FU style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 3, height: 14, background: 'var(--gold)', flexShrink: 0 }} />Wat wij bieden
                </div>
                <h2 style={{ color: '#fff' }}>Vier gespecialiseerde<br />beveiligingsdiensten</h2>
              </div>
              <Link to="/diensten" style={{ color: 'var(--gold)', padding: '11px 20px', border: '1px solid var(--gold)', borderRadius: 6, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
                Alle diensten
              </Link>
            </div>
          </FU>
          <div className="sg" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'var(--border)' }}>
            {DIENSTEN.map((d, i) => (
              <FU key={d.slug} delay={i * 0.09}>
                <Link to={`/diensten/${d.slug}`} style={{ display: 'block' }}>
                  <div className="svc-card" style={{ background: 'var(--bg3)', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid transparent', transition: 'all 0.22s' }}
                    onMouseEnter={e => { (e.currentTarget as any).style.borderColor = 'rgba(240,165,0,0.35)'; (e.currentTarget as any).style.transform = 'translateY(-4px)'; (e.currentTarget as any).style.boxShadow = '0 8px 40px rgba(0,0,0,0.5)' }}
                    onMouseLeave={e => { (e.currentTarget as any).style.borderColor = 'transparent'; (e.currentTarget as any).style.transform = 'none'; (e.currentTarget as any).style.boxShadow = 'none' }}>
                    <div style={{ height: 195, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      <img src={d.img} alt={d.title} loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: d.imgPos, display: 'block', transition: 'transform 0.5s' }}
                        onMouseEnter={e => (e.target as HTMLImageElement).style.transform = 'scale(1.06)'}
                        onMouseLeave={e => (e.target as HTMLImageElement).style.transform = 'scale(1)'}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: 11, left: 11, fontFamily: 'Space Mono,monospace', fontSize: 10, fontWeight: 700, color: 'var(--gold)', background: 'rgba(0,0,0,0.65)', padding: '2px 7px' }}>{d.num}</div>
                    </div>
                    <div style={{ height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)', flexShrink: 0 }} />
                    <div style={{ padding: '16px 15px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 9 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{d.icon}<h3 style={{ color: '#fff', fontSize: 14, fontWeight: 700, lineHeight: 1.25 }}>{d.title}</h3></div>
                      <p style={{ fontSize: 12, color: 'var(--gray)', lineHeight: 1.7, fontWeight: 300, flex: 1 }}>{d.short}</p>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        Meer info <ChevronRight size={10} />
                      </span>
                    </div>
                  </div>
                </Link>
              </FU>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.sg{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:420px){.sg{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* OVER ONS TEASER */}
      <section style={{ padding: '88px 0', background: 'var(--bg2)' }}>
        <div className="wrap">
          <div className="aog" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <FL>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: -10, left: -10, width: 40, height: 40, borderTop: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)', zIndex: 2 }} />
                <div style={{ position: 'absolute', bottom: -10, right: -10, width: 40, height: 40, borderBottom: '2px solid var(--gold)', borderRight: '2px solid var(--gold)', zIndex: 2 }} />
                <div style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '4/5' }}>
                  <img src={IMG.team} alt="SecureForce team" loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                </div>
                <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                  style={{ position: 'absolute', bottom: 24, left: -18, zIndex: 3, background: 'var(--gold)', color: '#000', padding: '13px 18px', borderRadius: 4, boxShadow: '0 8px 28px rgba(240,165,0,0.4)' }}>
                  <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>15+</div>
                  <div style={{ fontSize: 11, fontWeight: 700, marginTop: 2, letterSpacing: '0.05em', textTransform: 'uppercase' }}>jaar ervaring</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.55 }}
                  style={{ position: 'absolute', top: 22, right: -16, zIndex: 3, background: 'var(--bg)', border: '1px solid rgba(240,165,0,0.3)', color: 'var(--gold)', borderRadius: 4, padding: '7px 13px', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 7, height: 7, background: '#25d366', borderRadius: '50%', animation: 'pulse 2s infinite' }} />24/7 ACTIEF
                </motion.div>
              </div>
            </FL>
            <FR>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 3, height: 20, background: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Over SecureForce</span>
                </div>
                <h2 style={{ color: '#fff', marginBottom: 18 }}>Vakmanschap.<br />Integriteit. Resultaat.</h2>
                <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.85, marginBottom: 12, fontWeight: 300 }}>
                  Opgericht in 2009, heeft SecureForce zich ontwikkeld tot een toonaangevend beveiligingsbedrijf in Nederland.
                </p>
                <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.85, marginBottom: 28, fontWeight: 300 }}>
                  Geen uitzendkrachten — echte professionals die uw locatie kennen en 24/7 inzetbaar zijn.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                  {['VBV-gecertificeerd', 'ISO 9001:2015', 'ECABO erkend'].map((c, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--gold2)', border: '1px solid var(--gold3)', borderRadius: 4, padding: '5px 11px' }}>
                      <div style={{ width: 4, height: 4, background: 'var(--gold)', borderRadius: '50%' }} />
                      <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>{c}</span>
                    </motion.div>
                  ))}
                </div>
                <Link to="/over-ons" style={{ background: 'var(--gold)', color: '#000', padding: '13px 26px', borderRadius: 6, fontSize: 14, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  Lees meer over ons <ArrowRight size={15} />
                </Link>
              </div>
            </FR>
          </div>
        </div>
        <style>{`@media(max-width:768px){.aog{grid-template-columns:1fr!important;gap:44px!important}}`}</style>
      </section>

      {/* GALERIJ */}
      <section id="in-beeld" style={{ padding: '72px 0', background: 'var(--bg3)' }}>
        <div className="wrap">
          <FU style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 3, height: 14, background: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Fotogalerij</span>
            </div>
            <h2 style={{ color: '#fff' }}>SecureForce <span style={{ color: 'var(--gold)' }}>in beeld</span></h2>
          </FU>
          <div className="gd" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '250px 250px', gap: 3 }}>
            {[
              { src: IMG.object, label: 'Objectbeveiliging', row: '1/3', col: undefined, pos: 'center center' },
              { src: IMG.hero, label: 'Onze medewerkers', row: undefined, col: undefined, pos: 'center 40%' },
              { src: IMG.team, label: 'Ons team', row: undefined, col: undefined, pos: 'center 20%' },
              { src: IMG.event, label: 'Evenementenbeveiliging', row: undefined, col: '2/4', pos: 'center 35%' },
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                style={{ gridRow: p.row, gridColumn: p.col, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                <img src={p.src} alt={p.label} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.pos, display: 'block', transition: 'transform 0.5s' }}
                  onMouseEnter={e => (e.target as HTMLImageElement).style.transform = 'scale(1.04)'}
                  onMouseLeave={e => (e.target as HTMLImageElement).style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                  <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: 'var(--gold)', marginBottom: 3 }}>0{i + 1}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{p.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="gm" style={{ display: 'none', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
            {[{ src: IMG.object, h: 180, l: 'Objectbeveiliging', col: undefined }, { src: IMG.hero, h: 180, l: 'Medewerkers', col: undefined }, { src: IMG.team, h: 160, l: 'Ons team', col: undefined }, { src: IMG.receptie, h: 160, l: 'Receptie', col: undefined }, { src: IMG.event, h: 200, l: 'Evenementen', col: '1/-1' }].map((p, i) => (
              <div key={i} style={{ position: 'relative', overflow: 'hidden', height: p.h, gridColumn: p.col }}>
                <img src={p.src} alt={p.l} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: 10, left: 12, fontSize: 12, fontWeight: 700, color: '#fff' }}>{p.l}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:600px){.gd{display:none!important}.gm{display:grid!important}}`}</style>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: '88px 0', background: 'var(--bg)' }}>
        <div className="wrap">
          <FU style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 3, height: 14, background: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Klantervaringen</span>
            </div>
            <h2 style={{ color: '#fff' }}>Wat onze klanten zeggen</h2>
          </FU>
          <div className="rg" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, background: 'var(--border)' }}>
            {[
              { t: 'SecureForce bewaakt ons kantoorcomplex al 4 jaar. Absolute professionals — altijd aanwezig, altijd alert.', name: 'ING Nederland', role: 'Facility Manager' },
              { t: 'Voor ons festival met 12.000 bezoekers vlekkeloos geregeld. Professionele communicatie van begin tot eind.', name: 'Rebirth Festival', role: 'Evenementenorganisator' },
              { t: 'Al 6 jaar onze vaste beveiligingspartner. Snelle respons en transparante communicatie.', name: 'CBRE Netherlands', role: 'Vastgoedbeheer' },
              { t: 'De receptionisten van SecureForce zijn een visitekaartje voor ons bedrijf. Representatief en alert.', name: 'Deloitte Amsterdam', role: 'Office Manager' },
            ].map((r, i) => (
              <FU key={i} delay={i * 0.1}>
                <div style={{ background: 'var(--bg2)', padding: '28px 24px', position: 'relative', overflow: 'hidden', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as any).style.background = 'var(--bg3)'}
                  onMouseLeave={e => (e.currentTarget as any).style.background = 'var(--bg2)'}>
                  <div style={{ position: 'absolute', top: -8, left: 16, fontSize: 110, fontWeight: 700, color: 'var(--gold)', opacity: 0.06, lineHeight: 1, userSelect: 'none' }}>"</div>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                    {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="var(--gold)" color="var(--gold)" />)}
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.8, marginBottom: 20, fontWeight: 300, position: 'relative' }}>"{r.t}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 4, background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#000', flexShrink: 0 }}>{r.name[0]}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray2)' }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </FU>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:640px){.rg{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* CTA */}
      <section style={{ padding: '72px 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="wrap">
          <FU>
            <div style={{ maxWidth: 540, margin: '0 auto' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
                <div style={{ width: 7, height: 7, background: '#25d366', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 11, color: '#25d366', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Direct contact</span>
              </div>
              <h2 style={{ color: '#fff', marginBottom: 14 }}>Klaar om uw beveiliging te versterken?</h2>
              <p style={{ fontSize: 16, color: 'var(--gray)', lineHeight: 1.75, marginBottom: 32, fontWeight: 300 }}>
                Vraag vandaag nog een gratis offerte aan. Reactie binnen 2 uur.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ background: 'var(--gold)', color: '#000', padding: '14px 30px', borderRadius: 6, fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  Gratis offerte <ArrowRight size={15} />
                </Link>
                <a href="tel:0612345678" style={{ background: 'transparent', color: '#fff', padding: '14px 30px', borderRadius: 6, fontSize: 15, fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Phone size={15} /> 06-12345678
                </a>
              </div>
            </div>
          </FU>
        </div>
      </section>
    </>
  )
}

// ──────────────────────────────────────────────
// DIENSTEN OVERZICHT
// ──────────────────────────────────────────────
const DienstenPage = () => (
  <>
    <PageHero label="Onze diensten" title="Beveiligingsdiensten op maat"
      sub="Van permanente objectbeveiliging tot evenementen met tienduizenden bezoekers." />
    <section style={{ padding: '72px 0', background: 'var(--bg)' }}>
      <div className="wrap">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, background: 'var(--border)' }}>
          {DIENSTEN.map((d, i) => (
            <FU key={d.slug} delay={i * 0.07}>
              <Link to={`/diensten/${d.slug}`} style={{ display: 'block' }}>
                <div className="drow" style={{ background: i % 2 === 0 ? 'var(--bg2)' : 'var(--bg3)', display: 'grid', gridTemplateColumns: '260px 1fr auto', alignItems: 'stretch', border: '1px solid transparent', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as any).style.borderColor = 'rgba(240,165,0,0.3)'}
                  onMouseLeave={e => (e.currentTarget as any).style.borderColor = 'transparent'}>
                  <div style={{ height: 185, overflow: 'hidden', position: 'relative' }}>
                    <img src={d.img} alt={d.title} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: d.imgPos, display: 'block', transition: 'transform 0.5s' }}
                      onMouseEnter={e => (e.target as HTMLImageElement).style.transform = 'scale(1.05)'}
                      onMouseLeave={e => (e.target as HTMLImageElement).style.transform = 'scale(1)'} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 60%)', pointerEvents: 'none' }} />
                  </div>
                  <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 9, justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                      <div style={{ width: 36, height: 36, background: 'var(--gold2)', border: '1px solid var(--gold3)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{d.iconLg}</div>
                      <div>
                        <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 2 }}>{d.num}</div>
                        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{d.title}</h2>
                      </div>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.75, fontWeight: 300, maxWidth: 420 }}>{d.intro.slice(0, 130)}…</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {d.punten.slice(0, 3).map(t => (
                        <span key={t} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 3, background: 'var(--gold2)', border: '1px solid var(--gold3)', color: 'var(--gold)', fontWeight: 600 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: '24px 24px 24px 0', display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--gold)', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      Bekijk <ChevronRight size={13} />
                    </div>
                  </div>
                </div>
              </Link>
            </FU>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.drow{grid-template-columns:1fr!important}.drow>div:last-child{padding:0 16px 20px!important}}`}</style>
    </section>
  </>
)

// ──────────────────────────────────────────────
// DIENST DETAIL
// ──────────────────────────────────────────────
const DienstDetail = ({ slug }: { slug: string }) => {
  const d = DIENSTEN.find(x => x.slug === slug)
  if (!d) return (
    <div style={{ paddingTop: 120, textAlign: 'center', padding: '120px 24px' }}>
      <h2 style={{ color: '#fff', marginBottom: 16 }}>Pagina niet gevonden</h2>
      <Link to="/diensten" style={{ color: 'var(--gold)', fontWeight: 700 }}>Terug naar diensten</Link>
    </div>
  )
  const others = DIENSTEN.filter(x => x.slug !== slug)
  return (
    <>
      <PageHero
        label="Dienst"
        title={d.title}
        sub={d.hero}
        img={d.img}
        imgPos={d.imgPos}
        breadcrumb={
          <>
            <Link to="/diensten" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Diensten</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>/</span>
            <span style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 600 }}>{d.title}</span>
          </>
        }
      />
      <section style={{ padding: '64px 0', background: 'var(--bg)' }}>
        <div className="wrap">
          <div className="ddg" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 52 }}>
            <div>
              <FU>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <div style={{ width: 3, height: 18, background: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Over deze dienst</span>
                </div>
                <p style={{ fontSize: 16, color: 'var(--gray)', lineHeight: 1.9, marginBottom: 36, fontWeight: 300 }}>{d.intro}</p>
              </FU>
              <FU delay={0.1}>
                <h3 style={{ color: '#fff', fontSize: 19, marginBottom: 18 }}>Wat is inbegrepen</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 44 }}>
                  {d.punten.map((p, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '13px 15px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 5, borderLeft: '3px solid var(--gold)' }}>
                      <CheckCircle2 size={15} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.5 }}>{p}</span>
                    </motion.div>
                  ))}
                </div>
              </FU>
              <FU delay={0.14}>
                <h3 style={{ color: '#fff', fontSize: 19, marginBottom: 16 }}>Sectoren</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 44 }}>
                  {d.sectoren.map(s => (
                    <span key={s} style={{ fontSize: 13, padding: '6px 13px', borderRadius: 4, background: 'var(--gold2)', border: '1px solid var(--gold3)', color: 'var(--gold)', fontWeight: 600 }}>{s}</span>
                  ))}
                </div>
              </FU>
              <FU delay={0.18}>
                <div style={{ borderRadius: 5, overflow: 'hidden', height: 320, position: 'relative' }}>
                  <img src={d.img} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: d.imgPos, display: 'block' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gold)' }} />
                </div>
              </FU>
            </div>
            {/* Sidebar */}
            <FR delay={0.1}>
              <div style={{ position: 'sticky', top: 80 }}>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 5, padding: '24px 20px', borderTop: '2px solid var(--gold)', marginBottom: 18 }}>
                  <h3 style={{ color: '#fff', fontSize: 16, marginBottom: 8 }}>{d.cta}</h3>
                  <p style={{ fontSize: 13, color: 'var(--gray2)', lineHeight: 1.6, marginBottom: 18 }}>Reactie binnen 2 uur.</p>
                  <Link to="/contact" style={{ background: 'var(--gold)', color: '#000', padding: '12px 18px', borderRadius: 5, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 9 }}>
                    Gratis offerte <ChevronRight size={14} />
                  </Link>
                  <a href="tel:0612345678" style={{ background: 'transparent', color: '#fff', padding: '11px 18px', borderRadius: 5, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, border: '1px solid var(--border)' }}>
                    <Phone size={14} /> 06-12345678
                  </a>
                </div>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 5, padding: '18px 20px', marginBottom: 18 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Certificeringen</div>
                  {['VBV-gecertificeerd', 'ISO 9001:2015', 'ECABO erkend', 'BHV-gecertificeerd'].map(c => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                      <div style={{ width: 4, height: 4, background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'var(--gray)' }}>{c}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 5, padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Andere diensten</div>
                  {others.map(o => (
                    <Link key={o.slug} to={`/diensten/${o.slug}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ width: 28, height: 28, background: 'var(--gold2)', border: '1px solid var(--gold3)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {o.icon}
                      </div>
                      <span style={{ fontSize: 13, color: 'var(--gray)', fontWeight: 500, flex: 1 }}>{o.title}</span>
                      <ChevronRight size={12} color="var(--gray2)" />
                    </Link>
                  ))}
                </div>
              </div>
            </FR>
          </div>
        </div>
        <style>{`@media(max-width:900px){.ddg{grid-template-columns:1fr!important}}`}</style>
      </section>
    </>
  )
}

// ──────────────────────────────────────────────
// OVER ONS
// ──────────────────────────────────────────────
const OverOns = () => (
  <>
    <PageHero label="Over SecureForce" title="Vakmanschap, integriteit en resultaat"
      sub="Opgericht in 2009 en sindsdien uitgegroeid tot een toonaangevend beveiligingsbedrijf." />
    <section style={{ padding: '72px 0', background: 'var(--bg)' }}>
      <div className="wrap">
        <div className="oag" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
          <FL>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -10, left: -10, width: 40, height: 40, borderTop: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)', zIndex: 2 }} />
              <div style={{ position: 'absolute', bottom: -10, right: -10, width: 40, height: 40, borderBottom: '2px solid var(--gold)', borderRight: '2px solid var(--gold)', zIndex: 2 }} />
              <div style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '4/5' }}>
                <img src={IMG.team} alt="SecureForce team" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
              <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                style={{ position: 'absolute', bottom: 24, left: -18, zIndex: 3, background: 'var(--gold)', color: '#000', padding: '14px 20px', borderRadius: 4, boxShadow: '0 8px 28px rgba(240,165,0,0.4)' }}>
                <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1 }}>15+</div>
                <div style={{ fontSize: 12, fontWeight: 700, marginTop: 3, letterSpacing: '0.05em', textTransform: 'uppercase' }}>jaar ervaring</div>
              </motion.div>
            </div>
          </FL>
          <FR>
            <div>
              <h2 style={{ color: '#fff', marginBottom: 20, fontSize: 'clamp(24px,3vw,34px)' }}>Wie wij zijn</h2>
              <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.9, marginBottom: 16, fontWeight: 300 }}>
                SecureForce is in 2009 opgericht met één doel: een beveiligingsbedrijf bouwen dat volledig draait op vakmanschap, integriteit en betrouwbaarheid. Geen compromissen, geen uitzendkrachten — alleen echte professionals.
              </p>
              <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.9, marginBottom: 16, fontWeight: 300 }}>
                Wij selecteren onze medewerkers persoonlijk op achtergrond, houding en vaardigheden. Elk teamlid is VBV-gecertificeerd en doorloopt onze interne trainingen.
              </p>
              <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.9, marginBottom: 28, fontWeight: 300 }}>
                Onze medewerkers werken in vaste teams bij vaste klanten. Zo kennen zij de locatie, de mensen en de risicos — en kunnen zij effectief optreden wanneer het er echt toe doet.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {['VBV-gecertificeerd', 'ISO 9001:2015', 'ECABO erkend', 'BHV-gecertificeerd'].map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--gold2)', border: '1px solid var(--gold3)', borderRadius: 4, padding: '5px 11px' }}>
                    <div style={{ width: 4, height: 4, background: 'var(--gold)', borderRadius: '50%' }} />
                    <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>{c}</span>
                  </motion.div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { icon: <Shield size={16} color="var(--gold)" />, t: '24/7 Meldkamer', s: 'Eigen beveiligde meldkamer' },
                  { icon: <Zap size={16} color="var(--gold)" />, t: 'Respons <2 uur', s: 'Snel inzetbaar' },
                  { icon: <Users size={16} color="var(--gold)" />, t: '120+ FTE', s: 'Vast gecertificeerd team' },
                  { icon: <Award size={16} color="var(--gold)" />, t: 'ISO 9001:2015', s: 'Kwaliteitsmanagement' },
                ].map((u, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    style={{ display: 'flex', gap: 9, alignItems: 'flex-start', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 5, padding: '12px' }}>
                    <div style={{ width: 32, height: 32, background: 'var(--gold2)', border: '1px solid var(--gold3)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{u.icon}</div>
                    <div><div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{u.t}</div><div style={{ fontSize: 11, color: 'var(--gray2)', fontWeight: 300 }}>{u.s}</div></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FR>
        </div>
      </div>
      <style>{`@media(max-width:768px){.oag{grid-template-columns:1fr!important;gap:44px!important}}`}</style>
    </section>

    {/* Waarden */}
    <section style={{ padding: '72px 0', background: 'var(--bg2)' }}>
      <div className="wrap">
        <FU style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ color: '#fff', marginBottom: 12 }}>Onze kernwaarden</h2>
          <p style={{ fontSize: 15, color: 'var(--gray)', maxWidth: 460, margin: '0 auto', fontWeight: 300 }}>De principes die ons werk elke dag sturen.</p>
        </FU>
        <div className="kwg" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'var(--border)' }}>
          {[
            { icon: <Shield size={22} color="var(--gold)" />, title: 'Integriteit', tekst: 'Wij doen wat we beloven. Altijd. Onze klanten vertrouwen ons met hun veiligheid — dat vertrouwen verdienen wij elke dag opnieuw.' },
            { icon: <Users size={22} color="var(--gold)" />, title: 'Vakmanschap', tekst: 'Elk van onze medewerkers is gecertificeerd, getraind en geselecteerd op kwaliteit. Wij investeren continu in opleiding.' },
            { icon: <Zap size={22} color="var(--gold)" />, title: 'Betrouwbaarheid', tekst: 'Op tijd, op post, op de hoogte. Wij communiceren transparant, handelen snel en zijn 24/7 bereikbaar.' },
          ].map((k, i) => (
            <FU key={i} delay={i * 0.1}>
              <div style={{ background: 'var(--bg3)', padding: '32px 24px' }}>
                <div style={{ width: 48, height: 48, background: 'var(--gold2)', border: '1px solid var(--gold3)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>{k.icon}</div>
                <h3 style={{ color: '#fff', fontSize: 19, marginBottom: 11 }}>{k.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.8, fontWeight: 300 }}>{k.tekst}</p>
              </div>
            </FU>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){.kwg{grid-template-columns:1fr!important}}`}</style>
    </section>

    {/* Foto's */}
    <section style={{ padding: '64px 0', background: 'var(--bg)' }}>
      <div className="wrap">
        <FU style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#fff' }}>SecureForce <span style={{ color: 'var(--gold)' }}>in actie</span></h2>
        </FU>
        <div className="oapg" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, height: 320 }}>
          {[{ src: IMG.object, l: 'Objectbeveiliging', p: 'center center' }, { src: IMG.event, l: 'Evenementenbeveiliging', p: 'center 35%' }, { src: IMG.receptie, l: 'Receptie & Hosting', p: 'center center' }].map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
              style={{ position: 'relative', overflow: 'hidden' }}>
              <img src={p.src} alt={p.l} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.p, display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 14, left: 14, fontSize: 13, fontWeight: 700, color: '#fff' }}>{p.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){.oapg{grid-template-columns:1fr!important;height:auto!important}.oapg>div{height:180px}}`}</style>
    </section>

    {/* CTA */}
    <section style={{ padding: '64px 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
      <div className="wrap">
        <FU>
          <h2 style={{ color: '#fff', marginBottom: 14 }}>Klaar om samen te werken?</h2>
          <p style={{ fontSize: 15, color: 'var(--gray)', marginBottom: 28, maxWidth: 380, margin: '0 auto 28px', fontWeight: 300, lineHeight: 1.7 }}>
            Neem contact op voor een vrijblijvend gesprek over uw beveiligingsbehoeften.
          </p>
          <Link to="/contact" style={{ background: 'var(--gold)', color: '#000', padding: '13px 30px', borderRadius: 6, fontSize: 14, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Neem contact op <ArrowRight size={14} />
          </Link>
        </FU>
      </div>
    </section>
  </>
)

// ──────────────────────────────────────────────
// CONTACT
// ──────────────────────────────────────────────
const Contact = () => {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ naam: '', bedrijf: '', email: '', telefoon: '', dienst: '', bericht: '' })
  const submit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setSent(true) }, 1600) }
  const inp: React.CSSProperties = { padding: '12px 14px', borderRadius: 4, fontSize: 14, border: '1px solid rgba(255,255,255,0.1)', outline: 'none', background: 'rgba(255,255,255,0.04)', color: '#fff', fontFamily: 'Space Grotesk,sans-serif', width: '100%' }
  return (
    <>
      <PageHero label="Neem contact op" title="Direct bereikbaar, 24 uur per dag"
        sub="Vraag een offerte aan of neem direct telefonisch contact op." />
      <section style={{ padding: '64px 0', background: 'var(--bg)' }}>
        <div className="wrap">
          <div className="cg" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48 }}>
            <FL>
              <div>
                <h2 style={{ color: '#fff', fontSize: 22, marginBottom: 24 }}>Contactgegevens</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                  {[
                    { icon: <Phone size={17} color="var(--gold)" />, label: 'Telefoon', value: '06-12345678', href: 'tel:0612345678' },
                    { icon: <Mail size={17} color="var(--gold)" />, label: 'E-mail', value: 'info@secureforce.nl', href: 'mailto:info@secureforce.nl' },
                    { icon: <MapPin size={17} color="var(--gold)" />, label: 'Werkgebied', value: 'Amsterdam & heel Nederland' },
                    { icon: <MessageCircle size={17} color="#25d366" />, label: 'WhatsApp', value: 'Stuur direct een bericht', href: 'https://wa.me/31612345678' },
                  ].map((c, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 5 }}>
                      <div style={{ width: 38, height: 38, background: 'var(--gold2)', border: '1px solid var(--gold3)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{c.label}</div>
                        {c.href ? <a href={c.href} style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{c.value}</a>
                          : <div style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{c.value}</div>}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div style={{ background: 'var(--bg2)', border: '1px solid rgba(240,165,0,0.2)', borderRadius: 5, padding: '18px 20px', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 7, height: 7, background: '#25d366', borderRadius: '50%', animation: 'pulse 2s infinite', flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Operationeel 24/7 · 365 dagen</span>
                  </div>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map(d => (
                      <div key={d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ fontSize: 10, color: 'var(--gray2)', fontWeight: 600 }}>{d}</div>
                        <div style={{ width: 28, height: 28, borderRadius: 4, background: 'var(--gold2)', border: '1px solid var(--gold3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--gold)' }}>v</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 5, padding: '16px 18px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Reactietijd</div>
                  {[{ l: 'Offerteaanvragen', t: '< 2 uur (werkdagen)' }, { l: 'Spoedvragen', t: 'Direct — bel 06-12345678' }, { l: 'E-mail', t: '< 4 uur' }].map(r => (
                    <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                      <span style={{ color: 'var(--gray)' }}>{r.l}</span>
                      <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{r.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FL>
            <FR>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 5, padding: '32px 28px', borderTop: '2px solid var(--gold)' }}>
                <AnimatePresence mode="wait">
                  {!sent ? (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                      <div>
                        <h3 style={{ color: '#fff', fontSize: 21, marginBottom: 5 }}>Vraag een offerte aan</h3>
                        <p style={{ fontSize: 13, color: 'var(--gray2)', lineHeight: 1.6 }}>Vrijblijvend en zonder verplichtingen.</p>
                      </div>
                      <div className="fr2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {[{ k: 'naam', l: 'Naam', t: 'text', p: 'Uw naam' }, { k: 'bedrijf', l: 'Bedrijf', t: 'text', p: 'Bedrijfsnaam' }].map(f => (
                          <div key={f.k} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.l}</label>
                            <input type={f.t} placeholder={f.p} value={(form as any)[f.k]} onChange={e => setForm(fm => ({ ...fm, [f.k]: e.target.value }))} required style={inp}
                              onFocus={e => e.target.style.borderColor = 'rgba(240,165,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                          </div>
                        ))}
                      </div>
                      <div className="fr2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>E-mail</label>
                          <input type="email" placeholder="uw@bedrijf.nl" value={form.email} onChange={e => setForm(fm => ({ ...fm, email: e.target.value }))} required style={inp}
                            onFocus={e => e.target.style.borderColor = 'rgba(240,165,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Telefoon</label>
                          <input type="tel" placeholder="06-..." value={form.telefoon} onChange={e => setForm(fm => ({ ...fm, telefoon: e.target.value }))} style={inp}
                            onFocus={e => e.target.style.borderColor = 'rgba(240,165,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Dienst</label>
                        <select value={form.dienst} onChange={e => setForm(fm => ({ ...fm, dienst: e.target.value }))}
                          style={{ ...inp, cursor: 'pointer' }}
                          onFocus={e => e.target.style.borderColor = 'rgba(240,165,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}>
                          <option value="">Selecteer een dienst...</option>
                          {DIENSTEN.map(d => <option key={d.slug} value={d.slug}>{d.title}</option>)}
                          <option value="anders">Anders / Weet ik nog niet</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Bericht</label>
                        <textarea rows={4} placeholder="Beschrijf uw beveiligingsbehoefte..." value={form.bericht} onChange={e => setForm(fm => ({ ...fm, bericht: e.target.value }))} required
                          style={{ ...inp, resize: 'vertical' } as any}
                          onFocus={e => e.target.style.borderColor = 'rgba(240,165,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                      </div>
                      <motion.button type="submit" disabled={loading}
                        whileHover={{ scale: 1.02, boxShadow: '0 6px 22px rgba(240,165,0,0.3)' }} whileTap={{ scale: 0.97 }}
                        style={{ background: 'var(--gold)', color: '#000', padding: '14px 22px', borderRadius: 4, fontSize: 15, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.8 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        {loading ? (
                          <><motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                            style={{ width: 15, height: 15, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%' }} />Verzenden...</>
                        ) : 'Gratis offerte aanvragen'}
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '48px 20px' }}>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, delay: 0.1 }}
                        style={{ width: 60, height: 60, background: 'var(--gold2)', border: '1px solid var(--gold3)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                        <CheckCircle2 size={28} color="var(--gold)" />
                      </motion.div>
                      <h3 style={{ color: '#fff', marginBottom: 9, fontSize: 21 }}>Bericht ontvangen!</h3>
                      <p style={{ color: 'var(--gray)', fontSize: 14, lineHeight: 1.6 }}>Wij nemen binnen 2 uur contact op.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FR>
          </div>
        </div>
        <style>{`@media(max-width:768px){.cg{grid-template-columns:1fr!important}.fr2{grid-template-columns:1fr!important}}`}</style>
      </section>
    </>
  )
}

// ──────────────────────────────────────────────
// ROUTER
// ──────────────────────────────────────────────
const DienstRouter = () => {
  const { pathname } = useLocation()
  const slug = pathname.replace('/diensten/', '').replace(/\/$/, '')
  return <DienstDetail slug={slug} />
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollTop />
      <Nav />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diensten" element={<DienstenPage />} />
          <Route path="/diensten/:slug" element={<DienstRouter />} />
          <Route path="/over-ons" element={<OverOns />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <div style={{ paddingTop: 64, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
              <h2 style={{ color: '#fff', fontSize: 42 }}>404</h2>
              <p style={{ color: 'var(--gray)', fontSize: 16 }}>Pagina niet gevonden</p>
              <Link to="/" style={{ color: 'var(--gold)', fontWeight: 700 }}>Terug naar home</Link>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <WA />
      <BackToTop />
    </div>
  )
}
