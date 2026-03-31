# Design System Strategy: Worldcot International

## 1. Overview & Creative North Star

### Creative North Star: "The Earth’s Editorial"
This design system moves away from the sterile, rigid grids of standard corporate tech. Instead, it adopts the persona of a high-end botanical journal—blending the authoritative heritage of global trade with the soft, organic textures of raw cotton and sustainable agriculture. 

The aesthetic is built on **Intentional Asymmetry**. We break the "template" look by using generous, staggered white space and overlapping elements where photography bleeds into typography. By utilizing sophisticated serif displays against a backdrop of tonal greens, we create a digital experience that feels curated, quiet, and premium.

---

## 2. Color & Surface Philosophy

The color palette is rooted in the "Forest to Fabric" journey. We use deep, grounding greens paired with soft, breathable neutrals to establish trust and sustainability.

### The "No-Line" Rule
To maintain a high-end feel, **do not use 1px solid borders to section content.** Sections must be defined exclusively through background color shifts or ample negative space. For example, a `surface-container-low` section should sit directly against a `surface` background to create a subtle, borderless transition.

### Surface Hierarchy & Nesting
Think of the UI as physical layers of organic paper.
- **Surface (#f8faf5):** The base canvas.
- **Surface-Container-Low (#f2f4ef):** Used for large secondary content blocks.
- **Surface-Container-Lowest (#ffffff):** Reserved for elevated "Hero Cards" or focal interactive elements to provide a "pop" of clean white light.
- **Nesting:** Always place a lighter surface container inside a darker one (or vice-versa) to denote hierarchy without needing a structural line.

### The Glass & Gradient Rule
- **Glassmorphism:** For floating navigation bars or overlays, use `surface` colors at 80% opacity with a `20px` backdrop blur. This allows the organic imagery to bleed through the interface softly.
- **Signature Gradients:** Use a subtle linear gradient (from `primary` to `primary_container`) for primary action buttons. This adds a "silk-like" depth that flat colors lack.

---

## 3. Typography

The typographic pairing balances the heritage of the commodity trade with the precision of modern logistics.

*   **Display & Headlines (Noto Serif):** Our "Heritage" voice. Use `display-lg` for hero statements. The serif's bracketed terminals convey 100+ years of trust. Use intentional tracking (tighten by -2%) for a more editorial, high-fashion look.
*   **Body & Labels (Manrope):** Our "Precision" voice. Manrope provides high legibility for technical data regarding cotton grades and agro-specs.
*   **Hierarchy as Identity:** Always lead with a significant size contrast. A `display-md` headline paired with a `body-md` description creates the "white space" luxury associated with premium brands.

---

## 4. Elevation & Depth

We reject heavy, artificial drop shadows in favor of **Tonal Layering** and **Natural Ambient Light.**

*   **The Layering Principle:** Use the `surface-container` tiers to create depth. A card using `surface-container-highest` on a `surface` background creates a natural visual lift without any CSS shadow effects.
*   **Ambient Shadows:** Where a floating effect is vital (e.g., a high-priority Modal), use an extra-diffused shadow:
    *   *Blur:* 40px - 60px.
    *   *Opacity:* 4% - 6%.
    *   *Color:* Use a tinted `on-surface` color (a deep charcoal-green) rather than pure black to mimic real-world lighting.
*   **The "Ghost Border" Fallback:** If a container requires definition for accessibility, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** `primary` background, `on-primary` text. Use `rounded-md` (0.375rem) for a professional but approachable corner.
*   **Secondary:** `surface-container-highest` background with `primary` text. No border.
*   **Tertiary:** Ghost style. No background, `primary` text, with a subtle underline appearing only on hover.

### Input Fields
*   **Minimalist Frame:** No solid borders. Use a `surface-container-high` background with a `2-pixel` bottom stroke in `primary` when focused. 
*   **Labels:** Always use `label-md` in `on-surface-variant`.

### Cards & Lists
*   **The Divider Ban:** Strictly forbid 1px horizontal lines between list items. Use the **Spacing Scale (8 - 2.75rem)** to separate items. 
*   **Product Cards:** Use `surface-container-lowest` (pure white) with `rounded-lg` corners. Incorporate a cotton line-art vector watermark in the bottom corner of the card at 5% opacity for a signature touch.

### Signature Component: The "Material Spotlight"
A specialized card for raw materials (Cotton, Yarn) that uses a large high-quality photo background with a `primary_container` glassmorphism overlay on the bottom third to house the text.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use the `24 (8.5rem)` spacing token for hero section margins to create a "Gallery" feel.
*   **DO** overlap images with typography. Let a cotton branch vector slightly "peek" over a headline.
*   **DO** use the `tertiary` (deep plum/wine) color sparingly for high-value alerts or "Exclusive" tags to contrast the greens.

### Don’t
*   **DON'T** use pure black (#000000) for text. Use `on-surface` (#191c1a) to maintain the organic, soft-touch feel.
*   **DON'T** use sharp 0px corners. Even the most professional elements should have at least the `sm` (0.125rem) radius to feel natural.
*   **DON'T** crowd the layout. If you feel like you need a divider line, it’s a sign you need more white space (refer to Spacing Scale 10 or 12).

---

## 7. Spacing & Rhythm

This system relies on a **loose, breathing rhythm.**

*   **Section Padding:** Use `spacing-20` (7rem) or `spacing-24` (8.5rem) for vertical padding between major homepage sections.
*   **Component Internal Padding:** Use `spacing-4` (1.4rem) as the standard padding for cards to ensure content never feels "trapped."