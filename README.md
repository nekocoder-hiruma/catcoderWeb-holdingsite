# CatCoder Portfolio Website

A modern, responsive, and multi-lingual portfolio website built with React, Vite, and Tailwind CSS. Features smooth animations, dynamic content loading, and an elegant dark theme.

## ✨ Features

- **Multi-Language Support**: English, Chinese (简体中文), and Japanese (日本語) with persistent language preference
- **Dynamic Content**: Automatic content loading based on selected language
- **Interactive UI**: 
  - Hover effects on skill cards
  - Smooth transitions and animations
  - Responsive design for all devices
- **Smart Asset Management**: Dynamic image loading with multiple format support (SVG, PNG, JPG, WebP)
- **SEO Optimized**: Meta tags, semantic HTML, and performance optimization
- **Clean Architecture**: Custom React hooks for code reusability (DRY principle)

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Internationalization**: react-i18next
- **Routing**: React Router
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)

## 📁 Project Structure

```
catcoderWeb-holdingsite/
├── public/
│   └── assets/
│       ├── skills/          # Skill logos (SVG, PNG, etc.)
│       ├── projects/        # Project thumbnails
│       ├── catcoder-logo.svg
│       └── profile-picture.jpg
├── src/
│   ├── components/
│   │   ├── Layout.jsx       # Main layout with navbar and footer
│   │   ├── Navbar.jsx       # Navigation with language switcher
│   │   ├── ProjectCard.jsx  # Project display card
│   │   ├── SkillCard.jsx    # Skill card with hover effects
│   │   └── TimelineItem.jsx # History timeline items
│   ├── content/
│   │   ├── en/              # English translations
│   │   ├── cn/              # Chinese translations
│   │   └── jp/              # Japanese translations
│   ├── hooks/
│   │   ├── usePublicAsset.js       # Smart asset loading hook
│   │   └── useTranslatedContent.js # Content loading hook
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── History.jsx      # Work & education history
│   │   └── Projects.jsx     # Projects showcase
│   ├── App.jsx
│   ├── i18n.js              # i18n configuration
│   ├── index.css            # Global styles & Tailwind
│   └── main.jsx
├── index.html
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd catcoderWeb-holdingsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📝 Content Management

### Adding/Updating Content

#### Skills
1. Add skill logo to `public/assets/skills/` (e.g., `React.svg`, `Python.png`)
2. Update `src/pages/Home.jsx` to add `<SkillCard name="YourSkill" />`

#### Projects
1. Add project image to `public/assets/projects/` (filename should match project title)
2. Edit translation files:
   - `src/content/en/projects.json`
   - `src/content/cn/projects.json`
   - `src/content/jp/projects.json`

#### Work History & Education
Edit translation files:
- `src/content/en/history.json`
- `src/content/cn/history.json`
- `src/content/jp/history.json`

### Translation Files Format

**Projects** (`projects.json`):
```json
[
  {
    "id": "unique-id",
    "title": "Project Title",
    "description": "Project description",
    "tags": ["Tag1", "Tag2"],
    "githubUrl": "https://github.com/...",
    "liveUrl": "https://...",
    "isProfessional": true
  }
]
```

**History** (`history.json`):
```json
[
  {
    "id": "unique-id",
    "type": "work",
    "year": "2020-2023",
    "title": "Job Title",
    "company": "Company Name",
    "description": "Job description",
    "projects": ["Key project 1", "Key project 2"]
  }
]
```

## 🎨 Customization

### Colors

Edit `src/index.css` to customize the color scheme:
```css
@theme {
  /* Your custom colors */
}
```

Current theme colors:
- `navy`: Dark background
- `orange`: Primary accent
- `magenta`: Secondary accent
- `purple`, `maroon`: Additional accents

### Navbar Links

Edit `src/components/Navbar.jsx` to modify navigation links.

### Social Links

Edit `src/components/Layout.jsx` (footer section) to update social media links.

## 🏗️ Build & Deployment

### Production Build
```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deploy to GitHub Pages

1. Update `vite.config.js` with your repo name:
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     // ...
   })
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Deploy the dist/ folder to gh-pages branch
   ```

Alternatively, use services like Vercel, Netlify, or Cloudflare Pages for automatic deployments.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

### Testing

The project uses **Vitest** and **React Testing Library** for unit testing.

**Test Structure**:
```
src/
├── components/
│   ├── SkillCard.jsx
│   ├── SkillCard.test.jsx         # Component tests
│   ├── ProjectCard.jsx
│   ├── ProjectCard.test.jsx
│   └── ...
├── hooks/
│   ├── usePublicAsset.js
│   ├── usePublicAsset.test.jsx    # Hook tests
│   └── ...
└── test/
    ├── setup.js                    # Global test configuration
    ├── test-utils.jsx              # Reusable test utilities
    └── mock-data.js                # Mock data factories
```

**DRY Test Utilities**:
- `renderWithProviders()` - Wraps components with Router and i18n providers
- `createMockProject()` - Generates consistent project test data
- `createMockHistoryItem()` - Generates consistent history test data
- `createMockSkill()` - Generates consistent skill test data

**Run Tests**:
```bash
npm test           # Run all tests
npm test -- --ui   # Interactive test UI
npm run test:coverage  # Coverage report
```

### Custom Hooks

The project uses two custom hooks for better code organization:

- **`useTranslatedContent(fileName)`**: Loads translated JSON content based on current language
- **`usePublicAsset(basePath, fileName, extensions)`**: Smart image loading with multiple format support

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**CatCoder**
- GitHub: [@nekocoder-hiruma](https://github.com/nekocoder-hiruma)
- LinkedIn: [waikeatnekocoder](https://linkedin.com/in/waikeatnekocoder)

---

Built with ❤️ using React & Tailwind CSS
