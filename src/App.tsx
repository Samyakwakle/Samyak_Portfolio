import { useEffect, useRef, useState, useCallback } from 'react';
import './index.css';

/* ── helpers ── */
const PROJECTS = [
  { num: '01', title: 'VMS_Cropper Pro', category: 'Desktop Automation', tools: 'Python · Image Processing · 100% Offline', emoji: '✂️' },
  { num: '02', title: 'Ajantha Graphics Tools', category: 'File Management Suite', tools: 'Batch Processing · PDF/Image Optimization · Workflow', emoji: '🎨' },
  { num: '03', title: 'Air Scroll', category: 'AI Hand-Tracking App', tools: 'MediaPipe · Computer Vision · Python', emoji: '✋' },
  { num: '04', title: 'Cinematic Productions', category: 'College Shoots & Editing', tools: 'Premiere Pro · CapCut · Motion Graphics', emoji: '🎬' },
];

const CAREER = [
  { role: 'Cinematography & Advertisement', org: 'Freelance / Academy', time: 'Recent', desc: 'Leading end-to-end production for digital ads and event coverage. Recognised by academic leadership for excellence in college-level cinematic production.' },
  { role: 'Student — Diploma in AIML', org: 'Shreeyash College of Polytechnic', time: 'Ongoing', desc: 'Pursuing a Diploma in Artificial Intelligence & Machine Learning. Developing AI-powered navigation tools like Air Scroll using MediaPipe for hand tracking.' },
  { role: 'Founder & Lead Developer', org: 'Craftelite Studio', time: 'NOW', desc: 'Leading a multi-disciplinary tech-creative hub specialising in software automation, cinematography, and digital advertisement. Developed flagship product VMS_Cropper Pro.' },
];

export default function App() {
  /* ── LOADING ── */
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cur = 0;
    const id = setInterval(() => {
      cur += Math.random() * 4 + 1;
      if (cur >= 100) { cur = 100; setProgress(100); clearInterval(id); setTimeout(() => setLoading(false), 600); }
      else setProgress(Math.floor(cur));
    }, 40);
    return () => clearInterval(id);
  }, []);

  /* ── MODAL ── */
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', mobile: '', service: '' });
  const [formErr, setFormErr] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (modalRef.current && !modalRef.current.contains(e.target as Node)) setModalOpen(false); };
    if (modalOpen) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [modalOpen]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.service) { setFormErr('Please fill in all fields.'); return; }
    const msg = encodeURIComponent(`Hi Samyak! 👋\nMy name is ${form.name}.\nMobile: ${form.mobile}\nService Required: ${form.service}\n\nWe are interested in your services!`);
    window.open(`https://wa.me/917385151208?text=${msg}`, '_blank');
    setModalOpen(false); setForm({ name: '', mobile: '', service: '' }); setFormErr('');
  };

  /* ── CAROUSEL ── */
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const goTo = useCallback((i: number) => {
    if (animating) return; setAnimating(true); setSlide(i); setTimeout(() => setAnimating(false), 500);
  }, [animating]);
  const prev = useCallback(() => goTo(slide === 0 ? PROJECTS.length - 1 : slide - 1), [slide, goTo]);
  const next = useCallback(() => goTo(slide === PROJECTS.length - 1 ? 0 : slide + 1), [slide, goTo]);

  /* ── CUSTOM CURSOR ── */
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX + 'px'; cursorRef.current.style.top = e.clientY + 'px'; }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /* ── SCROLL REVEAL ── */
  useEffect(() => {
    if (loading) return;
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('sr-visible'); obs.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll('.sr').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [loading]);

  /* ── WHAT I DO TOGGLE ── */
  const handleWhatClick = (el: HTMLDivElement) => {
    el.classList.toggle('what-active');
    const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    siblings.forEach(s => { if (s !== el) { s.classList.remove('what-active'); s.classList.toggle('what-sibling', el.classList.contains('what-active')); } });
  };

  if (loading) return (
    <div className="loader-screen">
      <div className="loader-inner">
        <div className="loader-logo">SAMYAK.STUDIO</div>
        <div className="loader-bar-track"><div className="loader-bar-fill" style={{ width: `${progress}%` }} /></div>
        <div className="loader-percent">{progress}%</div>
        <div className="loader-tagline">Loading excellence...</div>
      </div>
    </div>
  );

  return (
    <div className="app fade-in">
      {/* custom cursor */}
      <div className="custom-cursor" ref={cursorRef} />

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-logo">SAMYAK.STUDIO</div>
        <div className="nav-links">
          <a href="#whatido" className="nav-btn neo-border">WHAT I DO</a>
          <a href="#work" className="nav-btn neo-border">WORK</a>
          <a href="#career" className="nav-btn neo-border">CAREER</a>
          <a href="#contact" className="nav-btn neo-border contact-btn">CONTACT</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-bg-glow hero-bg-glow-1" />
        <div className="hero-bg-glow hero-bg-glow-2" />
        <div className="hero-layout">
          <div className="hero-left sr">
            <p className="hero-hello">Hello! I'm</p>
            <h1 className="hero-name">SAMYAK<br /><span className="hero-name-sub">WAKLE</span></h1>
            <div className="neo-pill hero-pill">AIML DEV & ARCHITECT</div>
            <p className="hero-desc">I don't just solve problems; I architect the next three solutions before they're even needed.<br /><strong>Founder of Craftelite Studio.</strong></p>
            <div className="hero-cta-row">
              <a href="#work" className="btn-primary neo-border">VIEW WORK →</a>
              <a href="#contact" className="btn-secondary neo-border">LET'S TALK 💬</a>
            </div>
          </div>
          <div className="hero-center sr">
            <div className="hero-photo-wrap">
              <img src="/Photo.jpeg" alt="Samyak Wakle" className="hero-photo" />
              <div className="hero-photo-ring" />
              <div className="hero-photo-glow" />
            </div>
          </div>
          <div className="hero-right sr">
            <p className="hero-an">An AIML</p>
            <div className="hero-roles">
              <span className="hero-role-1">Developer</span>
              <span className="hero-role-2">Architect</span>
            </div>
            <div className="hero-tags-wrap">
              <div className="hero-tag neo-border">Python</div>
              <div className="hero-tag neo-border">MediaPipe</div>
              <div className="hero-tag neo-border">Premiere Pro</div>
              <div className="hero-tag neo-border">CapCut</div>
              <div className="hero-tag neo-border">Workflow</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── CARDS (3 pillars) ── */}
      <section className="cards-section">
        <div className="card neo-border card-tilt sr">
          <p className="sub-tag">EXPERT IN AI</p>
          <h3>I'M A DEVELOPER</h3>
          <p className="card-desc">Python, MediaPipe, Workflow Automation</p>
          <div className="card-emoji">💻</div>
          <a href="#contact" className="card-btn neo-border">CONNECT</a>
        </div>
        <div className="card bg-black neo-border card-tilt sr">
          <p className="sub-tag cyan-tag">PROFESSIONAL</p>
          <h3 style={{ color: 'white' }}>CINEMATOGRAPHER</h3>
          <p className="card-desc" style={{ color: '#aaa' }}>Premiere Pro, CapCut, Motion Graphics</p>
          <div className="card-emoji">🎥</div>
          <a href="#work" className="card-btn neo-border card-btn-cyan">PORTFOLIO</a>
        </div>
        <div className="card bg-cyan neo-border card-tilt sr">
          <p className="sub-tag">LEADERSHIP</p>
          <h3>TEAM UP WITH SAMYAK</h3>
          <p className="card-desc">Social Media Manager 2026</p>
          <div className="card-stack-text"><span>EVERY</span><span>THING</span></div>
          <a href="#contact" className="card-btn neo-border card-btn-dark">JOIN</a>
        </div>
      </section>

      {/* ── WHAT I DO ── */}
      <section className="whatido-section" id="whatido">
        <div className="whatido-header sr">
          <h2 className="whatido-title">W<span className="whatido-accent">HAT</span><br />I<span className="whatido-accent"> DO</span></h2>
        </div>
        <div className="whatido-cards">
          <div className="what-card neo-border sr" onClick={e => handleWhatClick(e.currentTarget as HTMLDivElement)}>
            <div className="what-card-corner" />
            <div className="what-card-inner">
              <div className="what-num">01</div>
              <h3>SOFTWARE & AI</h3>
              <h4>Desktop Automation & ML</h4>
              <p>Developing AI-powered tools and high-speed desktop automation software. From hand-tracking apps to automated image processing solutions.</p>
              <div className="what-tags-row">
                {['Python','MediaPipe','Computer Vision','Prompt Eng','UI/UX'].map(t => <span key={t} className="what-tag">{t}</span>)}
              </div>
              <div className="what-arrow">→</div>
            </div>
          </div>
          <div className="what-card what-card-dark neo-border sr" onClick={e => handleWhatClick(e.currentTarget as HTMLDivElement)}>
            <div className="what-card-corner" />
            <div className="what-card-inner">
              <div className="what-num" style={{ color: 'var(--cyan)' }}>02</div>
              <h3 style={{ color: 'white' }}>MEDIA & AUTOMATION</h3>
              <h4 style={{ color: 'var(--cyan)' }}>Cinematography & Production</h4>
              <p style={{ color: '#bbb' }}>Leading end-to-end production for digital ads and event coverage. Expertise in post-production, color grading, and workflow automation.</p>
              <div className="what-tags-row">
                {['Premiere Pro','CapCut','Color Grading','Motion Graphics','Workflow'].map(t => <span key={t} className="what-tag what-tag-dark">{t}</span>)}
              </div>
              <div className="what-arrow" style={{ color: 'var(--cyan)' }}>→</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORK CAROUSEL ── */}
      <section className="work-section" id="work">
        <div className="work-header sr">
          <h2>My <span className="cyan-text">Work</span></h2>
          <p>Explore my latest projects across AI, automation, and cinematic production.</p>
        </div>
        <div className="carousel-wrap sr">
          <button className="c-arrow c-arrow-l neo-border" onClick={prev} aria-label="prev">←</button>
          <button className="c-arrow c-arrow-r neo-border" onClick={next} aria-label="next">→</button>
          <div className="c-track-wrap">
            <div className="c-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
              {PROJECTS.map((p, i) => (
                <div className="c-slide" key={i}>
                  <div className="c-slide-inner neo-border">
                    <div className="c-info">
                      <div className="c-num">{p.num}</div>
                      <h3>{p.title}</h3>
                      <p className="c-cat">{p.category}</p>
                      <div className="c-tools-box">
                        <span className="c-tools-label">Tools & Features</span>
                        <p>{p.tools}</p>
                      </div>
                    </div>
                    <div className="c-emoji-panel">{p.emoji}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="c-dots">
            {PROJECTS.map((_, i) => (
              <button key={i} className={`c-dot${i === slide ? ' c-dot-active' : ''}`} onClick={() => goTo(i)} aria-label={`slide ${i+1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREER TIMELINE ── */}
      <section className="career-section" id="career">
        <div className="career-header sr">
          <h2>My career <span className="cyan-text">&</span><br />experience</h2>
        </div>
        <div className="career-list">
          {CAREER.map((c, i) => (
            <div className="career-item neo-border sr" key={i}>
              <div className="career-timeline-dot" />
              <div className="career-body">
                <div className="career-top">
                  <div>
                    <h4>{c.role}</h4>
                    <h5>{c.org}</h5>
                  </div>
                  <span className="career-badge neo-border">{c.time}</span>
                </div>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS / TECHSTACK PILLS ── */}
      <section className="skills-section">
        <h2 className="skills-title sr">$SKILLS</h2>
        <p className="skills-sub sr">Introducing my three key domains</p>
        <div className="skills-list">
          {[
            { icon: 'AI', label: 'AIML DEVELOPMENT', green: true, text: 'Developing AI-powered tools like Air Scroll using MediaPipe and hand tracking. Specialising in computer vision and Python algorithms.' },
            { icon: 'SA', label: 'SOFTWARE ARCHITECTURE', green: false, text: 'Building high-speed desktop solutions (VMS_Cropper Pro) that bulk crop photos in seconds, ensuring 100% offline data security. Scaling workflow automations.' },
            { icon: 'MC', label: 'MEDIA CREATION', green: false, white: true, text: 'End-to-end production for digital ads and events. Professional cinematography and colour grading into modern creative workflows. Next stop: Social Media Manager.' },
          ].map((s, i) => (
            <div className="skill-item sr" key={i}>
              <div className={`skill-icon neo-border${s.green ? ' green' : ''}${s.white ? ' white-icon' : ''}`}>{s.icon}</div>
              <div className="skill-info">
                <h4>{s.label}</h4>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER / CONTACT ── */}
      <footer className="footer" id="contact">
        <div className="footer-bg-glow" />
        <h2 className="sr">YOUR GATEWAY TO EXCELLENCE</h2>
        <button className="lets-talk-btn neo-pill sr" onClick={() => { setModalOpen(true); setFormErr(''); }}>LET'S TALK</button>
        <div className="contact-grid sr">
          <div className="contact-col">
            <h4>CONTACT</h4>
            <a href="mailto:waklesamyak5@gmail.com" className="contact-link">waklesamyak5@gmail.com</a>
            <a href="tel:+917385151208" className="contact-link">+91 7385151208</a>
            <p className="contact-edu">Diploma in AIML</p>
          </div>
          <div className="contact-col">
            <h4>SOCIAL</h4>
            <a href="https://www.linkedin.com/in/samyak-wakle-680a4b28b/" target="_blank" rel="noreferrer" className="contact-social-link">LinkedIn ↗</a>
            <a href="https://www.instagram.com/samyak_wakle" target="_blank" rel="noreferrer" className="contact-social-link">Instagram ↗</a>
            <a href="https://www.instagram.com/craftelite.studio/" target="_blank" rel="noreferrer" className="contact-social-link">Craftelite ↗</a>
          </div>
          <div className="contact-col contact-col-quote">
            <p className="contact-quote">"I don't just solve problems; I architect the next three solutions before they're even needed."</p>
            <h3>Designed & Developed by <span className="cyan-text">Samyak Wakle</span></h3>
            <p className="contact-copy">© 2026</p>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP MODAL ── */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box neo-border" ref={modalRef}>
            <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close">✕</button>
            <h3 className="modal-title">LET'S CONNECT</h3>
            <p className="modal-sub">Fill in your details and I'll reach you on WhatsApp ✅</p>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-field">
                <label htmlFor="m-name">Your Name</label>
                <input id="m-name" type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} />
              </div>
              <div className="modal-field">
                <label htmlFor="m-mobile">Mobile Number</label>
                <input id="m-mobile" type="tel" placeholder="+91 98765 43210" value={form.mobile} onChange={e => setForm(p => ({...p, mobile: e.target.value}))} />
              </div>
              <div className="modal-field">
                <label htmlFor="m-service">Service Required</label>
                <select id="m-service" value={form.service} onChange={e => setForm(p => ({...p, service: e.target.value}))}>
                  <option value="">— Select a service —</option>
                  <option value="AI / App Development">AI / App Development</option>
                  <option value="Software Architecture">Software Architecture</option>
                  <option value="Media Creation">Media Creation</option>
                </select>
              </div>
              {formErr && <p className="modal-err">{formErr}</p>}
              <button type="submit" className="modal-submit neo-border"><span>📲</span> CHAT ON WHATSAPP</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
