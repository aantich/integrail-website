# Architecture diagram revision — 15 November 2026

Anton supplied a reference architecture and requested a flat, two-dimensional adaptation in the website’s existing monochrome style, while preserving the RAG comparison animations.

## Confirmed concepts

- The corporate environment includes users, email/calendar, Teams/meetings, files/drives, CRM, Veeam backups and custom systems. The displayed vendor examples combine the reference with the original website brief.
- The Universal Connector / browser node is shared access infrastructure. The synchronizer/fact extractor uses it for continuous intake; the agentic layer uses it for authorized actions back into business systems.
- The enterprise knowledge engine brings together graph facts, vector artefacts and structured SQL data, with deduplication, fact organization, contradiction handling and trustworthiness assessment.
- RAG and Data Objects as a Service are two services over that foundation.
- Anton clarified that **Data Objects as a Service means Lastapp’s model**. The current Lastapp guides and typed model describe reusable entities with typed fields, references, defaults/calculations, validation rules and record/field permissions. These are business contracts, not merely exposed SQL tables.
- Anton clarified that **UI as a Service includes both fixed and generated interfaces**.
- Codex, Claude, custom agents and UI use a shared agentic layer with MCP and custom APIs. The UI tile is identified as an interface, not an additional model provider.

Lastapp sources read: `projects/lastapp/AGENTS.md`, `DEVELOPMENT.md`, `ENTITY_RUNTIME.md`, `MCP.md` and `internal/entity/model.go`. Lastapp was inspected read-only. Its current MCP is a management/authoring surface, while business records use the App data APIs/SDK; this marketing architecture does not assert that Lastapp already provides business-record CRUD over MCP or that all depicted connectors are implemented.

## Visual implementation

`assets/architecture.js` owns the shared architecture content and renderer. `assets/architecture.css` supplies the isolated diagram styles. The provider diagram uses a compact layout. A subsequent hero revision replaced the opening architecture with a business workflow illustration; the detailed platform diagram remains the technical explanation. The main platform section uses the reference’s left-to-right desktop organization, then reflows into a readable vertical view on phones. Text stays HTML rather than shrinking inside a fixed SVG.

Solid arrows represent intake/knowledge flow; dashed return arrows represent agent actions through the connector. Connector routes are measured from the rendered nodes and redrawn on resize. Small SVG particles follow the routes; the existing global motion switch and reduced-motion setting apply.

The current diagram is a presentation of the user’s requested product architecture, not a backend integration or shipped-capability test. No screenshot/attachment bytes were changed. Both RAG examples’ HTML and the complete comparison JavaScript block were checked byte-for-byte against the prior version.
