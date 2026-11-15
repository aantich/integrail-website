/* Integrail: dependency-free presentation, diagrams and local planning tools. */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const providerPage = document.body.dataset.page === 'providers';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = reducedMotion.matches;
const motionListeners = new Set();
const logo = `<svg class="brand-mark" viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M5 7h10l16 22M5 18h14M5 29h10L31 7" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const brand = `<a class="brand" href="index.html" aria-label="Integrail home">${logo}<span>integrail</span></a>`;

function initializeChrome() {
  const header = $('[data-header]');
  if (header) header.innerHTML = `<div class="container header-inner">${brand}<nav class="header-nav" id="primary-nav" aria-label="Main navigation"><a href="index.html#platform">The platform</a><a href="index.html#difference">Why Integrail</a><a href="providers.html" ${providerPage ? 'aria-current="page"' : ''}>For providers <span aria-hidden="true">↗</span></a></nav><div class="header-tools"><button class="button button-dark header-action" data-pilot="${providerPage ? 'provider' : ''}">Let’s talk <span aria-hidden="true">↗</span></button><button class="menu-toggle" aria-label="Open navigation" aria-controls="primary-nav" aria-expanded="false"><span></span><span></span></button></div></div>`;
  const menu = $('.menu-toggle');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    $('.header-nav')?.classList.toggle('is-open', open);
  });
  $$('.header-nav a').forEach(link => link.addEventListener('click', () => {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    $('.header-nav').classList.remove('is-open');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      menu.click(); menu.focus();
    }
  });
  const footer = $('[data-footer]');
  if (footer) footer.innerHTML = `<div class="footer-top"><div class="footer-brand">${brand}<p>Agents and RAG as a service.<br>Your knowledge. Your cloud. Your control.</p></div><div class="footer-links"><div><span class="tiny-label">EXPLORE</span><a href="index.html#platform">The platform</a><a href="index.html#difference">See the difference</a><a href="index.html#control">Your control</a></div><div><span class="tiny-label">BUILD WITH US</span><a href="providers.html">For providers</a><a href="providers.html#economics">The opportunity</a><a href="${providerPage ? 'providers.html' : 'index.html'}#faq">Questions, answered</a></div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Integrail</span><span>INTELLIGENCE, ON YOUR TERMS.</span><button class="motion-toggle" aria-pressed="${motionPaused}" aria-label="Pause animations"><span aria-hidden="true"></span><b style="font-weight:400">${motionPaused ? 'Motion off' : 'Motion on'}</b></button></div>`;
  $('.motion-toggle')?.addEventListener('click', () => setMotion(!motionPaused));
  reducedMotion.addEventListener('change', event => setMotion(event.matches));
  setMotion(motionPaused);
}

function setMotion(paused) {
  motionPaused = paused;
  document.documentElement.classList.toggle('motion-paused', paused);
  document.documentElement.classList.toggle('motion-enabled', !paused);
  const toggle = $('.motion-toggle');
  toggle?.setAttribute('aria-pressed', String(paused));
  toggle?.setAttribute('aria-label', paused ? 'Enable animations' : 'Pause animations');
  if (toggle) $('b', toggle).textContent = paused ? 'Motion off' : 'Motion on';
  $$('svg').forEach(svg => {
    if (paused) svg.pauseAnimations?.();
    else svg.unpauseAnimations?.();
  });
  motionListeners.forEach(listener => listener(paused));
}

function renderHero() {
  window.IntegrailArchitecture.render($('[data-hero-illustration]'), {compact:true, id:'hero-architecture'});
}

function initializeArchitecture() {
  $$('[data-stack-diagram]').forEach((node,index) => {
    window.IntegrailArchitecture.render(node, {compact:providerPage, id:`platform-architecture-${index}`});
  });
  const architecture = $('[data-architecture]');
  if (!architecture) return;
  const layers = window.IntegrailArchitecture.layers;
  const tabs = $$('[data-layer]', architecture);
  function selectLayer(index) {
    tabs.forEach((tab,i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    $$('[data-stack-layer]', architecture).forEach(node => node.classList.toggle('is-selected', Number(node.dataset.stackLayer) === index));
    $('[data-layer-copy]', architecture).textContent = layers[index].copy;
    $('[data-layer-tags]', architecture).innerHTML = layers[index].tags.map(tag => `<span>${tag}</span>`).join('');
    $('#layer-details').setAttribute('aria-labelledby', `layer-tab-${index}`);
  }
  tabs.forEach((tab,index) => tab.addEventListener('click', () => selectLayer(index)));
  addTabKeyboard(tabs, selectLayer, true);
  selectLayer(0);
}

function providerCloudSvg(compact = false) {
  return `<svg viewBox="0 0 500 470" role="img" aria-labelledby="provider-${compact ? 'mini' : 'hero'}-title"><title id="provider-${compact ? 'mini' : 'hero'}-title">Your cloud becomes a connected AI service for your customers</title>
    <defs><pattern id="provider-dots-${compact}" width="19" height="19" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".6" fill="#c4c4c4"/></pattern><path id="provider-flow-${compact}" d="M85 106V155Q85 167 100 167H248V214M415 106V155Q415 167 400 167H248V214"/></defs>
    <rect x="8" y="10" width="484" height="445" fill="url(#provider-dots-${compact})"/>
    <text x="18" y="25" class="hero-svg-caption">YOUR INFRASTRUCTURE, NEW POSSIBILITIES</text>
    <g fill="none" stroke="#b6b6b6" stroke-width="1.2"><path d="M85 106v48q0 13 15 13h300q15 0 15-13v-48M250 106v106" class="hero-line"/></g>
    <g class="hero-float"><rect x="43" y="61" width="85" height="60" rx="5" fill="#fff" stroke="#c4c4c4"/><text x="85" y="87" font-size="24" fill="#6d6d6d" text-anchor="middle">⌂</text><text x="85" y="108" font-size="10" fill="#686868" text-anchor="middle">Customer 01</text></g>
    <g class="hero-float-alt"><rect x="207" y="61" width="85" height="60" rx="5" fill="#fff" stroke="#c4c4c4"/><text x="249" y="87" font-size="24" fill="#6d6d6d" text-anchor="middle">⌂</text><text x="249" y="108" font-size="10" fill="#686868" text-anchor="middle">Customer 02</text></g>
    <g class="hero-float"><rect x="371" y="61" width="85" height="60" rx="5" fill="#fff" stroke="#c4c4c4"/><text x="413" y="87" font-size="24" fill="#6d6d6d" text-anchor="middle">⌂</text><text x="413" y="108" font-size="10" fill="#686868" text-anchor="middle">Customer 03</text></g>
    <g class="hero-plane"><path d="m58 312 191 85 193-99-191-83Z" fill="#e5e5e5" stroke="#bababa"/><path d="M58 312v23l191 85v-23Z" fill="#dbdbdb" stroke="#bababa"/><path d="m249 397 193-99v23l-193 99Z" fill="#d3d3d3" stroke="#bababa"/>
    <path d="m58 263 191 85 193-99-191-83Z" fill="#fff" stroke="#bababa"/><path d="M58 263v17l191 85v-17Z" fill="#f0f0f0" stroke="#bababa"/><path d="m249 348 193-99v17l-193 99Z" fill="#e6e6e6" stroke="#bababa"/>
    <g transform="translate(247 264)"><ellipse rx="47" ry="22" fill="#f3f3f3" stroke="#bcbcbc"/><path d="M-47-16V0c0 29 94 29 94 0v-16" fill="#f3f3f3" stroke="#bcbcbc"/><ellipse cy="-16" rx="47" ry="22" fill="#fff" stroke="#bcbcbc"/><path d="m-21-16 12-6 14 6 12-8 10 10M-9-22 5-7 27-14M-21-16 5-7" stroke="#969696" fill="none"/><g fill="#858585"><circle cx="-21" cy="-16" r="3"/><circle cx="-9" cy="-22" r="3"/><circle cx="5" cy="-7" r="3"/><circle cx="27" cy="-14" r="3"/></g></g>
    <g transform="translate(105 291) rotate(24)"><text class="hero-svg-caption">INTEGRAIL / CONNECTED AI STACK</text></g><g transform="translate(104 345) rotate(24)"><text class="hero-svg-caption">YOUR CLOUD</text></g></g>
    <circle r="3" fill="#646464"><animateMotion dur="4s" repeatCount="indefinite"><mpath href="#provider-flow-${compact}"/></animateMotion></circle>
    <g class="hero-float-alt"><rect x="338" y="333" width="128" height="63" rx="5" fill="#373737"/><text x="351" y="351" font-size="7" fill="#cecece" letter-spacing=".8">NEW SERVICE LINE</text><text x="351" y="375" font-size="19" fill="#f4f4f4" letter-spacing="-.6">AI, from you. ↗</text></g>
    <g transform="translate(30 444)"><circle r="3" fill="#7c7c7c" class="engine-signal"/><text x="12" y="3" class="hero-svg-caption">LOCAL TRUST. RECURRING VALUE.</text></g>
  </svg>`;
}

function renderProviderIllustrations() {
  const mini = $('[data-provider-mini]');
  if (mini) mini.innerHTML = providerCloudSvg(true);
  const hero = $('[data-provider-illustration]');
  if (hero) hero.innerHTML = providerCloudSvg(false);
}

function addTabKeyboard(tabs, select, vertical = false) {
  tabs.forEach((tab,index) => tab.addEventListener('keydown', event => {
    const next = vertical ? 'ArrowDown' : 'ArrowRight';
    const previous = vertical ? 'ArrowUp' : 'ArrowLeft';
    if (![next,previous,'Home','End'].includes(event.key)) return;
    event.preventDefault();
    const target = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === next ? 1 : -1) + tabs.length) % tabs.length;
    select(target); tabs[target].focus();
  }));
}

const fileSvg = `<svg viewBox="0 0 28 34" fill="none" aria-hidden="true"><path d="M4 2h13l7 7v23H4Z" fill="currentColor" opacity=".08"/><path d="M4 2h13l7 7v23H4ZM17 2v8h7M8 16h12M8 21h12M8 26h8" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`;
const scenarios = {
  fact:{question:'Did Smith invest in Integrail?',documents:[{name:'investment-note.pdf',text:'<b>John Smith</b> invested <b>$100,000</b> in Integrail.'}],regularTokens:60000,regularTime:60,tokens:600,time:.6,facts:1,answer:'Yes. John Smith invested <b>$100,000 in Integrail.</b>',citation:'Source: investment-note.pdf · passage 12',caption:'One indexed relationship. One direct answer.'},
  relationship:{question:'What is the relationship between Smith and Doe?',documents:[{name:'investment-note.pdf',text:'<b>John Smith</b> invested <b>$100,000</b> in Integrail.'},{name:'leadership-update.docx',text:'<b>Jane Doe</b> became <b>CMO of Integrail.</b>'}],regularTokens:120000,regularTime:120,tokens:600,time:.6,facts:2,answer:'They are connected through <b>Integrail</b>: Smith is an investor; Doe is its CMO.',citation:'Sources: investment-note.pdf + leadership-update.docx',caption:'Two documents. A shared company. The connection is the answer.'}
};

function graphMarkup(relationship) {
  return `<svg class="graph-desktop" viewBox="0 0 430 200" role="img" aria-label="${relationship ? 'John Smith invested in Integrail; Jane Doe is CMO of Integrail. A shared company connects them.' : 'John Smith invested 100,000 dollars in Integrail.'}">
    <g class="graph-noise" fill="none" stroke="#cfcfcf" stroke-width="1"><path d="m24 40 62 15 33-28 38 42 58-47 61 35 76-27 41 32M24 40l7 103 72 28 54-32 58 37 61-39 85 34 32-109M86 55l17 116M157 69l58 107M276 57v80M352 30l9 141M31 143 86 55 157 69 215 22 276 137 393 62"/><g fill="#f6f6f6"><circle cx="24" cy="40" r="5"/><circle cx="86" cy="55" r="7"/><circle cx="119" cy="27" r="4"/><circle cx="157" cy="69" r="6"/><circle cx="215" cy="22" r="6"/><circle cx="276" cy="57" r="6"/><circle cx="352" cy="30" r="4"/><circle cx="393" cy="62" r="5"/><circle cx="31" cy="143" r="4"/><circle cx="103" cy="171" r="6"/><circle cx="157" cy="139" r="4"/><circle cx="215" cy="176" r="5"/><circle cx="276" cy="137" r="5"/><circle cx="361" cy="171" r="6"/></g></g>
    ${relationship ? `<path class="graph-edge" d="M110 100H172M258 100h62"/><text x="141" y="76" class="graph-relation">INVESTED IN</text><text x="141" y="88" class="graph-relation">$100,000</text><text x="289" y="84" class="graph-relation">CMO OF</text><rect x="15" y="78" width="95" height="44" rx="6" class="graph-node primary"/><rect x="172" y="78" width="86" height="44" rx="6" class="graph-node primary"/><rect x="320" y="78" width="95" height="44" rx="6" class="graph-node primary"/><text x="62" y="103" class="graph-node-label">John Smith</text><text x="215" y="103" class="graph-node-label">Integrail</text><text x="367" y="103" class="graph-node-label">Jane Doe</text><path d="m165 97 7 3-7 3m100-6-7 3 7 3" fill="none" stroke="#7e7e7e" class="graph-trace"/><text x="215" y="155" class="graph-relation">2 facts → 1 connected answer</text>` : `<path class="graph-edge" d="M151 100H280"/><text x="216" y="77" class="graph-relation">INVESTED IN</text><text x="216" y="94" class="graph-relation">$100,000</text><rect x="48" y="78" width="103" height="44" rx="6" class="graph-node primary"/><rect x="280" y="78" width="103" height="44" rx="6" class="graph-node primary"/><text x="99" y="103" class="graph-node-label">John Smith</text><text x="331" y="103" class="graph-node-label">Integrail</text><path d="m273 97 7 3-7 3" fill="none" stroke="#7e7e7e" class="graph-trace"/><text x="216" y="151" class="graph-relation">1 graph query → the relevant fact</text>`}
  </svg><svg class="graph-mobile" viewBox="0 0 170 166" role="img" aria-label="${relationship ? 'Smith is an investor in Integrail. Doe is CMO of Integrail.' : 'Smith invested 100,000 dollars in Integrail.'}">
  ${relationship ? `<path class="graph-edge" d="M85 36v33M85 131v-33"/><rect class="graph-node primary" x="36" y="8" width="98" height="28" rx="5"/><rect class="graph-node primary" x="36" y="69" width="98" height="28" rx="5"/><rect class="graph-node primary" x="36" y="131" width="98" height="28" rx="5"/><text class="graph-node-label" x="85" y="26">John Smith</text><text class="graph-node-label" x="85" y="87">Integrail</text><text class="graph-node-label" x="85" y="149">Jane Doe</text><text class="graph-relation" x="125" y="55" style="font-size:6px">INVESTED IN</text><text class="graph-relation" x="120" y="117" style="font-size:7px">CMO OF</text><path class="graph-trace" d="m82 65 3 4 3-4m-6 37 3-8 3 8" fill="none" stroke="#777"/>` : `<path class="graph-edge" d="M85 46v66"/><rect class="graph-node primary" x="35" y="15" width="100" height="31" rx="5"/><rect class="graph-node primary" x="35" y="112" width="100" height="31" rx="5"/><text class="graph-node-label" x="85" y="35">John Smith</text><text class="graph-node-label" x="85" y="132">Integrail</text><rect x="41" y="64" width="88" height="27" fill="#f6f6f6"/><text class="graph-relation" x="85" y="75">INVESTED IN</text><text class="graph-relation" x="85" y="88">$100,000</text><path class="graph-trace" d="m82 108 3 4 3-4" fill="none" stroke="#777"/>`}
  </svg>`;
}

function initializeDemo() {
  const demo = $('[data-demo]');
  if (!demo) return;
  const docField = $('[data-document-field]',demo);
  docField.innerHTML = Array.from({length:36},(_,i) => `<div class="document-icon" data-document="${i}">${fileSvg}</div>`).join('');
  const icons = $$('[data-document]',demo);
  const tabs = $$('[data-scenario]',demo);
  const play = $('[data-demo-play]',demo);
  let scenario = 'fact';
  let elapsed = 0;
  let playing = !motionPaused;
  let inView = false;
  let started = false;
  let previousTime = 0;
  let animationFrame = 0;
  let completeAnnounced = false;
  const duration = 12000;
  // Announce only completed answers, not the rapidly changing metrics.
  const announcement = document.createElement('span');
  announcement.className = 'sr-only'; announcement.setAttribute('aria-live','polite');
  demo.append(announcement);

  function updatePlayButton() {
    const active = playing && !motionPaused && elapsed < duration;
    play.textContent = active ? 'Ⅱ' : '▷';
    play.setAttribute('aria-label',active ? 'Pause example' : elapsed >= duration ? 'Replay example' : 'Play example');
    play.title = play.getAttribute('aria-label');
  }

  function setScenario(key) {
    scenario = key; elapsed = 0; previousTime = 0; completeAnnounced = false; announcement.textContent = '';
    const data = scenarios[key];
    tabs.forEach(tab => {const selected = tab.dataset.scenario === key;tab.setAttribute('aria-selected',String(selected));tab.tabIndex = selected ? 0 : -1;});
    $('#demo-stage').setAttribute('aria-labelledby',key === 'fact' ? 'tab-fact' : 'tab-relationship');
    $('[data-question]',demo).textContent = data.question;
    $('[data-evidence]',demo).innerHTML = data.documents.map(doc => `<div class="evidence-snippet"><span class="file-symbol" aria-hidden="true">▧</span><div><span class="file-name">${doc.name}</span>${doc.text}</div></div>`).join('');
    $('[data-demo-graph]',demo).innerHTML = graphMarkup(key === 'relationship');
    $('[data-demo-caption]',demo).textContent = data.caption;
    if (motionPaused) elapsed = duration;
    playing = !motionPaused;
    render(); updatePlayButton(); schedule();
  }

  function render() {
    const data = scenarios[scenario];
    const progress = Math.min(elapsed / duration,1);
    const baselineProgress = Math.max(0, Math.min((progress - .05) / .9,1));
    const connected = progress >= .17;
    const answered = progress >= .25;
    const finished = progress >= 1;
    demo.classList.toggle('is-connected',connected);
    demo.classList.toggle('is-running',progress > 0 && !finished && playing && !motionPaused);
    const activeDoc = Math.min(35,Math.floor(baselineProgress * 36));
    icons.forEach((icon,i) => {icon.classList.toggle('is-scanned',i < activeDoc);icon.classList.toggle('is-active',i === activeDoc && !finished);icon.classList.toggle('is-found',baselineProgress > .73 && i === 25);});
    $('[data-regular-tokens]',demo).textContent = Math.round(data.regularTokens * baselineProgress).toLocaleString('en-US');
    $('[data-regular-time]',demo).textContent = `${Math.round(data.regularTime * baselineProgress)} s`;
    $('[data-regular-sources]',demo).textContent = `${baselineProgress > .73 ? 1 : 0} / ${data.facts}`;
    $('[data-integrail-tokens]',demo).textContent = answered ? data.tokens.toLocaleString('en-US') : connected ? '180' : '0';
    $('[data-integrail-time]',demo).textContent = answered ? `${data.time} s` : connected ? '0.2 s' : '0 s';
    $('[data-integrail-sources]',demo).textContent = `${answered ? data.facts : 0} / ${data.facts}`;
    $('[data-regular-status]',demo).textContent = finished ? scenario === 'fact' ? 'Passage found after repeated search.' : 'Search budget reached. One fact found.' : progress > .05 ? `Searching files… ${Math.min(36,activeDoc+1)} / 36` : 'Waiting for the question…';
    $('[data-integrail-status]',demo).textContent = answered ? 'Relevant facts retrieved with sources.' : connected ? 'Following the indexed relationships…' : 'Knowledge indexed. Ready to query.';
    const regularAnswer = $('[data-regular-answer]',demo);
    const integrailAnswer = $('[data-integrail-answer]',demo);
    const regularHTML = finished ? scenario === 'fact' ? `<span class="answer-check" aria-hidden="true">✓</span><div>${data.answer}<span class="source-citation">${data.citation}</span></div>` : '<span aria-hidden="true">…</span><div>Smith invested in Integrail.<br>Doe’s relationship <b>was not established.</b><span class="source-citation">Illustrated outcome: second source missed.</span></div>' : '<span>Reading documents to build context…</span>';
    const integrailHTML = answered ? `<span class="answer-check" aria-hidden="true">✓</span><div>${data.answer}<span class="source-citation">${data.citation}</span></div>` : '<span>Retrieve facts. Connect context. Answer.</span>';
    if (regularAnswer.innerHTML !== regularHTML) regularAnswer.innerHTML = regularHTML;
    if (integrailAnswer.innerHTML !== integrailHTML) integrailAnswer.innerHTML = integrailHTML;
    regularAnswer.classList.toggle('complete',finished && scenario === 'fact');
    regularAnswer.classList.toggle('incomplete',finished && scenario === 'relationship');
    integrailAnswer.classList.toggle('complete',answered);
    $('[data-demo-progress]',demo).style.width = `${progress * 100}%`;
    $('[data-demo-elapsed]',demo).textContent = `00:${String(Math.floor(elapsed/1000)).padStart(2,'0')} / 00:12`;
    if (finished && !completeAnnounced && started) {announcement.textContent = `Example complete. ${data.answer.replace(/<[^>]+>/g,'')} Integrail: ${data.tokens} modeled tokens, ${data.time} seconds. Baseline: ${data.regularTokens} modeled tokens, ${data.regularTime} seconds.`;completeAnnounced = true;}
    updatePlayButton();
  }

  function frame(now) {
    animationFrame = 0;
    if (!playing || motionPaused || !inView || document.hidden || elapsed >= duration) {previousTime = 0;return;}
    if (previousTime) elapsed = Math.min(duration,elapsed + Math.min(now - previousTime,150));
    previousTime = now; started = true; render(); schedule();
  }
  function schedule() {if (!animationFrame && playing && !motionPaused && inView && !document.hidden && elapsed < duration) animationFrame = requestAnimationFrame(frame);}
  function replay() {elapsed=0;previousTime=0;completeAnnounced=false;announcement.textContent='';playing=true;if(motionPaused) elapsed=duration;render();schedule();}
  tabs.forEach(tab => tab.addEventListener('click', () => setScenario(tab.dataset.scenario)));
  addTabKeyboard(tabs,index => setScenario(tabs[index].dataset.scenario));
  $('[data-demo-replay]',demo).addEventListener('click',replay);
  play.addEventListener('click', () => {
    if(motionPaused) {setMotion(false);return;}
    if(elapsed >= duration) replay();
    else {playing=!playing;previousTime=0;render();schedule();}
  });
  motionListeners.add(paused => {previousTime=0;if(paused){elapsed=duration;render();}else{if(elapsed>=duration){elapsed=0;completeAnnounced=false;}playing=true;render();schedule();}});
  new IntersectionObserver(entries => {inView=entries[0].isIntersecting;previousTime=0;schedule();},{threshold:.2}).observe(demo);
  document.addEventListener('visibilitychange',()=>{previousTime=0;schedule();});
  setScenario('fact');
}

function initializeCalculator() {
  const calc = $('[data-calculator]');
  if (!calc) return;
  const customers = $('#customers',calc), adoption = $('#adoption',calc), price = $('#monthly-price',calc);
  const euros = new Intl.NumberFormat('en-IE',{style:'currency',currency:'EUR',maximumFractionDigits:0});
  function update() {
    const customerCount = Number(customers.value), adoptionRate = Number(adoption.value);
    const rawPrice = Number(price.value);
    const validPrice = price.value.trim() !== '' && Number.isFinite(rawPrice) && rawPrice >= 1 && rawPrice <= 100000;
    price.setAttribute('aria-invalid',String(!validPrice));
    const active = Math.round(customerCount * adoptionRate / 100);
    $('[data-customers-output]',calc).textContent=customerCount.toLocaleString('en-US');
    $('[data-adoption-output]',calc).textContent=`${adoptionRate}%`;
    $('[data-active-customers]',calc).textContent=active.toLocaleString('en-US');
    $('[data-annual-revenue]',calc).textContent=validPrice ? euros.format(active * rawPrice * 12) : '—';
    $('[data-monthly-revenue]',calc).textContent=validPrice ? euros.format(active * rawPrice) : '—';
    $('[data-revenue-formula]',calc).textContent=validPrice ? `${customerCount.toLocaleString('en-US')} × ${adoptionRate}% × ${euros.format(rawPrice)} × 12` : 'Enter a monthly price from €1 to €100,000.';
  }
  [customers,adoption,price].forEach(input=>input.addEventListener('input',update));
  update();
}

function initializePilot() {
  const root=$('[data-dialog-root]');
  if(!root) return;
  root.innerHTML=`<dialog class="pilot-dialog" aria-labelledby="pilot-title"><div class="dialog-inner"><button class="dialog-close" aria-label="Close pilot planner">×</button><div data-pilot-content><p class="eyebrow">ONE SOURCE. ONE WORKFLOW. REAL VALUE.</p><h2 id="pilot-title">Let’s make it<br><em>work for you.</em></h2><p class="dialog-intro">Define a focused first deployment. Prepare a short brief to share with your Integrail contact or hosting provider.</p><form class="pilot-form"><div class="form-row"><label>Your organization<input name="organization" required maxlength="120" autocomplete="organization" placeholder="Company name"></label><label>I’m exploring<select name="audience"><option value="A deployment for my business">AI for my business</option><option value="An AI service for our customers">AI for our customers</option></select></label></div><label>Where should the knowledge live?<select name="environment"><option>Our hosting / MSP provider</option><option>Our own cloud infrastructure</option><option>Our private infrastructure</option><option>Help us decide</option></select></label><div class="form-row"><label>First knowledge source<select name="source"><option>Google Drive</option><option>SharePoint</option><option>Gmail</option><option>Microsoft 365</option><option>Document collection</option></select></label><label>First use case<select name="usecase"><option>Research & document analysis</option><option>Internal knowledge assistant</option><option>Customer-facing AI service</option><option>Custom agent workflow</option></select></label></div><label>What would a useful first result look like?<textarea name="goal" required maxlength="1500" placeholder="For example: answer investor and company questions across our shared documents."></textarea></label><button class="button button-dark" type="submit">Create your pilot brief <span aria-hidden="true">↗</span></button><p class="form-note">Your entries stay in this browser session. This creates a downloadable brief; it does not send an enquiry.</p></form></div></div></dialog>`;
  const dialog=$('dialog',root),content=$('[data-pilot-content]',root),form=$('form',root);
  let currentBrief='',lastTrigger=null;
  const formMarkup=content.innerHTML;
  function bindForm() {
    $('form',root).addEventListener('submit',event=>{
      event.preventDefault();const activeForm=event.currentTarget;if(!activeForm.reportValidity())return;
      const data=Object.fromEntries(new FormData(activeForm));
      currentBrief=`INTEGRAIL — PILOT BRIEF\n${'='.repeat(40)}\n\nOrganization: ${data.organization}\nExploring: ${data.audience}\nDeployment environment: ${data.environment}\nFirst source: ${data.source}\nFirst use case: ${data.usecase}\n\nA useful first result\n${data.goal}\n\nPilot discussion checklist\n- Confirm source access and document permissions.\n- Agree data location, retention and model inference routing.\n- Select representative questions and source-grounded expected answers.\n- Evaluate retrieval quality, freshness, access controls and query economics.\n- Agree operational responsibilities and commercial terms before rollout.\n\nPrepared locally. No enquiry has been sent.\n`;
      content.innerHTML=`<p class="eyebrow">A PRACTICAL FIRST STEP</p><div class="brief-success"><div class="success-icon" aria-hidden="true">✓</div><h2 id="pilot-title">Your pilot.<br><em>Taking shape.</em></h2><p>Your brief is ready. Download it and share it with your Integrail contact or hosting provider to plan the next step.</p><div class="button-row"><button class="button button-dark" data-download-brief>Download pilot brief <span aria-hidden="true">↓</span></button><button class="button button-outline" data-copy-brief>Copy brief <span aria-hidden="true">↗</span></button></div><p class="copy-feedback" role="status" data-brief-feedback></p></div>`;
      $('[data-download-brief]',root).addEventListener('click',()=>{
        const url=URL.createObjectURL(new Blob([currentBrief],{type:'text/plain;charset=utf-8'}));
        const link=document.createElement('a');link.href=url;link.download='integrail-pilot-brief.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
        $('[data-brief-feedback]',root).textContent='Your brief has been prepared for download.';
      });
      $('[data-copy-brief]',root).addEventListener('click',async()=>{
        try{await navigator.clipboard.writeText(currentBrief);$('[data-brief-feedback]',root).textContent='Pilot brief copied.';}catch{$('[data-brief-feedback]',root).textContent='Clipboard unavailable. Download your brief instead.';}
      });
      $('[data-download-brief]',root).focus();
    });
  }
  bindForm();
  $$('[data-pilot]').forEach(trigger=>trigger.addEventListener('click',()=>{
    lastTrigger=trigger;if(!$('form',root)){content.innerHTML=formMarkup;bindForm();}
    if(trigger.dataset.pilot==='provider') $('[name=audience]',root).value='An AI service for our customers';
    else $('[name=audience]',root).value='A deployment for my business';
    dialog.showModal();document.body.classList.add('modal-open');
  }));
  $('.dialog-close',root).addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastTrigger?.focus();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();}});
}

initializeChrome();
renderHero();
renderProviderIllustrations();
initializeArchitecture();
initializeDemo();
initializeCalculator();
initializePilot();
// Newly created SVG animations inherit the user's motion preference too.
if(motionPaused) $$('svg').forEach(svg=>svg.pauseAnimations?.());
