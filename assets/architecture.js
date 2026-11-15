/* One architecture model, shared by the hero, explainer and provider page. */
window.IntegrailArchitecture = (() => {
  const sources = [
    ['people', 'Users', 'People & teams'],
    ['mail', 'Email & calendar', 'Gmail · Microsoft 365'],
    ['meeting', 'Teams & meetings', 'Conversations & calls'],
    ['file', 'Files & drives', 'SharePoint · OneDrive · Google Drive'],
    ['record', 'CRM', 'Customer systems'],
    ['backup', 'Backups', 'Veeam'],
    ['code', 'Custom systems', 'Your business applications']
  ];
  const layers = [
    {
      title: 'A shared data foundation',
      copy: 'A scalable data foundation combines graph facts, vector artefacts and structured SQL data. The enterprise knowledge engine organizes facts, removes duplicates, surfaces contradictions and assesses trustworthiness.',
      tags: ['Graph facts', 'Vector artefacts', 'Structured SQL data']
    },
    {
      title: 'One connector. Two jobs.',
      copy: 'The Universal Connector / browser node gives the platform access to your business systems. The synchronizer uses it to keep data current and extract facts; agents also use it to carry out authorized actions back in those systems.',
      tags: ['Continuous sync', 'Fact extraction', 'Agent actions']
    },
    {
      title: 'Knowledge and business objects',
      copy: 'RAG provides connected, source-grounded context. Data Objects as a Service provides reusable business entities with typed fields, relationships, validation rules, calculations and permissions—the model shared by your applications.',
      tags: ['Grounded retrieval', 'Business entities', 'Rules & permissions']
    },
    {
      title: 'Agents and interfaces',
      copy: 'OpenAI Codex, Anthropic Claude and custom agents use the agentic layer through MCP and custom APIs. UI as a Service supports both fixed applications and interfaces generated on demand, using the same knowledge and business-object foundation.',
      tags: ['MCP + custom APIs', 'Fixed UI', 'Generated UI']
    }
  ];
  const paths = {
    people: '<circle cx="9" cy="7" r="3"/><path d="M3 20v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m3 10v-3a6 6 0 0 0-2-4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    meeting: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
    file: '<path d="M6 3h8l4 4v14H6ZM14 3v5h4M9 12h6m-6 4h6"/>',
    record: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11m0-6h12"/>',
    backup: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M6 6h.1M6 17h.1m4-11h7m-7 11h7"/>',
    code: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18"/>',
    connector: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M6 6.5h.1m3 0h.1m1 6-3 2 3 2m4-4 3 2-3 2"/>',
    sync: '<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',
    graph: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="12" cy="18" r="2"/><path d="m7 6 10-1M6 8l5 8m7-9-5 9"/>',
    vector: '<path d="M4 5h16M4 12h16M4 19h16"/><circle cx="9" cy="5" r="2" fill="var(--paper)"/><circle cx="16" cy="12" r="2" fill="var(--paper)"/><circle cx="7" cy="19" r="2" fill="var(--paper)"/>',
    ui: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 8h18M9 8v13m3-9h6m-6 4h4"/>',
    codex: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
    claude: '<path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5M8 3l8 18M3 8l18 8M3 16l18-8M8 21l8-18"/>'
  };
  function icon(name) {
    return `<svg class="am-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.code}</svg>`;
  }
  function render(target, {compact = false, id = 'platform-map'} = {}) {
    if (!target) return;
    target.classList.remove('stack-diagram');
    target.classList.add('architecture-canvas');
    const narrow = window.matchMedia('(max-width:1000px)');
    const compactClass = `${compact || narrow.matches ? ' architecture-map--compact' : ''}${compact ? ' architecture-map--summary' : ''}`;
    target.innerHTML = `<figure class="architecture-map${compactClass}" role="group" aria-labelledby="${id}-title" aria-describedby="${id}-description">
      <figcaption class="am-caption"><span id="${id}-title">THE INTEGRAIL PLATFORM</span><span class="am-caption-note">YOUR CLOUD. YOUR CONTROL.</span></figcaption>
      <p class="sr-only" id="${id}-description">Your corporate environment connects to a Universal Connector and browser node. A synchronizer and fact extractor uses that connector to feed an enterprise knowledge engine with graph facts, vector artefacts and structured SQL data. The engine handles deduplication, facts, contradictions and trustworthiness. RAG and reusable data objects are exposed to an agentic layer through MCP and custom APIs. Codex, Claude, custom agents, fixed interfaces and generated interfaces use that layer. Agents can carry out authorized actions back through the Universal Connector.</p>
      <div class="am-layout">
        <section class="am-environment" aria-label="Your corporate environment">
          <h3 class="am-section-label">YOUR ENVIRONMENT</h3>
          <ul class="am-source-list">${sources.map(([symbol,title,detail]) => `<li>${icon(symbol)}<span><strong>${title}</strong><small>${detail}</small></span></li>`).join('')}</ul>
        </section>
        <section class="am-connection" data-stack-layer="1" aria-label="Universal connector and synchronizer">
          <h3 class="am-section-label">01 / UNIVERSAL CONNECTOR</h3>
          <div class="am-connection-nodes">
            <div class="am-node am-universal">
              ${icon('connector')}<h4>Universal Connector<span>/ Browser node</span></h4><p>Access your business systems.</p>
              <span class="am-wire am-wire-back am-wire-source" aria-hidden="true"><i></i></span>
              <span class="am-wire am-wire-back am-wire-action" aria-hidden="true"><i></i></span>
            </div>
            <div class="am-connector-link" aria-hidden="true"><span>SHARED ACCESS</span></div>
            <div class="am-node am-synchronizer">
              ${icon('sync')}<h4>Synchronizer<span>& fact extractor</span></h4><p>Uses the Universal Connector.<br>Reads, syncs and extracts.</p>
              <span class="am-wire am-wire-forward am-wire-source" aria-hidden="true"><i></i></span>
              <span class="am-wire am-wire-forward am-wire-intake" aria-hidden="true"><i></i></span>
            </div>
          </div>
        </section>
        <div class="am-platform">
          <section class="am-consumers" data-stack-layer="3" aria-label="Agents and user interfaces">
            <div class="am-client">${icon('codex')}<strong>OpenAI Codex</strong><small>AI agent</small></div>
            <div class="am-client">${icon('claude')}<strong>Anthropic Claude</strong><small>AI agent</small></div>
            <div class="am-client">${icon('code')}<strong>Custom agents</strong><small>Your workflows</small></div>
            <div class="am-client am-client-ui">${icon('ui')}<strong>UI as a Service</strong><small>Fixed + generated</small></div>
          </section>
          <section class="am-agentic" data-stack-layer="3" aria-label="Agentic layer, MCP and custom APIs">
            <div><span>AGENTS AS A SERVICE</span><h4>Agentic layer</h4></div><p>MCP + custom APIs</p>
          </section>
          <div class="am-retrieval-link" aria-hidden="true"><span>KNOWLEDGE + BUSINESS OBJECTS</span></div>
          <section class="am-knowledge" aria-label="RAG, data objects and enterprise knowledge engine">
            <h3 class="am-section-label">02 / KNOWLEDGE & DATA SERVICES</h3>
            <div class="am-services" data-stack-layer="2">
              <div><strong>RAG as a Service</strong><small>Grounded context</small></div>
              <div><strong>Data Objects as a Service</strong><small>Fields · rules · permissions</small></div>
            </div>
            <div class="am-engine" data-stack-layer="0">
              <h4>Enterprise knowledge engine</h4>
              <ul class="am-governance" aria-label="Knowledge processing"><li>Deduplication</li><li>Facts</li><li>Contradictions</li><li>Trustworthiness</li></ul>
              <div class="am-stores" aria-label="Three complementary data stores">
                <div>${icon('graph')}<strong>Facts</strong><span>Graph storage</span></div>
                <div>${icon('vector')}<strong>Artefacts</strong><span>Vector storage</span></div>
                <div>${icon('record')}<strong>Structured data</strong><span>SQL storage</span></div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div class="am-footer"><span><i class="am-legend-forward" aria-hidden="true">→</i> Continuous sync & knowledge</span><span><i class="am-legend-back" aria-hidden="true">←</i> Agent actions via connector</span></div>
    </figure>`;
    const figure = target.querySelector('figure');
    const layout = figure.querySelector('.am-layout');
    const routing = document.createElementNS('http://www.w3.org/2000/svg','svg');
    routing.classList.add('am-routing');
    routing.setAttribute('aria-hidden','true');
    layout.append(routing);
    let pending = 0;
    function drawRoutes() {
      pending = 0;
      const bounds = layout.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const box = selector => {
        const rect = figure.querySelector(selector).getBoundingClientRect();
        return {left:rect.left-bounds.left,right:rect.right-bounds.left,top:rect.top-bounds.top,bottom:rect.bottom-bounds.top,cx:rect.left-bounds.left+rect.width/2,cy:rect.top-bounds.top+rect.height/2};
      };
      const environment = box('.am-environment');
      const connector = box('.am-universal');
      const synchronizer = box('.am-synchronizer');
      const agentic = box('.am-agentic');
      const engine = box('.am-engine');
      const knowledge = box('.am-knowledge');
      const isCompact = figure.classList.contains('architecture-map--compact');
      const route = (start,end,mid) => `M${start.x},${start.y} H${mid} V${end.y} H${end.x}`;
      let routes;
      let bus = '';
      if (isCompact) {
        // A return loop keeps actions visibly separate from the downward intake path.
        routes = [
          {back:true,d:route({x:agentic.left,y:agentic.cy},{x:connector.left,y:connector.cy},-9)},
          {back:false,d:`M${synchronizer.cx},${synchronizer.bottom} V${(synchronizer.bottom+knowledge.top)/2} H${knowledge.cx} V${knowledge.top}`},
          {back:false,d:`M${connector.right},${connector.cy} H${synchronizer.left}`}
        ];
      } else {
        const busX = environment.right + 9;
        const actionMid = (connector.right + agentic.left)/2;
        const intakeMid = (synchronizer.right + knowledge.left)/2;
        routes = [
          {back:true,d:route({x:agentic.left,y:agentic.cy},{x:connector.right,y:connector.cy},actionMid)},
          {back:true,d:`M${connector.left},${connector.cy} H${busX}`},
          {back:false,d:`M${busX},${synchronizer.cy} H${synchronizer.left}`},
          {back:false,d:route({x:synchronizer.right,y:synchronizer.cy},{x:knowledge.left,y:engine.cy},intakeMid)}
        ];
        const sourceRows = [...figure.querySelectorAll('.am-source-list li')].map(node => {
          const rect=node.getBoundingClientRect();
          return {right:rect.right-bounds.left,cy:rect.top-bounds.top+rect.height/2};
        });
        bus = `<path class="am-route-bus" d="M${busX},${Math.min(connector.cy,sourceRows[0].cy)} V${Math.max(synchronizer.cy,sourceRows.at(-1).cy)}"/>${sourceRows.map(row=>`<path class="am-route-bus" d="M${row.right},${row.cy} H${busX}"/>`).join('')}`;
      }
      routing.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
      routing.innerHTML = `<defs><marker id="${id}-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="m1 1 6 3-6 3" fill="none" stroke="#777" stroke-width="1.2"/></marker></defs>${bus}${routes.map(({back,d},index) => `<path class="am-route${back?' am-route--back':''}" d="${d}" marker-end="url(#${id}-arrow)"/><circle class="am-route-particle" r="2" fill="${back?'#777':'#333'}"><animateMotion dur="${back?8:5}s" begin="${index*.8}s" repeatCount="indefinite" path="${d}"/></circle>`).join('')}`;
      figure.classList.add('architecture-map--routed');
      if(document.documentElement.classList.contains('motion-paused')) routing.pauseAnimations?.();
    }
    const schedule = () => {if(!pending) pending=requestAnimationFrame(drawRoutes);};
    new ResizeObserver(schedule).observe(layout);
    if(!compact) narrow.addEventListener('change',() => {figure.classList.toggle('architecture-map--compact',narrow.matches);schedule();});
    schedule();
  }
  return {render, layers};
})();
