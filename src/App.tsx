import React, { useEffect, useRef, useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Phone, Mail, MessageCircle, MapPin, ChevronRight, ChevronDown,
  ArrowUp, Menu, X, Shield, Eye, Award, Zap, Users, Star,
  CheckCircle2, ArrowLeft, Clock, Lock
} from 'lucide-react'

const IMG = { hero:'/img/hero.jpg', event:'/img/event.jpg', object:'/img/object.jpg', receptie:'/img/receptie.jpg', team:'/img/team.jpg' }

const SERVICES = [
  { slug:'objectbeveiliging', title:'Objectbeveiliging', short:'Permanente bewaking van uw locatie, dag en nacht.', icon:Shield, img:IMG.object, imgPos:'center center', num:'01',
    intro:'Professionele, continue bewaking van bedrijfspanden, industrieterreinen, kantoren en datacenters. Onze VBV-gecertificeerde beveiligers zijn 24/7 aanwezig.',
    bullets:['24/7 aanwezigheid op locatie','VBV-gecertificeerde medewerkers','Koppeling met eigen meldkamer','Toegangscontrole & gastenregistratie','Patrouilles & rondgangen','Direct incidentbeheer'],
    usps:[{icon:Shield,t:'24/7 Aanwezig',s:'Altijd ter plaatse'},{icon:Eye,t:'Zichtbaar aanwezig',s:'Preventieve werking'},{icon:Clock,t:'Snelle respons',s:'Direct actie bij incidenten'},{icon:Award,t:'VBV-gecertificeerd',s:'Erkend vakbekwaam'}],
    text:`Objectbeveiliging is de kern van ons werk. Wij bewaken uw pand, locatie of terrein op professionele wijze. Onze medewerkers zijn geselecteerd op integriteit, communicatie en stressbestendigheid.\n\nWij werken met vaste teams die uw locatie door en door kennen. Geen roulerend uitzendpersoneel — maar betrokken professionals die uw bedrijf als hun eigen verantwoordelijkheid beschouwen.\n\nVan kleinschalige kantoorbeveiliging tot complexe bewaking van industrieterreinen: SecureForce levert altijd de juiste mensen op de juiste plek.` },
  { slug:'evenementenbeveiliging', title:'Evenementenbeveiliging', short:'Schaalbare teams voor elk evenement, van 50 tot 50.000 bezoekers.', icon:Zap, img:IMG.event, imgPos:'center 40%', num:'02',
    intro:'Van intiem bedrijfsevenement tot grootschalig festival: SecureForce levert schaalbare beveiligingsteams die elk evenement in goede banen leiden.',
    bullets:['Crowd control & publieksbeheer','Toegangscontrole & ticketverificatie','Zoek- & opsporingsassistentie','Crisismanagement & ontruiming','Backstage & artiestenbeveiliging','Coordinatie met politie & hulpdiensten'],
    usps:[{icon:Users,t:'Schaalbaar team',s:'Van 5 tot 500+ medewerkers'},{icon:Zap,t:'Crisismanagement',s:'Getraind voor noodsituaties'},{icon:Eye,t:'Crowdcontrol',s:'Gecertificeerde crowdmanagers'},{icon:Clock,t:'Snelle inzet',s:'Binnen 48u operationeel'}],
    text:`Evenementen vereisen een specifieke aanpak. SecureForce heeft jarenlange ervaring bij festivals, congressen, sportevents en bedrijfsfeesten door heel Nederland.\n\nWij werken nauw samen met organisatoren, lokale overheden en hulpdiensten. Onze teamleiders stellen voor elk evenement een op maat gemaakt veiligheidsplan op.\n\nVan de Rebirth Festival tot corporate galadners: wij zorgen dat uw gasten veilig zijn en dat u kunt genieten van een succesvol evenement.` },
  { slug:'receptie-hosting', title:'Receptie & Hosting', short:'Representatieve beveiliging met een warme, professionele ontvangst.', icon:Users, img:IMG.receptie, imgPos:'center center', num:'03',
    intro:'Onze receptie- en hostingmedewerkers combineren professionele beveiliging met representatieve gastvrijheid. Het perfecte visitekaartje voor uw organisatie.',
    bullets:['Professionele ontvangst van bezoekers','Toegangscontrole & badgebeheer','VIP-begeleiding & escorte','Telefoon- & baliebeheer','Meerdere talen (NL, EN, FR, ES)','Representatieve uitstraling & uniform'],
    usps:[{icon:Users,t:'Representatief',s:'Perfecte eerste indruk'},{icon:Shield,t:'Veiligheid',s:'Beveiliging en gastvrijheid'},{icon:Lock,t:'Toegangscontrole',s:'Professioneel badgebeheer'},{icon:Award,t:'Meertalig',s:'NL, EN, FR en meer'}],
    text:`Receptie & Hosting is het gezicht van uw organisatie. Onze medewerkers zijn geselecteerd op uitstraling, communicatieve vaardigheden en servicegerichtheid en zijn tegelijkertijd volledig opgeleid als beveiliger.\n\nDit unieke concept biedt u het beste van twee werelden: een warme, professionele ontvangst voor uw bezoekers en de veiligheid van gecertificeerde beveiliging.\n\nGeschikt voor kantoorgebouwen, congressen, galabijdragen, beurzen en meer. Onze medewerkers passen zich aan aan de sfeer en stijl van uw organisatie.` },
  { slug:'camera-alarm', title:'Camera & Alarmopvolging', short:'Professionele camerabewaking en directe alarmopvolging, 24/7.', icon:Eye, img:IMG.object, imgPos:'center 70%', num:'04',
    intro:'SecureForce beschikt over een eigen gecertificeerde meldkamer die uw camera- en alarmsystemen 24/7 monitort en direct kan ingrijpen bij incidenten.',
    bullets:['Eigen 24/7 gecertificeerde meldkamer','Live cameramonitoring op afstand','Directe alarmopvolging ter plaatse','Koppeling met bestaande systemen','Rapportage & incidentregistratie','Periodieke systeemcontrole'],
    usps:[{icon:Eye,t:'Live monitoring',s:'Eigen meldkamer, 24/7 actief'},{icon:Zap,t:'Directe respons',s:'Binnen minuten ter plaatse'},{icon:Lock,t:'Certified meldkamer',s:'Conform NEN-EN 50518'},{icon:Clock,t:'24/7 beschikbaar',s:'Altijd bereikbaar'}],
    text:`Technische beveiliging is onlosmakelijk verbonden met menselijke opvolging. Onze eigen meldkamer monitort uw camerasystemen en alarmen continu en stuurt direct een interventieteam als dat nodig is.\n\nWij werken samen met alle grote camerafabrikanten en kunnen koppelen aan uw bestaande installatie. Geen grote verbouwing, gewoon directe professionele opvolging van wat u al heeft.\n\nIncidenten worden nauwkeurig geregistreerd en gerapporteerd. U ontvangt na elk incident een volledig rapport met tijdstippen, acties en aanbevelingen.` },
]

const FU = ({children,delay=0,style={},className=''}:any) => {
  const ref=useRef(null); const v=useInView(ref,{once:true,margin:'-40px'})
  return <motion.div ref={ref} style={style} className={className} initial={{opacity:0,y:28}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.6,delay,ease:[0.22,1,0.36,1]}}>{children}</motion.div>
}
const FL = ({children,delay=0,style={}}:any) => {
  const ref=useRef(null); const v=useInView(ref,{once:true,margin:'-40px'})
  return <motion.div ref={ref} style={style} initial={{opacity:0,x:-32}} animate={v?{opacity:1,x:0}:{}} transition={{duration:0.65,delay,ease:[0.22,1,0.36,1]}}>{children}</motion.div>
}
const FR = ({children,delay=0,style={}}:any) => {
  const ref=useRef(null); const v=useInView(ref,{once:true,margin:'-40px'})
  return <motion.div ref={ref} style={style} initial={{opacity:0,x:32}} animate={v?{opacity:1,x:0}:{}} transition={{duration:0.65,delay,ease:[0.22,1,0.36,1]}}>{children}</motion.div>
}
const CU = ({end,suffix=''}:{end:number;suffix?:string}) => {
  const ref=useRef(null); const v=useInView(ref,{once:true}); const [n,setN]=useState(0)
  useEffect(()=>{
    if(!v) return; let s=0; const step=end/55
    const t=setInterval(()=>{ s+=step; if(s>=end){setN(end);clearInterval(t)}else setN(Math.floor(s)) },18)
    return ()=>clearInterval(t)
  },[v,end])
  return <span ref={ref}>{n}{suffix}</span>
}
const ScrollTop = () => { const {pathname}=useLocation(); useEffect(()=>{window.scrollTo(0,0)},[pathname]); return null }

// ─── WA BUBBLE ───
const WA = () => {
  const [open,setOpen]=useState(false); const [typed,setTyped]=useState(''); const [btns,setBtns]=useState(false)
  const msg='Goedemiddag! Ik ben Mark van SecureForce. Hoe kan ik u helpen?'
  useEffect(()=>{
    if(!open){setTyped('');setBtns(false);return}
    let i=0; const t=setInterval(()=>{i++;setTyped(msg.slice(0,i));if(i>=msg.length){clearInterval(t);setTimeout(()=>setBtns(true),350)}},24)
    return ()=>clearInterval(t)
  },[open])
  return (
    <>
      <AnimatePresence>
        {open&&(
          <motion.div initial={{opacity:0,scale:0.88,y:18}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.88,y:18}}
            transition={{type:'spring',stiffness:300,damping:26}}
            style={{position:'fixed',bottom:88,right:20,zIndex:499,width:288,background:'var(--bg2)',border:'1px solid rgba(240,165,0,0.2)',borderRadius:18,overflow:'hidden',boxShadow:'0 20px 60px rgba(0,0,0,0.7)'}}>
            <div style={{background:'rgba(240,165,0,0.07)',borderBottom:'1px solid rgba(240,165,0,0.14)',padding:'13px 15px',display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:36,height:36,borderRadius:9,background:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center'}}><Shield size={18} color="#000" fill="#000"/></div>
              <div><div style={{color:'#fff',fontWeight:700,fontSize:13}}>SecureForce</div><div style={{fontSize:11,color:'#25d366',display:'flex',alignItems:'center',gap:4}}><div style={{width:6,height:6,borderRadius:'50%',background:'#25d366'}}/>24/7</div></div>
              <button onClick={()=>setOpen(false)} style={{marginLeft:'auto',background:'none',border:'none',color:'var(--gray2)',cursor:'pointer',fontSize:20}}>x</button>
            </div>
            <div style={{background:'#080a0f',padding:'16px 13px',minHeight:80}}>
              <div style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'3px 12px 12px 12px',padding:'10px 12px',maxWidth:'88%'}}>
                <div style={{fontSize:13,color:'#ccc',lineHeight:1.55,minHeight:18}}>
                  {typed}{typed.length<msg.length&&<motion.span animate={{opacity:[1,0,1]}} transition={{duration:0.7,repeat:Infinity}} style={{color:'var(--gold)',fontWeight:700}}>|</motion.span>}
                </div>
                <div style={{fontSize:10,color:'var(--gray2)',marginTop:4,textAlign:'right'}}>Nu</div>
              </div>
            </div>
            <AnimatePresence>
              {btns&&(
                <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} style={{padding:'12px 13px 15px',display:'flex',flexDirection:'column',gap:8,background:'var(--bg2)',borderTop:'1px solid var(--border)'}}>
                  <motion.a href="https://wa.me/31612345678" target="_blank" rel="noopener" whileHover={{scale:1.02}} whileTap={{scale:0.97}} style={{background:'#25d366',color:'#fff',padding:'11px 16px',borderRadius:100,fontSize:13,fontWeight:700,textAlign:'center',display:'block'}}>Stuur bericht</motion.a>
                  <Link to="/contact" onClick={()=>setOpen(false)}>
                    <div style={{background:'var(--gold)',color:'#000',padding:'11px 16px',borderRadius:100,fontSize:13,fontWeight:700,textAlign:'center'}}>Contactformulier</div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button onClick={()=>setOpen(o=>!o)} whileHover={{scale:1.1}} whileTap={{scale:0.92}}
        animate={!open?{boxShadow:['0 0 0 0 rgba(37,211,102,0.5)','0 0 0 12px rgba(37,211,102,0)','0 0 0 0 rgba(37,211,102,0)']}:{}}
        transition={!open?{duration:2.5,repeat:Infinity}:{}}
        style={{position:'fixed',bottom:20,right:20,zIndex:500,width:56,height:56,borderRadius:'50%',background:'#25d366',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 20px rgba(37,211,102,0.4)'}}>
        <AnimatePresence mode="wait">
          {open?<motion.div key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}}><X size={22} color="#fff"/></motion.div>
               :<motion.div key="wa" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}}><MessageCircle size={24} fill="white" color="white"/></motion.div>}
        </AnimatePresence>
      </motion.button>
    </>
  )
}

// ─── NAV ───
const Nav = () => {
  const [mob,setMob]=useState(false); const [dd,setDd]=useState(false); const [mobSvc,setMobSvc]=useState(false)
  const ddRef=useRef<HTMLDivElement>(null); const location=useLocation()
  useEffect(()=>{setMob(false);setDd(false)},[location])
  useEffect(()=>{ const h=(e:MouseEvent)=>{if(ddRef.current&&!ddRef.current.contains(e.target as Node))setDd(false)}; document.addEventListener('mousedown',h); return ()=>document.removeEventListener('mousedown',h) },[])
  return (
    <>
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:300,height:64,background:'var(--bg)',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center'}}>
        <div className="wrap" style={{width:'100%',display:'flex',alignItems:'center'}}>
          <Link to="/" className="d-logo" style={{display:'flex',alignItems:'center',gap:10,fontWeight:700,fontSize:18,color:'#fff',letterSpacing:'0.02em'}}>
            <div style={{width:32,height:32,background:'var(--gold)',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Shield size={17} color="#000" fill="#000"/></div>
            SECURE<span style={{color:'var(--gold)'}}>FORCE</span>
          </Link>
          <div className="d-links" style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:4}}>
            <div ref={ddRef} style={{position:'relative'}}>
              <button onMouseEnter={()=>setDd(true)} onClick={()=>setDd(d=>!d)}
                style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:5,padding:'8px 14px',fontSize:13,fontWeight:600,color:dd?'var(--gold)':'var(--gray)',letterSpacing:'0.07em',textTransform:'uppercase'}}>
                Diensten <ChevronDown size={13} style={{transition:'transform 0.2s',transform:dd?'rotate(180deg)':'rotate(0deg)'}}/>
              </button>
              <AnimatePresence>
                {dd&&(
                  <motion.div onMouseLeave={()=>setDd(false)}
                    initial={{opacity:0,y:8,scale:0.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8,scale:0.97}}
                    transition={{duration:0.18}}
                    style={{position:'absolute',top:'100%',left:'50%',transform:'translateX(-50%)',marginTop:8,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden',width:340,boxShadow:'0 20px 60px rgba(0,0,0,0.6)',zIndex:400}}>
                    <Link to="/diensten" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 18px',background:'rgba(240,165,0,0.07)',borderBottom:'1px solid var(--border)'}}>
                      <span style={{fontSize:12,fontWeight:700,color:'var(--gold)',letterSpacing:'0.08em',textTransform:'uppercase'}}>Alle diensten bekijken</span>
                      <ChevronRight size={13} color="var(--gold)"/>
                    </Link>
                    {SERVICES.map(s=>{const I=s.icon; return(
                      <Link key={s.slug} to={`/diensten/${s.slug}`}
                        style={{display:'flex',alignItems:'center',gap:14,padding:'14px 18px',borderBottom:'1px solid var(--border)',transition:'background 0.15s'}}
                        onMouseEnter={e=>(e.currentTarget as any).style.background='rgba(255,255,255,0.03)'}
                        onMouseLeave={e=>(e.currentTarget as any).style.background='transparent'}>
                        <div style={{width:36,height:36,background:'var(--gold2)',border:'1px solid var(--gold3)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><I size={16} color="var(--gold)"/></div>
                        <div><div style={{fontSize:13,fontWeight:700,color:'#fff',marginBottom:2}}>{s.title}</div><div style={{fontSize:11,color:'var(--gray2)',fontWeight:300}}>{s.short}</div></div>
                        <ChevronRight size={13} color="var(--gray2)" style={{marginLeft:'auto',flexShrink:0}}/>
                      </Link>
                    )})}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {[{label:'Over ons',to:'/over-ons'},{label:'Contact',to:'/contact'}].map(l=>(
              <Link key={l.to} to={l.to} style={{padding:'8px 14px',fontSize:13,fontWeight:600,color:'var(--gray)',letterSpacing:'0.07em',textTransform:'uppercase',transition:'color 0.15s'}}
                onMouseEnter={e=>(e.currentTarget as any).style.color='var(--gold)'}
                onMouseLeave={e=>(e.currentTarget as any).style.color='var(--gray)'}>{l.label}</Link>
            ))}
            <motion.a href="tel:0612345678" whileHover={{scale:1.04}} whileTap={{scale:0.97}}
              style={{marginLeft:8,background:'var(--gold)',color:'#000',padding:'9px 22px',borderRadius:6,fontSize:13,fontWeight:700,display:'flex',alignItems:'center',gap:7}}>
              <Phone size={13}/> Bel direct
            </motion.a>
          </div>
          <button onClick={()=>setMob(o=>!o)} className="m-hb" style={{display:'none',background:'none',border:'none',cursor:'pointer',padding:8,color:'#fff',alignItems:'center',justifyContent:'center'}}>
            {mob?<X size={22}/>:<Menu size={22}/>}
          </button>
          <Link to="/" className="m-logo" style={{display:'none',position:'absolute',left:'50%',transform:'translateX(-50%)',fontWeight:700,fontSize:16,color:'#fff',alignItems:'center',gap:7}}>
            <Shield size={14} color="var(--gold)" fill="var(--gold)"/>SECURE<span style={{color:'var(--gold)'}}>FORCE</span>
          </Link>
          <a href="tel:0612345678" className="m-phone" style={{display:'none',marginLeft:'auto',color:'var(--gold)',padding:8,alignItems:'center'}}><Phone size={22} color="var(--gold)"/></a>
        </div>
      </nav>
      <AnimatePresence>
        {mob&&(
          <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
            style={{position:'fixed',top:64,left:0,right:0,zIndex:299,background:'var(--bg2)',borderBottom:'1px solid var(--border)',padding:'12px 20px 24px',display:'flex',flexDirection:'column',gap:2,maxHeight:'calc(100vh - 64px)',overflowY:'auto'}}>
            <div>
              <button onClick={()=>setMobSvc(s=>!s)} style={{width:'100%',background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 12px',fontSize:17,fontWeight:600,color:'#fff',borderRadius:6,textAlign:'left'}}>
                Diensten <ChevronDown size={16} color="var(--gold)" style={{transform:mobSvc?'rotate(180deg)':'none',transition:'transform 0.2s'}}/>
              </button>
              <AnimatePresence>
                {mobSvc&&(
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} style={{overflow:'hidden',paddingLeft:12}}>
                    <Link to="/diensten" onClick={()=>setMob(false)} style={{display:'block',padding:'10px 12px',fontSize:13,color:'var(--gold)',fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase'}}>Alle diensten</Link>
                    {SERVICES.map(s=>{const I=s.icon; return(
                      <Link key={s.slug} to={`/diensten/${s.slug}`} onClick={()=>setMob(false)} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:8}}>
                        <I size={15} color="var(--gold)"/><span style={{fontSize:15,color:'#fff',fontWeight:500}}>{s.title}</span>
                      </Link>
                    )})}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {[{label:'Over ons',to:'/over-ons'},{label:'Contact',to:'/contact'}].map((l,i)=>(
              <motion.div key={l.to} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:i*0.06+0.1}}>
                <Link to={l.to} onClick={()=>setMob(false)} style={{display:'block',padding:'14px 12px',fontSize:17,fontWeight:600,color:'#fff',borderRadius:6}}>{l.label}</Link>
              </motion.div>
            ))}
            <motion.a href="tel:0612345678" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.28}}
              style={{marginTop:10,background:'var(--gold)',color:'#000',padding:'14px 20px',borderRadius:6,textAlign:'center',fontSize:15,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
              <Phone size={16}/> 06-12345678
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(min-width:769px){.m-hb,.m-logo,.m-phone{display:none!important}.d-logo,.d-links{display:flex!important}}@media(max-width:768px){.d-logo,.d-links{display:none!important}.m-hb,.m-logo,.m-phone{display:flex!important}}`}</style>
    </>
  )
}

// ─── FOOTER ───
const Footer = () => {
  const [top,setTop]=useState(false)
  useEffect(()=>{const h=()=>setTop(window.scrollY>400);window.addEventListener('scroll',h,{passive:true});return ()=>window.removeEventListener('scroll',h)},[])
  return (
    <>
      <footer style={{background:'#030405',borderTop:'1px solid var(--border)',padding:'52px 0 28px'}}>
        <div className="wrap">
          <div className="f-grid" style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:52,marginBottom:36,paddingBottom:36,borderBottom:'1px solid var(--border)'}}>
            <div>
              <Link to="/" style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
                <div style={{width:30,height:30,background:'var(--gold)',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center'}}><Shield size={15} color="#000" fill="#000"/></div>
                <span style={{fontWeight:700,fontSize:17,color:'#fff'}}>SECURE<span style={{color:'var(--gold)'}}>FORCE</span></span>
              </Link>
              <p style={{fontSize:13,color:'var(--gray2)',lineHeight:1.75,maxWidth:240,marginBottom:16}}>Professionele beveiligingsdiensten voor bedrijven, locaties en evenementen in heel Nederland.</p>
              <div style={{display:'flex',gap:6}}>
                {['VBV','ISO 9001','ECABO'].map(b=><div key={b} style={{background:'var(--gold2)',border:'1px solid var(--gold3)',color:'var(--gold)',fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:3,letterSpacing:'0.06em'}}>{b}</div>)}
              </div>
            </div>
            <div>
              <div style={{fontSize:10,fontWeight:700,color:'var(--gray2)',letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>Diensten</div>
              {SERVICES.map(s=><Link key={s.slug} to={`/diensten/${s.slug}`} style={{display:'block',fontSize:13,color:'var(--gray2)',marginBottom:8,transition:'color 0.15s'}} onMouseEnter={e=>(e.currentTarget as any).style.color='var(--gold)'} onMouseLeave={e=>(e.currentTarget as any).style.color='var(--gray2)'}>{s.title}</Link>)}
            </div>
            <div>
              <div style={{fontSize:10,fontWeight:700,color:'var(--gray2)',letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:14}}>Bedrijf</div>
              {[{label:'Over ons',to:'/over-ons'},{label:'Contact',to:'/contact'},{label:'Alle diensten',to:'/diensten'}].map(l=><Link key={l.to} to={l.to} style={{display:'block',fontSize:13,color:'var(--gray2)',marginBottom:8,transition:'color 0.15s'}} onMouseEnter={e=>(e.currentTarget as any).style.color='var(--gold)'} onMouseLeave={e=>(e.currentTarget as any).style.color='var(--gray2)'}>{l.label}</Link>)}
              <div style={{marginTop:16}}>
                <div style={{fontSize:13,color:'var(--gray2)',marginBottom:6}}>06-12345678</div>
                <div style={{fontSize:13,color:'var(--gray2)',marginBottom:12}}>info@secureforce.nl</div>
                <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'#25d366',fontWeight:600}}>
                  <div style={{width:6,height:6,background:'#25d366',borderRadius:'50%',animation:'pulse 2s infinite'}}/>24/7 bereikbaar
                </div>
              </div>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
            <div style={{fontSize:12,color:'var(--gray2)'}}>2026 SecureForce BV · KvK: 87654321 · Vision Builder</div>
            <div style={{display:'flex',gap:18}}>{['Privacy','Voorwaarden','Cookies'].map(l=><a key={l} href="#" style={{fontSize:12,color:'var(--gray2)'}}>{l}</a>)}</div>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {top&&(
          <motion.button initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.8}}
            whileHover={{scale:1.1}} whileTap={{scale:0.9}}
            onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
            style={{position:'fixed',bottom:88,right:20,zIndex:300,width:44,height:44,borderRadius:4,background:'var(--gold)',color:'#000',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 16px rgba(240,165,0,0.35)'}}>
            <ArrowUp size={18}/>
          </motion.button>
        )}
      </AnimatePresence>
      <style>{`@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4)}50%{box-shadow:0 0 0 6px rgba(37,211,102,0)}}@media(max-width:600px){.f-grid{grid-template-columns:1fr 1fr!important;gap:24px!important}.f-grid>div:first-child{grid-column:1/-1}}`}</style>
    </>
  )
}

// ─── SHARED: PAGE HEADER ───
const PageHeader = ({eyebrow,title,sub}:{eyebrow:string;title:string;sub?:string}) => (
  <div style={{paddingTop:64,background:'var(--bg2)',borderBottom:'1px solid var(--border)'}}>
    <div className="wrap" style={{padding:'60px 20px 52px'}}>
      <FU>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
          <div style={{width:3,height:16,background:'var(--gold)',flexShrink:0}}/>
          <span style={{fontFamily:'Space Mono,monospace',fontSize:11,fontWeight:700,color:'var(--gold)',letterSpacing:'0.22em',textTransform:'uppercase'}}>{eyebrow}</span>
        </div>
        <h1 style={{color:'#fff',marginBottom:sub?12:0}}>{title}</h1>
        {sub&&<p style={{fontSize:17,color:'var(--gray)',fontWeight:300,maxWidth:560,lineHeight:1.75}}>{sub}</p>}
      </FU>
    </div>
  </div>
)

// ─── SHARED: SECTION LABEL ───
const SLabel = ({text}:{text:string}) => (
  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
    <div style={{width:3,height:14,background:'var(--gold)',flexShrink:0}}/>
    <span style={{fontFamily:'Space Mono,monospace',fontSize:11,fontWeight:700,color:'var(--gold)',letterSpacing:'0.22em',textTransform:'uppercase'}}>{text}</span>
  </div>
)

// ─────────────────────────────────────────────
// PAGE: HOME
// ─────────────────────────────────────────────
const PageHome = () => {
  const {scrollY}=useScroll()
  const bgY=useTransform(scrollY,[0,700],[0,80])
  const reviews=[
    {t:'SecureForce bewaakt ons complex al 4 jaar. Absolute professionals.',name:'ING Nederland',role:'Facility Manager',stars:5},
    {t:'Voor ons festival met 12.000 bezoekers vlekkeloos geregeld. Topkwaliteit.',name:'Rebirth Festival',role:'Evenementenorganisator',stars:5},
    {t:'Al 6 jaar onze vaste partner. Snelle respons en transparante communicatie.',name:'CBRE Netherlands',role:'Vastgoedbeheer',stars:5},
    {t:'De receptionisten zijn een visitekaartje voor ons bedrijf. Representatief.',name:'Deloitte Amsterdam',role:'Office Manager',stars:5},
  ]
  return (
    <>
      {/* HERO */}
      <section style={{position:'relative',height:'100svh',minHeight:560,display:'flex',alignItems:'flex-start',overflow:'hidden'}}>
        <motion.div style={{y:bgY,position:'absolute',inset:'0',zIndex:0}}>
          <img src={IMG.hero} alt="SecureForce" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 20%',display:'block'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(100deg,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.6) 55%,rgba(0,0,0,0.2) 100%)'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(6,7,10,0.95) 0%,transparent 60%)'}}/>
          <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1.6,ease:[0.22,1,0.36,1]}}
            style={{position:'absolute',bottom:0,left:0,right:0,height:2,background:'linear-gradient(90deg,var(--gold),transparent 70%)',transformOrigin:'left'}}/>
        </motion.div>
        <div className="wrap hero-wrap" style={{position:'relative',zIndex:1,width:'100%',paddingTop:'calc(64px + 48px)',paddingBottom:64}}>
          <div style={{maxWidth:620}}>
            <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.2}} style={{display:'flex',alignItems:'center',gap:10,marginBottom:26}}>
              <div style={{width:3,height:20,background:'var(--gold)',flexShrink:0}}/>
              <span style={{fontFamily:'Space Mono,monospace',fontSize:11,fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--gold)'}}>VBV-Gecertificeerd · Nederland</span>
            </motion.div>
            <motion.h1 initial={{opacity:0,y:36}} animate={{opacity:1,y:0}} transition={{duration:0.85,delay:0.3,ease:[0.22,1,0.36,1]}} style={{color:'#fff',marginBottom:22,letterSpacing:'-0.02em',lineHeight:1.06}}>
              Beveiliging die<br/>
              <span style={{color:'var(--gold)',position:'relative',display:'inline-block'}}>
                resultaten levert.
                <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:1.0,duration:0.7,ease:'easeOut'}} style={{position:'absolute',bottom:-4,left:0,right:0,height:2,background:'var(--gold)',transformOrigin:'left',opacity:0.5}}/>
              </span>
            </motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.45}} style={{fontSize:18,color:'rgba(255,255,255,0.7)',lineHeight:1.8,marginBottom:40,fontWeight:300,maxWidth:500}}>
              Professionele bewaking, receptiebeveiliging en evenementenbeveiliging voor bedrijven in heel Nederland. Dag en nacht operationeel.
            </motion.p>
            <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.56}} style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <Link to="/contact"><motion.div whileHover={{scale:1.04,boxShadow:'0 8px 28px rgba(240,165,0,0.4)'}} whileTap={{scale:0.97}} style={{background:'var(--gold)',color:'#000',padding:'14px 28px',borderRadius:6,fontSize:15,fontWeight:700,display:'flex',alignItems:'center',gap:8,cursor:'pointer',boxShadow:'0 4px 20px rgba(240,165,0,0.3)'}}>Gratis offerte <ChevronRight size={16}/></motion.div></Link>
              <Link to="/diensten"><motion.div style={{background:'transparent',color:'#fff',padding:'14px 28px',borderRadius:6,fontSize:15,fontWeight:600,border:'1px solid rgba(255,255,255,0.22)',cursor:'pointer',transition:'all 0.2s'}} whileHover={{borderColor:'var(--gold)',color:'var(--gold)'}} whileTap={{scale:0.97}}>Onze diensten</motion.div></Link>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}} style={{position:'absolute',bottom:28,left:'50%',transform:'translateX(-50%)',zIndex:2}}>
          <motion.div animate={{y:[0,8,0]}} transition={{duration:1.8,repeat:Infinity}}><ChevronDown size={20} color="rgba(255,255,255,0.4)"/></motion.div>
        </motion.div>
      </section>

      {/* TRUST */}
      <section style={{background:'var(--bg2)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',padding:'48px 0'}}>
        <div className="wrap">
          <div className="tg" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
            {[{n:15,s:'+',l:'Jaar actief'},{n:850,s:'+',l:'Beveiligde objecten'},{n:120,s:'+',l:'Medewerkers'},{n:24,s:'/7',l:'Bereikbaar'}].map((s,i)=>(
              <FU key={i} delay={i*0.09}><div style={{textAlign:'center',padding:'0 12px',borderRight:i<3?'1px solid var(--border)':'none'}}>
                <div style={{fontSize:38,fontWeight:700,color:'var(--gold)',lineHeight:1,marginBottom:8}}><CU end={s.n} suffix={s.s}/></div>
                <div style={{fontSize:12,color:'var(--gray)',letterSpacing:'0.07em',textTransform:'uppercase',fontWeight:500}}>{s.l}</div>
              </div></FU>
            ))}
          </div>
        </div>
        <style>{`.tg{}@media(max-width:600px){.tg{grid-template-columns:repeat(2,1fr)!important;gap:1px!important;background:var(--border)!important}.tg>div{background:var(--bg2);padding:20px 8px!important;border-right:none!important}}@media(max-width:768px){.hero-wrap{padding-top:calc(64px + 20px)!important;padding-bottom:40px!important}}`}</style>
      </section>

      {/* DIENSTEN PREVIEW */}
      <section style={{padding:'96px 0',background:'var(--bg)'}}>
        <div className="wrap">
          <FU style={{marginBottom:60}}>
            <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:20}}>
              <div><SLabel text="Wat wij bieden"/><h2 style={{color:'#fff'}}>Vier gespecialiseerde<br/>beveiligingsdiensten</h2></div>
              <Link to="/diensten"><motion.div whileHover={{scale:1.03,background:'var(--gold)',color:'#000'}} style={{color:'var(--gold)',padding:'12px 22px',border:'1px solid var(--gold)',borderRadius:6,fontSize:13,fontWeight:700,cursor:'pointer',transition:'all 0.2s',whiteSpace:'nowrap'}}>Alle diensten</motion.div></Link>
            </div>
          </FU>
          <div className="sg" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:2,background:'var(--border)'}}>
            {SERVICES.map((s,i)=>{const I=s.icon; return(
              <FU key={i} delay={i*0.09}>
                <Link to={`/diensten/${s.slug}`} style={{display:'block',height:'100%'}}>
                  <motion.div whileHover={{y:-5}} style={{background:'var(--bg3)',display:'flex',flexDirection:'column',height:'100%',border:'1px solid transparent',transition:'border-color 0.25s',cursor:'pointer'}}
                    onMouseEnter={e=>(e.currentTarget as any).style.borderColor='rgba(240,165,0,0.35)'}
                    onMouseLeave={e=>(e.currentTarget as any).style.borderColor='transparent'}>
                    <div style={{height:200,overflow:'hidden',position:'relative',flexShrink:0}}>
                      <motion.img src={s.img} alt={s.title} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:s.imgPos,display:'block'}} whileHover={{scale:1.06}} transition={{duration:0.5}}/>
                      <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%)',pointerEvents:'none'}}/>
                      <div style={{position:'absolute',top:12,left:12,fontFamily:'Space Mono,monospace',fontSize:10,fontWeight:700,color:'var(--gold)',background:'rgba(0,0,0,0.65)',padding:'2px 7px'}}>{s.num}</div>
                    </div>
                    <div style={{height:2,background:'linear-gradient(90deg,var(--gold),transparent)',flexShrink:0}}/>
                    <div style={{padding:'18px 16px 22px',flex:1,display:'flex',flexDirection:'column',gap:10}}>
                      <div style={{display:'flex',alignItems:'center',gap:8}}><I size={18} color="var(--gold)"/><h3 style={{color:'#fff',fontSize:15,fontWeight:700}}>{s.title}</h3></div>
                      <p style={{fontSize:13,color:'var(--gray)',lineHeight:1.75,fontWeight:300,flex:1}}>{s.short}</p>
                      <div style={{display:'flex',alignItems:'center',gap:5,fontSize:11,fontWeight:700,color:'var(--gold)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:4}}>Meer info <ChevronRight size={11}/></div>
                    </div>
                  </motion.div>
                </Link>
              </FU>
            )})}
          </div>
        </div>
        <style>{`@media(max-width:768px){.sg{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:420px){.sg{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* OVER ONS teaser */}
      <section style={{padding:'96px 0',background:'var(--bg2)'}}>
        <div className="wrap">
          <div className="ag" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center'}}>
            <FL>
              <div style={{position:'relative'}}>
                <div style={{position:'absolute',top:-10,left:-10,width:40,height:40,borderTop:'2px solid var(--gold)',borderLeft:'2px solid var(--gold)',zIndex:2}}/>
                <div style={{position:'absolute',bottom:-10,right:-10,width:40,height:40,borderBottom:'2px solid var(--gold)',borderRight:'2px solid var(--gold)',zIndex:2}}/>
                <div style={{borderRadius:4,overflow:'hidden',aspectRatio:'4/5'}}>
                  <img src={IMG.team} alt="SecureForce team" loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top',display:'block'}}/>
                </div>
                <motion.div initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.4}} style={{position:'absolute',bottom:24,left:-18,zIndex:3,background:'var(--gold)',color:'#000',padding:'13px 18px',borderRadius:4,boxShadow:'0 8px 28px rgba(240,165,0,0.4)'}}>
                  <div style={{fontSize:32,fontWeight:700,lineHeight:1}}>15+</div>
                  <div style={{fontSize:11,fontWeight:700,marginTop:2,letterSpacing:'0.05em',textTransform:'uppercase'}}>jaar ervaring</div>
                </motion.div>
                <motion.div initial={{opacity:0,y:-12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.55}} style={{position:'absolute',top:22,right:-16,zIndex:3,background:'var(--bg)',border:'1px solid rgba(240,165,0,0.3)',color:'var(--gold)',borderRadius:4,padding:'7px 13px',fontSize:12,fontWeight:700,display:'flex',alignItems:'center',gap:7}}>
                  <div style={{width:7,height:7,background:'#25d366',borderRadius:'50%',animation:'pulse 2s infinite'}}/>24/7 ACTIEF
                </motion.div>
              </div>
            </FL>
            <FR>
              <SLabel text="Over SecureForce"/>
              <h2 style={{color:'#fff',marginBottom:20}}>Vakmanschap.<br/>Integriteit. Resultaat.</h2>
              <p style={{fontSize:15,color:'var(--gray)',lineHeight:1.85,marginBottom:14,fontWeight:300}}>Opgericht in 2009, heeft SecureForce zich ontwikkeld tot een toonaangevend beveiligingsbedrijf in Nederland. Geen uitzendpersoneel. Vaste, gecertificeerde professionals.</p>
              <p style={{fontSize:15,color:'var(--gray)',lineHeight:1.85,marginBottom:32,fontWeight:300}}>Alle medewerkers zijn VBV-gecertificeerd en werken met vaste teams die uw locatie kennen.</p>
              <Link to="/over-ons">
                <motion.div whileHover={{scale:1.03,background:'var(--gold)',color:'#000'}} style={{display:'inline-flex',alignItems:'center',gap:8,color:'var(--gold)',padding:'12px 22px',border:'1px solid var(--gold)',borderRadius:6,fontSize:13,fontWeight:700,cursor:'pointer',transition:'all 0.2s'}}>
                  Lees meer <ChevronRight size={14}/>
                </motion.div>
              </Link>
            </FR>
          </div>
        </div>
        <style>{`@media(max-width:768px){.ag{grid-template-columns:1fr!important;gap:44px!important}}`}</style>
      </section>

      {/* REVIEWS */}
      <section style={{padding:'96px 0',background:'var(--bg)'}}>
        <div className="wrap">
          <FU style={{marginBottom:52}}><SLabel text="Klantervaringen"/><h2 style={{color:'#fff'}}>Wat onze klanten zeggen</h2></FU>
          <div className="rg" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:2,background:'var(--border)'}}>
            {reviews.map((r,i)=>(
              <FU key={i} delay={i*0.1}>
                <motion.div whileHover={{background:'var(--bg3)'}} style={{background:'var(--bg2)',padding:'32px 26px',position:'relative',overflow:'hidden',transition:'background 0.2s'}}>
                  <div style={{position:'absolute',top:-10,left:18,fontSize:120,fontWeight:700,color:'var(--gold)',opacity:0.06,lineHeight:1,userSelect:'none'}}>"</div>
                  <div style={{display:'flex',gap:2,marginBottom:16}}>{[...Array(r.stars)].map((_,j)=><Star key={j} size={13} fill="var(--gold)" color="var(--gold)"/>)}</div>
                  <p style={{fontSize:14,color:'var(--gray)',lineHeight:1.8,marginBottom:24,fontWeight:300,position:'relative'}}>"{r.t}"</p>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:40,height:40,borderRadius:4,background:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,color:'#000',flexShrink:0}}>{r.name[0]}</div>
                    <div><div style={{fontSize:13,fontWeight:700,color:'#fff'}}>{r.name}</div><div style={{fontSize:12,color:'var(--gray2)'}}>{r.role}</div></div>
                  </div>
                </motion.div>
              </FU>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:640px){.rg{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* GALLERY */}
      <section style={{padding:'80px 0',background:'var(--bg2)'}}>
        <div className="wrap">
          <FU style={{marginBottom:36}}><SLabel text="Fotogalerij"/><h2 style={{color:'#fff'}}>SecureForce <span style={{color:'var(--gold)'}}>in beeld</span></h2></FU>
          <div className="gd" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gridTemplateRows:'240px 240px',gap:3}}>
            {[{src:IMG.object,label:'Objectbeveiliging',tall:true},{src:IMG.hero,label:'Onze medewerkers'},{src:IMG.team,label:'Ons team'},{src:IMG.event,label:'Evenementenbeveiliging',wide:true}].map((p,i)=>(
              <motion.div key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}} style={{position:'relative',overflow:'hidden',gridRow:p.tall?'1/3':undefined,gridColumn:(p as any).wide?'2/4':undefined}}>
                <motion.img src={p.src} alt={p.label} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} whileHover={{scale:1.04}} transition={{duration:0.5}}/>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 50%)',pointerEvents:'none'}}/>
                <motion.div initial={{opacity:0}} whileHover={{opacity:1}} style={{position:'absolute',inset:0,background:'rgba(240,165,0,0.06)',borderTop:'2px solid var(--gold)',pointerEvents:'none'}}/>
                <div style={{position:'absolute',bottom:14,left:14,fontSize:12,fontWeight:700,color:'#fff'}}>{p.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="gm" style={{display:'none',gridTemplateColumns:'1fr 1fr',gap:3}}>
            {[IMG.object,IMG.event,IMG.receptie,IMG.team].map((src,i)=>(
              <div key={i} style={{height:160,overflow:'hidden'}}><img src={src} alt={`Foto ${i+1}`} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:600px){.gd{display:none!important}.gm{display:grid!important}}`}</style>
      </section>

      {/* CTA */}
      <section style={{padding:'80px 0',background:'var(--bg3)',borderTop:'1px solid var(--border)'}}>
        <div className="wrap" style={{textAlign:'center'}}>
          <FU>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginBottom:16}}>
              <div style={{width:3,height:14,background:'var(--gold)',flexShrink:0}}/><span style={{fontFamily:'Space Mono,monospace',fontSize:11,fontWeight:700,color:'var(--gold)',letterSpacing:'0.22em',textTransform:'uppercase'}}>Direct starten</span><div style={{width:3,height:14,background:'var(--gold)',flexShrink:0}}/>
            </div>
            <h2 style={{color:'#fff',marginBottom:16}}>Klaar voor professionele beveiliging?</h2>
            <p style={{fontSize:16,color:'var(--gray)',maxWidth:480,margin:'0 auto 36px',fontWeight:300,lineHeight:1.75}}>Vraag vandaag nog een vrijblijvende offerte aan. Reactie binnen 2 uur.</p>
            <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
              <Link to="/contact"><motion.div whileHover={{scale:1.04,boxShadow:'0 8px 28px rgba(240,165,0,0.35)'}} whileTap={{scale:0.97}} style={{background:'var(--gold)',color:'#000',padding:'15px 32px',borderRadius:6,fontSize:15,fontWeight:700,display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>Gratis offerte aanvragen <ChevronRight size={16}/></motion.div></Link>
              <motion.a href="tel:0612345678" whileHover={{scale:1.03}} style={{background:'transparent',color:'#fff',padding:'15px 32px',borderRadius:6,fontSize:15,fontWeight:600,border:'1px solid rgba(255,255,255,0.2)',display:'flex',alignItems:'center',gap:8}}><Phone size={15}/> 06-12345678</motion.a>
            </div>
          </FU>
        </div>
      </section>
    </>
  )
}

// ─────────────────────────────────────────────
// PAGE: DIENSTEN OVERVIEW
// ─────────────────────────────────────────────
const PageDiensten = () => (
  <>
    <PageHeader eyebrow="Onze expertise" title="Onze diensten" sub="Van permanente objectbeveiliging tot evenementenbeveiliging. SecureForce levert de juiste mensen op de juiste plek, altijd gecertificeerd."/>
    <section style={{padding:'80px 0',background:'var(--bg)'}}>
      <div className="wrap">
        <div style={{display:'flex',flexDirection:'column',gap:3,background:'var(--border)'}}>
          {SERVICES.map((s,i)=>{const I=s.icon; return(
            <FU key={i} delay={i*0.08}>
              <Link to={`/diensten/${s.slug}`} style={{display:'block'}}>
                <motion.div whileHover={{x:4}} style={{background:i%2===0?'var(--bg2)':'var(--bg3)',display:'grid',gridTemplateColumns:'280px 1fr',border:'1px solid transparent',transition:'border-color 0.2s',cursor:'pointer'}} className="sr"
                  onMouseEnter={e=>(e.currentTarget as any).style.borderColor='rgba(240,165,0,0.3)'} onMouseLeave={e=>(e.currentTarget as any).style.borderColor='transparent'}>
                  <div style={{height:220,overflow:'hidden',position:'relative',flexShrink:0}}>
                    <motion.img src={s.img} alt={s.title} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:s.imgPos,display:'block'}} whileHover={{scale:1.05}} transition={{duration:0.5}}/>
                    <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,transparent 60%,rgba(0,0,0,0.4))',pointerEvents:'none'}}/>
                    <div style={{position:'absolute',top:12,left:12,fontFamily:'Space Mono,monospace',fontSize:10,fontWeight:700,color:'var(--gold)',background:'rgba(0,0,0,0.65)',padding:'2px 7px'}}>{s.num}</div>
                  </div>
                  <div style={{padding:'28px 32px',display:'flex',flexDirection:'column',justifyContent:'center',gap:12,borderLeft:'1px solid var(--border)'}}>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{width:40,height:40,background:'var(--gold2)',border:'1px solid var(--gold3)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><I size={18} color="var(--gold)"/></div>
                      <h3 style={{color:'#fff',fontSize:20,fontWeight:700}}>{s.title}</h3>
                    </div>
                    <p style={{fontSize:14,color:'var(--gray)',lineHeight:1.75,fontWeight:300,maxWidth:540}}>{s.intro}</p>
                    <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                      {s.bullets.slice(0,3).map(b=><div key={b} style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'var(--gray2)',background:'var(--bg)',border:'1px solid var(--border)',borderRadius:3,padding:'3px 8px'}}><div style={{width:3,height:3,borderRadius:'50%',background:'var(--gold)',flexShrink:0}}/>{b}</div>)}
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12,fontWeight:700,color:'var(--gold)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:4}}>Lees meer <ChevronRight size={13}/></div>
                  </div>
                </motion.div>
              </Link>
            </FU>
          )})}
        </div>
      </div>
    </section>
    <style>{`@media(max-width:640px){.sr{grid-template-columns:1fr!important}}`}</style>
  </>
)

// ─────────────────────────────────────────────
// PAGE: DIENST DETAIL
// ─────────────────────────────────────────────
const PageDienstDetail = ({slug}:{slug:string}) => {
  const service=SERVICES.find(s=>s.slug===slug)
  const navigate=useNavigate()
  if(!service) return <div style={{paddingTop:120,textAlign:'center',color:'#fff'}}>Niet gevonden.</div>
  const Icon=service.icon
  return (
    <>
      <div style={{paddingTop:64,position:'relative',height:420,overflow:'hidden'}}>
        <img src={service.img} alt={service.title} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:service.imgPos,display:'block'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.5) 60%,rgba(0,0,0,0.2) 100%)'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(6,7,10,0.9) 0%,transparent 60%)'}}/>
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:2,background:'linear-gradient(90deg,var(--gold),transparent 60%)'}}/>
        <div className="wrap" style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'flex-end',paddingBottom:40}}>
          <FU>
            <button onClick={()=>navigate(-1)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:7,color:'rgba(255,255,255,0.6)',fontSize:13,fontWeight:600,marginBottom:18,padding:0}}>
              <ArrowLeft size={14}/> Terug
            </button>
            <SLabel text={`Dienst ${service.num}`}/>
            <h1 style={{color:'#fff',marginBottom:12}}>{service.title}</h1>
            <p style={{fontSize:17,color:'rgba(255,255,255,0.72)',fontWeight:300,maxWidth:560,lineHeight:1.7}}>{service.intro}</p>
          </FU>
        </div>
      </div>
      <section style={{padding:'80px 0',background:'var(--bg)'}}>
        <div className="wrap">
          <div className="dg" style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:60,alignItems:'start'}}>
            <FL>
              <div>
                <div style={{marginBottom:48}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:24}}><div style={{width:3,height:16,background:'var(--gold)',flexShrink:0}}/><h3 style={{color:'#fff',fontSize:20}}>Wat is inbegrepen</h3></div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                    {service.bullets.map((b,i)=>(
                      <motion.div key={i} initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.07}} style={{display:'flex',alignItems:'flex-start',gap:10,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:6,padding:'14px 14px'}}>
                        <CheckCircle2 size={15} color="var(--gold)" style={{flexShrink:0,marginTop:1}}/>
                        <span style={{fontSize:14,color:'var(--gray)',fontWeight:400,lineHeight:1.5}}>{b}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div style={{marginBottom:48}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:24}}><div style={{width:3,height:16,background:'var(--gold)',flexShrink:0}}/><h3 style={{color:'#fff',fontSize:20}}>Over deze dienst</h3></div>
                  {service.text.trim().split('\n\n').map((p,i)=><p key={i} style={{fontSize:15,color:'var(--gray)',lineHeight:1.85,fontWeight:300,marginBottom:16}}>{p.trim()}</p>)}
                </div>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:24}}><div style={{width:3,height:16,background:'var(--gold)',flexShrink:0}}/><h3 style={{color:'#fff',fontSize:20}}>Waarom SecureForce</h3></div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    {service.usps.map((u,i)=>{const UI=u.icon; return(
                      <motion.div key={i} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}} style={{display:'flex',gap:12,alignItems:'flex-start',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:'16px 14px'}}>
                        <div style={{width:38,height:38,background:'var(--gold2)',border:'1px solid var(--gold3)',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><UI size={17} color="var(--gold)"/></div>
                        <div><div style={{fontSize:13,fontWeight:700,color:'#fff',marginBottom:3}}>{u.t}</div><div style={{fontSize:12,color:'var(--gray2)',fontWeight:300}}>{u.s}</div></div>
                      </motion.div>
                    )})}
                  </div>
                </div>
              </div>
            </FL>
            <FR>
              <div style={{position:'sticky',top:80}}>
                <div style={{borderRadius:6,overflow:'hidden',marginBottom:20,position:'relative'}}>
                  <img src={service.img} alt={service.title} loading="lazy" style={{width:'100%',aspectRatio:'3/2',objectFit:'cover',objectPosition:service.imgPos,display:'block'}}/>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'var(--gold)'}}/>
                </div>
                <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:'24px 22px',borderTop:'2px solid var(--gold)',marginBottom:14}}>
                  <h3 style={{color:'#fff',fontSize:17,marginBottom:8}}>Offerte aanvragen</h3>
                  <p style={{fontSize:13,color:'var(--gray2)',lineHeight:1.6,marginBottom:18}}>Vrijblijvend. Reactie binnen 2 uur op werkdagen.</p>
                  <Link to="/contact" style={{display:'block'}}>
                    <motion.div whileHover={{scale:1.02,boxShadow:'0 6px 20px rgba(240,165,0,0.3)'}} whileTap={{scale:0.97}} style={{background:'var(--gold)',color:'#000',padding:'13px 20px',borderRadius:6,fontSize:14,fontWeight:700,textAlign:'center',cursor:'pointer'}}>Gratis offerte</motion.div>
                  </Link>
                  <motion.a href="tel:0612345678" whileHover={{scale:1.02}} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:7,marginTop:10,color:'var(--gray)',padding:'11px 20px',borderRadius:6,fontSize:13,fontWeight:600,border:'1px solid var(--border)'}}>
                    <Phone size={13} color="var(--gold)"/> 06-12345678
                  </motion.a>
                </div>
                <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:'16px 18px',marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:700,color:'var(--gray2)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:12}}>Certificeringen</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                    {['VBV','ISO 9001','ECABO','BHV'].map(c=><div key={c} style={{display:'flex',alignItems:'center',gap:5,background:'var(--gold2)',border:'1px solid var(--gold3)',borderRadius:4,padding:'4px 10px'}}><div style={{width:4,height:4,background:'var(--gold)',borderRadius:'50%'}}/><span style={{fontSize:11,color:'var(--gold)',fontWeight:600}}>{c}</span></div>)}
                  </div>
                </div>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:'var(--gray2)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10}}>Andere diensten</div>
                  {SERVICES.filter(s=>s.slug!==slug).map(s=>{const SI=s.icon; return(
                    <Link key={s.slug} to={`/diensten/${s.slug}`} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                      <SI size={14} color="var(--gold)"/>
                      <span style={{fontSize:13,color:'var(--gray)',fontWeight:500,flex:1}}>{s.title}</span>
                      <ChevronRight size={12} color="var(--gray2)"/>
                    </Link>
                  )})}
                </div>
              </div>
            </FR>
          </div>
        </div>
        <style>{`@media(max-width:768px){.dg{grid-template-columns:1fr!important}}`}</style>
      </section>
    </>
  )
}

// ─────────────────────────────────────────────
// PAGE: OVER ONS
// ─────────────────────────────────────────────
const PageOverOns = () => (
  <>
    <div style={{paddingTop:64,position:'relative',height:380,overflow:'hidden'}}>
      <img src={IMG.team} alt="SecureForce team" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 20%',display:'block'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.5) 60%,rgba(0,0,0,0.2) 100%)'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(6,7,10,1) 0%,transparent 55%)'}}/>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:2,background:'linear-gradient(90deg,var(--gold),transparent 60%)'}}/>
      <div className="wrap" style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'flex-end',paddingBottom:40}}>
        <FU><SLabel text="Over ons"/><h1 style={{color:'#fff',marginBottom:10}}>Wij zijn SecureForce</h1>
          <p style={{fontSize:17,color:'rgba(255,255,255,0.72)',maxWidth:520,fontWeight:300,lineHeight:1.7}}>Vakmanschap, integriteit en resultaat.</p></FU>
      </div>
    </div>
    <section style={{background:'var(--bg2)',borderBottom:'1px solid var(--border)',padding:'48px 0'}}>
      <div className="wrap">
        <div className="tg3" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
          {[{n:15,s:'+',l:'Jaar actief'},{n:850,s:'+',l:'Beveiligde objecten'},{n:120,s:'+',l:'Medewerkers'},{n:24,s:'/7',l:'Bereikbaar'}].map((s,i)=>(
            <FU key={i} delay={i*0.09}><div style={{textAlign:'center',padding:'0 12px',borderRight:i<3?'1px solid var(--border)':'none'}}>
              <div style={{fontSize:38,fontWeight:700,color:'var(--gold)',lineHeight:1,marginBottom:8}}><CU end={s.n} suffix={s.s}/></div>
              <div style={{fontSize:12,color:'var(--gray)',letterSpacing:'0.07em',textTransform:'uppercase'}}>{s.l}</div>
            </div></FU>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:600px){.tg3{grid-template-columns:repeat(2,1fr)!important;gap:1px!important;background:var(--border)!important}.tg3>div{background:var(--bg2);padding:20px 8px!important;border-right:none!important}}`}</style>
    </section>
    <section style={{padding:'96px 0',background:'var(--bg)'}}>
      <div className="wrap">
        <div className="aog" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'start',marginBottom:80}}>
          <FL>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute',top:-10,left:-10,width:40,height:40,borderTop:'2px solid var(--gold)',borderLeft:'2px solid var(--gold)',zIndex:2}}/>
              <div style={{position:'absolute',bottom:-10,right:-10,width:40,height:40,borderBottom:'2px solid var(--gold)',borderRight:'2px solid var(--gold)',zIndex:2}}/>
              <div style={{borderRadius:4,overflow:'hidden'}}>
                <img src={IMG.team} alt="SecureForce team" loading="lazy" style={{width:'100%',aspectRatio:'4/5',objectFit:'cover',objectPosition:'center 15%',display:'block'}}/>
              </div>
              <motion.div initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.4}} style={{position:'absolute',bottom:24,left:-18,zIndex:3,background:'var(--gold)',color:'#000',padding:'13px 18px',borderRadius:4,boxShadow:'0 8px 28px rgba(240,165,0,0.4)'}}>
                <div style={{fontSize:32,fontWeight:700,lineHeight:1}}>2009</div>
                <div style={{fontSize:11,fontWeight:700,marginTop:2,letterSpacing:'0.05em',textTransform:'uppercase'}}>opgericht</div>
              </motion.div>
            </div>
          </FL>
          <FR>
            <SLabel text="Ons verhaal"/><h2 style={{color:'#fff',marginBottom:22}}>Gebouwd op vertrouwen</h2>
            {['SecureForce werd in 2009 opgericht met een doel: betrouwbare, professionele beveiliging leveren die echt het verschil maakt. Geen uitzendkrachten. Geen compromissen op kwaliteit.',
              'In de afgelopen 15 jaar zijn wij uitgegroeid tot een van de meest vertrouwde beveiligingsbedrijven van Nederland. Onze klanten werken jarenlang met dezelfde vaste teams.',
              'Alle medewerkers zijn VBV-gecertificeerd en doorlopen continue bijscholing. Wij selecteren op integriteit, stressbestendigheid en communicatieve vaardigheden. Dat is het SecureForce verschil.'
            ].map((t,i)=><p key={i} style={{fontSize:15,color:'var(--gray)',lineHeight:1.85,marginBottom:14,fontWeight:300}}>{t}</p>)}
          </FR>
        </div>
        <FU style={{marginBottom:40}}><SLabel text="Kernwaarden"/><h2 style={{color:'#fff'}}>Waar wij voor staan</h2></FU>
        <div className="vg" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2,background:'var(--border)',marginBottom:80}}>
          {[{icon:<Shield size={22} color="var(--gold)"/>,t:'Integriteit',s:'Wij doen wat wij beloven. Altijd. Onze medewerkers zijn geselecteerd op karakter, niet alleen op diploma.'},
            {icon:<Award size={22} color="var(--gold)"/>,t:'Vakmanschap',s:'Continu opleiden en bijscholen. Elke medewerker is VBV-gecertificeerd en blijft up-to-date.'},
            {icon:<Users size={22} color="var(--gold)"/>,t:'Betrokkenheid',s:'Vaste teams op vaste locaties. Wij kennen uw bedrijf, uw mensen en uw risicos.'},
            {icon:<Zap size={22} color="var(--gold)"/>,t:'Daadkracht',s:'Snel schakelen als het nodig is. Onze meldkamer en teams staan altijd klaar voor directe actie.'},
            {icon:<Eye size={22} color="var(--gold)"/>,t:'Transparantie',s:'Heldere rapportage na elk incident. U weet altijd wat er speelt op uw locatie.'},
            {icon:<Clock size={22} color="var(--gold)"/>,t:'Beschikbaarheid',s:'Dag en nacht. 365 dagen per jaar. Geen openingstijden, gewoon altijd bereikbaar.'},
          ].map((v,i)=>(
            <FU key={i} delay={i*0.07}>
              <motion.div whileHover={{background:'var(--bg3)'}} style={{background:'var(--bg2)',padding:'28px 24px',display:'flex',flexDirection:'column',gap:12,transition:'background 0.2s'}}>
                <div style={{width:48,height:48,background:'var(--gold2)',border:'1px solid var(--gold3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}>{v.icon}</div>
                <h3 style={{color:'#fff',fontSize:17,fontWeight:700}}>{v.t}</h3>
                <p style={{fontSize:14,color:'var(--gray)',lineHeight:1.7,fontWeight:300}}>{v.s}</p>
              </motion.div>
            </FU>
          ))}
        </div>
        <FU style={{marginBottom:40}}><SLabel text="Certificeringen"/><h2 style={{color:'#fff'}}>Erkend vakbekwaam</h2></FU>
        <div className="cg" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:2,background:'var(--border)'}}>
          {[{badge:'VBV',full:'Veiligheidsbranche Vakorganisatie',desc:'Alle medewerkers VBV-gecertificeerd'},
            {badge:'ISO',full:'ISO 9001:2015',desc:'Kwaliteitsmanagement gecertificeerd'},
            {badge:'ECABO',full:'ECABO Erkend',desc:'Gecertificeerde opleider beveiliging'},
            {badge:'BHV',full:'Bedrijfshulpverlening',desc:'Gecertificeerde BHV-medewerkers'},
          ].map((c,i)=>(
            <FU key={i} delay={i*0.08}>
              <div style={{background:'var(--bg2)',padding:'24px 20px',textAlign:'center'}}>
                <div style={{width:56,height:56,background:'var(--gold)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',fontSize:11,fontWeight:800,color:'#000',letterSpacing:'0.06em'}}>{c.badge}</div>
                <div style={{fontSize:14,fontWeight:700,color:'#fff',marginBottom:6}}>{c.full}</div>
                <div style={{fontSize:12,color:'var(--gray2)',fontWeight:300}}>{c.desc}</div>
              </div>
            </FU>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.aog{grid-template-columns:1fr!important;gap:44px!important}.vg{grid-template-columns:1fr 1fr!important}.cg{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.vg{grid-template-columns:1fr!important}}`}</style>
    </section>
    <section style={{padding:'72px 0',background:'var(--bg2)',borderTop:'1px solid var(--border)'}}>
      <div className="wrap" style={{textAlign:'center'}}>
        <FU>
          <h2 style={{color:'#fff',marginBottom:14}}>Wil je samenwerken?</h2>
          <p style={{fontSize:16,color:'var(--gray)',maxWidth:440,margin:'0 auto 32px',fontWeight:300}}>Neem contact op voor een vrijblijvend kennismakingsgesprek of offerte.</p>
          <Link to="/contact"><motion.div whileHover={{scale:1.04}} whileTap={{scale:0.97}} style={{display:'inline-flex',alignItems:'center',gap:8,background:'var(--gold)',color:'#000',padding:'14px 32px',borderRadius:6,fontSize:15,fontWeight:700,cursor:'pointer'}}>Neem contact op <ChevronRight size={16}/></motion.div></Link>
        </FU>
      </div>
    </section>
  </>
)

// ─────────────────────────────────────────────
// PAGE: CONTACT
// ─────────────────────────────────────────────
const PageContact = () => {
  const [sent,setSent]=useState(false); const [loading,setLoading]=useState(false)
  const [form,setForm]=useState({naam:'',bedrijf:'',email:'',telefoon:'',dienst:'',bericht:''})
  const submit=(e:React.FormEvent)=>{e.preventDefault();setLoading(true);setTimeout(()=>{setLoading(false);setSent(true)},1600)}
  const inp:React.CSSProperties={padding:'12px 14px',borderRadius:4,fontSize:14,border:'1px solid rgba(255,255,255,0.1)',outline:'none',background:'rgba(255,255,255,0.04)',color:'#fff',fontFamily:'Space Grotesk,sans-serif',width:'100%'}
  return (
    <>
      <PageHeader eyebrow="24/7 Bereikbaar" title="Neem contact op" sub="Vrijblijvend adviesgesprek of offerte? Wij reageren binnen 2 uur op werkdagen."/>
      <section style={{padding:'80px 0',background:'var(--bg)'}}>
        <div className="wrap">
          <div className="ctg" style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:52,alignItems:'start'}}>
            <FL>
              <div style={{display:'flex',flexDirection:'column',gap:14}}>
                {[{icon:<Phone size={20} color="var(--gold)"/>,label:'Telefoon',val:'06-12345678',sub:'Altijd bereikbaar',href:'tel:0612345678'},
                  {icon:<Mail size={20} color="var(--gold)"/>,label:'E-mail',val:'info@secureforce.nl',sub:'Reactie binnen 2 uur',href:'mailto:info@secureforce.nl'},
                  {icon:<MapPin size={20} color="var(--gold)"/>,label:'Werkgebied',val:'Amsterdam & heel NL',sub:'Inzetbaar landelijk',href:undefined},
                  {icon:<MessageCircle size={20} color="var(--gold)"/>,label:'WhatsApp',val:'Stuur een bericht',sub:'Snelle reactie',href:'https://wa.me/31612345678'},
                ].map((c,i)=>(
                  <motion.div key={i} initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.08}}>
                    {c.href?(
                      <a href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel="noopener"
                        style={{display:'flex',gap:14,alignItems:'flex-start',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:'16px 18px',transition:'border-color 0.2s'}}
                        onMouseEnter={e=>(e.currentTarget as any).style.borderColor='rgba(240,165,0,0.35)'} onMouseLeave={e=>(e.currentTarget as any).style.borderColor='rgba(255,255,255,0.07)'}>
                        <div style={{width:44,height:44,background:'var(--gold2)',border:'1px solid var(--gold3)',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{c.icon}</div>
                        <div><div style={{fontSize:11,fontWeight:700,color:'var(--gold)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:4}}>{c.label}</div><div style={{fontSize:14,color:'#fff',fontWeight:600,marginBottom:2}}>{c.val}</div><div style={{fontSize:12,color:'var(--gray2)',fontWeight:300}}>{c.sub}</div></div>
                      </a>
                    ):(
                      <div style={{display:'flex',gap:14,alignItems:'flex-start',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:'16px 18px'}}>
                        <div style={{width:44,height:44,background:'var(--gold2)',border:'1px solid var(--gold3)',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{c.icon}</div>
                        <div><div style={{fontSize:11,fontWeight:700,color:'var(--gold)',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:4}}>{c.label}</div><div style={{fontSize:14,color:'#fff',fontWeight:600,marginBottom:2}}>{c.val}</div><div style={{fontSize:12,color:'var(--gray2)',fontWeight:300}}>{c.sub}</div></div>
                      </div>
                    )}
                  </motion.div>
                ))}
                <div style={{background:'var(--bg2)',border:'1px solid rgba(240,165,0,0.2)',borderRadius:8,padding:'16px 18px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}><div style={{width:8,height:8,background:'#25d366',borderRadius:'50%',animation:'pulse 2s infinite',flexShrink:0}}/><span style={{fontSize:11,fontWeight:700,color:'var(--gold)',letterSpacing:'0.08em',textTransform:'uppercase'}}>24/7 operationeel</span></div>
                  <div style={{display:'flex',gap:5}}>
                    {['Ma','Di','Wo','Do','Vr','Za','Zo'].map(d=>(
                      <div key={d} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                        <div style={{fontSize:10,color:'var(--gray2)',fontWeight:600}}>{d}</div>
                        <div style={{width:28,height:28,borderRadius:4,background:'var(--gold2)',border:'1px solid var(--gold3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'var(--gold)'}}>v</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FL>
            <FR>
              <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:'36px 32px',borderTop:'2px solid var(--gold)'}}>
                <AnimatePresence mode="wait">
                  {!sent?(
                    <motion.form key="form" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:16}}>
                      <div><h3 style={{color:'#fff',fontSize:22,marginBottom:5}}>Stuur ons een bericht</h3><p style={{fontSize:13,color:'var(--gray2)',lineHeight:1.6}}>Vrijblijvend. Reactie binnen 2 uur op werkdagen.</p></div>
                      <div className="fr2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                        {[{k:'naam',l:'Naam',t:'text',p:'Uw naam'},{k:'bedrijf',l:'Bedrijf',t:'text',p:'Bedrijfsnaam'}].map(f=>(
                          <div key={f.k} style={{display:'flex',flexDirection:'column',gap:5}}>
                            <label style={{fontSize:11,fontWeight:700,color:'var(--gray2)',letterSpacing:'0.1em',textTransform:'uppercase'}}>{f.l}</label>
                            <input type={f.t} placeholder={f.p} value={(form as any)[f.k]} onChange={e=>setForm(fm=>({...fm,[f.k]:e.target.value}))} required style={inp} onFocus={e=>e.target.style.borderColor='rgba(240,165,0,0.5)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
                          </div>
                        ))}
                      </div>
                      <div className="fr2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                        <div style={{display:'flex',flexDirection:'column',gap:5}}>
                          <label style={{fontSize:11,fontWeight:700,color:'var(--gray2)',letterSpacing:'0.1em',textTransform:'uppercase'}}>E-mail</label>
                          <input type="email" placeholder="uw@bedrijf.nl" value={form.email} onChange={e=>setForm(fm=>({...fm,email:e.target.value}))} required style={inp} onFocus={e=>e.target.style.borderColor='rgba(240,165,0,0.5)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',gap:5}}>
                          <label style={{fontSize:11,fontWeight:700,color:'var(--gray2)',letterSpacing:'0.1em',textTransform:'uppercase'}}>Telefoon</label>
                          <input type="tel" placeholder="06-12345678" value={form.telefoon} onChange={e=>setForm(fm=>({...fm,telefoon:e.target.value}))} style={inp} onFocus={e=>e.target.style.borderColor='rgba(240,165,0,0.5)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
                        </div>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:5}}>
                        <label style={{fontSize:11,fontWeight:700,color:'var(--gray2)',letterSpacing:'0.1em',textTransform:'uppercase'}}>Gewenste dienst</label>
                        <select value={form.dienst} onChange={e=>setForm(fm=>({...fm,dienst:e.target.value}))} style={{...inp,cursor:'pointer'}} onFocus={e=>e.target.style.borderColor='rgba(240,165,0,0.5)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}>
                          <option value="">Selecteer...</option>
                          {SERVICES.map(s=><option key={s.slug} value={s.slug}>{s.title}</option>)}
                          <option value="overig">Anders / Overig</option>
                        </select>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:5}}>
                        <label style={{fontSize:11,fontWeight:700,color:'var(--gray2)',letterSpacing:'0.1em',textTransform:'uppercase'}}>Bericht</label>
                        <textarea rows={4} placeholder="Beschrijf uw beveiligingsbehoefte..." value={form.bericht} onChange={e=>setForm(fm=>({...fm,bericht:e.target.value}))} required style={{...inp,resize:'vertical'} as any} onFocus={e=>e.target.style.borderColor='rgba(240,165,0,0.5)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
                      </div>
                      <motion.button type="submit" disabled={loading} whileHover={{scale:1.02,boxShadow:'0 6px 22px rgba(240,165,0,0.3)'}} whileTap={{scale:0.97}}
                        style={{background:'var(--gold)',color:'#000',padding:'14px 24px',borderRadius:4,fontSize:15,fontWeight:700,border:'none',cursor:loading?'not-allowed':'pointer',opacity:loading?0.8:1,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                        {loading?(<><motion.div animate={{rotate:360}} transition={{duration:0.7,repeat:Infinity,ease:'linear'}} style={{width:15,height:15,border:'2px solid rgba(0,0,0,0.3)',borderTopColor:'#000',borderRadius:'50%'}}/>Verzenden...</>):'Verstuur bericht'}
                      </motion.button>
                    </motion.form>
                  ):(
                    <motion.div key="ok" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} style={{textAlign:'center',padding:'52px 20px'}}>
                      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:220,delay:0.1}} style={{width:64,height:64,background:'var(--gold2)',border:'1px solid var(--gold3)',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}>
                        <CheckCircle2 size={30} color="var(--gold)"/>
                      </motion.div>
                      <h3 style={{color:'#fff',marginBottom:10,fontSize:22}}>Bericht ontvangen!</h3>
                      <p style={{color:'var(--gray)',fontSize:15,lineHeight:1.7}}>Wij nemen binnen 2 uur contact met u op.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FR>
          </div>
        </div>
        <style>{`@media(max-width:768px){.ctg{grid-template-columns:1fr!important}.fr2{grid-template-columns:1fr!important}}`}</style>
      </section>
    </>
  )
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
function DienstRouter() {
  const {pathname}=useLocation(); const slug=pathname.split('/').pop()||''
  return <PageDienstDetail slug={slug}/>
}
function Page404() {
  return (
    <div style={{paddingTop:140,textAlign:'center',minHeight:'60vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20}}>
      <div style={{fontFamily:'Space Mono,monospace',fontSize:11,color:'var(--gold)',letterSpacing:'0.2em',textTransform:'uppercase'}}>404</div>
      <h2 style={{color:'#fff'}}>Pagina niet gevonden</h2>
      <p style={{color:'var(--gray)',maxWidth:360,lineHeight:1.7}}>De pagina die u zoekt bestaat niet of is verplaatst.</p>
      <Link to="/"><motion.div whileHover={{scale:1.04}} style={{background:'var(--gold)',color:'#000',padding:'12px 24px',borderRadius:6,fontWeight:700,cursor:'pointer'}}>Terug naar home</motion.div></Link>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollTop/>
      <Nav/>
      <main style={{minHeight:'100vh'}}>
        <Routes>
          <Route path="/" element={<PageHome/>}/>
          <Route path="/diensten" element={<PageDiensten/>}/>
          <Route path="/diensten/:slug" element={<DienstRouter/>}/>
          <Route path="/over-ons" element={<PageOverOns/>}/>
          <Route path="/contact" element={<PageContact/>}/>
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </main>
      <Footer/>
      <WA/>
    </>
  )
}
