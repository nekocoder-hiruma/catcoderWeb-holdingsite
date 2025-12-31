# Codebase Learning Process Tracker

This document tracks the evolution of the `catcoderWeb-holdingsite` project, highlighting key learning milestones with visual "Good vs Bad" examples.

## Commit History & Learning Log

| Date | Milestone | Learning Points | Potential Improvement Points |
| :--- | :--- | :--- | :--- |
| **2025-12-31** | **Folder Restructuring** | Transitioned to **Feature-based Architecture** (Bulletproof React). Encapsulates logic by area rather than file type. | Standardize feature entry points (`index.js`). |
| **2025-12-20** | **Pre-rendering** | Switched from `react-helmet` to **Static Prerendering**. Static HTML is superior for SEO and TTI (Time to Interactive). | Auto-scan routes for the prerenderer. |
| **2025-12-20** | **Static Data** | Moved to **Synchronous Static Imports**. Async data during hydration causes content "flicker". | Localized JSON chunking if content grows. |
| **2025-12-20** | **Hydration Fix** | Used `render` in `main.jsx` to resolve path mismatches during boot. | Revisit `hydrate` once routing is stable. |
| **2025-12-11** | **CLS Optimization** | Fixed **Cumulative Layout Shift** with fixed aspect ratios and font preloading. | Automated image pipeline (WebP). |
| **2025-12-09** | **React to Preact** | Switched to **Preact** for 1/10th the bundle size (~30KB total). | Remove standard React dependencies. |
| **2025-12-09** | **Script Loading** | **Conditional Loading** of ReCAPTCHA (Contact page only). | Lazy-load heavy third-party widgets. |
| **2025-12-03** | **SPA Navigation** | **Client-side Routing** via `Link` vs browser-level `<a>` tags. | Page transition animations. |

---

## Technical Deep Dive: Good vs. Bad Examples

### 1. Folder Structure (Scalability)
**❌ Bad: Type-Based (Flat)**
```text
src/
├── components/   # 50+ mixed files
├── hooks/
└── pages/
```
**✅ Good: Feature-Based (Bulletproof)**
```text
src/features/
├── history/
│   ├── components/
│   └── routes/   # Logic isolated to History
```

### 2. SPA Navigation (User Experience)
**❌ Bad: Full Page Reload**
```javascript
// Causes white flash and state loss
<a href="/history">History</a>
```
**✅ Good: Instant Transition**
```javascript
// Navigates purely via Javascript (no reload)
<Link to="/history">History</Link>
```

### 3. Cumulative Layout Shift (Web Vitals)
**❌ Bad: Content "Jumps" on load**
```javascript
// Browser doesn't know height until image downloads
<img src="profile.jpg" />
```
**✅ Good: Reserved Space**
```javascript
// Browser reserves 64px, preventing layout shift
<img src="profile.jpg" width="64" height="64" />
```

### 4. Search Engine Optimization (SEO)
**❌ Bad: Client-Side Meta**
```javascript
// Search crawlers may see empty page initially
<Helmet><title>My Site</title></Helmet>
```
**✅ Good: Prerendered HTML**
```javascript
// vite.config.js - Generates full index.html for every route
prerender: { enabled: true }
```

### 5. Data Loading (Hydration)
**❌ Bad: Async "Flicker"**
```javascript
// Data arrives AFTER the page shows, causing a flash
useEffect(() => { 
  import(`./${lang}.json`).then(setData); 
}, []);
```
**✅ Good: Sync Stability**
```javascript
// Data is part of the initial bundle
import enHistory from '../content/en/history.json';
const data = contentMap[lang];
```

### 6. Script Optimization (Performance)
**❌ Bad: Global Burden**
```html
<!-- Loads on EVERY page, even if never used -->
<script src="recaptcha.js"></script>
```
**✅ Good: Contextual Load**
```javascript
// Only executes when the Contact component mounts
useEffect(() => { /* Load ReCAPTCHA only here */ }, []);
```

---

## Future Improvement Roadmap

1. **Automated Performance**: Integrate `vite-plugin-image-optimizer`.
2. **Hydration Sync**: Research stable state-transfer from SSR to Client.
3. **Headless CMS**: Transition to Keystatic for content management.
