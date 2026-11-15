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
