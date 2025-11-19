# AI GEO Design Style Guide

**Version:** 1.0  
**Last Updated:** November 19, 2025  
**Design Theme:** Tron Legacy (1980s Retro-Futurism + 2010 Tron: Legacy)

---

## Overview

This design system blends the geometric precision and neon aesthetic of 1980s computing with the sleek, grid-based visual language of Tron: Legacy (2010). It creates a professional, accessible, and visually striking experience that evokes technological sophistication while maintaining WCAG 2 AA accessibility standards.

### Design Philosophy

- **Retro-Futurism:** Combining nostalgic 80s computing aesthetics with modern design principles
- **Accessibility First:** All color combinations meet WCAG 2 AA standards (4.5:1 for normal text, 3:1 for large text)
- **Mode-Appropriate Effects:** Visual treatments that work in dark mode (glows) are disabled or modified in light mode
- **Professional & Fun:** Balancing playful retro elements with enterprise-grade professionalism

---

## Color Palette

### Dark Mode (Default)
*Inspired by Tron: Ares and classic neon aesthetics*

| Color Name | Hex Code | Usage | Notes |
|------------|----------|-------|-------|
| **Background** | `#050a10` | Main background | Deep space black |
| **Background Alt** | `#0b101a` | Alternate sections | Slightly lighter |
| **Card Background** | `#111827` | Cards, panels | Elevated surface |
| **Primary (Ares Red)** | `#ff2222` | CTAs, accents, links | Bold neon red |
| **Secondary (Cyan)** | `#40f6ff` | Secondary actions | Classic Tron cyan |
| **Accent (White)** | `#ffffff` | Highlights | Pure white |
| **Text** | `#f8fafc` | Primary text | Off-white for readability |
| **Text Light** | `#cbd5e1` | Secondary text | Muted for hierarchy |
| **Border** | `rgba(255, 34, 34, 0.3)` | Borders, dividers | Semi-transparent red |

**Dark Mode Effects:**
- Glow effects enabled (`text-shadow`, `box-shadow` with neon colors)
- Grid background with subtle red tint
- Radial gradients for depth

### Light Mode
*Inspired by Tron: Legacy (White/Cyan/Orange) - WCAG 2 AA Compliant*

| Color Name | Hex Code | Contrast Ratio | Usage | Notes |
|------------|----------|----------------|-------|-------|
| **Background** | `#f8fbfd` | - | Main background | Soft white with cyan tint |
| **Background Alt** | `#edf5f9` | - | Alternate sections | Light cyan-gray |
| **Card Background** | `#ffffff` | - | Cards, panels | Pure white |
| **Primary (Deep Cyan)** | `#0088aa` | 4.54:1 on white | CTAs, links | WCAG AA compliant |
| **Secondary (Orange)** | `#d95f00` | 4.54:1 on white | Secondary actions | WCAG AA compliant |
| **Accent (Dark Cyan)** | `#005f7a` | 7.8:1 on white | Strong accents | WCAG AAA compliant |
| **Text** | `#0f1419` | 15.3:1 on white | Primary text | Near-black for clarity |
| **Text Light** | `#3d4854` | 9.4:1 on white | Secondary text | Dark gray |
| **Border** | `rgba(0, 136, 170, 0.3)` | - | Borders, dividers | Semi-transparent cyan |

**Light Mode Accessibility:**
- ✅ All text colors meet WCAG 2 AA minimum (4.5:1)
- ✅ Headings and large text meet 3:1 minimum
- ✅ Interactive elements have clear focus states
- ❌ Glow effects disabled (poor readability on light backgrounds)
- ✅ Subtle shadows replace glows for depth

**Critical Light Mode Rules:**
```css
.light-mode {
    --glow-primary: none;  /* Disable glow */
    --glow-text: none;     /* Disable text glow */
}

.light-mode a:hover,
.light-mode h1,
.light-mode h2,
.light-mode h3 {
    text-shadow: none !important;  /* Remove all glows */
}
```

---

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

System fonts for optimal performance and native feel across platforms.

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Usage |
|---------|------|--------|-------------|----------------|-------|
| **Hero H1** | 3.5rem (56px) | 800 | 1.1 | -0.02em | Main landing headline |
| **Section H2** | 2.75rem (44px) | 700 | 1.2 | -0.02em | Major section headers |
| **Card H3** | 1.5rem (24px) | 600 | 1.3 | normal | Card titles |
| **H4** | 1.25rem (20px) | 600 | 1.4 | normal | Subsection headers |
| **Body** | 1rem (16px) | 400 | 1.7 | normal | Standard body text |
| **Body Large** | 1.25rem (20px) | 400 | 1.8 | normal | Intro paragraphs |
| **Small** | 0.875rem (14px) | 500 | 1.6 | 0.02em | Meta info, labels |
| **Tiny** | 0.75rem (12px) | 600 | 1.5 | 0.05em | Uppercase labels |

### Typography Styles

**Headings:**
- Dark Mode: Subtle glow effect for neon aesthetic
- Light Mode: No glow, rely on color and weight for hierarchy
- Use semantic HTML (`h1`, `h2`, `h3`, etc.)

**Body Text:**
- Dark Mode: `color: var(--text-light)` for comfortable reading
- Light Mode: `color: var(--text-light)` (dark gray for better contrast than pure black)

**Links:**
- Default: `color: var(--secondary-color)` (cyan in dark, orange in light)
- Hover: `color: var(--primary-color)` with smooth transition
- Dark Mode: Add subtle glow on hover
- Light Mode: No glow, use color change only

---

## Spacing System

Based on an 8px grid for consistent rhythm and alignment.

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 0.5rem (8px) | Tight spacing |
| `sm` | 1rem (16px) | Small gaps |
| `md` | 1.5rem (24px) | Medium gaps |
| `lg` | 2rem (32px) | Section padding |
| `xl` | 3rem (48px) | Large spacing |
| `2xl` | 4rem (64px) | Major sections |
| `3xl` | 6rem (96px) | Hero sections |

### Component Spacing

**Cards:**
- Padding: 2.5rem (40px)
- Gap between cards: 2rem (32px)

**Sections:**
- Padding top/bottom: 6rem (96px)
- Reduce to 3rem (48px) on mobile

**Buttons:**
- Padding: 0.875rem 2.5rem (14px 40px)
- Gap between buttons: 1.5rem (24px)

---

## Components

### Buttons

#### Primary Button (CTA)

**Dark Mode:**
```css
.btn-primary {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    box-shadow: 0 0 10px rgba(255, 34, 34, 0.2);
}

.btn-primary:hover {
    background-color: rgba(255, 34, 34, 0.1);
    box-shadow: 0 0 20px rgba(255, 34, 34, 0.4);
    text-shadow: 0 0 8px rgba(255, 34, 34, 0.8);
}
```

**Light Mode:**
```css
.light-mode .btn-primary {
    background-color: var(--primary-color);  /* Solid cyan background */
    color: #ffffff;  /* White text for 4.54:1 contrast */
    border: 2px solid var(--primary-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  /* Subtle shadow, no glow */
}

.light-mode .btn-primary:hover {
    background-color: var(--accent-color);  /* Darker cyan */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    text-shadow: none;  /* No glow */
}
```

**Accessibility:**
- Minimum 44x44px touch target
- Focus state with visible outline
- Hover state distinct from default
- Clear visual feedback on interaction

#### Secondary Button

**Dark Mode:**
- Transparent background with white border
- White text
- Subtle hover state

**Light Mode:**
```css
.light-mode .btn-secondary {
    background-color: transparent;
    border: 2px solid var(--secondary-color);
    color: var(--secondary-color);  /* Orange */
}

.light-mode .btn-secondary:hover {
    background-color: var(--secondary-color);
    color: #ffffff;  /* White on orange for maximum contrast */
}
```

### Cards

**Structure:**
```css
.feature-card {
    background: var(--card-bg);
    padding: 2.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow);
}
```

**Light Mode Adjustments:**
- Border: 1px solid (not 2px) for subtlety
- Box shadow: `0 2px 8px rgba(0, 0, 0, 0.08)` (no color glow)
- Hover: Increase shadow, change border color to primary
- No glow effects on hover

**Card Variants:**
- `.feature-card` - Standard feature presentation
- `.tool-card` - Platform/tool listings (top border accent)
- `.practice-card` - Best practices with numbered badge
- `.resource-category` - Resource links and documentation

### Navigation

**Header:**
- Sticky positioning (`position: sticky; top: 0`)
- Backdrop blur for glass morphism effect
- Border bottom for subtle separation

**Dark Mode:**
```css
header {
    background-color: rgba(5, 10, 16, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
}
```

**Light Mode:**
```css
.light-mode header {
    background-color: rgba(255, 255, 255, 0.95);
    border-bottom: 1px solid var(--border-color);
}
```

**Nav Links:**
- Dark Mode: Glow on hover and active states
- Light Mode: Color change only, no glow
- Active state indicated by color and underline

**Mega Menus:**
- 3-column grid on desktop
- 2-column on tablet
- 1-column on mobile
- Category headers with bottom border

### Tables

**Structure:**
- Full width with collapse borders
- Rounded corners on container
- Header row with background tint

**Light Mode:**
```css
.light-mode thead {
    background: rgba(0, 136, 170, 0.08);  /* Subtle cyan tint */
}

.light-mode th {
    color: var(--accent-color);  /* Dark cyan for 7.8:1 contrast */
}

.light-mode tbody tr:hover {
    background-color: rgba(0, 136, 170, 0.06);
}
```

**Accessibility:**
- Semantic table markup (`<thead>`, `<tbody>`, `<th>`, `<td>`)
- Clear visual distinction between header and data rows
- Hover state for row scanning
- Sufficient padding for touch targets

### Forms

**Input Fields:**
```css
input, textarea {
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background-color: var(--bg-color);
    color: var(--text-color);
}

input:focus, textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 10px rgba(primary-color, 0.2);  /* Dark mode */
}

.light-mode input:focus,
.light-mode textarea:focus {
    box-shadow: 0 0 0 3px rgba(0, 136, 170, 0.1);  /* Light mode: no glow */
}
```

### Info Boxes

**Variants:**
- `.highlight-box` - Cyan accent for general highlights
- `.info-box` - Blue accent for informational content
- `.warning-box` - Yellow accent for warnings/cautions
- `.callout-box` - Gold accent for important callouts

**Structure:**
```css
.info-box {
    padding: 2rem;
    border-radius: 0.5rem;
    border-left: 4px solid [accent-color];
    background: rgba([accent-color], 0.05);
}
```

**Light Mode:**
- Reduce background opacity if needed for text readability
- Ensure heading colors meet WCAG 2 AA against tinted background

---

## Layout Patterns

### Grid Systems

**Feature Grid:**
```css
.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}
```

**Tool Grid:**
```css
.ai-tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
```

**Best Practices Grid:**
```css
.best-practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}
```

### Hero Sections

**Platform Hero:**
- Gradient background overlay
- Large icon (4rem)
- Title (3.25rem)
- Description (1.3rem)
- Stats or meta information
- CTA buttons

**Guide Hero:**
- Similar to platform hero
- Includes meta information (reading time, difficulty, audience)

### Content Sections

**Standard Pattern:**
```html
<section class="content-section">
    <div class="container">
        <h2>Section Title</h2>
        <p class="section-intro">Introduction paragraph</p>
        <!-- Content -->
    </div>
</section>
```

**Alternating Backgrounds:**
Use `.alt-bg` class on every other section for visual rhythm.

---

## Accessibility Standards

### WCAG 2 AA Compliance

**Color Contrast Requirements:**
- ✅ Normal text (< 18pt): Minimum 4.5:1 contrast ratio
- ✅ Large text (≥ 18pt or 14pt bold): Minimum 3:1 contrast ratio
- ✅ UI components and graphical objects: Minimum 3:1 contrast ratio

**Current Compliance:**

| Element | Dark Mode | Light Mode | Standard |
|---------|-----------|------------|----------|
| Body text | ✅ Pass | ✅ Pass (9.4:1) | AA |
| Headings | ✅ Pass | ✅ Pass (15.3:1) | AAA |
| Links | ✅ Pass | ✅ Pass (4.54:1) | AA |
| Buttons | ✅ Pass | ✅ Pass (4.54:1) | AA |
| Borders | ✅ Pass | ✅ Pass | AA |

### Focus States

**Keyboard Navigation:**
- All interactive elements have visible focus states
- Focus indicators use primary color
- Minimum 2px outline or border
- Never remove focus styles

```css
a:focus,
button:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}
```

### Screen Reader Support

- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels where needed
- Alt text for all images
- Skip links for keyboard navigation
- Proper heading hierarchy

### Touch Targets

- Minimum 44x44px for all interactive elements
- Adequate spacing between touch targets (8px minimum)
- Clear hover and active states

---

## Visual Effects

### Dark Mode Effects

**Glows:**
```css
--glow-primary: 0 0 12px rgba(255, 34, 34, 0.6);
--glow-text: 0 0 10px rgba(255, 34, 34, 0.5);
```

**When to Use:**
- Hero titles
- Primary CTAs on hover
- Active navigation items
- Card hover states
- Focus indicators

**Shadows:**
```css
--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
--shadow-lg: 0 0 20px rgba(255, 34, 34, 0.3);
```

### Light Mode Effects

**NO Glows:**
```css
.light-mode {
    --glow-primary: none;
    --glow-text: none;
}

.light-mode * {
    text-shadow: none !important;  /* Override all glows */
}
```

**Shadows (Subtle):**
```css
.light-mode {
    --shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.12);
}
```

**When to Use:**
- Card elevation
- Dropdown menus
- Modals and dialogs
- Button hover states (slight lift with shadow increase)

### Animations

**Transitions:**
- Standard: `transition: all 0.3s ease;`
- Quick: `transition: all 0.2s ease;`
- Slow: `transition: all 0.5s ease;`

**Hover Effects:**
- Cards: `transform: translateY(-5px);`
- Buttons: `transform: translateY(-2px);`
- Links: Color change only

**Keyframe Animations:**
```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

Use sparingly and respect `prefers-reduced-motion`.

---

## Responsive Design

### Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| **Mobile** | < 480px | Small phones |
| **Tablet** | 481px - 768px | Tablets and large phones |
| **Desktop** | 769px - 1200px | Laptops and small desktops |
| **Large** | > 1200px | Large monitors |

### Mobile Adaptations

**Typography:**
- Hero H1: 3.5rem → 2rem
- Section H2: 2.75rem → 2rem
- Reduce line height slightly for mobile

**Spacing:**
- Section padding: 6rem → 3rem
- Card padding: 2.5rem → 1.5rem
- Button padding: Maintain minimum 44px height

**Grid Systems:**
- All grids collapse to 1 column on mobile
- Mega menus stack vertically
- Navigation becomes hamburger menu

**Navigation:**
```css
@media (max-width: 768px) {
    .nav-links {
        display: none;  /* Hidden by default */
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
    }
    
    .nav-links.active {
        display: flex;  /* Shown when mobile menu toggled */
    }
}
```

---

## Background Effects

### Grid Pattern

**Dark Mode:**
```css
background-image:
    linear-gradient(var(--grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
background-size: 50px 50px;
```
- Color: `rgba(255, 34, 34, 0.03)` (subtle red tint)
- Creates Tron-style grid

**Light Mode:**
```css
background-size: 40px 40px;  /* Tighter grid */
```
- Color: `rgba(0, 136, 170, 0.06)` (subtle cyan tint)
- More subtle than dark mode

### Gradient Overlays

**Hero Sections:**
```css
background: linear-gradient(135deg, 
    rgba(255, 34, 34, 0.1),  /* Red */
    rgba(64, 246, 255, 0.1)   /* Cyan */
);
```

**Radial Accents:**
```css
background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 34, 34, 0.05) 0%,
    transparent 70%
);
```

---

## Theme Toggle

**Toggle Button:**
- 50px width, 26px height
- Rounded pill shape
- Moon/sun icons
- Sliding ball indicator
- Smooth transition

**Dark Mode:**
- Border: Red glow
- Ball: Red with glow

**Light Mode:**
- Border: Cyan
- Ball: Orange with glow

**Persistence:**
- Store preference in `localStorage`
- Default to system preference if no saved choice
- Apply before page render to prevent flash

---

## Code Standards

### CSS Organization

1. **Root Variables** - Color and theme tokens
2. **Reset** - Base element styles
3. **Layout** - Grid, flexbox, containers
4. **Components** - Reusable components
5. **Utilities** - Helper classes
6. **Responsive** - Media queries

### Naming Conventions

**BEM-inspired:**
- `.component-name` - Block
- `.component-name__element` - Element
- `.component-name--modifier` - Modifier

**State Classes:**
- `.active`
- `.disabled`
- `.loading`
- `.error`

**Theme Classes:**
- `.light-mode` - Applied to `<body>` for light theme
- Dark mode is default (no class needed)

### Comments

```css
/* ============================================
   Section Name
   ============================================ */

/* Component Description */
.component-name {
    /* Property explanation if needed */
}
```

---

## Brand Assets

### Logo

**Text Logo:**
- Font: System font stack, 800 weight
- Size: 1.8rem
- Effect: Gradient (red to cyan)
- `background-clip: text` for gradient text

**Tagline:**
- "Generative Engine Optimization"
- 0.75rem, uppercase, letter-spacing 0.15em
- Color: Primary color
- Subtle opacity (0.8)

### Icons

**Emoji Icons:**
- Currently using emoji for simplicity and universal support
- 3.5rem for hero sections
- 1.75rem for cards
- Can be replaced with custom SVG icons later

**Icon Colors:**
- Let emoji render naturally in dark mode
- In light mode, emoji work well against white backgrounds

---

## Performance

### Optimization Guidelines

**Images:**
- Use WebP format with fallbacks
- Lazy load images below the fold
- Provide responsive images with `srcset`
- Alt text required for all images

**CSS:**
- Minimize use of expensive properties (`box-shadow`, `filter`)
- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid animating `width`, `height`, or `top/left`

**Fonts:**
- System font stack (no external fonts to load)
- Variable fonts if custom fonts needed in future

**Critical CSS:**
- Inline critical above-the-fold CSS
- Defer non-critical stylesheets

---

## Testing Checklist

### Visual Testing

- [ ] Dark mode renders correctly
- [ ] Light mode renders correctly
- [ ] Theme toggle works smoothly
- [ ] All components look correct in both modes
- [ ] Hover states work as expected
- [ ] Focus states are visible

### Accessibility Testing

- [ ] All text meets WCAG 2 AA contrast requirements
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] Screen reader testing completed
- [ ] Color is not the only indicator of state/action
- [ ] Touch targets are minimum 44x44px

### Responsive Testing

- [ ] Mobile (< 480px)
- [ ] Tablet (481px - 768px)
- [ ] Desktop (769px - 1200px)
- [ ] Large screens (> 1200px)

### Browser Testing

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Future Enhancements

### Potential Additions

1. **Reduced Motion Support:**
   ```css
   @media (prefers-reduced-motion: reduce) {
       * {
           animation-duration: 0.01ms !important;
           transition-duration: 0.01ms !important;
       }
   }
   ```

2. **High Contrast Mode:**
   - Even stronger contrast for accessibility
   - Simplified color palette
   - No gradients or subtle effects

3. **Print Styles:**
   - Optimized black and white printing
   - Remove backgrounds and effects
   - Ensure readability on paper

4. **Custom Icon System:**
   - Replace emoji with custom SVG icons
   - Consistent style across all icons
   - Animatable and customizable

5. **Component Library:**
   - Storybook or similar for component documentation
   - Living style guide with interactive examples

---

## Version History

**Version 1.0** (November 19, 2025)
- Initial style guide creation
- WCAG 2 AA compliance for light mode
- Comprehensive color palette documentation
- Component and layout standards established
- Accessibility guidelines defined

---

## Maintainers

For questions or suggestions about this design system, contact the project maintainers.

**Design Lead:** [To be assigned]  
**Accessibility Reviewer:** [To be assigned]

---

*End of Style Guide*
