# Codebase Learning Process Tracker

This document tracks the evolution of the `catcoderWeb-holdingsite` project, highlighting key learning milestones with visual "Good vs Bad" examples.

## Commit History & Learning Log

| Date | Milestone | Learning Points | Potential Improvement Points |
| :--- | :--- | :--- | :--- |
| **2026-01-10** | **Platform Headers** | **Hosting Specificity**: Learned that DigitalOcean ignores the `_headers` file (convention for Netlify/Cloudflare). Headers must be in `app.yaml`. | Automate header injection into App Spec via CI/CD. |
| **2025-12-31** | **Folder Restructuring** | Transitioned to **Feature-based Portfolio Architecture** (Bulletproof React). | Standardize feature entry points (`index.js`). |
| **2025-12-20** | **Pre-rendering** | Switched from `react-helmet` to **Static Prerendering**. Superior for SEO/TTI. | Auto-scan routes for the prerenderer. |
| **2025-12-20** | **Hydration Fix** | Used `render` in `main.jsx` to resolve path mismatches during boot. | Revisit `hydrate` once routing is stable. |
| **2025-12-11** | **Web Vitals** | Fixed **Cumulative Layout Shift** with fixed aspect ratios and font preloading. | Automated image pipeline (WebP). |
| **2025-12-09** | **React to Preact** | Switched framework to **Preact** to reduce bundle size from ~150KB to <30KB. | Remove standard React dependencies. |
| **2025-12-03** | **Major Portfolio Revamp** | **Modern SPA Refactor**: Replaced old static HTML with a React-based architecture. Learned how to manage global state and complex UI components. | Implement transition animations between pages. |
| **2025-12-03** | **WebP Transition** | Optimized performance by converting all logo and profile assets to **WebP format**. Learned that WebP offers ~30-40% better compression than PNG. | Automate asset conversion via Vite plugin. |
| **2022-02-05** | **Modern Tooling Init** | **Tailwind & Webpack Introduction**: First step away from pure static HTML towards modern utility-first CSS. Learned the power of atomic classes for consistent UI. | Migration from Webpack to Vite (completed in 2025). |
| **2021-02-14** | **SEO & Analytics** | Added **Sitemap & Google Analytics**. Learned the importance of indexing and tracking traffic early in a project's life. | Move script injection to build-time templates. |
| **2021-02-09** | **Asset Delivery** | Integrated **Dexecure CDN**. Learned that serving huge images directly from the server is a bottleneck for international users. | Use responsive image sets (`srcset`) for different screens. |
| **2020-12-27** | **Initial Foundation** | Project launched with a **Jekyll Theme**. Learned the basics of GitHub Pages, CNAME, and `.htaccess` redirects. | Move away from rigid themes (completed). |

---

## Technical Deep Dive: Good vs. Bad Examples

### 1. Asset Formats (Performance)
**❌ Bad: Legacy Formats**
```html
<!-- Large file size, no transparency support for JPEG, heavy PNGs -->
<img src="logo.png" /> <!-- 150KB -->
```
**✅ Good: Modern WebP/AVIF**
```html
<!-- Superior compression, same quality -->
<img src="logo.webp" /> <!-- 30KB -->
```

### 2. Styling Strategy (Maintainability)
**❌ Bad: Custom CSS Spaghetti**
```css
.card { padding: 20px; color: #fff; border-radius: 8px; }
.card-large { padding: 40px; } /* Hard to maintain across files */
```
**✅ Good: Utility-First (Tailwind)**
```html
<!-- Fully descriptive, no side effects, instant feedback -->
<div class="p-5 text-white rounded-lg hover:bg-navy-800 transition-all">
```

### 3. SEO Metadata (Visibility)
**❌ Bad: Generic or Missing Meta**
```html
<title>My Portfolio</title>
```
**✅ Good: Semantic & Social-Ready**
```html
<title>Wong Wai Keat | Senior Backend Developer</title>
<meta property="og:description" content="Portfolio of a Senior Developer focused on Performance and Scalability." />
```

### 4. Code Organization (Scalability)
**❌ Bad: Logic in View (Jekyll Era)**
```html
<!-- Logic buried in HTML templates makes it hard to test -->
{% for item in items %} <div>{{ item.title }}</div> {% endfor %}
```
**✅ Good: Component-Based (Preact Era)**
```javascript
// Logic is isolated and reusable
const TimelineItem = ({ title, year }) => (
  <h3>{title} <span>({year})</span></h3>
);
```

### 5. Routing Implementation (SPA)
**❌ Bad: Hard Redirects**
```javascript
// Forces browser to reload everything, losing page state
<a href="/projects">View Projects</a>
```
**✅ Good: Client-Side Links**
```javascript
// Swaps out only the content, keeping the app alive
<Link to="/projects">View Projects</Link>
```

### 6. Caching & Headers (Deployment)
**❌ Bad: Generic Header Files**
```text
# ignored by DigitalOcean App Platform
/*
  Cache-Control: no-cache
```
**✅ Good: Platform-Native Config**
```yaml
# .do/app.yaml
    routes:
      - path: /
        headers:
          - key: Cache-Control
            value: "max-age=0, must-revalidate, public"
```

---

## Future Improvement Roadmap

1. **Automated Performance**: Integrate `vite-plugin-image-optimizer`.
2. **Hydration Sync**: Research stable state-transfer from SSR to Client.
3. **Headless CMS**: Transition to Keystatic for content management.
