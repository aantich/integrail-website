# Integrail website

A complete, responsive, two-page marketing site. Built locally in the requested folder, with no package dependencies, frameworks, tracking or external asset requests.

## Run

Requires Node.js 20 or newer. No installation is needed.

```sh
cd /Users/aantich/dev/mariadbnew/projects/integrail-website
npm run dev
```

Open **http://127.0.0.1:4187**. The provider page is at **/providers.html**. Set `PORT` or pass `--port=4188` to the server script to use another port. You can also open `index.html` directly for a server-free preview.

```sh
npm run check
npm run build
npm start
```

`dist/` contains the complete static production site. Deploy it to any static host; no rewrites are required. `/providers.html` is the canonical file URL. The included preview server also accepts `/providers`.

## Included

- Original monochrome illustration system and outlined SVG wordmark with an AI emblem with three rounded corners and a square upper-right corner; Manrope, Instrument Serif and IBM Plex Mono, self-hosted with their SIL Open Font Licenses.
- A business-first hero with sales, operations and research examples that connect company sources to an answer and a reusable agent workflow.
- Flat, responsive architecture diagrams in the detailed platform explainer and provider page. They distinguish continuous ingestion from agent actions, show graph/vector/SQL data, the enterprise knowledge engine, RAG, business objects, agents and fixed/generated UI. The provider deployment illustration remains separate.
- Two automatically looping document-versus-graph comparisons: investment lookup and cross-document relationship discovery. Each 12-second simulation holds its final result for 3.2 seconds, then restarts. Optional pause/replay controls and reduced-motion preferences remain available. Offscreen or hidden-tab playback suspends and resumes when visible.
- Keyboard-accessible tabs, mobile navigation, FAQ disclosures, native modal focus management, and a global motion switch. Reduced motion shows the completed examples without animation.
- Separate cloud/hosting/MSP page with service packaging, responsibilities, pilot steps, and an editable illustrative revenue calculator.
- A pilot brief planner. Visitors can download or copy their entries; no entries are sent or persisted. The form never pretends to submit a lead.

## Brand assets

- `assets/integrail-logo.svg`: complete monochrome wordmark, drawn as vector outlines.
- `assets/integrail-mark.svg`: compact AI emblem for illustrations.
- `assets/favicon.svg`: matching square browser icon.

The wordmark uses outlined Manrope Bold with custom spacing and a tile with three rounded corners and a square upper-right corner. It needs no fonts to render and scales without losing sharpness. The font license is included in `assets/fonts/Manrope-OFL.txt`.

## Before a public launch

The site is an implemented marketing concept based on Anton’s brief, not evidence of shipped product capability. Confirm the product/integration availability and deployment commitments before publishing. The site intentionally has no invented customer logos, testimonials, certification badges, availability promises or price list.

The headline **100×** is explicitly an illustrative query scenario. It is not a measured Integrail, Codex or Claude benchmark. The expandable assumptions describe the baseline, scripted metrics and excluded ingestion/infrastructure costs. See [research and claims](docs/RESEARCH_AND_CLAIMS.md).

The pilot planner is intentionally local. For lead collection, connect a real, approved form endpoint and add the appropriate privacy and contact information. No email address or legal company identity was invented. Canonical and Open Graph URLs use `https://integrail.ai`. A social preview image can be added later.

All assets are included. No existing sibling project or research attachment was changed. The enclosing workspace is not a Git repository. The production source repository is [aantich/integrail-website](https://github.com/aantich/integrail-website). Pushes to `main` deploy to GitHub Pages through `.github/workflows/pages.yml`. The separate private Sites preview retains its identity in `.openai/hosting.json`.

## GitHub Pages production hosting

The production domain is **https://integrail.ai**. See [deployment and DNS](docs/DEPLOYMENT.md) for the GitHub configuration and Cloudflare cutover.

- Push to `main`: check JavaScript, links and assets, build `dist/`, then deploy that directory.
- Pull request to `main`: run checks and build without publishing.
- Manual deployment: use **Actions → Deploy website to GitHub Pages → Run workflow**.

The workflow uses Node.js 24 and official GitHub Actions pinned to commit SHAs. There are no package dependencies or deployment secrets. Only generated website files are published; repository documentation is excluded.

## Mobile preview

The production website is mobile-accessible at **https://integrail.ai**. A separate private, owner-only Sites preview remains configured at **https://integrail-private-preview.anton-antich.chatgpt.site** so Anton can view it from his phone without reaching the Mac's localhost server. Use the same ChatGPT account if prompted to sign in. Publication status is verified through the Sites deployment tools before the link is handed over.

See [verification](qa/VERIFICATION.md) for completed checks and browser coverage.
