import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Database,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Monitor,
  Send,
  Server,
  Sparkles,
  X,
} from 'lucide-react'
import { navigation, profile, projects, services, skillGroups } from './data.js'

const phrases = ['Full-Stack Developer', 'Web Application Developer', 'Creative Problem Solver']
const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT

function Reveal({ children, className = '', delay = 0, as: Element = motion.div, id, ...props }) {
  const reduceMotion = useReducedMotion()

  return (
    <Element
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Element>
  )
}

function SectionTitle({ eyebrow, title, note, centered = false }) {
  return (
    <div className={`section-title${centered ? ' section-title--center' : ''}`}>
      <span className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</span>
      <h2>{title}</h2>
      {note && <p>{note}</p>}
    </div>
  )
}

function SocialLink({ href, label, icon: Icon }) {
  if (!href) {
    return (
      <span className="social-placeholder" aria-label={`${label} profile not added`}>
        <Icon size={17} aria-hidden="true" />
        <span>{label} <small>not added</small></span>
      </span>
    )
  }

  return (
    <a className="social-link" href={href} target="_blank" rel="noreferrer" aria-label={label}>
      <Icon size={17} aria-hidden="true" />
      <span>{label}</span>
      <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  )
}

function HeroArtwork() {
  return (
    <div className="hero-art" aria-label="Decorative code editor illustration" role="img">
      <div className="art-orbit art-orbit--outer" />
      <div className="art-orbit art-orbit--inner" />
      <div className="art-glow" />
      <div className="art-crosshair art-crosshair--one" />
      <div className="art-crosshair art-crosshair--two" />
      <div className="floating-token token-braces"><Braces size={20} /></div>
      <div className="floating-token token-database"><Database size={18} /></div>
      <div className="floating-token token-code"><Code2 size={18} /></div>
      <div className="editor-window">
        <div className="editor-topbar">
          <div className="window-dots"><i /><i /><i /></div>
          <span><Code2 size={12} /> irfan.dev</span>
          <div className="editor-topbar-end"><span /> DEPLOYED</div>
        </div>
        <div className="editor-body">
          <div className="editor-lines" aria-hidden="true">
            <span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span><span>07</span>
          </div>
          <div className="editor-code" aria-hidden="true">
            <p><b>const</b> <em>developer</em> = {'{'}</p>
            <p className="indent"><strong>name</strong>: <i>'Ahamed Irfan'</i>,</p>
            <p className="indent"><strong>focus</strong>: <i>'the details'</i>,</p>
            <p className="indent"><strong>build</strong>: <span>async</span> () =&gt; {'{'}</p>
            <p className="indent more"><b>return</b> <u>'something useful'</u></p>
            <p className="indent">{'}'}</p>
            <p>{'}'}</p>
          </div>
        </div>
        <div className="editor-status"><span><span className="status-light" /> All systems creative</span><span>UTF-8&nbsp; · &nbsp;JS</span></div>
      </div>
      <div className="art-caption"><span className="caption-line" /> ideas, meet implementation</div>
    </div>
  )
}

function ProjectPreview({ type }) {
  return (
    <div className={`project-preview preview-${type}`} aria-hidden="true">
      <div className="preview-browser">
        <div className="preview-browser-bar"><span /><span /><span /><i>preview.local</i></div>
        {type === 'dashboard' && (
          <div className="dashboard-preview">
            <div className="dash-sidebar"><b /><i /><i /><i /><i /></div>
            <div className="dash-main"><b /><div className="dash-stat-row"><i /><i /><i /></div><div className="dash-chart"><span /><span /><span /><span /><span /><span /><span /></div></div>
          </div>
        )}
        {type === 'portfolio' && (
          <div className="portfolio-preview"><span>GOOD DESIGN<br />FEELS HUMAN.</span><i /><b /><small>SELECTED WORK &nbsp; / &nbsp; 2026</small></div>
        )}
        {type === 'database' && (
          <div className="database-preview"><div className="db-top"><b /><span /><span /></div><div className="db-table"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="db-bottom"><span /> <b>records organized</b></div></div>
        )}
      </div>
      <span className="preview-label"><Sparkles size={12} /> concept preview</span>
    </div>
  )
}

function ProjectCard({ project, index }) {
  return (
    <Reveal as={motion.article} className="project-card" delay={index * 0.09} whileHover={{ y: -6 }}>
      <ProjectPreview type={project.visual} />
      <div className="project-content">
        <div className="project-heading-row"><span className="project-number">{project.number} / CONCEPT</span><ArrowUpRight size={17} /></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-actions">
          <button type="button" disabled aria-label={`${project.title}: live demo URL not added`}>Live demo <ArrowUpRight size={14} /></button>
          <button type="button" disabled aria-label={`${project.title}: GitHub URL not added`}>GitHub <Github size={14} /></button>
        </div>
      </div>
    </Reveal>
  )
}

function ContactForm() {
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return

    if (!contactEndpoint) {
      setStatus({ type: 'info', message: 'Your details are valid, but message delivery is not configured yet.' })
      return
    }

    setSending(true)
    setStatus({ type: '', message: '' })
    const formData = new FormData(form)

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      if (!response.ok) throw new Error('The message could not be delivered.')
      form.reset()
      setStatus({ type: 'success', message: 'Message sent. Thanks for reaching out.' })
    } catch {
      setStatus({ type: 'error', message: 'Message delivery failed. Please try again later.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Name<input autoComplete="name" name="name" placeholder="Your name" required /></label>
        <label>Email<input autoComplete="email" name="email" type="email" placeholder="you@example.com" required /></label>
      </div>
      <label>Subject<input name="subject" placeholder="What would you like to discuss?" required /></label>
      <label>Message<textarea name="message" placeholder="A little context goes a long way..." rows="5" minLength="12" required /></label>
      <div className="form-submit-row">
        <button className="button button-primary" type="submit" disabled={sending}>
          {sending ? 'Sending...' : 'Send message'} {sending ? <span className="button-spinner" /> : <Send size={15} />}
        </button>
        <span className="form-private"><Check size={13} /> No spam, just a reply.</span>
      </div>
      <p className={`form-status${status.type ? ` form-status--${status.type}` : ''}`} aria-live="polite">{status.message}</p>
    </form>
  )
}

function CustomCursor() {
  const cursorRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return undefined
    const moveCursor = (event) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      }
    }
    window.addEventListener('pointermove', moveCursor, { passive: true })
    return () => window.removeEventListener('pointermove', moveCursor)
  }, [reduceMotion])

  if (reduceMotion) return null
  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><span /></div>
}

function App() {
  const reduceMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [typedText, setTypedText] = useState(phrases[0])
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
      setShowTop(window.scrollY > 500)
    }
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  useEffect(() => {
    if (reduceMotion) return undefined
    let phraseIndex = 0
    let characterIndex = phrases[0].length
    let deleting = true
    let timer

    const tick = () => {
      const phrase = phrases[phraseIndex]
      if (deleting) {
        characterIndex -= 1
        setTypedText(phrase.slice(0, characterIndex))
        if (characterIndex <= 0) {
          deleting = false
          phraseIndex = (phraseIndex + 1) % phrases.length
          timer = window.setTimeout(tick, 350)
          return
        }
        timer = window.setTimeout(tick, 34)
        return
      }

      characterIndex += 1
      setTypedText(phrases[phraseIndex].slice(0, characterIndex))
      if (characterIndex >= phrases[phraseIndex].length) {
        deleting = true
        timer = window.setTimeout(tick, 1800)
        return
      }
      timer = window.setTimeout(tick, 62)
    }

    timer = window.setTimeout(tick, 1800)
    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scroll-track" aria-hidden="true"><span style={{ transform: `scaleX(${scrollProgress})` }} /></div>
      <CustomCursor />

      <header className="site-header">
        <nav className="nav-shell container" aria-label="Main navigation">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Ahamed Irfan, home"><span className="brand-mark">AI<span>.</span></span></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
            {navigation.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}
            <a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={14} /></a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section className="hero-section section-wrap" id="home">
          <div className="hero-grid container">
            <div className="hero-copy">
              <motion.div className="hero-label" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="live-dot" /> FULL-STACK DEVELOPER <span className="label-divider">/</span> B.TECH IT STUDENT
              </motion.div>
              <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}>
                Hi, I’m<br /><span className="hero-name">Ahamed Irfan<span className="hero-period">.</span></span>
              </motion.h1>
              <p className="hero-manifesto">Building Modern Web Experiences<span>.</span></p>
              <motion.div className="hero-rotator" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} aria-label={typedText}>
                <span className="rotator-prefix">I’m a</span> <span className="typed-text">{typedText}</span><span className="typing-caret" aria-hidden="true" />
              </motion.div>
              <motion.p className="hero-description" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                I’m Ahamed Irfan, a B.Tech Information Technology student and aspiring full-stack developer passionate about building modern, responsive, and user-friendly web applications. I enjoy turning ideas into digital experiences through clean code, thoughtful design, and continuous learning.
              </motion.p>
              <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <a className="button button-primary" href="#projects">Explore my projects <ArrowUpRight size={16} /></a>
                <a className="button button-quiet" href="#contact">Contact me <ArrowDownRight size={16} /></a>
              </motion.div>
              <motion.div className="hero-meta" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <span><span className="meta-line" /> Based at MSAJCE</span>
                <span className="meta-separator">·</span>
                <span>Always learning, always building</span>
              </motion.div>
            </div>
            <motion.div className="hero-visual-wrap" initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
              <HeroArtwork />
            </motion.div>
            <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><span className="scroll-cue-line" /></a>
            <div className="hero-index" aria-hidden="true">01 <span>/</span> 07</div>
          </div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="container about-grid">
            <Reveal className="about-intro">
              <SectionTitle eyebrow="A LITTLE ABOUT ME" title={<>Curious by nature.<br /><span className="text-muted">Developer by practice.</span></>} />
              <p className="about-copy">I’m {profile.name}, an IT student at {profile.college} with a passion for full-stack development. I enjoy exploring new technologies, developing interactive web applications, and solving real-world problems through software. My goal is to build reliable, scalable, and user-friendly digital products while continuously improving my technical skills.</p>
              <a className={`resume-link${profile.resumeUrl ? '' : ' resume-link--disabled'}`} href={profile.resumeUrl || undefined} aria-disabled={!profile.resumeUrl} onClick={(event) => !profile.resumeUrl && event.preventDefault()}>
                {profile.resumeUrl ? 'Download resume' : 'Resume not added yet'} <ArrowUpRight size={15} />
              </a>
              {!profile.resumeUrl && <span className="resume-hint">Add your file at <code>/public/resume.pdf</code> and set <code>resumeUrl</code> in <code>src/data.js</code>.</span>}
            </Reveal>
            <Reveal className="about-facts" delay={0.12}>
              <div className="fact-card"><span className="fact-icon"><GraduationCap size={18} /></span><span className="fact-label">EDUCATION</span><strong>B.Tech Information Technology</strong><small>Undergraduate student</small><span className="fact-index">01</span></div>
              <div className="fact-card"><span className="fact-icon"><Monitor size={18} /></span><span className="fact-label">INSTITUTION</span><strong>MSAJCE</strong><small>Chennai, India</small><span className="fact-index">02</span></div>
              <div className="fact-card fact-card--wide"><span className="fact-icon"><Code2 size={18} /></span><span className="fact-label">CURRENT FOCUS</span><strong>Full-Stack Development</strong><small>Thoughtful interfaces, useful systems</small><span className="fact-index">03</span></div>
            </Reveal>
          </div>
        </section>

        <section className="skills-section section-wrap" id="skills">
          <div className="container">
            <Reveal><SectionTitle eyebrow="THE TOOLKIT" title={<>Tools for turning<br /><span className="text-muted">ideas into interfaces.</span></>} note="A growing toolkit, shaped by curiosity and hands-on practice." /></Reveal>
            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <Reveal as={motion.article} className="skill-card" key={group.title} delay={index * 0.06} whileHover={{ y: -4 }}>
                  <div className="skill-card-head"><span className="skill-icon">{index === 0 ? <Monitor size={17} /> : index === 1 ? <Server size={17} /> : index === 2 ? <Database size={17} /> : <Braces size={17} />}</span><span className="skill-count">0{index + 1}</span></div>
                  <h3>{group.title}</h3>
                  <p className="skill-note">{group.note}</p>
                  <div className="skill-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                </Reveal>
              ))}
            </div>
            <p className="skills-disclaimer"><span /> These are suggested technologies from the brief. Remove anything you don’t use in <code>src/data.js</code> before publishing.</p>
          </div>
        </section>

        <section className="projects-section section-wrap" id="projects">
          <div className="container">
            <Reveal className="projects-heading"><SectionTitle eyebrow="SELECTED WORK" title={<>A few things I’d<br /><span className="text-muted">love to build.</span></>} note="Project concepts are placeholders. Swap in real work, descriptions, and links when ready." /><span className="project-aside">03 <span>CONCEPTS</span></span></Reveal>
            <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} />)}</div>
          </div>
        </section>

        <section className="education-section section-wrap" id="education">
          <div className="container education-grid">
            <Reveal><SectionTitle eyebrow="THE LEARNING PATH" title={<>Where the<br /><span className="text-muted">journey began.</span></>} note="Building a foundation for the work ahead." /></Reveal>
            <div className="timeline">
              <Reveal as={motion.article} className="timeline-item" delay={0.08}>
                <span className="timeline-node"><GraduationCap size={16} /></span>
                <div className="timeline-topline"><span>COLLEGE</span><span>STUDY PERIOD TO BE ADDED</span></div>
                <h3>{profile.college}</h3>
                <p>{profile.department}</p>
                <small>{profile.collegeFull}</small>
                <span className="timeline-note">Graduation year to be added</span>
              </Reveal>
              <Reveal as={motion.article} className="timeline-item" delay={0.18}>
                <span className="timeline-node timeline-node--muted"><GraduationCap size={16} /></span>
                <div className="timeline-topline"><span>SCHOOL</span><span>COMPLETION YEAR TO BE ADDED</span></div>
                <h3>{profile.school}</h3>
                <p>Higher Secondary Education</p>
                <span className="timeline-note">Add your school completion year</span>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="services-section section-wrap" id="services">
          <div className="container">
            <Reveal><SectionTitle eyebrow="WHAT I DO" title={<>From first sketch<br /><span className="text-muted">to working product.</span></>} note="Areas I’m focused on learning and contributing in." /></Reveal>
            <div className="services-grid">
              {services.map((service, index) => (
                <Reveal as={motion.article} className="service-card" key={service.number} delay={index * 0.08} whileHover={{ y: -5 }}>
                  <div className="service-top"><span className="service-icon">{service.icon === 'layout' ? <Monitor size={20} /> : service.icon === 'server' ? <Server size={20} /> : <Layers3 size={20} />}</span><span>{service.number}</span></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-arrow"><ArrowRight size={16} /></span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="container">
            <Reveal className="contact-banner">
              <div className="contact-banner-glow" />
              <div><span className="eyebrow"><span className="eyebrow-mark" /> OPEN TO GOOD IDEAS</span><h2>Have a project<br />in mind<span className="hero-period">?</span></h2><p>I’m always interested in discussing ideas, collaborating on projects, and exploring opportunities to build something meaningful. Let’s connect.</p></div>
              <a className="contact-banner-link" href="#contact-form" aria-label="Go to contact form"><ArrowDownRight size={23} /></a>
            </Reveal>
            <div className="contact-grid" id="contact-form">
              <Reveal className="contact-info">
                <SectionTitle eyebrow="GET IN TOUCH" title={<>Let’s make<br /><span className="text-muted">something matter.</span></>} note="Have a question, an idea, or an opportunity? Send a note." />
                <div className="contact-socials">
                  {profile.email ? <a className="social-link" href={`mailto:${profile.email}`}><Mail size={17} /><span>{profile.email}</span><ArrowUpRight size={13} /></a> : <span className="social-placeholder"><Mail size={17} /><span>Email <small>not added</small></span></span>}
                  <SocialLink href={profile.githubUrl} label="GitHub" icon={Github} />
                  <SocialLink href={profile.linkedinUrl} label="LinkedIn" icon={Linkedin} />
                </div>
                <p className="social-hint">Add real profile URLs in <code>src/data.js</code> to activate these links.</p>
              </Reveal>
              <Reveal className="contact-form-wrap" delay={0.12}><ContactForm /></Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <a className="footer-brand" href="#home"><span className="brand-mark">AI<span>.</span></span><span>{profile.name}<small>Full-Stack Developer</small></span></a>
          <div className="footer-nav" aria-label="Footer navigation">{navigation.filter((item) => item.label !== 'Home').map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
          <div className="footer-socials"><SocialLink href={profile.githubUrl} label="GitHub" icon={Github} /><SocialLink href={profile.linkedinUrl} label="LinkedIn" icon={Linkedin} /></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><span>Designed and built with care <span className="footer-star">✳</span></span><a href="#home">Back to top <ArrowUp size={13} /></a></div>
      </footer>

      <button className={`back-to-top${showTop ? ' back-to-top--visible' : ''}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })} tabIndex={showTop ? 0 : -1}><ArrowUp size={17} /></button>
    </>
  )
}

export default App