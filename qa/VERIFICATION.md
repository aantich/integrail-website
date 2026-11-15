# Verification

Implementation and verification date: 15 November 2026.

The product diagrams and query comparison metrics are simulations, not integration or performance test results.

## Completed checks

- `npm run check` passes: JavaScript syntax; one primary heading per page; duplicate static IDs; local links, cross-page anchors and font file references.
- `npm run build` passes: a complete static `dist/` output, approximately 656 KiB including all fonts and licenses. No package installation is required.
- Both pages return HTTP 200 with the correct HTML content type.
- Desktop browser inspection at 1280 × 720, including full-page screenshots of both complete pages.
- Mobile visual inspection at 390 × 844, including the main hero, comparison scene, vertical relationship graph, provider hero and pilot dialog.
- Both pages checked at 320 × 800 and 768 × 1024; no horizontal document overflow. The 390-pixel main page and 1280-pixel provider page also had no overflow.
- Mobile navigation opens, navigates and closes correctly.
- Architecture tabs update the selected layer and explanation; ArrowDown advances focus and selection.
- Both comparison scenarios update the question, evidence, graph, answer, source references and modeled metrics. The first completes at 60,000 versus 600 tokens; the second at 120,000 versus 600 tokens and 1/2 versus 2/2 connected facts.
- Playback progresses while in view. Global motion-off produces a complete, static comparison; scenario switching works in this state. Controls support replay and play/pause. Reduced-motion initialization is implemented through `matchMedia` and CSS; the operating-system preference itself was not changed during QA.
- Provider calculator default: 1,000 customers × 10% × €250 × 12 = €300,000 annual gross revenue. Changing the price to €500 gives €600,000. Entering −1 replaces the result with a dash and marks the field invalid.
- Provider FAQ expands and reveals its answer.
- Pilot planner opens with the provider audience selected, accepts a synthetic organization and goal, and generates the completion screen.
- Download produced `integrail-pilot-brief.txt`. Clipboard output contained the expected organization, provider audience, source, workflow and goal. The modal closes and returns focus to its trigger.
- Browser console reported no errors or warnings during the inspected home and provider flows.
- All source and font assets are local. No analytics, remote libraries, contact endpoint or tracking scripts are included.

## Scope and environment

QA used the Codex in-app browser. This is not a cross-browser certification, formal accessibility audit, backend integration test or performance benchmark. The site is a static marketing implementation; the illustrated product services are not implemented by the website.

The preview used port 4187, preserving an unrelated process already on 4173. The machine’s Homebrew Node installation had a missing `simdjson` library in the initial login-shell invocation; checks/builds passed with the existing NVM Node 24.20.0 and with `npm` in the non-login environment. No system software or shell configuration was modified.

The research reference tab, temporary viewport overrides and local QA server are cleaned up after verification. Source, documentation and the production output remain in this project folder.

## 2D architecture revision — 15 November 2026

- Read Anton’s supplied architecture and his clarifications: Data Objects as a Service uses Lastapp’s entity model; UI as a Service includes both fixed and generated interfaces. Inspected Lastapp’s current entity/runtime/MCP guides and typed entity model without editing that project.
- Replaced the perspective hero and generic platform stack with one shared flat-diagram renderer. The detailed desktop diagram follows the reference’s environment → connector/synchronizer → knowledge engine organization, with the agentic layer and its four consumers above the engine.
- Browser inspection at 1280 pixels confirmed the reference-based desktop composition and routed connectors. Solid intake arrows and dashed agent-action arrows terminate at the rendered nodes. The environment bus connects the source rows.
- At 390 pixels, visually inspected the vertical diagram, connector, graph/vector/SQL stores, RAG/data-object services and agent/UI cards. Text is reflowed HTML rather than a scaled drawing.
- Both pages checked at 320 and 768 pixels with no horizontal document overflow. Desktop also reports no overflow. Resize switches the detailed diagram between wide and compact layouts and redraws its routes.
- Explainer tabs update content and highlighting. ArrowDown from the RAG/data-object tab selects Agents & UI, whose explanation explicitly includes fixed and generated interfaces.
- Keyboard activation of the global motion control switches the page to its completed/static state. The SVG routing particles use the same page-wide pause/resume mechanism as the previous illustrations.
- No duplicate DOM IDs and no browser console warnings or errors were reported in the inspected final home-page state.
- The RAG comparison JavaScript block and both examples’ HTML are byte-for-byte unchanged from the prior source revision. The first example still renders its complete 60,000-versus-600 token result when motion is off.
- The local preview on port 4187 was already running at the start of this revision and is left running, as Anton requested. This supersedes the initial QA-server cleanup note for that process.

## Business opening revision — 15 November 2026

- Replaced the opening architecture with a business illustration and the message “Talk to your data. Put it to work.” Supporting copy covers company-wide answers, agents, launch speed, operating cost and infrastructure control.
- Sales, operations and research tabs change the example sources, question, grounded answer and repeatable agent workflow. All examples are identified as illustrative workflows; there is no live query or agent execution.
- Verified click and keyboard tab selection, the primary pilot-planning CTA, modal dismissal and the global motion control. Source-flow animation pauses with the existing motion setting; default content remains readable without animation.
- Inspected the desktop composition at 1280 pixels and mobile copy/illustration at 390 pixels. Checked 320- and 1024-pixel layouts for horizontal overflow, including the longer research example. No horizontal page overflow or source-card clipping was observed. Browser logs contained no errors or warnings.
- Existing syntax, structure, link, anchor and asset checks pass. The static build passes at approximately 692 KiB.
- Byte comparisons confirm that all homepage content from the source band onward, both RAG simulations, the detailed architecture files and the provider page are unchanged by this revision.
- The existing localhost server remains running on port 4187.

## Agent action examples — 15 November 2026

- Kept the Research example’s question, answer and ongoing research workflow.
- Sales now shows a contextual renewal-risk answer, a separate user instruction to email the owner and log a CRM follow-up, and illustrated completed actions.
- Operations now starts with a direct instruction to schedule a kickoff, invite the team and create a shared folder. It shows connected tools and a completed result, without a research question.
- Verified all three tabs, keyboard navigation and restoration of source icons, citations, follow-up visibility and completion labels when switching between modes. Inspected desktop at 1280 pixels and checked mobile at 390/320 pixels; no horizontal overflow or browser errors/warnings. Existing checks and build pass.
- These remain labelled example workflows, with no live communication, scheduling or business-system mutations. All homepage content below the hero and existing architecture/RAG/provider/pilot interactions are unchanged.

## Larger type and looping comparisons — 15 November 2026

- Increased body copy to mostly 16–19 px, comparison answers to 15 px, and the small navigation, source, citation, footer, form and architecture labels across both pages. Enlarged graph and provider SVG labels as well.
- Reflowed the mobile comparison into full-width panels and switched the architecture to its compact arrangement below 1000 px. Removed fixed answer heights that would clip larger text; expanded diagram cards, labels and controls to fit.
- Both comparison scenarios use a continuous 15.2-second cycle: 12 seconds of simulation and a 3.2-second result hold. The playback control remains “Pause example” through completion; automatic wrap does not require a restart. Screen-reader completion announcements happen once per selected example, not on every loop.
- Observed the fact example reach 60,000 tokens / 100% and then return to an active intermediate frame with its pause control still active. Inspected the relationship scenario in continuous playback and verified scenario switching. Explicit pause holds the position; resume and global motion-off/on work. Reduced-motion continues to show a static completed result.
- Visually inspected the desktop hero, both comparison diagrams, architecture, provider hero and calculator, plus mobile layouts. Checked 320, 390, 768, 1024 and 1280 px widths across the relevant layouts, including both pages: no horizontal document overflow. Larger text fits the inspected cards and panels. Browser logs showed no errors or warnings.
- Final syntax, page-structure, links, anchors and asset checks pass; static build passes. The existing localhost server on port 4187 remains running.

## Monochrome vector logo — 15 November 2026

- Replaced the old icon and text lockup with an outlined SVG wordmark, using bold lowercase lettering and an inverted AI tile. The tile has three rounded corners and a sharp, square upper-right corner, per Anton’s correction.
- Updated the shared header and footer on both pages, the two small illustration marks, and the favicon. Artwork is entirely vector paths and needs no runtime font or external assets.
- Visually inspected the desktop header, 320 px mobile header and footer, and 768 px provider page. Logo assets load, navigation fits, and there is no horizontal page overflow at the checked widths. Browser logs show no errors or warnings.
- Rechecked the corrected square corner in the browser. Syntax, links, structure and asset checks and the production build pass. Localhost remains available on port 4187.

## Popup form spacing — 15 November 2026

- Replaced edge-aligned native select arrows with a local SVG chevron inset 16 px from the right, reserving 42 px of right padding for each dropdown. Selects retain native selection and keyboard behavior.
- Gave the longer use-case field more space in its desktop row and constrained grid children to their available width. The default “Research & document analysis” selection is fully visible in the inspected desktop popup.
- Visually checked the desktop popup and the stacked mobile form. At 390 and 320 px, the dialog has equal 26 px form gutters and no internal horizontal overflow. Verified changing the use-case selection. Syntax, page, asset and production-build checks pass.

## GitHub Pages production migration — 15 November 2026

- Created `aantich/integrail-website`, pushed the complete website history and deployment configuration, and made it public after Anton explicitly approved exposing the website source and documentation. GitHub Free does not support Pages from this private repository; the initial private-repository run passed checks/build and stopped at Pages configuration. After enabling Pages, the rerun deployed successfully.
- Added a SHA-pinned official GitHub Actions workflow: pushes to `main` check, build and deploy `dist/`; pull requests check and build without deployment. The `github-pages` environment permits only the `main` branch. The workflow uses short-lived GitHub deployment credentials, with no personal deployment secrets or package installation.
- Set the Pages custom domain to `integrail.ai`, updated both canonical/Open Graph URLs, and configured the four documented GitHub apex A records in Cloudflare. Replaced the previous HubSpot website targets and kept application, mail and other service records unchanged.
- Added the GitHub ownership TXT challenge and completed verification under `aantich`. GitHub reports `protected_domain_state: verified` and `https_enforced: true`.
- Restarted stalled GitHub certificate provisioning after DNS became valid. GitHub issued an approved apex certificate and `https://integrail.ai` returns the new site with normal certificate validation. The prior HSTS certificate warning is resolved for the production domain; no security warning was bypassed and TLS settings were not weakened.
- GitHub’s alternate-domain certificate remained delayed. Configured the enabled Cloudflare Single Redirect `WWW to integrail.ai`, matching only `www.integrail.ai`, with a 301 HTTPS target preserving the path and query string. Enabled proxying only for the `www` CNAME. The existing seven rules and zone TLS settings remain unchanged.
- Cloudflare and Google public DNS resolvers return the new records. Validated the Cloudflare endpoint and fresh public DNS over HTTPS: `https://www.integrail.ai/providers.html?source=verify` returns 301 to `https://integrail.ai/providers.html?source=verify`, with valid TLS. Cached prior DNS answers expire independently.
- Both production HTML pages match the checked source byte for byte. Browser smoke checks load the HTTPS home/provider pages, expected headings, images and fonts, with no horizontal overflow or console errors/warnings. The original localhost server on port 4187 remains running.
- Deployment/DNS configuration and the previous HubSpot values for rollback are documented in `docs/DEPLOYMENT.md`.

## Stable business hero copy — 15 November 2026

- Reproduced the opening copy moving vertically by about 38 px between Sales and Research because the hero centered both columns against the selected diagram’s height.
- Top-aligned the hero columns and gave the desktop copy its own responsive top spacing, preserving the initial composition while removing its dependency on diagram height. The stacked mobile layout keeps zero extra top padding.
- Switched Sales → Operations → Research → Sales at 1024, 1280 and 1440 px. The eyebrow, heading, description and CTA row retained identical document positions at each width. Checked all three examples at 390 and 320 px: heading position remains stable, mobile padding is unchanged and there is no horizontal overflow.
- Syntax, links, structure, assets and production build checks pass. This changes only the business hero CSS; example behavior and content remain unchanged.
