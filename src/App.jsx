import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ExternalLink, Moon, Sun, MapPin, Download, Brain } from "lucide-react";

/* ============================
   React Portfolio (no Tailwind) — full-width navbar + polished UI
   - Pure CSS (injected below) + dark/light theme + smooth scroll
   - Sticky navbar 100% width; inner content stretches with responsive padding
   - Active link on scroll, project filters, lazy images
   - RESUME_URL uses BASE_URL so /CV.pdf marche partout (local, prod, GitHub Pages)
   ============================ */

import RESUME_URL from './assets/CV.pdf?url';
import photoUrl from './assets/PHOTO.jpg'; // chemin relatif à ce fichier
import "./App.css";

const PROJECTS = [
  {
    title: "Diabetic Retinopathy Detection",
    description:
      "Detecting diabetic retinopathy from retinal images: medical imaging pipeline, fine-tuning pretrained models, and interpretability.",
    tags: ["PyTorch", "TensorFlow", "Vision", "Interpretability"],
    category: "Vision",
    link: "#",
    repo: "https://github.com/AbdelkebirBenzaitoune",
    image:
      "https://images.unsplash.com/photo-1555949963-df2b77e92877?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Crowdsourcing Web Application",
    description:
      "Crowdsourcing web app: frontend (HTML/CSS/JS), backend (Django), responsive UI with Bootstrap.",
    tags: ["Django", "HTML/CSS/JS", "Bootstrap"],
    category: "Web",
    link: "#",
    repo: "https://github.com/AbdelkebirBenzaitoune",
    image:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Adaptive Cognitive Assessment Prototype",
    description:
      "Adaptive cognitive assessment for e-recruitment & upskilling: LLM-generated questions, embedding-based scoring, profile dashboards.",
    tags: ["LLM", "Embeddings", "Dashboards", "RAG"],
    category: "LLM",
    link: "#",
    repo: "https://github.com/AbdelkebirBenzaitoune",
    image:
      "https://images.unsplash.com/photo-1533903345306-15d1c30952de?q=80&w=1200&auto=format&fit=crop"
  }
];

const SKILLS = [
  { group: "Programming", items: ["Python", "R", "C", "Java", "ReactJS", "Django", "Streamlit", "PHP"] },
  { group: "Data Science / ML / DL", items: ["Regression", "Classification", "Clustering", "CNN", "RNN", "NLP", "RAG", "Scikit-Learn", "TensorFlow", "PyTorch", "Web Scraping"] },
  { group: "Databases", items: ["MySQL"] },
  { group: "Visualization", items: ["Power BI", "Matplotlib", "Seaborn"] },
  { group: "Apps & DevOps", items: ["Mobile apps", "DevOps"] }
];

const EXPERIENCE = [
  {
    role: "End-of-year Intern",
    org: "3D SMART FACTORY — Mohammedia, Morocco",
    period: "Jul 2025 – Sep 2025",
    points: [
      "Cognitive assessment prototype for e-recruitment & upskilling (LLM, embedding-based scoring, dashboard).",
      "Personalized learning recommender and tutoring assistant (RAG chatbot)."
    ]
  },
  {
    role: "End-of-year Intern",
    org: "ICESCO — Rabat, Morocco",
    period: "Jul 2024 – Aug 2024",
    points: [
      "Built a ticketing system to improve request handling and internal communication.",
      "Integrated third-party APIs (SendGrid, OpenAI) and developed internal APIs (Flask/Node.js).",
      "Explored chatbot frameworks (Dialogflow) to automate FAQs."
    ]
  }
];

const NAV = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" }
];

export default function App(){
  const [light, setLight] = useState(false);     // default: dark theme
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("projects");
  const [filter, setFilter] = useState("All");

  useEffect(()=>{ document.documentElement.classList.toggle('light', light); },[light]);

  useEffect(()=>{
    const onScroll = ()=>{
      const nav = document.querySelector('.navbar');
      if(nav){ nav.classList.toggle('shadow', window.scrollY > 12); }
    };
    window.addEventListener('scroll', onScroll); onScroll();
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);

  // Active link based on visible section
  useEffect(()=>{
    const ids = ["projects","skills","education","experience","contact","home"];
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ setActive(e.target.id); } });
    }, { rootMargin:"-50% 0px -45% 0px", threshold:0 });
    sections.forEach(s=> obs.observe(s));
    return ()=> obs.disconnect();
  },[]);

  const categories = useMemo(()=>["All","Vision","Web","LLM"],[]);
  const shown = useMemo(()=> PROJECTS.filter(p => filter === "All" || p.category === filter), [filter]);

  const fadeUp = {hidden:{opacity:0,y:20}, show:{opacity:1,y:0}};

  return (
    <div>
      

      {/* Navbar (full width) */}
      <header className="navbar">
        <div className="nav-inner">
          <a href="#home" className="brand-logo" aria-label="Home / Data Science & AI">
            <Brain size={22} />
          </a>
          <nav className="nav-group">
            {NAV.map(n => (
              <a key={n.id} href={`#${n.id}`} className={`nav-link ${active===n.id? 'active':''}`}>{n.label}</a>
            ))}
          </nav>

          <div className="actions">
            {/* open in new tab (works everywhere) */}
            <a href={RESUME_URL} className="btn" target="_blank" rel="noopener">
              <Download size={16}/> Resume
            </a>
            <button className="btn" onClick={()=>setLight(v=>!v)}>
              {light ? <Moon size={18}/> : <Sun size={18}/>} Theme
            </button>
          </div>

          <button className="menu-btn" onClick={()=>setOpen(o=>!o)}>Menu</button>
        </div>

        {open && (
          <div className="mobile">
            <div className="menu">
              {NAV.map(n => (
                <a key={n.id} href={`#${n.id}`} onClick={()=>setOpen(false)}>{n.label}</a>
              ))}
              {/* mobile: suggest download */}
              <a href={RESUME_URL} className="btn" download onClick={()=>setOpen(false)}>
                <Download size={16}/> Download Resume
              </a>
              <button className="btn" onClick={()=>setLight(v=>!v)}>
                {light ? <Moon size={18}/> : <Sun size={18}/>} Theme
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="section hero">
        <div className="hero-rail"/>
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{once:true, amount:0.3}} variants={fadeUp} className="grid cols-2">
            <div>
              <h2 className="name-glow">Abdel Kebir Benzaitoune</h2>
              <h6 className="headline">Master's Student in <span className="gradient-text">Data Science & Engineering</span></h6>
              <p className="muted" style={{marginTop:16}}>
                Master's student in Data Science & Engineering (Mohammed V University, Rabat). I enjoy tackling technical challenges and turning ideas into reliable solutions (analysis, problem-solving, teamwork).
              </p>
              <div className="cta">
                <a href="#projects" className="btn primary">View projects</a>
                <a href="#contact" className="btn">Contact me</a>
              </div>
              <div className="links">
                <a href="mailto:beabdo14@gmail.com"><Mail size={16}/> beabdo14@gmail.com</a>
                <a href="https://github.com/AbdelkebirBenzaitoune"><Github size={16}/> GitHub</a>
                <a href="https://linkedin.com/in/abdel-kebir-benzaitoune/"><Linkedin size={16}/> LinkedIn</a>
              </div>
              <div className="loc"><MapPin size={16}/> Temara · Rabat, Morocco</div>
            </div>
            <div>
              <div className="frame hero-photo">
                <img src={photoUrl} alt="Desk with monitors" loading="lazy" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="container">
          <div className="row">
            <h2 style={{margin:0,fontWeight:800,fontSize:26}}>Projects</h2>
            <div className="filters">
              {categories.map(c => (
                <button key={c} className={`chip ${filter===c ? 'active' : ''}`} onClick={()=>setFilter(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="cards">
            {shown.map(p=> (
              <article key={p.title} className="card project">
                <div className="video"><img src={p.image} alt={p.title} loading="lazy" /></div>
                <div className="p-body">
                  <h3 className="p-title">{p.title}</h3>
                  <p className="muted" style={{fontSize:14}}>{p.description}</p>
                  <div className="p-tags">
                    {p.tags.map(t=> <span key={t} className="pill">{t}</span>)}
                  </div>
                  <div className="p-actions">
                    <a href={p.link}><ExternalLink size={16}/> Live</a>
                    <a href={p.repo}><Github size={16}/> Code</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section alt">
        <div className="container">
          <h2 style={{margin:0,fontWeight:800,fontSize:26}}>Skills</h2>
          <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',marginTop:16}}>
            {SKILLS.map(s=> (
              <div key={s.group} className="card" style={{padding:16}}>
                <h3 style={{marginTop:0}}>{s.group}</h3>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {s.items.map(it=> <span key={it} className="pill">{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section">
        <div className="container">
          <h2 style={{margin:0,fontWeight:800,fontSize:26}}>Education</h2>
          <div style={{display:'grid',gap:16,gridTemplateColumns:'1fr',marginTop:16}}>
            <div className="card" style={{padding:16}}>
              <div style={{display:'flex',justifyContent:'space-between',gap:8,flexWrap:'wrap'}}>
                <h3 style={{margin:0}}>Master in Data Science & Engineering · <span style={{color:'var(--accent)'}}>Mohammed V University (Rabat)</span></h3>
                <span className="muted" style={{fontSize:14}}>Sep 2024 – Jul 2026</span>
              </div>
            </div>
            <div className="card" style={{padding:16}}>
              <div style={{display:'flex',justifyContent:'space-between',gap:8,flexWrap:'wrap'}}>
                <h3 style={{margin:0}}>Bachelor in Mathematical & Computer Sciences · <span style={{color:'var(--accent)'}}>Mohammed V University (Rabat)</span></h3>
                <span className="muted" style={{fontSize:14}}>Sep 2021 – Jul 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section alt">
        <div className="container">
          <h2 style={{margin:0,fontWeight:800,fontSize:26}}>Experience</h2>
          <div style={{display:'grid',gap:16,gridTemplateColumns:'1fr',marginTop:16}}>
            {EXPERIENCE.map(exp=> (
              <div key={exp.role} className="card" style={{padding:16}}>
                <div style={{display:'flex',justifyContent:'space-between',gap:8,flexWrap:'wrap'}}>
                  <h3 style={{margin:0}}>{exp.role} · <span style={{color:'var(--accent)'}}>{exp.org}</span></h3>
                  <span className="muted" style={{fontSize:14}}>{exp.period}</span>
                </div>
                <ul style={{marginTop:8}}>
                  {exp.points.map(p=> <li key={p} className="muted" style={{marginTop:4}}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="container">
          <div className="card" style={{padding:24,borderRadius:24}}>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div>
                <h2 style={{margin:0,fontWeight:800,fontSize:26}}>Let's talk 👋</h2>
                <p className="muted">Interested in collaborating or discussing an opportunity? Drop me a line or connect.</p>
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:12}}>
                <a href="mailto:beabdo14@gmail.com" className="btn primary"><Mail size={16}/> Send an email</a>
                <a href="https://github.com/AbdelkebirBenzaitoune" className="btn"><Github size={16}/> GitHub</a>
                <a href="https://linkedin.com/in/abdel-kebir-benzaitoune/" className="btn"><Linkedin size={16}/> LinkedIn</a>
              </div>
            </div>
          </div>
          <footer>© {new Date().getFullYear()} Abdel Kebir Benzaitoune — All rights reserved.</footer>
        </div>
      </section>
    </div>
  );
}
