# Portfolio Reference Report — 18 Portfolios Analyzed

> Source of truth for all design/implementation decisions.
> Research completed: 2026-08-12
> Database: `ideas-database.ts` (62 patterns, 12 families)

---

## Rankings

| # | Portfolio | URL | Overall | R | E | D | Framework |
|---|-----------|-----|---------|---|---|---|-----------|
| 1 | F1LEO / Maaskk | maaskk.github.io | 8.9 | 8.9 | 9.0 | 9.1 | Static HTML/JS |
| 2 | Alex Merced | alexmercedcoder.dev | 8.9 | 9.1 | 9.4 | 8.8 | Custom static |
| 3 | Erwin Glenn Capitan II | glcapitan.github.io | 8.7 | 9.0 | 8.9 | 8.6 | Static HTML |
| 4 | Franz / ikidevs | ikidevs.vercel.app | 8.7 | 8.9 | 9.2 | 8.8 | Next.js + Atomic Design |
| 5 | Mohamed Taha | motahaaboheiba.github.io | 8.6 | 8.9 | 9.0 | 8.7 | Static HTML/Vanilla JS |
| 6 | darktheDE | darktheDE.github.io | 8.6 | 9.0 | 8.9 | 8.8 | React + Vite + Tailwind |
| 7 | Zeineb Ghrab | zeinebghrab.vercel.app | 8.5 | 9.3 | 8.5 | 8.3 | React + Framer Motion |
| 8 | Raju Nalla | raju-nalla.github.io | 8.5 | 8.9 | 8.7 | 8.4 | React + Framer Motion |
| 9 | Hemanth | 0iamhsk0.github.io | 8.5 | 8.7 | 8.5 | 8.9 | React + Vite |
| 10 | Ishaq Omotosho | tosholadipo.netlify.app | 8.5 | 9.2 | 8.2 | 8.6 | Next.js + Framer Motion |
| 11 | Crystal Jacobs | crystal888.co.za | 8.3 | 8.9 | 8.0 | 8.7 | React + custom runtime |
| 12 | Dinesh Daki | dakidinesh.github.io | 8.2 | 9.1 | 8.0 | 8.7 | React + Vite + Framer Motion |
| 13 | Ahmed Raoofuddin | ahmedraoofuddin.github.io | 8.1 | 8.8 | 8.1 | 8.1 | Static HTML/CSS/JS |
| 14 | Bodin Krongchon | bodinkc30-pete.github.io | 8.1 | 8.5 | 8.0 | 7.8 | Static HTML/CSS/JS |
| 15 | Koketso Raphasha | portfolio-iota-eight-90.vercel.app | 7.9 | 8.3 | 7.5 | 8.0 | React + Vite |
| 16 | Surafel Asfawosen | surafelasfawosen.github.io | 7.9 | 8.2 | 7.6 | 7.8 | Static HTML |
| 17 | Kazim Haider | kazimhaiderportfolio.lovable.app | 7.6 | 8.0 | 7.2 | 7.5 | Lovable (generated) |
| 18 | Milton Ngwenya | ngwenya-mn.github.io | 7.5 | 8.0 | 6.4 | 8.6 | React + Vite + Tailwind + GSAP |

R = Recruiter UX, E = Engineer UX, D = Designer UX

---

## 1. F1LEO / Maaskk — Cybersecurity Journal

**URL:** maaskk.github.io
**Overall:** 8.9 | Recruiter: 8.9 | Engineer: 9.0 | Designer: 9.1
**Style:** Evidence-first cybersecurity journal with custom publishing pipeline

### What it is
F1LEO is not a traditional portfolio. It's a **technical journal** — a collection of security research articles, CTF writeups, and tool builds, all published through a custom pipeline. The site proves capability through the work itself, not through claims about capability.

### Key patterns
- **Evidence-first positioning:** Skills are DERIVED from published work, not self-declared
- **Custom publishing pipeline:** Articles are generated from Markdown through a build system
- **Tool building as signal:** Built custom security tools, proving deeper engineering capability
- **No skill percentages:** Every skill is backed by at least one article or tool

### Strengths
- Highest Designer UX (9.1) in the dataset
- Skills credibility is the highest because they're evidence-derived
- Custom pipeline demonstrates engineering maturity
- Content depth is exceptional

### Weaknesses
- Niche positioning (cybersecurity) limits broad applicability
- Requires continuous content creation to maintain value
- Pipeline complexity may be overkill for Data Engineering

### Apply to DE portfolio
- Derive skills from actual project work (not percentages)
- Build a small tool/utility to demonstrate engineering capability
- Use evidence-first positioning: "I built X, therefore I know Y"

---

## 2. Alex Merced — Data/AI Authority

**URL:** alexmercedcoder.dev
**Overall:** 8.9 | Recruiter: 9.1 | Engineer: 9.4 | Designer: 8.8
**Style:** Authority-driven technical brand with ecosystem storytelling

### What it is
Alex Merced is not a junior portfolio. It's a **personal technical brand** — books, open-source projects, teaching, speaking. The portfolio demonstrates authority through breadth and depth of contribution to the data/AI ecosystem.

### Key patterns
- **Ecosystem project storytelling:** Projects compose into systems (MagGraph → MagAgent → Mag Command Center)
- **Maturity disclosure:** Projects explicitly state what they're ready for and what they're NOT ready for
- **Narrow technical thesis:** Positioning is razor-sharp: "Open Lakehouse & AI Advocate"
- **Technical writing as authority:** Books and articles establish thought leadership

### Strengths
- Highest Engineer UX (9.4) in the dataset
- Best project ecosystem thinking
- Maturity/limitations disclosure builds trust
- Authority positioning is unmatched

### Weaknesses
- Senior-level positioning doesn't translate to junior/fresh graduate
- Requires significant body of work to replicate
- Authority takes years to build

### Apply to DE portfolio
- If projects are related, show how they compose into an ecosystem
- Be honest about what projects are ready for
- One clear positioning thesis > multiple role labels

---

## 3. Erwin Glenn Capitan II — Case Study Portfolio

**URL:** glcapitan.github.io
**Overall:** 8.7 | Recruiter: 9.0 | Engineer: 8.9 | Designer: 8.6
**Style:** Static HTML with deep case-study pages per project

### What it is
Erwin's portfolio is a **case-study website**. Each project gets its own page with Problem → Approach → Architecture → Results → Validation → Honest Notes. The architecture is deliberately simple (static HTML) but the content depth is exceptional.

### Key patterns
- **Outcome-first Hero:** Business metrics in the first screen
- **Case-study pages:** Separate HTML pages per project with full narrative
- **Architecture diagrams:** Custom inline SVG showing data flow
- **Honest notes:** Each project includes what didn't work and lessons learned
- **Before/after metrics:** "80min → 12min" single metric with massive impact

### Strengths
- Best case-study depth in the dataset
- Static HTML = fastest possible load time
- Honest notes build exceptional trust
- Architecture diagrams are immediately understandable

### Weaknesses
- Static HTML requires manual updates
- No framework = harder to add interactive features
- Case-study pages require significant writing effort

### Apply to DE portfolio
- Problem → Architecture → Tradeoff → Impact is the gold standard
- "Honest notes" section per project builds trust
- Before/after metrics are the most impactful single element

---

## 4. Franz Monzales / ikidevs — Atomic Design Portfolio

**URL:** ikidevs.vercel.app
**Overall:** 8.7 | Recruiter: 8.9 | Engineer: 9.2 | Designer: 8.8
**Style:** Next.js + Atomic Design + Centralized content + Tooling separation

### What it is
ikidevs is a **developer-tool + platform portfolio**. It separates reusable libraries from data platform projects, uses Atomic Design (page → template → organisms → molecules → atoms), and centralizes all content in TypeScript files.

### Key patterns
- **Centralized TypeScript content file:** All data in one typed file, UI reads from it
- **Separate tooling vs platform projects:** Different categories for different audiences
- **Atomic Design architecture:** Components organized by complexity level
- **Content decoupled from UI:** Easy to update content without touching components

### Strengths
- Cleanest frontend architecture in the dataset
- Centralized content makes updates trivial
- Tooling projects demonstrate higher engineering capability
- TypeScript types prevent content errors

### Weaknesses
- Requires Next.js knowledge to replicate
- Atomic Design may be overkill for small portfolios
- Tooling projects need actual published packages to be credible

### Apply to DE portfolio
- Centralize all content in TypeScript files (projects, skills, experience)
- Separate platform projects from utility/tool projects
- Content-as-data approach makes future changes easy

---

## 5. Mohamed Taha Abo Heiba — Engineering Workflow Portfolio

**URL:** motahaaboheiba.github.io
**Overall:** 8.6 | Recruiter: 8.9 | Engineer: 9.0 | Designer: 8.7
**Style:** Interactive engineering workflow + Problem/Architecture/Tradeoff/Impact

### What it is
Mohamed Taha's portfolio has the **best engineering reasoning structure** in the dataset. The centerpiece is an interactive 8-stage engineering workflow (Business Need → Ingestion → Storage → Transformation → Modeling → Quality → Orchestration → Serving) that maps directly to project evidence.

### Key patterns
- **Interactive engineering workflow:** 8 stages, each with Why/Goal/Principles, linked to projects
- **Problem → Architecture → Tradeoff → Impact:** First-class structured fields per project
- **Built vs Studied skill state:** CSS differentiates hands-on from studied tools
- **Workflow ↔ Project mapping:** Bidirectional evidence graph
- **Custom SVG architecture diagrams:** Generated from data, not screenshots

### Strengths
- Best engineering reasoning in the dataset
- Workflow → Project mapping is unique and powerful
- Built vs Studied is the best skill presentation pattern
- Trade-offs are first-class (not hidden in prose)

### Weaknesses
- One 3,271-line HTML monolith (technical debt)
- Workflow may be too complex for non-technical recruiters
- Custom SVG generation requires significant effort

### Apply to DE portfolio
- Problem → Architecture → Tradeoff → Impact is the #1 pattern
- Built vs Studied skill state is better than percentages
- Engineering workflow shows thinking, not just tools

---

## 6. darktheDE / Đỗ Kiến Hưng — Data Engineer Bento Portfolio

**URL:** darktheDE.github.io
**Overall:** 8.6 | Recruiter: 9.0 | Engineer: 8.9 | Designer: 8.8
**Style:** 9 structured projects + Bento layout + architecture evidence

### What it is
darktheDE is the **strongest Data Engineer portfolio** in the dataset. 9 projects with architecture screenshots, metrics, GitHub links, and category filtering. The Bento layout compresses identity + skills + projects into a high-density technical dashboard.

### Key patterns
- **Featured + supporting project hierarchy:** One spotlight project + browsing grid
- **Architecture screenshot as thumbnail:** Diagrams instead of dashboard screenshots
- **Category filtering:** Filter by Data Engineering / BI / ML etc.
- **Projects + CV dual CTA:** Both recruiter (CV) and engineer (projects) served
- **Centralized project data:** All 9 projects in one JS file

### Strengths
- Most project evidence density (9 projects)
- Architecture thumbnails immediately communicate systems thinking
- Featured/supporting hierarchy creates visual priority
- Good SEO (Person + ItemList structured data)

### Weaknesses
- BentoGrid.jsx is 421 lines (oversized component)
- Project schema lacks explicit trade-off fields
- No dedicated case-study routes
- Metrics inconsistent between projects

### Apply to DE portfolio
- Architecture screenshot > dashboard screenshot for DE
- Featured + supporting hierarchy > flat grid
- Dual CTA (Projects + CV) serves both audiences
- Centralize project data in one typed file

---

## 7. Zeineb Ghrab — Recruiter-First Portfolio

**URL:** zeinebghrab.vercel.app
**Overall:** 8.5 | Recruiter: 9.3 | Engineer: 8.5 | Designer: 8.3
**Style:** Highest recruiter UX — 5 internships, credibility stacking, EN/FR localization

### What it is
Zeineb has the **highest Recruiter UX (9.3)** in the dataset. The portfolio is optimized for recruiter scanning: clear identity, 5 internships with quantified bullets, verified credentials, and bilingual support (EN/FR).

### Key patterns
- **Quantified experience bullets:** Every internship has metrics
- **Credibility stacking:** Multiple internships + certifications + education
- **Direct code link per project:** Every project has GitHub link
- **EN/FR localization:** Two language versions
- **Internship as mini case study:** Each role has context + contribution + outcome

### Strengths
- Highest recruiter score in dataset
- 5 internships provide exceptional professional proof
- Bilingual support doubles reach
- Every project has verifiable source

### Weaknesses
- Engineer UX lower than recruiter UX
- Projects lack architecture/trade-off depth
- Localization requires maintaining two versions

### Apply to DE portfolio
- Every project needs a direct GitHub link
- Quantified bullets per role (not just responsibilities)
- Consider bilingual if applicable

---

## 8. Raju Nalla — Before/After Metrics Portfolio

**URL:** raju-nalla.github.io
**Overall:** 8.5 | Recruiter: 8.9 | Engineer: 8.7 | Designer: 8.4
**Style:** Single powerful metric + React/Framer Motion

### What it is
Raju's portfolio proves one thing extremely well: **"80min → 12min"**. This single before/after metric on an ETL pipeline is more impactful than entire animation systems. The portfolio demonstrates that one great metric beats ten vague claims.

### Key patterns
- **Before/after performance metrics:** "80min → 12min" as centerpiece
- **Single flagship project:** Depth over breadth
- **Clean React + Framer Motion:** Modern but not over-engineered
- **Metric-first storytelling:** Lead with the result, then explain how

### Strengths
- Single metric has more impact than entire animation systems
- Clean, focused presentation
- React/Framer Motion is modern and maintainable

### Weaknesses
- Only one flagship project limits breadth
- Less architecture detail than Mohamed/darktheDE
- Single project = single point of failure

### Apply to DE portfolio
- Find your "80min → 12min" — the one metric that proves impact
- Before/after > descriptive adjectives
- One great project > five mediocre ones

---

## 9. Hemanth Sai Kumar P — Bronze/Silver/Gold IA

**URL:** 0iamhsk0.github.io
**Overall:** 8.5 | Recruiter: 8.7 | Engineer: 8.5 | Designer: 8.9
**Style:** Medallion Architecture as website IA + README modal

### What it is
Hemanth uses **Medallion Architecture (Bronze/Silver/Gold)** as the website's information architecture. This is a clever domain-specific pattern: the website itself mirrors the data architecture concept.

### Key patterns
- **README modal for on-demand depth:** Click to see full technical details
- **Bronze/Silver/Gold IA:** Website sections mirror data architecture
- **Highest Designer UX (8.9):** Visual polish is exceptional
- **Progressive disclosure:** Simple cards → detailed modal

### Strengths
- Highest Designer UX in dataset
- README modal is brilliant for progressive disclosure
- Domain-specific IA shows deep understanding
- Clean component architecture

### Weaknesses
- Medallion IA may confuse non-technical visitors
- Requires good writing for README content
- Modal depth needs to be genuinely technical

### Apply to DE portfolio
- README modal pattern: simple card → click → full technical detail
- Progressive disclosure: homepage scan → depth on demand
- Domain-specific design choices show expertise

---

## 10. Ishaq Omotosho — Metrics-First Product Portfolio

**URL:** tosholadipo.netlify.app
**Overall:** 8.5 | Recruiter: 9.2 | Engineer: 8.2 | Designer: 8.6
**Style:** Metrics throughout + Experience ↔ Project convergence

### What it is
Ishaq's portfolio has the **most consistent metrics density** in the dataset. Every project card includes quantified outcomes (+70%, -45%, 3×, 80% reuse). The same systems appear in both Experience and Projects, creating bidirectional evidence.

### Key patterns
- **Experience ↔ Project convergence:** Same systems in both sections
- **Metrics throughout:** Every project card has quantified outcomes
- **Multi-dimensional metrics:** Business (+45% acquisition), Performance (-45% load), Code (80% reuse)
- **Product-domain subtitles:** "Job Authenticity Platform" not just "TrueHire"
- **Availability badge:** "Available for opportunities" in Hero

### Strengths
- Most consistent metrics density
- Experience ↔ Project linkage is unique
- Multi-dimensional metrics show sophistication
- Real product domains (not tutorials)

### Weaknesses
- Projects lack architecture/trade-off depth
- Mix of strong enterprise and weak tutorial projects
- No public portfolio source repo found

### Apply to DE portfolio
- Link projects to experience entries
- Use multiple metric types: performance, scale, quality
- Product-domain subtitles give context before technical details

---

## 11. Crystal Jacobs — Verified Credentials + Career Evolution

**URL:** crystal888.co.za
**Overall:** 8.3 | Recruiter: 8.9 | Engineer: 8.0 | Designer: 8.7
**Style:** Project maturity states + verified credentials + career evolution

### What it is
Crystal's portfolio has the **best trust architecture** in the dataset. Every credential has a verification URL. Every project has a maturity state (LIVE / IN DEVELOPMENT / PLANNED). The career evolution narrative (Agriculture → Operations → Data → AI) is distinctive.

### Key patterns
- **LIVE / IN DEVELOPMENT / PLANNED states:** Never pretend roadmap is experience
- **Verified credentials:** Badge + Issuer + ID + Status + Verify URL
- **Career evolution narrative:** Agriculture → Operations → Data → AI/IoT
- **Problem-first positioning:** "Operational problem first, technology second"
- **Maturity summary counts:** "2 Live, 2 In Dev, 5 Planned"

### Strengths
- Best trust architecture in dataset
- Verified credentials are the gold standard
- Career evolution is memorable and distinctive
- Problem-first positioning shows engineering maturity

### Weaknesses
- SEO is very weak (5.7/10)
- Custom runtime + monolithic HTML (technical debt)
- Career evolution is specific to non-traditional backgrounds

### Apply to DE portfolio
- Show LIVE / IN DEVELOPMENT / PLANNED per project
- Verified credential URLs when available
- "Operational problem first, technology second" is powerful positioning

---

## 12. Dinesh Daki — Career Story Reel Portfolio

**URL:** dakidinesh.github.io/portfolio/
**Overall:** 8.2 | Recruiter: 9.1 | Engineer: 8.0 | Designer: 8.7
**Style:** Career Story Reel + metrics-first experience

### What it is
Dinesh's portfolio has the **most innovative Hero** in the dataset: an interactive Career Story Reel showing Education → Work → Projects, auto-rotating with metrics per chapter. Recruiter sees career trajectory in 10 seconds.

### Key patterns
- **Career Story Reel:** Education → Work → Projects as interactive arc
- **Metrics-first Experience:** -35% latency, +45% deployment efficiency
- **Message/Meeting contact split:** Email form vs Calendly embed
- **Availability messaging:** "Open to full-time, remote US"

### Strengths
- Most innovative Hero in dataset
- Career Story Reel compresses trajectory into 10 seconds
- Strong metrics in Experience
- Message/Meeting split matches user intent

### Weaknesses
- Projects lack architecture/trade-off depth
- Two flagship projects have no source link
- Resume exists but isn't wired in UI
- Roaming mascot = high cost, low hiring value

### Apply to DE portfolio
- Career Story Reel is a strong Hero pattern (if you have the content)
- Message/Meeting contact split is practical
- Metrics in Experience are essential

---

## 13. Ahmed Raoofuddin — Metrics-First Resume Portfolio

**URL:** ahmedraoofuddin.github.io/portfolio/
**Overall:** 8.1 | Recruiter: 8.8 | Engineer: 8.1 | Designer: 8.1
**Style:** Fixed résumé sidebar + metrics-first experience + project filters

### What it is
Ahmed's portfolio is a **digital résumé application**. The fixed sidebar keeps identity/navigation always visible. Experience has strong metrics (+35% leads, -80% screening, p95 <800ms). But skills use fake percentages (95%, 93%) which hurt credibility.

### Key patterns
- **Fixed résumé sidebar:** Identity always visible on desktop
- **Metrics-first Experience:** Business/engineering outcomes per role
- **Project category filters:** Filter by Agentic AI / Full-Stack / Enterprise
- **Integrated technical blog:** Local blog pages alongside portfolio

### Strengths
- Strong production metrics in Experience
- Fixed sidebar = constant orientation
- Blog integration shows thought leadership
- Project filters help discovery

### Weaknesses
- Self-rated skill percentages (95%, 93%) hurt credibility
- 20+ certifications without verify links = noise
- Projects lack architecture/trade-off depth
- README stale relative to implementation

### Apply to DE portfolio
- Metrics-first Experience is the pattern to copy
- Skill percentages are the pattern to AVOID
- Blog integration is valuable but requires ongoing effort

---

## 14. Bodin Krongchon — Current vs Roadmap Skills

**URL:** bodinkc30-pete.github.io
**Overall:** 8.1 | Recruiter: 8.5 | Engineer: 8.0 | Designer: 7.8
**Style:** Current vs Roadmap skill distinction + trust architecture

### What it is
Bodin's portfolio has the **best skill trust pattern**: explicitly separating "Current Skills" from "Roadmap/Learning". This prevents the common problem of listing aspirational skills as proven capabilities.

### Key patterns
- **Current vs Roadmap skills:** Explicit distinction between proven and learning
- **Trust architecture:** Skills are categorized by evidence level
- **Honest positioning:** Doesn't claim to know everything
- **Simple, clean implementation:** Static HTML, no framework

### Strengths
- Best skill trust pattern in dataset
- Honest positioning builds credibility
- Simple implementation = fast + maintainable
- Clear distinction between proven and aspirational

### Weaknesses
- Visual design is less polished than peers
- Limited project depth
- No interactive features

### Apply to DE portfolio
- Current vs Roadmap skill distinction is essential
- "Learning" category is honest and shows growth mindset
- Simple implementation can still be effective

---

## 15. Koketso Raphasha — Data Science Portfolio

**URL:** portfolio-iota-eight-90.vercel.app
**Overall:** 7.9 | Recruiter: 8.3 | Engineer: 7.5 | Designer: 8.0
**Style:** React + Vite data science portfolio

### What it is
Koketso's portfolio is a **data science focused** site with React/Vite. It has good visual design but limited project depth and engineering evidence. Represents the "good-looking but shallow" category.

### Key patterns
- Clean React/Vite implementation
- Data science positioning
- Good visual design

### Strengths
- Modern tech stack
- Clean visual design
- Good mobile experience

### Weaknesses
- Limited project depth
- Weak engineering evidence
- No architecture diagrams
- No trade-off documentation

### Apply to DE portfolio
- Visual design alone is not enough
- Must pair with project evidence

---

## 16. Surafel Asfawosen — Domain-Specific ML Portfolio

**URL:** surafelasfawosen.github.io
**Overall:** 7.9 | Recruiter: 8.2 | Engineer: 7.6 | Designer: 7.8
**Style:** Ethiopian ML/AI projects + domain-specific work

### What it is
Surafel's portfolio focuses on **domain-specific ML projects** (Ethiopian languages, agriculture, healthcare). The domain specificity is a strength for niche positioning but limits broad appeal.

### Key patterns
- Domain-specific projects (Ethiopian context)
- ML/AI focus
- Real-world problem solving

### Strengths
- Domain specificity is memorable
- Real-world problem focus
- Cultural context adds uniqueness

### Weaknesses
- Limited broad appeal
- Visual design is basic
- Project documentation is thin

### Apply to DE portfolio
- Domain-specific projects can be a differentiator
- Real-world problems > toy datasets

---

## 17. Kazim Haider Syed — Lovable-Generated Portfolio

**URL:** kazimhaiderportfolio.lovable.app
**Overall:** 7.6 | Recruiter: 8.0 | Engineer: 7.2 | Designer: 7.5
**Style:** AI-generated portfolio via Lovable platform

### What it is
Kazim's portfolio is **generated by Lovable**, an AI portfolio builder. It demonstrates the ceiling of AI-generated portfolios: visually acceptable but lacking depth, personalization, and engineering evidence.

### Key patterns
- AI-generated design
- Standard template structure
- Limited customization

### Strengths
- Quick to create
- Visually acceptable
- Modern design language

### Weaknesses
- Generic feel
- No personal engineering signature
- Limited project depth
- Source not public

### Apply to DE portfolio
- AI-generated portfolios lack authenticity
- Personal engineering voice matters
- Template feel is a negative signal

---

## 18. Milton N. Ngwenya — The Milton Paradox

**URL:** ngwenya-mn.github.io/project_portfolio/
**Overall:** 7.5 | Recruiter: 8.0 | Engineer: 6.4 | Designer: 8.6
**Style:** Polished frontend, empty projects — visual ≠ evidence

### What it is
Milton's portfolio is the **most important anti-pattern** in the dataset. The frontend is exceptional (React 19 + TypeScript + Vite + Tailwind + GSAP), the visual design is top-tier (8.6 Designer UX), but the Projects section is empty ("Exciting Things in Progress"). This proves that **visual polish cannot compensate for missing evidence**.

### Key patterns
- **The Milton Paradox:** Highest visual quality, lowest evidence quality
- Role-specific code Hero (ETL snippet) — decorative, not evidence
- Clean section architecture (good code, empty content)
- GSAP + Lenis synchronization (good frontend engineering)

### Strengths
- Exceptional frontend implementation
- Clean code architecture
- Role-specific Hero visual
- Good responsive design

### Weaknesses
- **Zero projects** (placeholder only)
- Experience has no metrics
- Skills have no evidence mapping
- Engineer UX 6.4 — lowest in dataset

### Apply to DE portfolio
- **Visual polish ≠ hiring signal**
- Projects section is the #1 priority
- Code quality is not a substitute for evidence
- The gap between Designer UX (8.6) and Engineer UX (6.4) is the lesson

---

## Summary: What We Learned

### The 5 Meta-Patterns

1. **Quantified Evidence:** Metrics everywhere (Hero, Experience, Projects)
2. **Engineering Reasoning:** Problem → Architecture → Tradeoff → Impact
3. **Architecture Visualization:** Data flow diagrams > dashboard screenshots
4. **Evidence-Based Skills:** Skill → Project mapping, Built vs Studied
5. **Progressive Disclosure:** Homepage scan → depth on demand

### The #1 Lesson

> **Project evidence is the #1 differentiator.** Milton (7.5) and darktheDE (8.6) use the same stack, same domain. The difference is 9 projects vs 0 projects.

### What to Implement First

| Priority | Pattern | Impact | Effort |
|----------|---------|--------|--------|
| P0 | Problem → Architecture → Tradeoff → Impact | 10 | 3 |
| P0 | Metrics-first Experience bullets | 10 | 1 |
| P0 | Evidence-derived skills | 10 | 4 |
| P1 | Featured + filtered project hierarchy | 10 | 3 |
| P1 | Architecture diagram per project | 10 | 5 |
| P1 | Project maturity states (LIVE/DEV/PLANNED) | 10 | 1 |
| P2 | Experience ↔ Project linkage | 10 | 4 |
| P2 | Centralized TypeScript content file | 10 | 3 |
| P3 | Career Story Reel (if applicable) | 9 | 5 |
| P3 | Technical writing / Data Lab | 9 | 6 |

### What to Avoid

- Skill percentage bars
- Certificate walls without verify links
- Particle-heavy backgrounds
- Rotating 5-6 job titles
- Monolithic one-file architecture
- Fake contact forms
- Visual polish without evidence
