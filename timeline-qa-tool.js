(function(){
  // ── Demo CSS ───────────────────────────────────────────────────────────
  window._tqInjectDemoStyles = function() {
    if (document.getElementById('tl-styles')) return;
    const s = document.createElement('style');
    s.id = 'tl-styles';
    s.textContent = `
      #tl-tab-btn{display:inline-flex;align-items:center;gap:5px;padding:8px 12px;border:none;background:transparent;cursor:pointer;font-size:14px;font-family:'DM Sans',sans-serif;color:#5a5d70;border-bottom:2px solid transparent;white-space:nowrap;flex-shrink:0}
      #tl-tab-btn.tl-active{color:#ff6600;border-bottom-color:#ff6600}
      #tl-panel{display:none;background:#fff;font-family:'DM Sans',sans-serif}
      .tl-chips{display:flex;gap:8px;padding:12px 16px;border-bottom:1px solid #e2e3e8;flex-wrap:wrap}
      .tl-chip{padding:4px 12px;border-radius:20px;border:1px solid #777a88;font-size:12px;font-weight:400;cursor:pointer;background:#fff;color:#040406;display:inline-flex;align-items:center;gap:4px;font-family:inherit}
      .tl-chip.tl-active{border-color:#ff6600;background:#ff6600;color:#fdfdfd}
      .tl-hbar-wrap{padding:10px 16px 18px;border-bottom:1px solid #e2e3e8}
      .tl-hbar-track{position:relative;height:4px;background:#e2e3e8;border-radius:2px}
      .tl-hbar-progress{position:absolute;left:0;top:0;height:100%;background:#40b840;border-radius:2px}
      .tl-hbar-time{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#333;color:#fdfdfd;font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;white-space:nowrap;font-family:inherit;z-index:3}
      .tl-hbar-markers{position:relative;height:0}
      .tl-hbar-dot{position:absolute;left:0;transform:translate(-50%,-50%);width:20px;height:20px;border-radius:7px;display:flex;align-items:center;justify-content:center;z-index:2}
      .tl-hbar-dot svg{width:14px;height:14px;display:block}
      .tl-list{padding:16px;display:flex;flex-direction:column;row-gap:22px;position:relative}
      .tl-list::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:1px;background:#e2e3e8;transform:translateX(-50%);z-index:0}
      .tl-row{display:flex;align-items:center;position:relative;z-index:1;min-height:24px}
      .tl-side{flex:1;display:flex;align-items:center;gap:8px;min-width:0}
      .tl-side.tl-home{justify-content:flex-end;padding-right:24px}
      .tl-side.tl-away{justify-content:flex-start;padding-left:24px}
      .tl-minute{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#f7f7f9;color:#ff6600;font-size:10px;font-weight:600;padding:2px 8px;border-radius:4px;white-space:nowrap;z-index:2}
      .tl-phase{width:100%;display:flex;align-items:center;justify-content:center;background:#eeeff2;border-radius:8px;padding:4px 8px;min-height:36px;font-size:12px;font-weight:600;color:rgba(4,4,6,.7);gap:6px}
      .tl-phase-time{color:#ff6600}
      .tl-phase-teams{width:100%;display:flex;justify-content:space-between;align-items:center;background:#eeeff2;border-radius:8px;padding:4px 16px 4px 16px;font-size:10px;font-weight:600;color:rgba(4,4,6,.7)}
      .tl-phase-score{font-weight:800;color:#040406;font-size:14px}
      .tl-icon{width:24px;height:24px;border-radius:8px;border:1.5px solid #e2e3e8;display:flex;align-items:center;justify-content:center;background:#fff;flex-shrink:0;box-shadow:0 1px 3px rgba(0,0,0,.06)}
      .tl-icon svg{width:15px;height:15px;display:block}
      .tl-content{display:flex;flex-direction:column;min-width:0}.tl-home .tl-content{align-items:flex-end;text-align:right}.tl-away .tl-content{align-items:flex-start;text-align:left}
      .tl-inc-label{font-size:14px;font-weight:600;color:#040406}
      .tl-player{font-size:12px;font-weight:400;color:rgba(4,4,6,.87)}
      .tl-assist{font-size:10px;font-weight:400;color:rgba(4,4,6,.87)}
      .tl-score{display:inline-block;background:#eeeff2;padding:1px 6px;border-radius:4px;font-size:10px;font-weight:600;color:#040406;margin-top:2px}
      .tl-sub-out,.tl-sub-in{font-size:10px;font-weight:600;color:rgba(4,4,6,.7);display:inline-flex;align-items:center;gap:2px}
      .tl-sub-out .tl-sub-arrow{color:#dd2727}.tl-sub-in .tl-sub-arrow{color:#61aa00}
      .tl-disclaimer{padding:10px 16px;font-size:11px;color:#999;text-align:center;border-top:1px solid #e2e3e8}
    `;
    document.head.appendChild(s);
  }

  // ── tlRender (Demo mode) ───────────────────────────────────────────────
  window._tqInstallTlRender = function() {
    window.tlSetFilter = function(f) { window._tlFilter=f; window.tlRender(); };
    window.tlRender = function() {
      const p = document.getElementById('tl-panel');
      if (!p) return;
      const items=window._tlIncidents||[], filter=window._tlFilter||'all';
      const PHASES=['kickOff','halfTime','secondHalfStart','fullTime','injuryTime'];
      const GOALS=['goal','ownGoal','penaltyScored'], CARDS=['yellowCard','secondYellow','redCard'];
      const hasGoals=items.some(i=>GOALS.includes(i.type)), hasCards=items.some(i=>CARDS.includes(i.type)), hasCorners=items.some(i=>i.type==='corner');
      const hItems=items.filter(i=>!PHASES.includes(i.type)&&(GOALS.includes(i.type)||CARDS.includes(i.type)));
      const allMins=items.map(i=>i.minute||0).filter(Boolean), maxMin=allMins.length?Math.max(...allMins,90):90, curMin=allMins.length?Math.max(...allMins):0;
      const pct=curMin?Math.min((curMin/maxMin)*100,100):0;
      const GREY='#767a88', RED='#dd2727', ORANGE='#faa200', GREEN='#61aa00';
      const ICON_SVG = {
        goal: c=>`<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.6" fill="${c}"/><polygon points="8,3.3 12.3,6.4 10.6,11.3 5.4,11.3 3.7,6.4" fill="#fff"/></svg>`,
        ownGoal: c=>ICON_SVG.goal(c),
        yellowCard: c=>`<svg viewBox="0 0 16 16"><rect x="4" y="2" width="7" height="10" rx="1.4" fill="${c}" transform="rotate(15 8 8)"/></svg>`,
        redCard: c=>ICON_SVG.yellowCard(c),
        secondYellow: ()=>`<svg viewBox="0 0 16 16"><defs><clipPath id="tl-2y-clip"><rect x="4" y="2" width="7" height="10" rx="1.4" transform="rotate(15 8 8)"/></clipPath></defs><g clip-path="url(#tl-2y-clip)"><rect x="0" y="0" width="16" height="16" fill="${RED}"/><polygon points="0,16 16,16 16,0" fill="${ORANGE}"/></g></svg>`,
        corner: c=>`<svg viewBox="0 0 16 16"><rect x="4.9" y="2.1" width="1.4" height="12.5" rx=".5" fill="${c}"/><polygon points="6.3,2.6 11.3,4.8 6.3,7" fill="${c}"/></svg>`,
        substitution: ()=>`<svg viewBox="0 0 16 16"><g stroke="${RED}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="3" x2="5" y2="12"/><polyline points="2.3,9.3 5,12 7.7,9.3"/></g><g stroke="${GREEN}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="11" y1="12" x2="11" y2="3"/><polyline points="8.3,5.7 11,3 13.7,5.7"/></g></svg>`,
        penaltyScored: c=>`<svg viewBox="0 0 16 16"><path d="M3 3h10v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3z" fill="none" stroke="${c}" stroke-width="1.2"/><line x1="3" y1="3" x2="3" y2="10" stroke="${c}" stroke-width="1"/><line x1="13" y1="3" x2="13" y2="10" stroke="${c}" stroke-width="1"/><circle cx="8" cy="8.4" r="1.5" fill="${c}"/></svg>`,
        penaltyMissed: c=>ICON_SVG.penaltyScored(c),
        penaltyAwarded: c=>`<svg viewBox="0 0 16 16"><circle cx="10.4" cy="9.6" r="2.2" fill="none" stroke="${c}" stroke-width="1.2"/><path d="M10.4 7.4H6a2 2 0 1 0 0 4h.3" fill="none" stroke="${c}" stroke-width="1.2" stroke-linecap="round"/><line x1="9" y1="4.6" x2="9.8" y2="6.1" stroke="${c}" stroke-width="1" stroke-linecap="round"/><line x1="11" y1="4.1" x2="11.2" y2="5.9" stroke="${c}" stroke-width="1" stroke-linecap="round"/><line x1="13" y1="5" x2="12.1" y2="6.3" stroke="${c}" stroke-width="1" stroke-linecap="round"/></svg>`,
        varReviewStart: c=>`<svg viewBox="0 0 16 16"><rect x="2.5" y="3" width="11" height="7.5" rx="1" fill="none" stroke="${c}" stroke-width="1.3"/><line x1="6" y1="13" x2="10" y2="13" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/><line x1="8" y1="10.5" x2="8" y2="13" stroke="${c}" stroke-width="1.3"/></svg>`,
        varReviewEnd: c=>ICON_SVG.varReviewStart(c),
      };
      const ICON_COLOR = {goal:GREY,ownGoal:RED,yellowCard:ORANGE,secondYellow:null,redCard:RED,corner:RED,substitution:null,penaltyScored:GREY,penaltyMissed:RED,penaltyAwarded:GREY,varReviewStart:GREY,varReviewEnd:GREY};
      const iconHtml = t => ICON_SVG[t] ? ICON_SVG[t](ICON_COLOR[t]) : '';
      const LABEL={goal:'Goal',ownGoal:'Own goal',yellowCard:'Yellow card',secondYellow:'2nd yellow card',redCard:'Red card',corner:'Corner',substitution:'Substitution',penaltyScored:'Penalty scored',penaltyMissed:'Penalty missed',penaltyAwarded:'Penalty',varReviewStart:'VAR review starts',varReviewEnd:'VAR review ends'};
      let hDots='';
      for(const it of hItems){const dp=Math.min(((it.minute||0)/maxMin)*100,100),top=it.team==='home';hDots+=`<div class="tl-hbar-dot" style="left:${dp}%;top:calc(50% ${top?'- 6px':'+ 6px'})">${iconHtml(it.type)}</div>`;}
      const sorted=[...items].reverse();
      const visible=filter==='all'?sorted:filter==='goals'?sorted.filter(i=>PHASES.includes(i.type)||GOALS.includes(i.type)):filter==='cards'?sorted.filter(i=>PHASES.includes(i.type)||CARDS.includes(i.type)):filter==='corners'?sorted.filter(i=>PHASES.includes(i.type)||i.type==='corner'):sorted;
      let rows='';
      for(const item of visible){
        if(PHASES.includes(item.type)){
          let txt='';
          if(item.type==='kickOff')txt='Kick off';
          else if(item.type==='halfTime')txt='Half time';
          else if(item.type==='secondHalfStart')txt='Start of 2nd half time';
          else if(item.type==='fullTime')txt='Match ends';
          else if(item.type==='injuryTime')txt=`Injury time – ${item.extraMinutes||'?'} min added`;
          rows+=`<div class="tl-row"><div class="tl-phase">${txt}</div></div>`;
          if((item.type==='halfTime'||item.type==='fullTime')&&item.scoreText){
            const parts=String(item.scoreText).split('-').map(s=>s.trim());
            const home=parts[0]||'', away=parts[1]||'';
            rows+=`<div class="tl-row"><div class="tl-phase-teams"><span>${window._tlHomeTeam||'Home'}</span><span class="tl-phase-score">${home} – ${away}</span><span>${window._tlAwayTeam||'Away'}</span></div></div>`;
          }
        }
        else{
          const isHome=item.team==='home';
          const icon=`<div class="tl-icon">${iconHtml(item.type)}</div>`;
          let body=`<div class="tl-inc-label">${LABEL[item.type]||item.type}</div>`;
          if(item.type==='substitution'){body+=`<span class="tl-sub-in"><span class="tl-sub-arrow">↑</span> ${item.playerIn||'—'}</span> <span class="tl-sub-out"><span class="tl-sub-arrow">↓</span> ${item.playerOut||'—'}</span>`;}
          else{
            if(item.player)body+=`<div class="tl-player">${item.player}</div>`;
            if(item.assist)body+=`<div class="tl-assist">▸ ${item.assist}</div>`;
            if(item.score){
              const sp=String(item.score).split('-').map(s=>s.trim()), h=sp[0]||'', a=sp[1]||'';
              body+=`<div class="tl-score"><span style="font-weight:${isHome?800:600}">${h}</span> - <span style="font-weight:${!isHome?800:600}">${a}</span></div>`;
            }
          }
          const content=`<div class="tl-content">${body}</div>`;
          const minute=`<div class="tl-minute">${item.minute||''}'</div>`;
          const homeSide=`<div class="tl-side tl-home">${isHome?content+icon:''}</div>`;
          const awaySide=`<div class="tl-side tl-away">${!isHome?icon+content:''}</div>`;
          rows+=`<div class="tl-row">${homeSide}${minute}${awaySide}</div>`;
        }
      }
      if(!rows)rows='<div style="text-align:center;color:#999;padding:24px;font-size:13px">No incidents yet</div>';
      p.innerHTML=`<div class="tl-chips"><button class="tl-chip${filter==='all'?' tl-active':''}" onclick="window.tlSetFilter('all')">All</button>${hasGoals?`<button class="tl-chip${filter==='goals'?' tl-active':''}" onclick="window.tlSetFilter('goals')">Goals</button>`:''} ${hasCards?`<button class="tl-chip${filter==='cards'?' tl-active':''}" onclick="window.tlSetFilter('cards')">Cards</button>`:''} ${hasCorners?`<button class="tl-chip${filter==='corners'?' tl-active':''}" onclick="window.tlSetFilter('corners')">Corners</button>`:''}</div><div class="tl-hbar-wrap"><div class="tl-hbar-track"><div class="tl-hbar-progress" style="width:${pct}%"></div>${curMin?`<div class="tl-hbar-time">${curMin}:00</div>`:''}<div class="tl-hbar-markers">${hDots}</div></div></div><div class="tl-list">${rows}</div><div class="tl-disclaimer">The score displayed and further information (e.g. time, scorer) is for reference only. We do not guarantee the accuracy of this information.</div>`;
    };
  }
})();/**
 * Timeline QA Tool v2 — Injectable bookmarklet (mode toggle edition)
 * Two modes:
 *  - Data only: populates window._tlIncidents, calls tlRender() if deployed code provides it
 *  - Demo:      full mock tab+panel+CSS injection — shows how Timeline should look
 * Inject via evaluate_script (DevTools MCP) on any Betsson live event page.
 */
(function () {
  if (document.getElementById('tl-qa-panel')) {
    var ep = document.getElementById('tl-qa-panel');
    ep.style.display = ep.style.display === 'none' ? 'flex' : 'none';
    return;
  }

  // Global mode state (persists across re-injects in same session)
  if (!window._tqMode) window._tqMode = 'data';

  // ── QA Panel Styles ────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #tl-qa-panel {
      position: fixed; top: 80px; right: 16px; z-index: 999999;
      width: 300px; background: #1a1a2e; color: #e0e0e0;
      border-radius: 10px; box-shadow: 0 8px 32px rgba(0,0,0,.5);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 13px; display: flex; flex-direction: column;
      user-select: none;
    }
    #tl-qa-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 14px; background: #12122a; border-radius: 10px 10px 0 0;
      cursor: move; border-bottom: 1px solid #333;
    }
    #tl-qa-header span { font-weight: 700; font-size: 13px; color: #ff6600; }
    #tl-qa-close {
      background: none; border: none; color: #888; cursor: pointer;
      font-size: 16px; padding: 0 4px; line-height: 1;
    }
    #tl-qa-close:hover { color: #fff; }
    #tl-qa-body { padding: 12px; display: flex; flex-direction: column; gap: 8px; }
    #tl-qa-mode-row { display:flex;gap:4px;margin-bottom:4px; }
    .tl-qa-mode-btn { flex:1;padding:6px 8px;border:none;border-radius:5px;background:#37374a;color:#ccc;font-size:11px;font-weight:600;cursor:pointer;transition:background .15s; }
    .tl-qa-mode-btn.active { background:#2e7d32;color:#fff; }
    .tl-qa-mode-btn.active.demo { background:#7b2d8b; }
    #tl-qa-mode-desc { font-size:10px;color:#888;text-align:center;margin-top:-4px;margin-bottom:2px; }
    .tl-qa-row { display: flex; gap: 6px; align-items: center; overflow: hidden; }
    .tl-qa-label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 2px; }
    .tl-qa-sep { border: none; border-top: 1px solid #333; margin: 4px 0; }
    .tl-qa-btn {
      flex: 1; padding: 7px 10px; border: none; border-radius: 5px;
      background: #ff6600; color: #fff; font-weight: 600; font-size: 12px;
      cursor: pointer; transition: background .15s;
    }
    .tl-qa-btn:hover { background: #e55a00; }
    .tl-qa-btn.green { background: #2e7d32; }
    .tl-qa-btn.green:hover { background: #256427; }
    .tl-qa-btn.red { background: #c0392b; }
    .tl-qa-btn.red:hover { background: #a93226; }
    .tl-qa-btn.grey { background: #37374a; color: #ccc; }
    .tl-qa-btn.grey:hover { background: #44445a; }
    .tl-qa-btn.purple { background: #7b2d8b; }
    .tl-qa-btn.purple:hover { background: #6a2578; }
    .tl-qa-toggle { display: flex; align-items: center; gap: 8px; cursor: pointer; }
    .tl-qa-toggle input { accent-color: #ff6600; width: 15px; height: 15px; }
    select.tl-qa-input, input.tl-qa-input {
      flex: 1; min-width: 0; box-sizing: border-box;
      padding: 6px 8px; border-radius: 5px; border: 1px solid #444;
      background: #2a2a3e; color: #e0e0e0; font-size: 12px;
    }
    input.tl-qa-input[type=number] { width: 56px; flex: none; }
    #tl-qa-status {
      font-size: 11px; padding: 5px 8px; border-radius: 4px;
      background: #1b4332; color: #95d5b2; display: none;
    }
    #tl-qa-status.err { background: #4a1c1c; color: #f5a0a0; font-weight: 600; border: 1px solid #c0392b; }
    #tl-qa-count { font-size: 11px; color: #888; text-align: center; }
    .tl-tab-indicator {
      position: absolute; left: 8px; right: 8px; bottom: 0; height: 4px;
      background: #ff6600; border-radius: 2px 2px 0 0;
      opacity: 0; transition: opacity .15s;
    }
    #tl-tab-btn.tl-active .tl-tab-indicator { opacity: 1; }
  `;
  document.head.appendChild(style);

  // ── Panel HTML ─────────────────────────────────────────────────────────
  const panel = document.createElement('div');
  panel.id = 'tl-qa-panel';
  panel.innerHTML = `
    <div id="tl-qa-header">
      <span>⏱ Timeline QA</span>
      <button id="tl-qa-close">✕</button>
    </div>
    <div id="tl-qa-body">

      <div class="tl-qa-label">Injection mode</div>
      <div id="tl-qa-mode-row">
        <button class="tl-qa-mode-btn" id="tl-mode-data">📊 Data only</button>
        <button class="tl-qa-mode-btn demo" id="tl-mode-demo">🎨 Demo (mock UI)</button>
      </div>
      <div id="tl-qa-mode-desc">Injects incidents only — deployed code renders</div>

      <hr class="tl-qa-sep">
      <div class="tl-qa-label">Feature flag</div>
      <div class="tl-qa-row">
        <label class="tl-qa-toggle">
          <input type="checkbox" id="tl-feat-cb">
          <span style="font-size:12px">incidentsTimeline.enabled</span>
        </label>
        <button class="tl-qa-btn grey" id="tl-feat-apply" style="flex:none;padding:6px 10px">Apply</button>
      </div>

      <hr class="tl-qa-sep">

      <div class="tl-qa-row">
        <button class="tl-qa-btn" id="tl-inject-btn">Inject Tab</button>
        <button class="tl-qa-btn red" id="tl-clear-btn">Clear</button>
      </div>
      <div class="tl-qa-row">
        <button class="tl-qa-btn purple" id="tl-demo-btn" style="width:100%">🎬 Load Full Demo Match</button>
      </div>

      <hr class="tl-qa-sep">
      <div class="tl-qa-label">Add incident</div>

      <div class="tl-qa-row">
        <select class="tl-qa-input" id="tl-type">
          <option value="goal">⚽ Goal</option>
          <option value="ownGoal">⚽ Own Goal</option>
          <option value="yellowCard">🟨 Yellow Card</option>
          <option value="secondYellow">🟨 Second Yellow</option>
          <option value="redCard">🟥 Red Card</option>
          <option value="corner">🚩 Corner</option>
          <option value="substitution">🔄 Substitution</option>
          <option value="penaltyScored">🥅 Penalty Scored</option>
          <option value="penaltyMissed">✖ Penalty Missed</option>
          <option value="penaltyAwarded">⚠️ Penalty (awarded)</option>
          <option value="varReviewStart">📺 VAR Review Starts</option>
          <option value="varReviewEnd">📺 VAR Review Ends</option>
          <option value="kickOff">🟢 Kick Off</option>
          <option value="halfTime">⏸ Half Time</option>
          <option value="secondHalfStart">▶️ Start of 2nd Half</option>
          <option value="fullTime">🏁 Full Time</option>
          <option value="injuryTime">⏱ Injury Time</option>
        </select>
        <select class="tl-qa-input" id="tl-team" style="width:80px;flex:none">
          <option value="home">Home</option>
          <option value="away">Away</option>
        </select>
      </div>

      <div class="tl-qa-row" id="tl-row-base">
        <input class="tl-qa-input" type="number" id="tl-min" placeholder="Min" value="45" min="1" max="120">
        <input class="tl-qa-input" type="text" id="tl-player" placeholder="Player name">
      </div>

      <div class="tl-qa-row" id="tl-row-goal">
        <input class="tl-qa-input" type="text" id="tl-assist" placeholder="Assist (opt)">
        <input class="tl-qa-input" type="text" id="tl-score" placeholder="Score e.g. 1-0">
      </div>

      <div class="tl-qa-row" id="tl-row-sub" style="display:none">
        <input class="tl-qa-input" type="text" id="tl-pout" placeholder="Player out">
        <input class="tl-qa-input" type="text" id="tl-pin" placeholder="Player in">
      </div>

      <div class="tl-qa-row" id="tl-row-phase" style="display:none">
        <input class="tl-qa-input" type="text" id="tl-scoretext" placeholder="Score text e.g. 0–1">
        <input class="tl-qa-input" type="number" id="tl-extra" placeholder="+min" style="width:60px;flex:none">
      </div>

      <button class="tl-qa-btn green" id="tl-add-btn" style="width:100%">＋ Add Incident</button>

      <div id="tl-qa-status"></div>
      <div id="tl-qa-count"></div>
    </div>
  `;
  document.body.appendChild(panel);

  // ── Helpers ────────────────────────────────────────────────────────────
  const $ = id => document.getElementById(id);

  function tlStatus(msg, err) {
    const el = $('tl-qa-status');
    el.textContent = msg;
    el.className = err ? 'err' : '';
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, err ? 6000 : 3000);
  }

  function tlUpdateCount() {
    const n = (window._tlIncidents || []).length;
    $('tl-qa-count').textContent = n > 0 ? `${n} incident${n !== 1 ? 's' : ''} injected` : '';
  }

  // ── Mode toggle ────────────────────────────────────────────────────────
  function applyModeUI() {
    const isDemo = window._tqMode === 'demo';
    $('tl-mode-data').classList.toggle('active', !isDemo);
    $('tl-mode-demo').classList.toggle('active', isDemo);
    $('tl-qa-mode-desc').textContent = isDemo
      ? 'Full mock tab+CSS injected — shows how Timeline should look'
      : 'Injects incidents only — deployed code renders';
    $('tl-inject-btn').textContent = window._tlInjected
      ? (isDemo ? '✓ Demo injected' : '✓ Data ready')
      : (isDemo ? 'Inject Demo Tab' : 'Inject Data Mode');
  }
  $('tl-mode-data').addEventListener('click', () => { window._tqMode = 'data'; applyModeUI(); });
  $('tl-mode-demo').addEventListener('click', () => { window._tqMode = 'demo'; applyModeUI(); });
  applyModeUI();

  // ── Dynamic form rows ──────────────────────────────────────────────────
  const PHASES = ['kickOff','halfTime','secondHalfStart','fullTime','injuryTime'];
  function updateRows() {
    const t = $('tl-type').value;
    const isPhase = PHASES.includes(t);
    const isSub   = t === 'substitution';
    $('tl-row-base').style.display  = isPhase ? 'none' : 'flex';
    $('tl-row-goal').style.display  = (!isPhase && !isSub) ? 'flex' : 'none';
    $('tl-row-sub').style.display   = isSub ? 'flex' : 'none';
    $('tl-row-phase').style.display = isPhase ? 'flex' : 'none';
    $('tl-team').style.display      = (t === 'kickOff') ? 'none' : '';
  }
  $('tl-type').addEventListener('change', updateRows);
  updateRows();

  // ── Feature flag ───────────────────────────────────────────────────────
  // Read current value on init
  const featurePath = window.obgClientEnvironmentConfig?.startupContext?.config?.sportsbook?.event?.incidentsTimeline;
  if (featurePath) $('tl-feat-cb').checked = !!featurePath.enabled;

  $('tl-feat-apply').addEventListener('click', () => {
    const cfg = window.obgClientEnvironmentConfig?.startupContext?.config?.sportsbook?.event;
    if (!cfg) { tlStatus('Config path not found', true); return; }
    cfg.incidentsTimeline = { ...(cfg.incidentsTimeline || {}), enabled: $('tl-feat-cb').checked };
    tlStatus(`incidentsTimeline.enabled = ${$('tl-feat-cb').checked}`);
  });

  // ── Inject tab ─────────────────────────────────────────────────────────
  // Scope the panel-content search to the same event widget as the tab bar
  // (walk up to the nearest `.obg-uiuplift-panel-container` ancestor) instead of
  // searching the whole document — a document-wide "largest visible panel" search
  // can wrongly grab an unrelated panel (e.g. Betslip, which uses the same class)
  // whenever the event's own panel-content is temporarily empty (height:0).
  function findEventPanelContainer(scrollerEl) {
    let el = scrollerEl;
    for (let i = 0; i < 15 && el; i++) {
      if (el.classList && el.classList.contains('obg-uiuplift-panel-container')) return el;
      el = el.parentElement;
    }
    return null;
  }
  function findVisiblePanelContent(scrollerEl) {
    const scope = (scrollerEl && findEventPanelContainer(scrollerEl)) || document;
    const scoped = Array.from(scope.querySelectorAll('.obg-uiuplift-panel-content'))
      .filter(el => el.getBoundingClientRect().width > 100);
    if (scoped.length) return scoped[0];
    // Fallback (old behaviour) only if scoping failed entirely
    return Array.from(document.querySelectorAll('.obg-uiuplift-panel-content'))
      .filter(el => { const r = el.getBoundingClientRect(); return r.width > 100 && r.height > 100; })
      .sort((a, b) => { const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect(); return (rb.width*rb.height)-(ra.width*ra.height); })[0] || null;
  }

  $('tl-inject-btn').addEventListener('click', () => {
    if (window._tlInjected) { tlStatus('Already injected'); return; }

    const isDemo = window._tqMode === 'demo';

    // Scope to the actual event/match market tab bar (`obg-m-event-market-tabs-container`),
    // NOT just "first [test-id=scroller-content] in the document" — on competition/listing
    // pages (e.g. .../italian-serie-a?...&tab=liveAndUpcoming) an unrelated competition-level
    // nav tab bar ("Matches | Outrights | Standings") renders *before* the event's own tab bar
    // in DOM order and would otherwise be picked instead, silently injecting our Timeline tab
    // into the wrong place on the page (looks like nothing happened).
    const scrollerEl = document.querySelector('obg-m-event-market-tabs-container [test-id="scroller-content"]')
      || document.querySelector('[test-id="scroller-content"]');
    const panelHostEl = findVisiblePanelContent(scrollerEl);
    if (!scrollerEl || !panelHostEl) {
      tlStatus('⚠ No event tab bar found — navigate to a specific match page first (not a listing/odds page)', true);
      // Also flash the button itself so the error is impossible to miss, regardless
      // of whether the user notices the small status line at the bottom of the panel.
      const injectBtn = $('tl-inject-btn');
      const prevText = injectBtn.textContent;
      const prevBg = injectBtn.style.background;
      injectBtn.textContent = '⚠ Navigate to match page first';
      injectBtn.style.background = '#c0392b';
      setTimeout(() => { injectBtn.textContent = prevText; injectBtn.style.background = prevBg; }, 3000);
      return;
    }

    window._tlIncidents = window._tlIncidents || [];
    window._tlFilter    = 'all';
    window._tlInjected  = true;

    if (isDemo) window._tqInjectDemoStyles();
    window._tqInstallTlRender();

    // Tab button (same for both modes)
    if (!document.getElementById('tl-tab-btn')) {
      const tabBtn = document.createElement('button');
      tabBtn.id = 'tl-tab-btn';
      // Real tabs use a single shared `.obg-tabs-underline` element (4px, translateX+scaleX)
      // instead of a per-tab border, so we replicate it with our own dedicated indicator bar
      // that we fully control (avoids fighting the framework's shared element).
      tabBtn.innerHTML = '<span>Timeline</span><div class="tl-tab-indicator"></div>';
      // Match the real obg-tab-label sizing/typography (48px fixed height, 0 8px padding,
      // rgba(4,4,6,.7) default text colour, 14px/16.8px DM Sans) so the tab lines up with its siblings.
      tabBtn.style.cssText = 'position:relative;display:inline-flex;align-items:center;justify-content:center;gap:4px;box-sizing:border-box;height:48px;padding:0 8px;border:none;background:transparent;cursor:pointer;font-size:14px;font-family:inherit;font-weight:400;line-height:16.8px;color:rgba(4,4,6,.7);white-space:nowrap;flex-shrink:0';
      scrollerEl.appendChild(tabBtn);

      const setActive = (active) => {
        tabBtn.style.color = active ? '#ff6600' : 'rgba(4,4,6,.7)';
        tabBtn.classList.toggle('tl-active', active);
        // The real tabs share a single Angular-managed `.obg-tabs-underline` indicator that only
        // moves when a REAL tab is clicked — Angular has no idea our injected tab exists, so it
        // never hides/repositions that shared underline away from whichever real tab it was last
        // on. We hide it ourselves while our tab is active, and restore it when leaving.
        const underline = (scrollerEl.closest('obg-tabs') || document).querySelector('.obg-tabs-underline');
        if (underline) underline.style.opacity = active ? '0' : '';
      };

      tabBtn.addEventListener('click', () => {
        const ph = findVisiblePanelContent(scrollerEl) || panelHostEl;
        Array.from(ph.children).forEach(c => { if (c.id !== 'tl-panel') c.style.display = 'none'; });
        let tp = document.getElementById('tl-panel');
        if (!tp) { tp = document.createElement('div'); tp.id = 'tl-panel'; tp.style.cssText = 'width:100%;min-height:200px'; ph.appendChild(tp); }
        tp.style.display = 'block';
        if (typeof window.tlRender === 'function') window.tlRender();
        setActive(true);
      });

      // Use a capture-phase listener on the document so the indicator reliably clears when
      // ANY other tab is clicked, even if the framework's own click handler stops propagation
      // during the bubble phase (capture always runs first, top-down, before that can happen).
      document.addEventListener('click', (e) => {
        if (tabBtn.classList.contains('tl-active') && !tabBtn.contains(e.target)) {
          // Ignore clicks inside our own rendered Timeline content or the floating
          // Timeline QA control panel — only a click on another REAL tab (or elsewhere
          // on the page) should deactivate our tab. Without this guard, clicking
          // anything inside the QA panel (mode toggle, add incident, etc.) or even
          // inside the rendered Timeline list itself would incorrectly bounce the
          // user back to the previous tab.
          const qaPanel = document.getElementById('tl-qa-panel');
          const tlContent = document.getElementById('tl-panel');
          if ((qaPanel && qaPanel.contains(e.target)) || (tlContent && tlContent.contains(e.target))) return;
          const ph = findVisiblePanelContent(scrollerEl) || panelHostEl;
          Array.from(ph.children).forEach(c => c.style.display = '');
          const tp = document.getElementById('tl-panel');
          if (tp) tp.style.display = 'none';
          setActive(false);
        }
      }, true);
    }

    // Panel container injected as child of visible panel content
    if (!document.getElementById('tl-panel')) {
      const tlPanel = document.createElement('div');
      tlPanel.id = 'tl-panel';
      tlPanel.style.cssText = 'width:100%;min-height:200px;display:none';
      panelHostEl.appendChild(tlPanel);
    }

    window.tlRender();
    $('tl-inject-btn').textContent = isDemo ? '✓ Demo injected' : '✓ Tab injected';
    tlStatus(isDemo ? 'Demo tab injected ✓' : 'Tab injected ✓');
    tlUpdateCount();
  });

  // ── Clear ──────────────────────────────────────────────────────────────
  $('tl-clear-btn').addEventListener('click', () => {
    window._tlIncidents = [];
    window._tlInjected  = false;
    ['tl-tab-btn','tl-panel','tl-styles'].forEach(id => { const el = document.getElementById(id); if (el) el.remove(); });
    // Restore panel content children
    document.querySelectorAll('.obg-uiuplift-panel-content').forEach(el => {
      Array.from(el.children).forEach(c => c.style.display = '');
    });
    $('tl-inject-btn').textContent = window._tqMode === 'demo' ? 'Inject Demo Tab' : 'Inject Tab';
    tlStatus('All incidents cleared');
    tlUpdateCount();
  });

  // ── Load full demo match ───────────────────────────────────────────────
  // Prebuilt, realistic match covering every incident type present in the
  // Figma timeline reference: kickOff, goal, ownGoal, yellowCard, secondYellow,
  // redCard, corner, substitution, penaltyScored, penaltyMissed, penaltyAwarded,
  // varReviewStart, varReviewEnd, halfTime, secondHalfStart, injuryTime, fullTime.
  function buildFullDemoIncidents() {
    return [
      { type:'kickOff', team:'home', _id:1 },
      { type:'goal', team:'home', minute:12, player:'Harry Kane', assist:'Marcus Rashford', score:'1-0', _id:2 },
      { type:'yellowCard', team:'away', minute:23, player:'B. Cipenga', _id:3 },
      { type:'corner', team:'home', minute:34, _id:4 },
      { type:'varReviewStart', team:'away', minute:40, _id:5 },
      { type:'varReviewEnd', team:'away', minute:42, _id:6 },
      { type:'penaltyScored', team:'away', minute:43, player:'Jude Bellingham', score:'1-1', _id:7 },
      { type:'injuryTime', team:'home', minute:45, extraMinutes:2, _id:8 },
      { type:'halfTime', team:'home', minute:45, scoreText:'1-1', _id:9 },
      { type:'secondHalfStart', team:'home', minute:45, _id:10 },
      { type:'substitution', team:'away', minute:50, playerOut:'Y. Wissa', playerIn:'N. Madueke', _id:11 },
      { type:'corner', team:'away', minute:55, _id:12 },
      { type:'secondYellow', team:'away', minute:60, player:'N. Madueke', _id:13 },
      { type:'ownGoal', team:'away', minute:68, player:'B. Cipenga', score:'2-1', _id:14 },
      { type:'redCard', team:'home', minute:74, player:'Marcus Rashford', _id:15 },
      { type:'penaltyMissed', team:'home', minute:80, player:'Harry Kane', _id:16 },
      { type:'penaltyAwarded', team:'home', minute:84, _id:17 },
      { type:'penaltyScored', team:'home', minute:85, player:'Harry Kane', score:'3-1', _id:18 },
      { type:'injuryTime', team:'home', minute:90, extraMinutes:4, _id:19 },
      { type:'fullTime', team:'home', minute:90, scoreText:'3-1', _id:20 },
    ];
  }
  $('tl-demo-btn').addEventListener('click', () => {
    if (!window._tlInjected) { tlStatus('Inject the tab first!', true); return; }
    window._tlIncidents = buildFullDemoIncidents();
    window._tlFilter = 'all';
    window.tlRender();
    tlStatus('Full demo match loaded — all incident types ✓');
    tlUpdateCount();
  });

  // ── Add incident ───────────────────────────────────────────────────────
  $('tl-add-btn').addEventListener('click', () => {
    if (!window._tlInjected) { tlStatus('Inject the tab first!', true); return; }
    const type = $('tl-type').value;
    const PHASES = ['kickOff','halfTime','secondHalfStart','fullTime','injuryTime'];
    const incident = { type, team: $('tl-team').value, _id: Date.now() };
    if (!PHASES.includes(type)) incident.minute = parseInt($('tl-min').value) || undefined;
    if (type === 'substitution') {
      incident.playerOut = $('tl-pout').value.trim() || undefined;
      incident.playerIn  = $('tl-pin').value.trim()  || undefined;
    } else if (PHASES.includes(type)) {
      incident.scoreText    = $('tl-scoretext').value.trim() || undefined;
      incident.extraMinutes = parseInt($('tl-extra').value) || undefined;
    } else {
      incident.player = $('tl-player').value.trim() || undefined;
      incident.assist = $('tl-assist').value.trim() || undefined;
      incident.score  = $('tl-score').value.trim()  || undefined;
    }
    if (!window._tlIncidents) window._tlIncidents = [];
    window._tlIncidents.push(incident);
    window.tlRender();
    tlStatus(`Added: ${type}${incident.minute ? ' '+incident.minute+"'" : ''}`);
    tlUpdateCount();
    // Clear transient fields
    ['tl-player','tl-assist','tl-score','tl-pout','tl-pin','tl-scoretext'].forEach(id => { const el = $(id); if(el) el.value=''; });
  });

  // ── Drag ───────────────────────────────────────────────────────────────
  let dx=0, dy=0, dragging=false;
  $('tl-qa-header').addEventListener('mousedown', e => {
    dragging = true;
    dx = e.clientX - panel.getBoundingClientRect().left;
    dy = e.clientY - panel.getBoundingClientRect().top;
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    panel.style.left  = (e.clientX - dx) + 'px';
    panel.style.top   = (e.clientY - dy) + 'px';
    panel.style.right = 'auto';
  });
  document.addEventListener('mouseup', () => { dragging = false; });

  // ── Close ──────────────────────────────────────────────────────────────
  $('tl-qa-close').addEventListener('click', () => { panel.style.display = 'none'; });

})();
