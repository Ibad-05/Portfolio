import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ibad Kabir — B.Tech CSE · AI/ML Portfolio" },
      { name: "description", content: "Ibad Kabir, B.Tech CSE student building with LLMs, RAG and agentic AI for sustainability." },
      { property: "og:title", content: "Ibad Kabir — AI/ML Portfolio" },
      { property: "og:description", content: "B.Tech CSE student working on LLMs, RAG and agentic AI for good." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const burst = Array.from({ length: 28 }, (_, i) => {
  const a = (Math.PI * i) / 14, r = i % 2 ? 22 : 46;
  return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`;
}).join(" ");

// Add artwork here: { src, title, note? }. Images keep their natural aspect ratio.
const ARTWORK: { src: string; title: string; note?: string }[] = [];

const KEY = "portfolio-photo";
const EMAIL = "ibaadkabir@gmail.com";

function Index() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [status, setStatus] = useState("Tap the email to copy it");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setPhoto(s); } catch {}
  }, []);

  const onFile = (f?: File) => {
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      const im = new Image();
      im.onload = () => {
        const s = Math.min(1, 700 / Math.max(im.width, im.height));
        const c = document.createElement("canvas");
        c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
        const x = c.getContext("2d")!;
        x.drawImage(im, 0, 0, c.width, c.height);
        const d = x.getImageData(0, 0, c.width, c.height), p = d.data;
        for (let i = 0; i < p.length; i += 4) { const g = p[i]! * 0.3 + p[i + 1]! * 0.59 + p[i + 2]! * 0.11; p[i] = p[i + 1] = p[i + 2] = g; }
        x.putImageData(d, 0, 0);
        const url = c.toDataURL("image/jpeg", 0.85);
        setPhoto(url);
        try { localStorage.setItem(KEY, url); } catch {}
      };
      im.src = rd.result as string;
    };
    rd.readAsDataURL(f);
  };

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).then(
      () => setStatus("Copied " + EMAIL),
      () => setStatus("Press Ctrl/Cmd + C to copy"),
    );
  };

  return (
    <div className="wrap">
      <header className="bar">
        <a className="logo" href="#top"><i></i>IBAD KABIR</a>
        <nav>
          <a href="#skills">Toolkit</a>
          <a href="#work">Work</a>
          <a href="#path">Path</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <div className="hero">
          <div className="board">
            <span className="about-script">About me</span>
            <span className="eyes">x_x</span>
            <svg className="spin-ring" viewBox="0 0 360 360" aria-hidden="true">
              <defs><path id="circ" d="M180,180 m-150,0 a150,150 0 1,1 300,0 a150,150 0 1,1 -300,0" /></defs>
              <text><textPath href="#circ" startOffset="0">AI / ML · DEVELOPER · LEARNER · BUILDER · AI / ML · DEVELOPER · LEARNER · BUILDER ·</textPath></text>
            </svg>
            <button className="polaroid" type="button" aria-label="Click to add your photo" onClick={() => fileRef.current?.click()}>
              <div className="photo">
                {photo ? (
                  <img src={photo} alt="Portrait of Ibad Kabir" />
                ) : (
                  <svg viewBox="0 0 300 330" role="img" aria-label="Placeholder portrait">
                    <defs><pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.3" fill="var(--line)" /></pattern></defs>
                    <rect width="300" height="330" fill="var(--ink-2)" />
                    <rect width="300" height="330" fill="url(#dots)" />
                    <path d="M70 330c0-62 34-92 80-92s80 30 80 92z" fill="var(--paper)" />
                    <ellipse cx="150" cy="150" rx="52" ry="62" fill="var(--paper)" />
                    <path d="M96 138c-4-52 30-78 62-76 36 2 52 34 46 78-10-26-26-38-52-38s-46 14-56 36z" fill="var(--ink)" />
                  </svg>
                )}
                {!photo && <span className="hint">Tap to add photo</span>}
              </div>
              <div className="cap"><b>B.Tech CSE</b><span>year 02</span></div>
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
            <svg className="burst" viewBox="-50 -50 100 100" aria-hidden="true"><polygon points={burst} fill="var(--ink)" stroke="var(--paper)" strokeWidth="2" /></svg>
            <svg className="flame" viewBox="0 0 200 220" fill="none" aria-hidden="true">
              <path d="M20 205c30-8 70-6 100-24 30-18 34-60 18-96-6-14-2-34 12-46 4 22 22 34 30 56 14 38-2 78-38 100-34 20-84 20-122 10z" stroke="var(--pink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M84 196c20-6 44-18 52-42 6-18-2-34-8-48" stroke="var(--pink)" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <span className="sticker s-code">&lt;/ai&gt;</span>
            <span className="sticker s-cse">{"{ ai.for(good) }"}</span>
          </div>

          <div className="say">
            <h1>Hi<span>!!</span></h1>
            <p>My name is Ibad Kabir. I'm a <span className="hl">B.Tech CSE student</span> and aspiring software developer with a strong pull toward AI and machine learning.</p>
            <p><strong>Lately</strong>I've been working with large language models, RAG and agentic AI, including an internship at 1M1B on AI for sustainability. I'm currently learning HTML, CSS, JavaScript, Python and C/C++.</p>
            <p><strong>I love to</strong>turn AI into something useful for climate action, clean energy and waste reduction. Away from the keyboard, I'm into music production and graphic design.</p>
            <div className="corner" aria-hidden="true"></div>
          </div>
        </div>

        <section id="skills">
          <div className="head"><h2>Toolkit</h2><small>what I work with</small></div>
          <div className="groups">
            <div className="group">
              <h3>AI &amp; Data</h3>
              <div className="chips">
                {["Machine Learning", "IBM Granite"].map((c, i) => (
                  <span key={c} className={i < 2 ? "chip hot" : "chip"}>{c}</span>
                ))}
              </div>
            </div>
            <div className="group">
              <h3>Web Development</h3>
              <div className="chips">
                {["HTML", "CSS · learning", "JavaScript · learning", "React"].map((c) => <span key={c} className="chip">{c}</span>)}
              </div>
            </div>
            <div className="group">
              <h3>Programming</h3>
              <div className="chips">
                {["C", "C++", "Python"].map((c) => <span key={c} className="chip">{c}</span>)}
              </div>
            </div>
            <div className="group">
              <h3>Tools</h3>
              <div className="chips">
                {["VS Code", "Git · learning", "GitHub · learning", "Adobe Illustrator", "Adobe Photoshop", "FL Studio"].map((c) => <span key={c} className="chip">{c}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="work">
          <div className="head"><h2>Selected Work</h2><small>and proof</small></div>
          <div className="work">
            <article className="card a">
              <div className="thumb">
                <em>1M1B × IBM internship project</em>
                <svg viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="100" cy="60" r="34" />
                  <path d="M66 60h68M100 26c-16 18-16 50 0 68M100 26c16 18 16 50 0 68" />
                  <path d="M148 34c16-4 28 4 32 20-16 4-28-4-32-20z" />
                  <path d="M20 86c10-14 24-14 34 0" />
                </svg>
              </div>
              <h3>AI-Powered Sustainability Solution</h3>
              <p className="when">Jul – Sep 2026 · 1M1B × IBM</p>
              <p>Designed an AI-powered sustainability solution during the AI for Sustainability Internship, run with AICTE and co-certified by IBM SkillsBuild. It looks at climate action, clean energy, waste reduction and biodiversity, and is built on IBM Granite models, Retrieval-Augmented Generation and agentic AI, with a Llama vision model applied to waste management.</p>
              <div className="tags">{["IBM Granite", "RAG", "Agentic AI", "LLMs", "Llama vision model", "IBM Bob", "React", "JavaScript", "HTML", "CSS"].map((t) => <span key={t}>{t}</span>)}</div>
            </article>
            <article className="card a">
              <div className="thumb">
                <em>this very site</em>
                <svg viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="30" y="22" width="140" height="76" rx="6" />
                  <path d="M30 40h140M44 31h.1M56 31h.1" />
                  <path d="M46 56h50M46 68h80M46 80h64" />
                </svg>
              </div>
              <h3>Personal Portfolio Website</h3>
              <p className="when">Personal project</p>
              <p>A personal portfolio website created to introduce myself and showcase my skills and projects.</p>
              <div className="tags">{["HTML", "CSS", "JavaScript", "React"].map((t) => <span key={t}>{t}</span>)}</div>
            </article>
            <article className="card b">
              <h3>Certifications</h3>
              <ul className="certs">
                <li>Data Analytics Job Simulation<small>Deloitte Australia</small></li>
                <li>AI Skills Passport<small>EY and Microsoft</small></li>
                <li>Introduction to Generative AI<small>Art of the Possible</small></li>
                <li>AI Skills Passport<small>IBM SkillsBuild, via 1M1B</small></li>
              </ul>
            </article>
          </div>
        </section>

        <section id="art">
          <div className="head"><h2>Creative Works</h2><small>art &amp; design</small></div>
          {ARTWORK.length ? (
            <div className="gallery">
              {ARTWORK.map((w) => (
                <figure key={w.src} className="art">
                  <img src={w.src} alt={w.title} loading="lazy" />
                  <figcaption><b>{w.title}</b>{w.note && <span>{w.note}</span>}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="art-empty">Artwork coming soon.</p>
          )}
        </section>

        <section id="path">
          <div className="head"><h2>The Path</h2><small>so far</small></div>
          <div className="timeline">
            <div className="row">
              <div className="yr">Jul – Sep 2026</div>
              <div><h3>Intern, 1M1B</h3><p>AI for Sustainability Internship with AICTE. Mentor-led learning in AI, ML, LLMs, RAG and agentic AI, ending in a working project design.</p></div>
            </div>
            <div className="row">
              <div className="yr">2025 – 2029</div>
              <div><h3>B.Tech, Computer Science Engineering</h3><p>KCC Institute of Technology and Management. Currently in the second year.</p></div>
            </div>
          </div>
        </section>

        <section id="goals">
          <div className="head"><h2>My Goals</h2><small>where I'm headed</small></div>
          <div className="goal">
            <p><strong>Now</strong>Build a strong foundation in programming and web development, and get comfortable with HTML, CSS and JavaScript.</p>
            <p><strong>Next</strong>Move gradually towards full-stack development and AI/ML.</p>
          </div>
        </section>
      </main>

      <footer id="contact">
        <h2 className="big">Let's build<br />something <span>useful</span></h2>
        <div className="pills">
          <button className="pill copy" type="button" onClick={copy}>{EMAIL}</button>
          <a className="pill" href="https://www.linkedin.com/in/ibad-kabir-b50546395" target="_blank" rel="noopener noreferrer">linkedin.com/in/ibad-kabir-b50546395</a>
        </div>
        <div className="fine" aria-live="polite">{status}</div>
      </footer>
    </div>
  );
}
