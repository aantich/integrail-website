# Research and claims

Prepared 15 November 2026 for the Integrail landing-page implementation.

## Design reference

[worker.ai](https://worker.ai/) was reviewed live on 15 November 2026. The useful pattern was its use of bespoke, moving diagrams to explain a sequence, paired with concise copy. This site uses original SVG drawings, a different layout, a restrained monochrome palette, different typography and its own narrative. No reference illustration, code or asset was copied.

## Primary research

1. **Edge et al., From Local to Global: A Graph RAG Approach to Query-Focused Summarization**, submitted 24 April 2024; revised 19 February 2025. [Paper](https://arxiv.org/abs/2404.16130). The abstract reports improved comprehensiveness and diversity over conventional RAG on global sensemaking questions over million-token-scale corpora. It does not demonstrate universal accuracy improvement or Integrail performance.
2. **Han et al., RAG vs. GraphRAG: A Systematic Evaluation and Key Insights**, submitted 17 February 2025; current revision 7 November 2026. [Paper](https://arxiv.org/abs/2502.11371). The abstract reports distinct strengths and trade-offs and improved performance from selection/integration strategies. The website accurately summarizes this as support for combining approaches, not proof that graph retrieval always wins.
3. **Microsoft Research, GraphRAG: Improving global search via dynamic community selection**, 15 November 2024. [Article](https://www.microsoft.com/en-us/research/blog/graphrag-improving-global-search-via-dynamic-community-selection/). Reports 77% lower token cost for dynamic versus static GraphRAG global search at community level 1 over 50 AP News global questions. Deeper selection increased cost in another configuration. This is not an Integrail comparison or a general graph-versus-agent cost result. The website deliberately does not repurpose its percentage as a product claim.

## Copy boundaries

| Statement | Basis and treatment |
| --- | --- |
| Database + continuous intake + RAG + agent stack | Requested product positioning from Anton’s brief. The website is a marketing implementation, not a functioning database/agent service. |
| Codex, Claude, custom agents | Requested agent choices. No claim of an official partnership or endorsement. FAQ says integration/runtime availability is agreed per deployment. |
| Gmail, Microsoft 365, SharePoint, Google Drive | Requested intended sources. These are not working connectors in this static website. |
| 100× faster / cheaper queries | An explicitly labeled illustrative scenario; not a measured guarantee. Full assumptions are visible below the demo. |
| Research supports connected retrieval | Supported, with task-dependent limits stated on the page and links to primary research. No invented accuracy percentage. |
| Control of data | Knowledge-stack location is distinguished from external model inference. Selected context may leave the environment when an external API is chosen. No unsupported zero-egress guarantee. |
| Provider income | Potential service packaging and an editable gross-revenue scenario. No forecasts, guaranteed margins, signed partner terms or real price list. |
| White labeling | Described as a branding/licensing discussion, not an already-agreed right. |

## Simulation assumptions

Both examples use synthetic, user-requested facts. They are not statements about actual people or investments.

- Document A: “John Smith invested $100,000 in Integrail.”
- Document B: “Jane Doe became CMO of Integrail.”
- Example 1 models 60,000 versus 600 LLM tokens, and 60 versus 0.6 seconds: 100× in each metric.
- Example 2 models 120,000 versus 600 tokens, and 120 versus 0.6 seconds: 200× in each metric, with an illustrated missed second source in the baseline.
- The 36 displayed icons represent an illustrative document collection, not a benchmark dataset. Playback is compressed to 12 seconds.
- Cost assumes equal price per token. Ingestion, extraction, embeddings, storage and infrastructure are excluded. These costs can be significant and must be included in a real evaluation.
- An unindexed document-search workflow is the illustrative baseline. Codex and Claude can use retrieval/indexing tools themselves. The site states this explicitly.
- A graph can only retrieve facts that were extracted and linked correctly. Relationship extraction and answer quality need corpus-specific evaluation.

## Launch evidence still needed

Confirm real connector and agent availability; infrastructure and operations requirements; permission behavior, retention, source freshness and model routing; commercial/contact/legal identity; and repeatable product measurements before replacing illustrative numbers with benchmark claims.
