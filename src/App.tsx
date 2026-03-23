import { useEffect, useRef, useState } from 'react';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 4 + 1;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setLoading(false), 600);
      } else {
        setProgress(Math.floor(current));
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm]   = useState({ name: '', mobile: '', service: '' });
  const [formErr, setFormErr] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on backdrop click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) setModalOpen(false);
    };
    if (modalOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [modalOpen]);

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.service) {
      setFormErr('Please fill in all fields.');
      return;
    }
    const msg = encodeURIComponent(
      `Hi Samyak! 👋\nMy name is ${form.name}.\nMobile: ${form.mobile}\nService Required: ${form.service}\n\nWe are interested in your services!`
    );
    window.open(`https://wa.me/917385151208?text=${msg}`, '_blank');
    setModalOpen(false);
    setForm({ name: '', mobile: '', service: '' });
    setFormErr('');
  };

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-inner">
          <div className="loader-logo">SAMYAK.STUDIO</div>
          <div className="loader-bar-track">
            <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="loader-percent">{progress}%</div>
          <div className="loader-tagline">Loading excellence...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app fade-in">
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-logo">SAMYAK.STUDIO</div>
        <div className="nav-links">
          <a href="#projects" className="nav-btn neo-border">PROJECTS</a>
          <a href="#contact" className="nav-btn neo-border contact-btn">CONTACT</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-photo-wrap">
          <img src="/Photo.jpeg" alt="Samyak Wakle" className="hero-photo" />
          <div className="hero-photo-glow" />
        </div>
        <h1 className="hero-title">SAMYAK</h1>
        <div className="neo-pill">AIML DEV &amp; ARCHITECT</div>
        <p className="hero-desc">
          I don't just solve problems; I architect the next three solutions before they're even needed.
          Founder of Craftelite Studio.
        </p>
      </header>

      {/* ── CARDS ── */}
      <section className="cards-section">
        {/* Card 1 – Developer */}
        <div className="card neo-border card-tilt">
          <p className="sub-tag">EXPERT IN AI</p>
          <h3>I'M A DEVELOPER</h3>
          <p className="card-desc">Python, MediaPipe, Workflow Automation</p>
          <div className="card-content card-emoji">💻</div>
          <a href="#contact" className="card-btn neo-border">CONNECT</a>
        </div>

        {/* Card 2 – Cinematographer */}
        <div className="card bg-black neo-border card-tilt">
          <p className="sub-tag" style={{ color: 'var(--primary-green)' }}>PROFESSIONAL</p>
          <h3 style={{ color: 'white' }}>CINEMATOGRAPHER</h3>
          <p className="card-desc" style={{ color: '#ccc' }}>Premiere Pro, CapCut, Motion Graphics</p>
          <div className="card-content card-emoji">🎥</div>
          <a href="#projects" className="card-btn neo-border card-btn-green">PORTFOLIO</a>
        </div>

        {/* Card 3 – Team Up */}
        <div className="card bg-green neo-border card-tilt">
          <p className="sub-tag">LEADERSHIP</p>
          <h3>TEAM UP WITH SAMYAK</h3>
          <p className="card-desc">Social Media Manager 2026</p>
          <div className="card-content card-stack-text">
            <span>EVERY</span>
            <span>THING</span>
          </div>
          <a href="#contact" className="card-btn neo-border card-btn-dark">JOIN</a>
        </div>
      </section>

      {/* ── PROJECTS BANNER ── */}
      <section className="green-banner" id="projects">
        <div className="banner-inner">
          <div>
            <h2>HOW TO<br />PLAY</h2>
            <p className="banner-desc">
              Explore my latest desktop automation tools and cinematic productions. Which path will you choose?
            </p>
          </div>
          <div className="big-coin">
            <span style={{ fontSize: '4rem' }}>⭐</span>
          </div>
        </div>

        <div className="projects-grid">
          <div className="project-card neo-border">
            <h3 className="bubble-font">VMS<br />CROPPER</h3>
            <div className="project-emoji">✂️</div>
            <p style={{ fontWeight: 700 }}>100% Offline Automation Tool</p>
          </div>
          <div className="project-card neo-border">
            <h3 className="bubble-font">AJANTHA<br />SUITE</h3>
            <div className="project-emoji">🎨</div>
            <p style={{ fontWeight: 700 }}>Graphics Batch Processing</p>
          </div>
          <div className="project-card neo-border">
            <h3 className="bubble-font">AIR<br />SCROLL</h3>
            <div className="project-emoji">✋</div>
            <p style={{ fontWeight: 700 }}>AI Hand Tracking App</p>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="skills-section">
        <h2 className="skills-title">$SKILLS</h2>
        <p className="skills-sub">Introducing my three key domains</p>

        <div className="skills-list">
          <div className="skill-item">
            <div className="skill-icon neo-border green">AI</div>
            <div className="skill-info">
              <h4>AIML DEVELOPMENT</h4>
              <p>Developing AI-powered tools like Air Scroll using MediaPipe and hand tracking. Specializing in computer vision and Python algorithms.</p>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-icon neo-border">SA</div>
            <div className="skill-info">
              <h4>SOFTWARE ARCHITECTURE</h4>
              <p>Building high-speed desktop solutions (VMS_Cropper Pro) that bulk crop photos in seconds, ensuring 100% offline data security. Scaling workflow automations.</p>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-icon neo-border" style={{ backgroundColor: '#fff', color: 'var(--black)' }}>MC</div>
            <div className="skill-info">
              <h4>MEDIA CREATION</h4>
              <p>End-to-end production for digital ads and events. Professional cinematography and color grading into modern creative workflows. Next stop: Social Media Manager.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer" id="contact">
        <h2>YOUR GATEWAY TO EXCELLENCE</h2>
        <button className="lets-talk-btn neo-pill" onClick={() => { setModalOpen(true); setFormErr(''); }}>LET'S TALK</button>
        <p className="footer-contact">Email: waklesamyak5@gmail.com</p>
        <p className="footer-contact">Phone: +91 7385151208</p>

        <div className="social-links">
          <a href="https://www.linkedin.com/in/samyak-wakle-680a4b28b/" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
          <a href="https://www.instagram.com/samyak_wakle" target="_blank" rel="noreferrer" className="social-link">Instagram</a>
          <a href="https://www.instagram.com/craftelite.studio/" target="_blank" rel="noreferrer" className="social-link">Craftelite</a>
        </div>
      </footer>

      {/* ── CONTACT MODAL ── */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box neo-border" ref={modalRef}>
            <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close">✕</button>
            <h3 className="modal-title">LET'S CONNECT</h3>
            <p className="modal-sub">Fill in your details and I'll get back to you on WhatsApp ✅</p>
            <form onSubmit={handleModalSubmit} className="modal-form">
              <div className="modal-field">
                <label htmlFor="m-name">Your Name</label>
                <input
                  id="m-name"
                  type="text"
                  placeholder="Rahul Sharma"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label htmlFor="m-mobile">Mobile Number</label>
                <input
                  id="m-mobile"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.mobile}
                  onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label htmlFor="m-service">Service Required</label>
                <select
                  id="m-service"
                  value={form.service}
                  onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                >
                  <option value="">— Select a service —</option>
                  <option value="AI / App Development">AI / App Development</option>
                  <option value="Software Architecture">Software Architecture</option>
                  <option value="Media Creation">Media Creation</option>
                </select>
              </div>
              {formErr && <p className="modal-err">{formErr}</p>}
              <button type="submit" className="modal-submit neo-border">
                <span>📲</span> CHAT ON WHATSAPP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
