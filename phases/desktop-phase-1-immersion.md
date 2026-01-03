# Phase D1: Visual Immersion & Premium Layouts

**Duration:** Weeks 1-3  
**Status:** Not Started

---

## Objectives
- Transform the platform's visual fidelity for large desktop displays.
- Implement high-fidelity motion and 3D product exploration.
- Redesign key pages to utilize multi-column desktop layouts.

---

## Components & Features

| Feature                     | Description                                                     | Technical Implementation        |
| --------------------------- | --------------------------------------------------------------- | ------------------------------- |
| **Parallax Hero**           | Smooth, scroll-synchronized hero section with brand imagery.    | `framer-motion` + `useScroll`   |
| **360° Product Visualizer** | Interactive rotation of premium bottles.                        | `@google/model-viewer`          |
| **Hover-to-Zoom Gallery**   | High-resolution magnification on product images.                | `react-medium-image-zoom`       |
| **Multi-Column PDP**        | Layout with sticky info column and scrolling secondary content. | CSS Grid / Sticky positioning   |
| **Desktop Spotlight**       | Subtle light-following effects on brand sections.               | Custom cursor/mouse event logic |

---

## Deliverables
1. ✅ Immersive Homepage layout with video/parallax sections.
2. ✅ Redesigned Product Detail Page optimized for wide viewports.
3. ✅ 3D Viewer prototype for top-tier spirits.
4. ✅ Integrated high-res image zoom functionality.

---

## Acceptance Criteria
- [ ] LCP on 4k displays is under 2.5s despite high-res assets.
- [ ] Parallax effects are smooth (60fps) on mid-tier desktop hardware.
- [ ] Product images support seamless toggle between gallery and 3D view.
- [ ] Layout remains stable and balanced on ultra-wide monitors.
