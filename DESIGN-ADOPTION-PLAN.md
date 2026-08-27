# StoolMart-style Design Adoption — Plan & Checklist

Reference: StoolMart minimalist bar-stool landing page.
Goal: adopt its **style system, layout patterns and typography** for Nuref,
keeping our own products, copy and photography.

> Scope note: this is a **new design direction**, not a tweak. It replaces the
> current navy/gold + Arial system across the whole site. Roughly a full-site
> restyle, not a section edit.

---

## 1. What the reference actually is

### Navbar
- Logo as a **pale-yellow rounded badge** pinned to the top-left, breaking the page edge
- Centred plain-text nav (Home, Products, About Us, Contact) — small, light weight
- Right: outlined **"Sign In" pill** + solid **black circular icon button**

### Hero
- Small centred eyebrow line above the headline
- **Giant display wordmark** ("STOOLS") spanning nearly the full width — used as a graphic, not just text
- **Product photo overlaps and sits in front of the giant type**, with a soft grey circular blob behind it
- Left rail: short uppercase paragraph + three **outlined category pills**, with a small product thumbnail alongside
- Right rail: **yellow rounded panel** holding a small product shot, with "Explore our collection" + copy underneath
- Centred **black pill CTA**

### Why Choose Us
- Section heading left with a **thin horizontal rule running to the right edge**
- Large rounded lifestyle photo on the left
- Right: three stacked features, each a **circular grey icon badge with the label beneath**

### Crafting Simplicity (story section)
- **Numbered, alternating zig-zag**: text → long thin arrow → image, then image → arrow → text
- Numbers prefix the headings ("1. Our Mission", "2. Craftsmanship Difference")

### Explore Our Products
- Heading left (two lines), uppercase supporting text right
- Cards: product on a **light grey rounded panel**, name, one-line description, then a footer row of **price + black "ORDER NOW" pill**
- Carousel: **arrows at the far left/right edges** with **dot indicators** centred

### Newsletter
- Small "Subscribe Our" over a **giant "Newsletter" wordmark**
- Product photo again **overlapping the giant type**
- Grey rounded panel: centred copy + email input with a small blue send button

### Footer
- Logo + short description + **circular social icons**
- Four link columns (About / Product / Resources / Contact)
- Bottom bar: copyright left, **"BACK TO TOP"** right

### Style DNA
| Trait | Reference |
|---|---|
| Display type | Heavy, wide, squarish geometric sans (Clash Display / Chillax family) |
| Body type | Small, light, grey; eyebrows in uppercase with wide tracking |
| Palette | White base, black type & CTAs, **pale butter yellow** accent, grey panels |
| Buttons | Black pills, full-round |
| Corners | Generously rounded panels and images (~12–16px) |
| Signature move | **Oversized type with product imagery layered in front of it** |

---

## 2. Nuref today vs. the reference

| | Nuref now | Reference |
|---|---|---|
| Display font | Arial extrabold | Heavy squarish geometric sans |
| Palette | Navy / gold / powder blue | Black + white + pale yellow + grey |
| Headings | Medium size, left-aligned | Oversized, used as graphics |
| Hero | Text left, product right | Giant wordmark with product layered in front |
| Buttons | Rounded rectangles | Full pills |
| Section headers | Eyebrow + heading | Heading + horizontal rule to the edge |
| Feature blocks | Bordered cards | Circular icon badges, borderless |
| Story sections | Editorial 2-column | Numbered zig-zag with arrows |
| Cards | Text-only (images just removed) | Image panel + text + price/CTA row |
| Newsletter | Band inside footer | Standalone section with giant wordmark |
| Footer | Black, 4 columns, watermark | White, 4 columns, socials, back-to-top |

---

## 3. Adoption checklist

### A. Foundation
- [ ] Add display typeface — **Clash Display** (Fontshare, free, self-hosted) or **Archivo Expanded** (Google) as fallback
- [ ] Set type scale: display 64–120px, headings 36–48px, body 14–15px, eyebrows 11–12px uppercase / wide tracking
- [ ] Repalette: white base, black type + CTAs, **swap gold → pale butter yellow** for accent panels, grey (#F2F2F2) panels
- [ ] Convert every button to **full pill** (`rounded-full`)
- [ ] Standardise panel/image radius (~14px) and section rhythm

### B. Navbar
- [ ] Logo as pale-yellow rounded badge, top-left, breaking the edge
- [ ] Centred plain-text nav, light weight
- [ ] Right: outlined pill (Contact/Quote) + solid black circular cart button

### C. Hero
- [ ] Centred eyebrow line
- [ ] **Giant "ELECTRODES" (or similar) wordmark** across the full width
- [ ] Product photo layered **in front of** the wordmark, grey circular blob behind
- [ ] Left rail: uppercase intro paragraph + three outlined category pills
- [ ] Right rail: yellow panel + "Explore our range" block
- [ ] Centred black pill CTA

### D. Sections
- [ ] "Why Choose Us" — heading + rule, lifestyle photo left, three circular icon badges right
- [ ] Story section — numbered zig-zag with connecting arrows (replaces Featured Spotlight)
- [ ] Products — restore **image panels on cards**, price + black pill CTA row
- [ ] Carousel — edge arrows + centred dot indicators
- [ ] Newsletter — promote to its own section with giant wordmark + overlapping product + grey panel

### E. Footer
- [ ] White background (currently black)
- [ ] Logo + description + circular social icons
- [ ] Four link columns
- [ ] Bottom bar with **Back to top**

### F. Verification
- [ ] `npm run build`, `npm run lint`, `npx tsc --noEmit` clean
- [ ] Screenshot every page at desktop + mobile widths
- [ ] Check contrast (light grey body text on white is the main risk)

---

## 4. Open questions / conflicts

1. **"Arial only" is dead.** The original client brief said white background, black Arial text, brand colours only. This direction needs a display typeface and a yellow accent. Confirm the brief is superseded.
2. **Brand palette.** Nuref's navy/slate/powder come from the logo. This direction drops them for black + yellow. Is the brand palette changing, or should the yellow map to our existing gold (#F0B429)?
3. **Product images.** Cards were just stripped of imagery. This direction puts images back on cards — that reverses last request and needs real per-SKU photography (we only have one Ag/AgCl photo).
4. **Lifestyle photography.** "Why Choose Us" needs an installation/site photo. We have none.
5. **The giant-wordmark move needs a cut-out product photo** — we have exactly one, and it's horizontal (7.5:1), which layers very differently from a tall stool.
