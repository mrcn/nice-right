# Implementation Plan: Nice Right v8.2 Design Audit Fixes

## Scope

Implement all design audit changes from the 12-agent scorched-earth audit, EXCLUDING copy/content changes.

## Critical Constraints

- NO copy changes (headlines, body text, CTA text)
- NO structural HTML changes beyond what's necessary for accessibility
- Focus on CSS, spacing, colors, components, and layout

---

## Phase 1: Critical CSS Fixes (Priority 1)

### Task 1.1: Fix Line-Height Bug

**File:** `app/v8.2/page.css`
**Change:** Update all heading line-heights from 0.95 to 1.1

```css
.v8.v82 h1,
.v8.v82 h2,
.v8.v82 h3 {
  line-height: 1.1; /* Was 0.95 */
}
```

### Task 1.2: Fix Contrast Failures

**File:** `app/v8.2/page.css`
**Change:** Darken amber accent color for WCAG AA compliance

```css
:root {
  --nr-amber: #a86e32; /* Was #d4a574 - now 4.5:1 contrast */
  --nr-amber-dark: #8b5a28; /* Adjusted hover state */
}
```

### Task 1.3: Add Focus Indicators

**File:** `app/v8.2/page.css`
**Change:** Add visible focus styles

```css
:focus-visible {
  outline: 3px solid var(--nr-amber);
  outline-offset: 2px;
}

/* Remove existing outline: none from interactive elements */
.v82-btn:focus,
.v82-btn-primary:focus,
a:focus {
  outline: 3px solid var(--nr-amber);
  outline-offset: 2px;
}
```

### Task 1.4: Remove Off-Brand Colors

**Files:** Multiple component files
**Changes:**

- `Testimonials.tsx`: Replace `#0A0A0A` with `var(--nr-navy)`
- `Testimonials.tsx`: Remove blue hover `rgba(0,0,255,0.02)`
- `Hero.tsx`: Replace green dot `#22c55e` with `var(--nr-amber)`
- `Services.tsx`, `Proof.tsx`: Replace `#FFFFFF` with `var(--nr-cream)`
- `ContactSection.tsx`: Replace red `#FF0000` with `var(--nr-amber)`

---

## Phase 2: Layout & Spacing System (Priority 2)

### Task 2.1: Implement Spacing Scale

**File:** `app/v8.2/page.css`
**Add:**

```css
:root {
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 40px;
  --space-6: 48px;
  --space-8: 64px;
  --space-10: 80px;
  --space-14: 112px;
  --space-16: 128px;
}
```

### Task 2.2: Fix H2 Heading Margins

**File:** `app/v8.2/page.css`
**Change:**

```css
.v8.v82 h2 {
  margin-top: var(--space-6);
  margin-bottom: var(--space-4);
}
```

### Task 2.3: Unify Container Widths

**File:** `app/v8.2/page.css`
**Change:** Standardize all containers to 1200px max-width

```css
.v82-inner,
.v82-hero-inner,
.v82-faq-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-5);
}
```

### Task 2.4: Standardize Section Padding

**File:** `app/v8.2/page.css`
**Change:** Use spacing scale for all sections

```css
.v82-section {
  padding: var(--space-14) 0;
}

@media (max-width: 900px) {
  .v82-section {
    padding: var(--space-10) 0;
  }
}
```

---

## Phase 3: Button & Component Consistency (Priority 3)

### Task 3.1: Create Unified Button System

**File:** `app/v8.2/page.css`
**Replace existing button styles with:**

```css
/* Base button */
.v82-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  border: 4px solid var(--nr-navy);
  font-size: 1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 700;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background: transparent;
  color: var(--nr-navy);
}

/* Primary variant */
.v82-btn--primary {
  background: var(--nr-navy);
  color: var(--nr-cream);
}

/* Secondary variant */
.v82-btn--secondary {
  padding: var(--space-2) var(--space-3);
  border-width: 2px;
  font-size: 0.85rem;
}

/* Compact variant */
.v82-btn--sm {
  padding: var(--space-2) var(--space-3);
  font-size: 0.9rem;
}
```

### Task 3.2: Remove Inline Button Styles from Components

**Files:** `Testimonials.tsx`, `FAQ.tsx`, `HowItWorks.tsx`, `Services.tsx`, `Proof.tsx`
**Action:** Remove inline `<style>` blocks that define button styles and use global classes instead

### Task 3.3: Standardize Border Widths

**File:** `app/v8.2/page.css`
**Change:** Set all structural borders to 4px consistently

- Update FAQ question borders to 4px
- Update calendar placeholder to use solid 4px (remove dashed)

---

## Phase 4: CRO Improvements (Priority 4)

### Task 4.1: Add Social Proof Bar

**File:** `app/v8.2/components/Hero.tsx`
**Add below hero content:**

- Create trust bar component with client logos
- Text: "Trusted by 100+ businesses"
- Style with muted colors, horizontal layout

### Task 4.2: Make CTA More Prominent

**File:** `app/v8.2/page.css`
**Changes:**

- Add subtle box-shadow to primary CTA
- Consider adding glow effect on hover
- Ensure CTA stands out from other buttons

### Task 4.3: Mobile Service Card Separation

**File:** `app/v8.2/page.css`
**Add mobile-specific styles:**

```css
@media (max-width: 768px) {
  .v82-svc-card {
    border: 1px solid rgba(15, 23, 42, 0.1);
    border-radius: 8px;
    padding: var(--space-4);
    margin-bottom: var(--space-4);
  }
}
```

---

## Phase 5: Accessibility (Priority 5)

### Task 5.1: Add Skip Link

**File:** `app/v8.2/page.tsx`
**Add at top of body:**

```tsx
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

**File:** `app/v8.2/page.css`
**Add styles:**

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--nr-navy);
  color: var(--nr-cream);
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
```

### Task 5.2: Add Main Landmark

**File:** `app/v8.2/page.tsx`
**Wrap content:**

```tsx
<main id="main-content">{/* All section components */}</main>
```

### Task 5.3: Add Section ARIA Labels

**Files:** All section components
**Add to each section:**

```tsx
<section aria-label="How It Works">
<section aria-label="Services">
<section aria-label="Results">
```

### Task 5.4: Fix FAQ Accordion ARIA

**File:** `app/v8.2/components/FAQ.tsx`
**Changes:**

- Add `aria-controls` to each button
- Add matching `id` to content panels
- Move "+" symbol to `aria-hidden="true"` span

---

## Phase 6: Mobile Fixes (Priority 6)

### Task 6.1: Fix Footer Columns

**File:** `app/v8.2/components/Footer.tsx` or page.css
**Add:**

```css
@media (max-width: 640px) {
  .v82-footer-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
}
```

### Task 6.2: Hide Version Navigation on Mobile

**File:** `app/v8.2/page.css`
**Add:**

```css
@media (max-width: 768px) {
  .design-variants-nav {
    display: none;
  }
}
```

---

## Verification Steps

After each phase:

1. Run `npm run build` to verify no TypeScript errors
2. Run `npm run lint` to check for style issues
3. Test in browser at multiple viewports
4. Use WAVE or axe DevTools to verify accessibility improvements

## Completion Criteria

- [ ] All line-heights are ≥ 1.1
- [ ] All colors meet WCAG AA contrast (4.5:1)
- [ ] All interactive elements have visible focus indicators
- [ ] Skip link is present and functional
- [ ] No off-brand colors remain
- [ ] Spacing scale is implemented and used consistently
- [ ] All containers use unified max-width
- [ ] Buttons consolidated to 3 variants
- [ ] Social proof bar added below hero
- [ ] Footer collapses on mobile
- [ ] Version nav hidden on mobile
- [ ] Build passes without errors
