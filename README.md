# DELTACHEM — Enterprise B2B Life Science Ingredients

Premier B2B pharmaceutical, nutraceutical, veterinary, and cosmeceutical raw materials distributor in Egypt and the MENA region.

## Highlights

- **Cinematic Awwward-Style Preloader**: Custom GSAP preloader featuring molecular particle canvas simulation, authentic DELTACHEM brand logo progressive reveal with dynamic scanline, real readiness detection, and smooth 5-column curtain transition.
- **Bilingual & Bi-directional**: Full English and Arabic (RTL) localization across all pages, navigation, catalog, and status telemetry.
- **Product Catalog & Sourcing Models**: Searchable directory of Active Pharmaceutical Ingredients (APIs), excipients, nutraceuticals, veterinary APIs, and cosmetic actives with dual sourcing model support (Indent vs. Local Ex-Warehouse).
- **Modern Responsive Design**: Built with Next.js 16, Tailwind CSS v4, GSAP, and Framer Motion.

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run unit and component test suite
pnpm test

# Type checking & linting
npx tsc --noEmit
pnpm lint
```

## GitHub Pages Deployment

The public website is statically exported and configured for deployment on GitHub Pages at:
**[https://ehabmdiab.github.io/Delta-Chem-/](https://ehabmdiab.github.io/Delta-Chem-/)**

### Automated Deployment (GitHub Actions)

A workflow at `.github/workflows/deploy.yml` automatically builds and deploys the static export to GitHub Pages on every push to `master`.

To enable on GitHub:
1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **GitHub Actions** (or **Deploy from a branch** -> `gh-pages`).

### Local Static Export Build

```bash
NEXT_PUBLIC_BASE_PATH=/Delta-Chem- ./scripts/build-pages.sh
```

> **Note on Static Hosting vs Full Server**:
> GitHub Pages serves the complete public website including the catalog, divisions, responsive layouts, bilingual switcher, and animated preloader. Full server-side features like the authenticated Admin CMS (`/admin`) and dynamic email notifications (`/api/rfq`) require a Node.js/Vercel server with database credentials.
