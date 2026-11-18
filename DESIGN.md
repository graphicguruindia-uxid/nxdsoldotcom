---
name: nxdsol-design-system
description: "Glassmorphism design system for NXDSOL featuring Trust Blue primary, Orange CTA accent, and light/dark surface modes. Tokens align with the project's CSS custom properties and support responsive scales."
version: alpha
colors:
  primary: "#2563EB"
  primary-dark: "#1d4ed8"
  primary-darker: "#1e40af"
  secondary: "#3B82F6"
  accent: "#EA580C"
  accent-hover: "#c2410c"
  surface: "#ffffff"
  surface-alt: "#f5f7fa"
  surface-dark: "#121417"
  surface-black: "#000000"
  text: "#1E293B"
  text-muted: "#475569"
  text-on-dark: "#f8f9fa"
  border: "#E2E8F0"
  muted: "#E9EFF8"
  destructive: "#DC2626"
  on-destructive: "#FFFFFF"
  ring: "#2563EB"

font-family: "Plus Jakarta Sans"
fonts:
  body: "Plus Jakarta Sans"
  display: "Plus Jakarta Sans"

typography:
  font-stack: "${var(--font-stack)}"
  fs-hero: "clamp(2.5rem, 6vw, 4rem)"

spacing:
  section: "clamp(3rem, 8vw, 5rem)"

radius:
  sm: "0.5rem"
  md: "0.75rem"

shadow:
  sm: "0 2px 8px rgba(16, 24, 40, 0.06)"
  md: "0 10px 24px rgba(16, 24, 40, 0.12)"

focus-ring: "0 0 0 3px rgba(13, 110, 253, 0.35)"

layout:
  nav-height: "64px"
---

# Design System: NXDSOL

## 1. Visual Theme & Atmosphere
The system embraces a **glassmorphic** aesthetic. Surface elements appear translucent, with subtle blurs creating depth. A **Trust Blue** primary color grounds cohesion, while an **Orange CTA** accent injects vibrancy. Light mode dominates but dark mode support is present for user preference.

## 2. Color Palette & Roles
- **Primary** – `#2563EB` (Trust Blue) – CTA, active elements. 
- **Primary‑Dark** – `#1d4ed8` – Hover and focus state. 
- **Secondary** – `#3B82F6` – Alternate accents. 
- **Accent** – `#EA580C` – Highlighted CTA, banners. 
- **Surface** – `#ffffff` – Content backgrounds. 
- **Surface‑Alt** – `#f5f7fa` – Light card backgrounds. 
- **Surface‑Dark** – `#121417` – Dark mode background. 
- **Text** – `#1E293B` – Body copy. 
- **Text‑Muted** – `#475569` – De-emphasised copy. 
- **Border** – `#E2E8F0` – Card borders, inputs. 
- **Destructive** – `#DC2626` – Delete, error states.

## 3. Typography Rules
- **Base font**: `Plus Jakarta Sans` (300‑700). 
- **Body**: `var(--font-stack)` at `1rem` (16 px). 
- **Hero**: `clamp(2.5rem, 6vw, 4rem)` (responsive). 
- **Headings**: progressively scaled using the body size with weight hierarchy. 
- **Letter‑spacing**: subtle `0.12em` on uppercase elements.
- **Line‑height**: `1.5` for body, larger for headings.

## 4. Component Stylings
- **Buttons**: `border‑radius` `0.5rem`, primary background `#2563EB`, accent ring on focus, subtle scaling on active. 
- **Cards**: `border‑radius` `0.75rem`, `shadow-md` on hover, dark‑mode toggle. 
- **Inputs**: transparent background, `border-color` `transparent`, focus ring via `focus‑ring`. 
- **Links/Navigation**: `nav-height` `64px`, hover accent. 

## 5. Layout Principles
- **Spacing**: section padding via `clamp(3rem, 8vw, 5rem)`. 
- **Breakpoints**: 375 px, 768 px, 1024 px, 1440 px. 
- **Touch targets**: at least `44px` in height or width.
- **Responsive**: fluid layout where images drop to 100 % at `max-width: 767.98px`.

## 6. Design System Notes for Agent Generation
- Use **Glassmorphism** helper class `.glass-card` for any background card. 
- Prefer **.,** token names over CSS variables in component props. 
- Include descriptors such as **Light** vs **Dark** styles. 
- Emphasize progressive overload for focus states for keyboard users. 
- Keep dark mode accessible: `prefers‑reduced‑motion` should disable transitions.

