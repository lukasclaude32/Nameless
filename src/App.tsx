import { useEffect, useState } from 'react';
import './styles.css';

const navItems = [
  ['#services', 'Naše služby'],
  ['#systems', 'Strojní vybavení'],
  ['#about', 'O nás'],
  ['#references', 'Reference'],
  ['#contact', 'Kariéra'],
];

const services = [
  { title: 'Výroba', text: 'Vlastní strojní park, obrobna a zámečnická dílna. Svařování dle ČSN EN ISO 3834, ocelové konstrukce do EXC3.' },
  { title: 'Montáž', text: 'Kompletní montáž a uvedení do provozu u zákazníka, včetně zaškolení obsluhy a předávací dokumentace.' },
  { title: 'Revize', text: 'Vlastní revizní technici – elektro i strojní. Pravidelné prohlídky a zkoušky podle platných norem.' },
  { title: 'Servis, rekonstrukce a opravy', text: 'Servis vlastních i cizích zařízení, modernizace starších jeřábů, náhradní díly prémiových světových značek.' },
];

const systems = [
  { title: 'Hydraulické plošiny', text: 'Nůžkové zdvihací plošiny, zdvižná čela, nákladní výtahy a ostatní manipulační a zdvihací technika.', label: 'FOTO · NŮŽKOVÁ PLOŠINA' },
  { title: 'Výroba ocelových konstrukcí', text: 'Nosné konstrukce pro širší spektrum průmyslových využití, certifikace EXC3.', label: 'FOTO · OCELOVÁ KONSTRUKCE' },
  { title: 'Manipulátory a polohovadla', text: 'Dopravní a manipulační vozíky, polohovadla forem, hydraulické překlápěče a další.', label: 'FOTO · MANIPULÁTOR' },
  { title: 'Výroba svařenců včetně obrábění', text: 'Přesné svařence včetně obrábění na zakázku dle vlastní i cizí dokumentace.', label: 'FOTO · SVAŘENEC PO OBRÁBĚNÍ' },
];

const categories = ['Železniční přesuvny a točny', 'Kolejové přesuvny', 'Obslužné kabiny', 'Kladky a kladnice', 'Lanové bubny', 'Hydraulické nákladní výtahy'];

const testimonials = [
  { quote: 'Od prvního zaměření po spuštění jeřábu probíhala spolupráce profesionálně, přesně a podle domluveného harmonogramu.', author: 'Petr Novák', role: 'vedoucí výroby · automotive' },
  { quote: 'Oceňujeme technické zkušenosti, rychlou komunikaci a schopnost navrhnout řešení přesně pro podmínky našeho provozu.', author: 'Martin Dvořák', role: 'technický ředitel · strojírenství' },
  { quote: 'Na servisní tým AXIO se můžeme dlouhodobě spolehnout. Revize i opravy jsou rychlé a bez zbytečných prostojů.', author: 'Jan Svoboda', role: 'správce provozu · energetika' },
];

function AxioLogo() {
  return (
    <a className="logo" href="#top" aria-label="AXIO – úvod">
      {['A', 'X', 'I', 'O'].map((letter) => <span key={letter}>{letter}</span>)}
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? ' light' : ''}`}>{children}</p>;
}

function PatternMedia({ className = '', label = 'FOTO' }: { className?: string; label?: string }) {
  return <div className={`pattern-media ${className}`}><span>{label}</span></div>;
}

function ArrowLink({ children }: { children: React.ReactNode }) {
  return <a className="arrow-link" href="#contact">{children}<span aria-hidden="true">→</span></a>;
}

type ServiceIconKind = 'production' | 'assembly' | 'inspection' | 'service' | 'training';

function ServiceIcon({ kind }: { kind: ServiceIconKind }) {
  const drawings: Record<ServiceIconKind, React.ReactNode> = {
    production: <><path d="M2.5 17V8l4.5 2.5V8l4.5 2.5V4h3v13H2.5Z" /><path d="M5 17v-3h3v3m6.5-10H17v10" /><path d="m15.5 10 .6 1.1 1.3.2-.9.8.2 1.3-1.2-.6-1.1.6.3-1.3-.9-.8 1.3-.2.6-1.1Z" /></>,
    assembly: <><path d="M2 4h16M4 4v13m12-13v13M7 4h6M10 4v7" /><path d="M8.5 11h3v1.8a1.5 1.5 0 0 1-3 0" /><path className="icon-load" d="M5 15h10v2H5z" /></>,
    inspection: <><circle cx="8" cy="8" r="4.5" /><path d="m11.5 11.5 5 5M5.8 8l1.5 1.5 3-3M14.5 3.5h3v3" /></>,
    service: <><path d="M12.8 3.2a4 4 0 0 0-4.6 5.1L3 13.5a2.1 2.1 0 1 0 3 3l5.2-5.2a4 4 0 0 0 5.1-4.6l-2.8 2.8-3-3 2.3-3.3Z" /><circle cx="4.6" cy="14.9" r=".7" /></>,
    training: <><path d="M3 9.5h14M5 9.5V8a5 5 0 0 1 10 0v1.5M8 4.1V8m4-3.9V8" /><path d="M4 13.5c2.5 0 3.5.5 6 2 2.5-1.5 3.5-2 6-2v4c-2.5 0-3.5.5-6 2-2.5-1.5-3.5-2-6-2v-4Z" /></>,
  };

  return <span className={`square-icon square-icon-${kind}`} aria-hidden="true"><svg viewBox="0 0 20 20">{drawings[kind]}</svg></span>;
}

function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const revealGroups = [
      '.hero-media',
      '.hero-copy > *',
      '.stats > *',
      '.section-heading > *',
      '.services-grid > *',
      '.systems-grid > *',
      '.category-bar',
      '.about-copy',
      '.about-cards > *',
      '.process-video',
      '.client-row',
      '.experience-grid > *',
      '.testimonials-layout > *',
      '.testimonial-list > *',
      '.footer-top > *',
      '.footer-bottom',
    ];

    const elements = revealGroups.flatMap((selector) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)),
    );

    elements.forEach((element, index) => {
      element.classList.add('scroll-reveal');
      element.style.setProperty('--reveal-delay', `${(index % 4) * 80}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -7% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="top">
      <header className="site-header">
        <div className="header-inner">
          <AxioLogo />
          <nav aria-label="Hlavní navigace">
            {navItems.map(([href, label], index) => <a key={href} href={href}>{label}{index === 0 && <span className="nav-caret"> ▾</span>}</a>)}
          </nav>
          <a className="button button-yellow header-contact" href="#contact">Kontakt</a>
          <button className="menu-button" type="button" aria-label="Otevřít menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobilní navigace">
            {navItems.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
        )}
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="shell hero-shell">
          <div className="hero-media media-pattern">
            <span className="eyebrow media-label">ZAKÁZKOVÁ VÝROBA</span>
            <span className="media-caption">VIDEO LOOP 30 S · AUTOPLAY, BEZ ZVUKU</span>
            <div className="hero-media-actions">
              <span className="media-progress" />
              <button className="button button-yellow" type="button" onClick={() => setVideoOpen(true)}><span aria-hidden="true">▶</span> Celé video</button>
            </div>
          </div>
          <div className="hero-copy">
            <div>
              <Eyebrow>OD ROKU 1989</Eyebrow>
              <h1 id="hero-title">Hýbeme <u>průmyslem</u><br />od roku <mark>1989</mark></h1>
            </div>
            <div className="hero-lead">
              <p>Přesnost v každém milimetru, síla v každém detailu. Navrhujeme, vyrábíme a montujeme mostové jeřáby od 1 do 150 tun — od prvních nákresů po pravidelný servis a revize.</p>
              <div className="hero-buttons">
                <a className="button button-yellow" href="#systems">Výrobní portfolio</a>
                <a className="button button-outline" href="#contact">Poptat řešení</a>
              </div>
            </div>
          </div>
          <div className="stats" aria-label="Hlavní statistiky">
            <div><strong>35+</strong><span>LET NA TRHU</span></div>
            <div><strong>1–150 t</strong><span>NOSNOST JEŘÁBŮ</span></div>
            <div><strong>40 %</strong><span>EXPORT · EU A SVĚT</span></div>
            <div><strong>EXC3</strong><span>ČSN EN 1090-2</span></div>
          </div>
        </div>
      </section>

      <section className="paper-section services-section" id="services">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><Eyebrow light>01 — SLUŽBY</Eyebrow><h2>Kompletní nabídka<br />od prvních <u>nákresů</u><br />po pravidelný <u>servis</u></h2></div>
            <p>Každá zakázka je originál projektovaný na míru. Provedeme vás celým procesem — zaměření haly, 3D model ke schválení, výroba, montáž, uvedení do provozu a revize.</p>
          </div>
          <div className="services-grid">
            {services.slice(0, 3).map((service, index) => (
              <article className="service-card" key={service.title}><ServiceIcon kind={(['production', 'assembly', 'inspection'] as ServiceIconKind[])[index]} /><h3>{service.title}</h3><p>{service.text}</p></article>
            ))}
            <article className="service-card service-wide"><ServiceIcon kind="service" /><h3>{services[3].title}</h3><p>{services[3].text}</p></article>
            <article className="service-card service-dark"><ServiceIcon kind="training" /><span className="tag">UNIKÁTNÍ</span><h3>Školicí středisko</h3><p>Vlastní hala s jeřábem 6,3 t a kladkostroji od prémiového dodavatele. Školení jeřábníků, vazačů a údržby přímo u nás.</p></article>
          </div>
        </div>
      </section>

      <section className="paper-section systems-section" id="systems">
        <div className="shell">
          <div className="section-heading split-heading compact">
            <div><Eyebrow light>02 — VÝROBNÍ PORTFOLIO</Eyebrow><h2>Systémy, které tvoří<br /><u>páteř</u> průmyslových<br />provozů</h2></div>
            <p>Soustředíme se na zakázkovou výrobu, která přesně odpovídá specifickým potřebám každého z našich zákazníků — automotive, ocelárny, chemie i energetika.</p>
          </div>
          <div className="systems-grid">
            <article className="featured-system media-pattern">
              <span className="featured-photo-label">FOTO · MOSTOVÝ JEŘÁB V HALE</span>
              <div><Eyebrow>HLAVNÍ PRODUKT · 1–150 T</Eyebrow><h3>Mostové, konzolové a sloupové<br />jeřáby s příslušenstvím</h3><p>Nabízíme přes 35 let zkušeností v oblasti produkce mostových, konzolových a sloupových jeřábů a jejich příslušenství.</p><div className="micro-data"><span>NOSNOST 1–150 T</span><span>ROZPĚTÍ 3‑35 M</span><span>VÝROBA NA MÍRU</span></div><ArrowLink>Zjistit více</ArrowLink></div>
            </article>
            <article className="system-card system-tall"><PatternMedia label={systems[0].label} /><div><h3>{systems[0].title}</h3><p>{systems[0].text}</p><ArrowLink>Zjistit více</ArrowLink></div></article>
            {systems.slice(1).map((system) => <article className="system-card" key={system.title}><PatternMedia label={system.label} /><div><h3>{system.title}</h3><p>{system.text}</p><ArrowLink>Zjistit více</ArrowLink></div></article>)}
          </div>
          <div className="category-bar"><strong><small>TAKÉ VYRÁBÍME</small>Speciální technika<br />na míru</strong><div>{categories.map((item) => <span key={item}><b aria-hidden="true">▪</b>{item}</span>)}</div><a className="button button-dark" href="#contact">Celé portfolio →</a></div>
        </div>
      </section>

      <section className="paper-section about-section" id="about">
        <div className="shell">
          <div className="about-top">
            <div className="about-copy"><Eyebrow light>03 — O SPOLEČNOSTI</Eyebrow><h2>Jsme<br /><mark>AXIO</mark></h2><p>Rodinná firma, třetí generace. Od roku 1989 patříme k předním dodavatelům mostových jeřábů a manipulační techniky na domácím trhu — a od roku 2018 pod vedením Jana Dvořáka ml. rosteme i v zahraničí.</p><p>Naše jeřáby zvedají tíhu v automobilkách, ocelárnách i jaderných elektrárnách — od domácího trhu po zahraniční zakázky. Rozhodnutí u nás padají osobně a rychle, bez korporátní matky nad sebou.</p><div className="about-actions"><a className="button button-dark" href="#references">Více o společnosti</a><a className="button button-paper" href="#contact">Kontakt</a></div></div>
            <div className="about-cards">
              <blockquote>„Jsme rodinná firma — v uvozovkách je to moje druhá rodina a ty dveře tady jsou u mě vždycky otevřeny.“<footer><span className="avatar" />Jan Dvořák ml.<small>ředitel a jednatel</small></footer></blockquote>
              <div className="about-mini-grid"><div><Eyebrow light>CERTIFIKACE</Eyebrow><ul><li>ISO 9001</li><li>ČSN EN ISO 3834</li><li>ČSN EN 1090-2 · EXC3</li></ul></div><div><Eyebrow light>OBRAT</Eyebrow><strong>XXX <small>mil.</small></strong><span>Kč ročně · dvě provozovny</span></div></div>
              <div className="yellow-highlight"><div><Eyebrow light>ŠKOLICÍ STŘEDISKO</Eyebrow><strong>Vlastní školicí hala s jeřábem 6,3 t — jediná svého druhu v regionu</strong></div><a className="button button-dark" href="#contact">Detail <span aria-hidden="true">→</span></a></div>
            </div>
          </div>
          <button className="process-video media-pattern" type="button" onClick={() => setVideoOpen(true)} aria-label="Přehrát video Jak vzniká jeřáb"><span className="play-circle" aria-hidden="true">▶</span><span className="video-small">BRANDOVÉ VIDEO · 3‑4 MIN · S TITULKY</span><strong>Jak vzniká jeřáb — od zaměření haly po<br />uvedení do provozu</strong></button>
          <div className="client-row"><strong>Důvěra průmyslových gigantů<br />po více než 30 let</strong>{Array.from({ length: 5 }, (_, index) => <span key={index}>LOGO ZÁKAZNÍKA</span>)}</div>
        </div>
      </section>

      <section className="experience-section">
        <div className="shell">
          <div className="section-heading split-heading dark-heading"><div><Eyebrow light>04 — ČÍSLA</Eyebrow><h2>Přes <u>35 let</u> v oboru</h2></div><p>Každé číslo vypovídá o naší kvalitě a spolehlivosti. Nejsou to jen statistiky — jsou to roky věnované řemeslu.</p></div>
          <div className="experience-grid">
            <div className="experience-numbers"><article><Eyebrow light>REALIZOVANÝCH PROJEKTŮ</Eyebrow><strong>500+</strong><p>Každý projekt na míru</p></article><article><Eyebrow light>SPECIALISTŮ V TÝMU</Eyebrow><strong>50+</strong><p>Řada lidí 25‑40 let ve firmě</p></article></div>
            <PatternMedia className="experience-main" label="FOTO · VÝROBA, PORTRÉT" />
            <div className="experience-right"><article className="years"><Eyebrow light>ROKŮ NA TRHU</Eyebrow><strong>35+</strong><p>Nikdy jsme nebyli ve ztrátě</p></article><PatternMedia label="FOTO · VÝROBNÍ AREÁL" /></div>
          </div>
        </div>
      </section>

      <section className="paper-section testimonials-section" id="references">
        <div className="shell testimonials-layout">
          <div><Eyebrow light>05 — REFERENCE</Eyebrow><h2>Co o nás<br /><u>říkají</u></h2><p>Firmy, které s námi pracují, vědí, na co se mohou spolehnout. Jejich slova jsou nejlepší důkaz naší práce.</p><ArrowLink>Všechny reference</ArrowLink></div>
          <div className="testimonial-list">{testimonials.map((testimonial) => <blockquote key={testimonial.author}><Eyebrow>★★★★★</Eyebrow><p>„{testimonial.quote}“</p><footer><span className="avatar" /><strong>{testimonial.author}</strong><small>{testimonial.role}</small></footer></blockquote>)}</div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="shell">
          <div className="footer-top">
            <div className="footer-cta"><h2>Máte projekt?<br /><u>Ozvěte se.</u></h2><p>Přijedeme, zaměříme halu a připravíme 3D model ke schválení. Bez prázdných frází — s doloženými výsledky.</p><div><a className="button button-yellow" href="mailto:info@axio-industry.cz">Napište nám</a><a className="button button-outline" href="tel:+420000000000">+420 000 000 000</a></div></div>
            <div className="footer-contacts"><article><Eyebrow>OBCHOD</Eyebrow><a href="mailto:info@axio-industry.cz">info@axio-industry.cz</a><a href="tel:+420000000000">+420 000 000 000</a></article><article><Eyebrow>SERVIS & REVIZE</Eyebrow><a href="mailto:servis@axio-industry.cz">servis@axio-industry.cz</a><a href="tel:+420000000111">+420 000 000 111</a></article><article><Eyebrow>KARIÉRA</Eyebrow><p>Aktuálně nabízíme: <strong className="plain-strong">2 pozice</strong><br /><strong>Chci se přidat →</strong></p></article><article><Eyebrow>PROVOZOVNY</Eyebrow><p>Průmyslová 149, Nová Ves<br />Obrobna Nová Ves II</p></article></div>
          </div>
          <div className="footer-bottom"><AxioLogo /><div><a href="#systems">Výrobní portfolio</a><a href="#services">Servis a revize</a><a href="#about">Školicí středisko</a><a href="#about">O nás</a><a href="#contact">Kariéra</a></div><span>AXIO s.r.o. · IČ 000 00 000 · © 2026</span></div>
        </div>
      </footer>

      {videoOpen && <div className="video-modal" role="dialog" aria-modal="true" aria-label="Ukázkové video"><button type="button" aria-label="Zavřít video" onClick={() => setVideoOpen(false)}><span aria-hidden="true">×</span></button><div className="modal-placeholder media-pattern"><span className="modal-play" aria-hidden="true">▶</span><p>Produktové video připravujeme</p></div></div>}
    </main>
  );
}

function MobilePreview() {
  return (
    <main className="mobile-preview-page">
      <header className="mobile-preview-toolbar">
        <div>
          <strong>Mobilní náhled</strong>
          <span>390 × 844 px</span>
        </div>
        <a href="/" target="_blank" rel="noreferrer">Otevřít normální web ↗</a>
      </header>
      <div className="phone-shell" aria-label="Náhled webu na telefonu">
        <div className="phone-speaker" />
        <iframe src="/" title="AXIO v mobilním zobrazení" />
      </div>
    </main>
  );
}

export default function App() {
  return window.location.pathname === '/mobile-preview' ? <MobilePreview /> : <Site />;
}
