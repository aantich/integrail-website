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

- Original monochrome illustration system and outlined SVG wordmark with a AI emblem with three rounded corners and a square upper-right corner; Manrope, Instrument Serif and IBM Plex Mono, self-hosted with their SIL Open Font Licenses.
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

The wordmark uses outlined Manrope Bold with custom spacing and an tile with three rounded corners and a square upper-right corner. It needs no fonts to render and scales without losing sharpness. The font license is included in `assets/fonts/Manrope-OFL.txt`.

## Before a public launch

The site is an implemented marketing concept based on Anton’s brief, not evidence of shipped product capability. Confirm the product/integration availability and deployment commitments before publishing. The site intentionally has no invented customer logos, testimonials, certification badges, availability promises or price list.

The headline **100×** is explicitly an illustrative query scenario. It is not a measured Integrail, Codex or Claude benchmark. The expandable assumptions describe the baseline, scripted metrics and excluded ingestion/infrastructure costs. See [research and claims](docs/RESEARCH_AND_CLAIMS.md).

The pilot planner is intentionally local. For lead collection, connect a real, approved form endpoint and add the appropriate privacy and contact information. No email address or legal company identity was invented. Canonical metadata points to the private Sites preview; update it and add a social preview image when the public production domain is selected.

All assets are included. No existing sibling project or research attachment was changed. The enclosing workspace is not a Git repository. The website has its own private Sites source repository, identified by `.openai/hosting.json`; use the Sites workflow to synchronize and publish subsequent changes.

## Mobile preview

A private, owner-only Sites preview is configured at **https://integrail-private-preview.anton-antich.chatgpt.site** so Anton can view it from his phone without reaching the Mac's localhost server. Use the same ChatGPT account if prompted to sign in. Publication status is verified through the Sites deployment tools before the link is handed over.

See [verification](qa/VERIFICATION.md) for completed checks and browser coverage.
