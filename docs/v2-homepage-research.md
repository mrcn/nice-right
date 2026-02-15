# V2 Homepage Research

## UXOXO.xyz -- Portfolio Site Analysis

### Projects / Case Studies

**A. Northern Trust -- Micro-Interactions for Corporate Website**
- Scope: Contracted to design and develop animations and micro-interactions for Northern Trust's global corporate website. Initially a 6-week engagement, extended through 2020-2021.
- Process: Brand immersion, competitive analysis, comprehensive element audit, impact/effort prioritization matrix, iterative design with stakeholder presentations.
- Deliverables: Hero load sequence with custom motion eases, scroll-based transitions via GSAP, interactive Vue.js hexagonal image component, section fade-ins, button/card/header animations. All documented in CodePen.
- Tech: GSAP (GreenSock), Vue.js, HTML/CSS, SVG manipulation.
- Role: Contracted UX designer and developer.

**B. Healthcare Real Estate Investment Portal**
- Scope: Responsive web application for managing and selling healthcare facilities (multimillion-dollar transactions).
- Process: User interviews, cognitive walkthroughs, collaborative workshops, system maps, task flows, Action Inventory, UX Object Map (OOUX), low-fi wireframes (Balsamiq) to interactive prototypes (Adobe XD), usability testing. Dual Track Design process.
- Outcomes: Improved operational efficiency, positive impact on sales and customer retention, reduced user frustration.
- Role: UX Architect and Project Manager. Led 2 UI designers and a dev team.

**C. Green Goods -- Biodiversity Impact Platform**
- Scope: Blockchain-powered PWA enabling garden operators, gardeners, and funders to document, verify, and reward ecological conservation via on-chain attestations.
- Tech: ViteJS, TailwindCSS, Ethereum Attestation Service (EAS), Hypercerts, Infura, IPFS, Privy/Pimlico for account abstraction. Mobile-first PWA with gasless transactions.
- Metrics targets: 100-1,000 active users in first quarter; 1,000-10,000 completed biodiversity tasks.
- Role: Product Lead and UX Architect.

**D. Sparkblox** (Coming Soon) -- No-code blockchain toolkit.
**E. Customizable POS System** (Coming Soon) -- Buyer-facing POS design.

### Positioning and Messaging

- Tagline: "Kiss Bad UX Goodbye"
- Core position: Senior-level UX Strategist and Product Leader (not generalist or agency)
- Key claims: "13+ years designing complex user-flows, custom web apps, and sales support systems" / "100+ successful launches and double-digit efficiency gains"
- Tone: Professional but accessible, confident, personal (first-person, photo, Cleveland OH location)
- Current focus: AI workflow automation, process digitization, screenless interfaces, latent computing
- Active with GreenPill Dev Guild (UX and Product Leadership)

### Services (Implicit, no dedicated page)
- UX Strategy and Architecture
- Product Leadership
- Custom Web Application Design
- Interaction Design and Animation
- User Research
- Project Management (Dual Track / Agile)
- Prototyping (low-fi through high-fi)
- Emerging Tech / Web3 UX

### Social Proof
- **No testimonials, client quotes, or endorsements**
- Northern Trust is the only named Fortune 500 client
- Healthcare client is anonymized
- Quantitative claims are self-reported, not attributed
- No client logos, no "as featured in" banners
- This is the weakest area from a persuasion standpoint

### Visual Design
- White background, dark gray text, cyan-blue and purple accents
- Multiple typefaces (Gelasio, Heebo, Open Sans, Roboto) -- 4 families, borders on too many
- Full-width single-column responsive, 1300px max container
- Minimal imagery (headshot, logo variants, case study card backgrounds)
- Scroll-triggered fade-in animations, hover effects, split-heading reveals
- Built on WordPress
- Quality: High for a personal portfolio, understated and confident rather than flashy

---

## Nice Right V2 Homepage -- Current State (from code)

### Structure
1. Nav -- fixed glassmorphism bar, anchor links + "Let's Talk" CTA
2. Hero -- full-height 2-col grid, dual CTAs, trust line (Cleveland / 100+ projects / 13 years)
3. How It Works -- 3-step cards (We Talk / I Build / You Grow)
4. Services -- 3 pillars (Get Found, Save Time, Keep Customers) with customer-voice quotes
5. Pricing -- 3-tier (Starter $2.5k+$500/mo, Growth $5k+$1.2k/mo, Scale $10k+$2.5k/mo)
6. Results -- 3 case study cards (Northern Trust, Healthcare RE, GreenPill)
7. About -- personal bio + photo
8. Contact -- email CTA + LinkedIn
9. Footer -- copyright

### Design System
- Light warm palette (#FAFAF8 bg, #0B8A6E green accent, #F59E0B amber)
- All classes namespaced v2-
- 16px radius cards, subtle shadows, hover lift
- Responsive at 900px and 600px breakpoints

---

## Nice Right V1 vs V2 Comparison

| Aspect | V1 | V2 |
|--------|----|----|
| Theme | Dark (#0a0a0a) | Light (#FAFAF8) |
| Accent color | #00d4aa (bright teal) | #0B8A6E (forest green) |
| Tone | Agency-professional | Approachable, personal |
| Voice | "We" | "I" (first person singular) |
| Hero | Text only | Text + profile photo side by side |
| Navigation | Services, Work, Insights | How It Works, Services, Pricing, Results |
| Pricing | Not shown | Fully transparent 3-tier pricing |
| How It Works | Not present | 3-step process section |
| About section | Stats only | Personal narrative ("Hi, I'm Marcin") |
| CTA language | "Discuss Your Project" | "Book a Free Strategy Call" |
| Trust line | None | "Cleveland, OH / 100+ projects / 13 years" under hero |

Key insight: V1 reads as a polished SaaS agency site. V2 reads as a personal, approachable freelancer who happens to be senior-level. V2 is the stronger positioning for small business buyers.

Gaps in V2 vs V1: V2 dropped the "100+ Projects / 13+ Years / 2x Efficiency" stat block from V1. That was strong -- should be reincorporated.

---

## Client / Active Project Sites

### 1. Master Scoopers (masterscoopers.com)
- **Business**: Dog waste removal service, Chicago & Northern IL suburbs, since 1990
- **Design**: Clean, modern WordPress (Avada theme). Responsive, optimized images (ShortPixel)
- **Tech**: Google Tag Manager, Jetpack, schema markup (LocalBusiness, ProfessionalService, Reviews)
- **Standout**: 5-star aggregate rating with testimonials, transparent pricing, multiple service area pages, active blog
- **Takeaway**: Great example of a local service business done right -- clear CTAs, trust signals, pricing

### 2. Decatique Studios (decatiquestudios.com)
- **Business**: Chicago-based vintage jewelry & estate buying service (Ivan and Diane Bilic), ~40 years expertise
- **Design**: Sophisticated boutique aesthetic -- creams, golds, purples, blacks. Serif (Playfair Display) + sans-serif (Inter). Card-based layout, generous whitespace
- **Tech**: WordPress with modern block editor, CSS custom properties, Schema.org structured data
- **Standout**: 99.7% eBay positive feedback, 66+ five-star reviews, real case studies (e.g. 439-photo collection), links to 11,000+ item eBay store
- **Takeaway**: Excellent trust-building through transparency and social proof integration

### 3. Taqueria La Paz (taquerialapazchicago.com)
- **Business**: Family-owned Mexican restaurant, 5052 W Armitage Ave, Chicago
- **Design**: Clean, modern green palette (#54B435). Astra theme + Elementor. Playfair Display headings
- **Tech**: WordPress/Elementor, Schema.org structured data for menu items, Google Analytics via Site Kit
- **Standout**: 40+ menu items with descriptions/pricing, delivery platform integration (Grubhub, DoorDash), rich search snippets
- **Takeaway**: Solid local restaurant site with proper SEO markup

### 4. Dummy Reader (dummyreader.com)
- **Business**: AI-powered audiobook transformation platform -- converts books/papers/text into professional audiobooks
- **Design**: Dark-themed, polished, purple accents (#7c3aed). Mantine UI component library
- **Tech**: Next.js with React Server Components, streaming RSC payloads, code splitting, lazy loading. Local-first architecture (files stay in browser)
- **Standout**: Freemium model ($0-$25/mo), 30+ voices, DRM-free output, free preview tier without account
- **Takeaway**: Most technically sophisticated project -- demonstrates full-stack product engineering, not just websites

### 5. Green Goods (greengoods.app)
- **Business**: Biodiversity conservation platform (blockchain-powered PWA)
- **Design**: Dark/light mode toggle with system preference detection, flash prevention
- **Tech**: ViteJS, TailwindCSS, Ethereum Attestation Service, account abstraction, IPFS
- **Standout**: Thoughtful UX engineering (theme persistence, OS preference respect, graceful fallbacks)
- **Takeaway**: Demonstrates emerging tech / Web3 capabilities with strong UX fundamentals

---

## Key Gaps & Recommendations

### Critical Gaps
1. **No testimonials or social proof** -- biggest weakness. Meanwhile, Decatique Studios (a client site!) has 66+ five-star reviews and 99.7% eBay rating prominently displayed. Nice Right should practice what it preaches.
2. **No contact form** -- both versions rely on mailto links and LinkedIn. A form reduces friction significantly.
3. **Only 3 case studies** -- but there are now 5+ active client projects (Master Scoopers, Decatique, Taqueria La Paz, Dummy Reader, Green Goods) that could be showcased.
4. **No analytics/tracking** -- no GA, no PostHog, nothing visible in the codebase.
5. **No favicon or Open Graph images** -- missing basic polish for sharing.

### Strategic Gaps
6. **Differentiation is weak** -- the About section says "no account managers, no juniors" but doesn't hammer the contrast hard enough. The v2 copy is good but generic-sounding.
7. **Identity split** -- uxoxo.xyz = UX Strategist, nice-right.com/v2 = small-business tech partner. Need to decide: are these two brands or one?
8. **Range of work isn't shown** -- v2 only shows enterprise/Web3 projects, but the client sites prove Marcin does everything from $14/week dog poop scooping services to Fortune 500 animation systems. That range IS the differentiator.
9. **Pricing might scare off low-end** -- $2,500 setup + $500/mo is fine for Growth/Scale clients but might lose the Taqueria La Paz type of client. Consider whether to add a lighter entry point or lean into the higher end.
10. **Blog content is stale** -- posts are legacy from uxoxo.xyz, not Nice Right-native content.

### Visual/Polish Gaps
11. **V2 looks competent but safe** -- warm palette and clean type are nice, but nothing makes it stand out from a Framer template. Could use personality, motion, or distinctive visual elements.
12. **Hero image is the same photo used twice** (hero + about section) -- needs variety.
13. **Mobile nav is too stripped** -- at 600px, all links disappear except "Let's Talk". No hamburger menu.

### What's Working Well
- The outcome-focused service framing ("Get Found", "Save Time", "Keep Customers") is strong
- Customer-voice quotes on service cards are smart
- Transparent pricing with "no contracts" is a genuine differentiator
- The personal "Hi, I'm Marcin" about section builds trust
- The 3-step process (Talk / Build / Grow) is clear and compelling
