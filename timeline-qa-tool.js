(function(){
  // ── Theme detection ──────────────────────────────────────────────────────
  // The site reflects its active theme as a class on <body> ("light"/"dark",
  // e.g. class="mat-typography dark"). We mirror that onto our injected
  // #tl-panel (via .tl-theme-dark) so our own CSS can react to it, since our
  // markup lives outside the site's own themed component tree.
  window._tlIsDarkTheme = function() {
    return document.body.classList.contains('dark');
  };

  // ── Demo CSS ───────────────────────────────────────────────────────────
  window._tqInjectDemoStyles = function() {
    if (document.getElementById('tl-styles')) return;
    const s = document.createElement('style');
    s.id = 'tl-styles';
    s.textContent = `
      #tl-tab-btn{display:inline-flex;align-items:center;gap:5px;padding:8px 12px;border:none;background:transparent;cursor:pointer;font-size:14px;font-family:'DM Sans',sans-serif;color:#5a5d70;border-bottom:2px solid transparent;white-space:nowrap;flex-shrink:0}
      #tl-tab-btn.tl-active{color:#ff6600;border-bottom-color:#ff6600}
      #tl-panel{display:none;background:#f7f7f9;font-family:'DM Sans',sans-serif}
      .tl-chips{display:flex;gap:8px;padding:14px 16px 0;flex-wrap:wrap}
      .tl-chip{padding:6px 16px;border:1.5px solid #c4c6cc;border-radius:999px;font-size:14px;font-weight:600;cursor:pointer;background:#fff;color:#040406;font-family:inherit}
      .tl-chip.tl-active{border-color:#ff6600;background:#ff6600;color:#fff}
      .tl-hbar-wrap{padding:48px 16px 48px}
      .tl-hbar-track{position:relative;height:4px;border-radius:2px;background:#e2e3e8}
      .tl-hbar-progress{position:absolute;top:0;height:100%;background:#40b840;border-radius:2px}
      .tl-hbar-knob{position:absolute;top:50%;transform:translate(-50%,-50%);width:10px;height:10px;border-radius:50%;background:#40b840;z-index:2}
      .tl-hbar-time{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#333;color:#fdfdfd;font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;white-space:nowrap;font-family:inherit;z-index:3}
      .tl-hbar-markers{position:absolute;inset:0}
      .tl-hbar-dot{position:absolute;left:0;transform:translate(-50%,-50%);width:20px;height:20px;display:flex;align-items:center;justify-content:center;z-index:2}
      .tl-hbar-dot svg{width:20px;height:20px;display:block}
      .tl-list{padding:16px;display:flex;flex-direction:column;row-gap:16px;position:relative}
      .tl-phase-group{display:flex;flex-direction:column;row-gap:0;position:relative;z-index:1}
      .tl-list::before{content:'';position:absolute;left:50%;top:16px;bottom:16px;width:1px;background:#e2e3e8;transform:translateX(-50%);z-index:0}
      .tl-row{display:flex;align-items:flex-start;position:relative;z-index:1;min-height:24px}
      .tl-side{flex:1;display:flex;align-items:flex-start;gap:8px;min-width:0}
      .tl-side.tl-home{justify-content:flex-end;padding-right:24px}
      .tl-side.tl-away{justify-content:flex-start;padding-left:24px}
      .tl-minute{position:absolute;left:50%;top:12px;transform:translate(-50%,-50%);background:#f7f7f9;color:#ff6600;font-size:10px;font-weight:600;padding:2px 8px;border-radius:4px;white-space:nowrap;z-index:2}
      .tl-phase{width:100%;display:flex;align-items:center;justify-content:center;background:#eeeff2;border-radius:8px;padding:8px 16px;min-height:36px;font-size:12px;font-weight:600;color:rgba(4,4,6,.7);gap:6px}
      .tl-phase.tl-phase-injury{color:#dd2727}
      .tl-phase-minute{color:#ff6600}
      .tl-phase-icon{width:16px;height:16px;display:inline-flex;flex-shrink:0}
      .tl-phase-icon svg{width:100%;height:100%;display:block}
      .tl-phase-score-inline{font-weight:800;color:rgba(4,4,6,.87)}
      .tl-phase.tl-phase-title{border-radius:8px 8px 0 0;background:#e2e3e8}
      .tl-phase-scoreline{width:100%;display:flex;align-items:center;justify-content:space-between;background:#eeeff2;border-radius:0 0 8px 8px;padding:10px 16px;font-size:12px;font-weight:600;color:rgba(4,4,6,.7)}
      .tl-phase-scoreline .tl-phase-team{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .tl-phase-scoreline .tl-phase-team.tl-away-team{text-align:right}
      .tl-phase-scoreline .tl-phase-score{flex-shrink:0;padding:0 12px;font-size:14px;font-weight:800;color:rgba(4,4,6,.87)}
      .tl-icon{width:24px;height:24px;border-radius:8px;border:1.5px solid #e2e3e8;display:flex;align-items:center;justify-content:center;background:#eeeff2;flex-shrink:0}
      .tl-icon svg{width:16px;height:16px;display:block}
      .tl-content{display:flex;flex-direction:column;min-width:0}.tl-home .tl-content{align-items:flex-end;text-align:right}.tl-away .tl-content{align-items:flex-start;text-align:left}
      .tl-inc-label{font-size:14px;font-weight:600;color:#040406;line-height:24px}
      .tl-player{font-size:12px;font-weight:400;color:rgba(4,4,6,.87)}
      .tl-assist{font-size:10px;font-weight:400;color:rgba(4,4,6,.87)}
      .tl-score{display:inline-block;background:#eeeff2;padding:1px 6px;border-radius:4px;font-size:10px;font-weight:600;color:#040406;margin-top:2px}
      .tl-sub-out,.tl-sub-in{font-size:11px;font-weight:600;color:rgba(4,4,6,.7);display:flex;align-items:center;gap:4px;background:#eeeff2;border-radius:6px;padding:3px 8px;width:fit-content}
      .tl-sub-out .tl-sub-arrow{color:#dd2727}.tl-sub-in .tl-sub-arrow{color:#61aa00}
      .tl-sub-list{display:flex;flex-direction:column;row-gap:4px;margin-top:2px}
      .tl-disclaimer{padding:10px 16px;font-size:11px;color:#999;text-align:center;border-top:1px solid #e2e3e8}

      /* ── Dark theme overrides (colors sampled from the Figma dark-theme export) ── */
      #tl-panel.tl-theme-dark{background:#181A22}
      #tl-panel.tl-theme-dark .tl-chip{border-color:#777A88;background:transparent;color:#B8B9BB}
      #tl-panel.tl-theme-dark .tl-chip.tl-active{border-color:#ff6600;background:#ff6600;color:#fff}
      #tl-panel.tl-theme-dark .tl-hbar-track{background:#353743}
      #tl-panel.tl-theme-dark .tl-list::before{background:#353743}
      #tl-panel.tl-theme-dark .tl-minute{background:#181A22;color:#ff6600}
      #tl-panel.tl-theme-dark .tl-phase{background:#353743;color:rgba(255,255,255,.7)}
      #tl-panel.tl-theme-dark .tl-phase.tl-phase-injury{color:#dd2727}
      #tl-panel.tl-theme-dark .tl-phase-score-inline{color:rgba(255,255,255,.87)}
      #tl-panel.tl-theme-dark .tl-phase.tl-phase-title{background:#353743}
      #tl-panel.tl-theme-dark .tl-phase-scoreline{background:#252731;color:rgba(255,255,255,.7)}
      #tl-panel.tl-theme-dark .tl-phase-scoreline .tl-phase-score{color:rgba(255,255,255,.87)}
      #tl-panel.tl-theme-dark .tl-icon{background:#181A22;border-color:#33353f}
      #tl-panel.tl-theme-dark .tl-inc-label{color:#f5f5f7}
      #tl-panel.tl-theme-dark .tl-player,#tl-panel.tl-theme-dark .tl-assist{color:rgba(255,255,255,.87)}
      #tl-panel.tl-theme-dark .tl-score{background:#353743;color:#f5f5f7}
      #tl-panel.tl-theme-dark .tl-sub-out,#tl-panel.tl-theme-dark .tl-sub-in{background:#353743;color:rgba(255,255,255,.7)}
      #tl-panel.tl-theme-dark .tl-disclaimer{color:#8b8d99;border-top-color:#353743}
    `;
    document.head.appendChild(s);
  }

  // ── tlRender (Demo mode) ───────────────────────────────────────────────
  // Guard: never clobber a pre-existing `window.tlRender` that isn't our own — if some
  // other script (e.g. a future real integration hook) already defined it, back off instead
  // of silently overwriting it, so this mock tool can never masquerade as real rendered output.
  window._tqInstallTlRender = function() {
    if (window.tlRender && !window._tqOwnRender) return;
    window._tqOwnRender = true;
    window.tlSetFilter = function(f) { window._tlFilter=f; window.tlRender(); };
    window.tlRender = function() {
      const p = document.getElementById('tl-panel');
      if (!p) return;
      p.classList.toggle('tl-theme-dark', window._tlIsDarkTheme());
      // Per SBOF-9514/SBOF-9513 (backend Statistics Engine + provider-integration contracts):
      // a VAR-overturned incident (goal/card/corner/penalty/sub) arrives as a Cancel* event
      // that flips the original stat's Status to Cancelled by matching Reference/RelatedReference.
      // The confirmed real FE mapper (TimelineUtil.mapEventStatisticsToTimeline, SBEUJE-6121)
      // "filters to schema-mapped + Active/non-cancelled stats" — i.e. a cancelled incident is
      // NOT shown with a struck-through/greyed style, it simply disappears from the timeline
      // entirely, same as if it had never been sent. We mirror that here.
      const items=(window._tlIncidents||[]).filter(i=>i.status!=='cancelled'), filter=window._tlFilter||'all';
      const PHASES=['kickOff','halfTime','secondHalfStart','fullTime','injuryTime'];
      const GOALS=['goal','ownGoal','penaltyScored'], CARDS=['yellowCard','secondYellow','redCard'];
      const hasGoals=items.some(i=>GOALS.includes(i.type)), hasCards=items.some(i=>CARDS.includes(i.type)), hasCorners=items.some(i=>i.type==='corner');
      const hItems=items.filter(i=>!PHASES.includes(i.type)&&(GOALS.includes(i.type)||CARDS.includes(i.type)));
      // Per "When the match starts we should colour the 1st part" (Timeline - FE Confluence
      // spec, horizontal timeline section): the very first of the 90 one-minute sections is
      // coloured in immediately at kick off, before any other incident exists — the match
      // clock is treated as always "at least 1' elapsed" once live, never a flat 0/empty bar.
      // Do NOT filter out literal minute:0 entries (e.g. the kickOff incident itself) as
      // "no data" — that previously suppressed both the live-time badge and the progress
      // fill entirely for a freshly-injected, kickoff-only tab.
      const kickedOff=items.some(i=>i.type==='kickOff');
      const allMins=items.map(i=>i.minute||0), rawCurMin=allMins.length?Math.max(...allMins):0;
      const curMin=kickedOff?Math.max(rawCurMin,1):rawCurMin;
      // Combined "elapsed minutes" number for the badge text (e.g. 90+3 shown as "93", per Figma reference).
      let curAdded=0;
      for(const it of items){const m=it.minute||0,a=it.addedMinute||0; if(m>curMin||(m===curMin&&a>curAdded)){curAdded=a;}}
      const curMinDisplay=curMin+curAdded;
      // Per SBEUJE-6148: two fixed segment halves (not one continuous bar). Per SBOF-9706/
      // SBOF-9619/SBOF-9809 (Statistics Engine "Expected Event/Period Duration" contract,
      // now a TimeSpan, e.g. for extended halves): each half's length is no longer assumed
      // to always be 45' — it's configurable via the QA panel (window._tlConfig.periodDuration,
      // defaults to 45) so testers can verify the bar/injury-zone math for non-standard periods.
      const PD = (window._tlConfig && window._tlConfig.periodDuration) || 45;
      // Half 1 fills 0→PD, half 2 only starts filling once play has passed minute PD,
      // and the live time badge sits fixed between the two, never sliding along a track.
      const half1Elapsed=Math.min(curMin,PD), half2Elapsed=curMin>PD?Math.min(curMin-PD,PD):0;
      const pct1=(half1Elapsed/PD)*50, pct2=(half2Elapsed/PD)*50;
      // Per "case with just the kick off": even before any incidents happen, a small green
      // knob marks the live leading edge of the elapsed progress (like a scrubber head).
      // Only shown mid-half — at the PD'/2×PD' half boundaries the fixed time badge already
      // occupies that exact spot, so a knob there would be redundant/hidden behind it.
      const knobPct = curMin>PD ? (pct2>0&&pct2<50?50+pct2:null) : (pct1>0&&pct1<50?pct1:null);
      // Per SBEUJE-6150/epic AC5: injury-time incidents (addedMinute>0 at the 45'/90' mark) still render
      // on the horizontal timeline, but ranked side-by-side in a small reserved cluster zone at the end
      // of their half instead of scaling proportionally — this keeps them from landing under the time badge.
      const INJURY_ZONE=10, ZONE_PAD=INJURY_ZONE*0.15;
      const normalW1=50-INJURY_ZONE, normalW2=50-INJURY_ZONE;
      // The half-time injury zone (inj1) sits immediately left of the centered live badge. Its reserved
      // width is a *percentage* of the track, but the badge itself (and each dot icon) has a *fixed pixel*
      // footprint — on a narrow track (e.g. narrow browser viewport on the "eti=1" fullscreen layout) that
      // same percentage maps to fewer px than the badge needs, so the closest injury-1 dot ends up drawn
      // right under the badge (reported bug). Clamp each injury-1 dot's centre, in px, so it can never sit
      // closer to the track's midpoint than the badge's own left edge (plus a small gap) allows, regardless
      // of how narrow the track is.
      const trackWidthPx=Math.max((p.clientWidth||0)-32,120);
      const badgeWidthPx=String(curMinDisplay+':00').length*6.5+14;
      const dotHalfWidthPx=10, gapPx=6;
      const maxInj1CenterPct=50-((badgeWidthPx/2+dotHalfWidthPx+gapPx)/trackWidthPx*100);
      function rankInjuryPositions(list,base,clampMaxPct){
        // Per the "Overlap requirements" spec: injury-time incidents are ranked
        // side-by-side by their DISTINCT added-minute value — incidents sharing the
        // exact same added minute must share the same horizontal slot (they stack
        // vertically instead, same as same-minute normal-time incidents).
        const distinctAdded=[...new Set(list.map(it=>it.addedMinute||0))].sort((a,b)=>a-b);
        const n=distinctAdded.length, posByAdded=new Map();
        distinctAdded.forEach((added,idx)=>{
          const frac=n>1?idx/(n-1):0.5;
          let pos=base+ZONE_PAD+frac*(INJURY_ZONE-2*ZONE_PAD);
          if(clampMaxPct!=null) pos=Math.min(pos,clampMaxPct);
          posByAdded.set(added,pos);
        });
        const map=new Map();
        list.forEach(it=>map.set(it,posByAdded.get(it.addedMinute||0)));
        return map;
      }
      const inj1Map=rankInjuryPositions(hItems.filter(it=>(it.minute||0)===PD&&(it.addedMinute||0)>0),50-INJURY_ZONE,maxInj1CenterPct);
      const inj2Map=rankInjuryPositions(hItems.filter(it=>(it.minute||0)===PD*2&&(it.addedMinute||0)>0),100-INJURY_ZONE);
      const GREY='#777a88', RED='#dd2727', ORANGE='#faa200', GREEN='#61aa00';
      // Icon paths below are copied verbatim from the real Betsson production icon assets
      // (b2bShared_sportsbook_timeline_*.svg / b2bShared_playerstatistics_*.svg, 16x16 viewBox),
      // extracted from the Figma export zips — not hand-drawn approximations — so the QA tool
      // renders pixel-identical shapes to the shipped product.
      const ICON_SVG = {
        // football.svg (grey ring) / football-1.svg (red ring) — white ball pattern is shared.
        goal: c=>`<svg viewBox="0 0 16 16"><path fill="#fff" d="M5.56 2.70001C4.86 3.02668 4.23327 3.48001 3.72 4.04001L3.655 6.14501L5.46 6.73335L5.53333 6.68001L7.51333 5.24001L7.58667 5.19335V3.29075L5.56 2.70001ZM5.97993 9.94668L5.22667 7.62001L5.19333 7.53335L3.44147 6.95808L2.20667 8.68668C2.3 9.46668 2.54 10.2 2.90667 10.8533L4.9974 11.4287L6.01333 10.0333L5.97993 9.94668ZM10.4466 2.70001L8.41327 3.27721V5.19328L8.4866 5.23995L10.4733 6.67995L10.5466 6.73328L12.2866 6.16195V4.04001C11.7666 3.48001 11.1399 3.02668 10.4466 2.70001ZM12.5457 6.97061L10.8 7.52668L10.7733 7.61335L10.0133 9.94001L9.98667 10.0267L11.0251 11.453L13.0933 10.8467C13.46 10.1933 13.7067 9.46668 13.8 8.68668L12.5457 6.97061ZM9.31327 10.52H6.68667L5.64247 11.9541L6.86667 13.7267C7.23333 13.8 7.61333 13.8333 8 13.8333C8.39333 13.8333 8.77333 13.8 9.14 13.7267V13.72L10.3385 11.9279L9.31327 10.52Z"/><path fill="${c}" d="M9.12966 1.42639C4.56932 0.676388 0.676388 4.56932 1.42639 9.12966C1.88059 11.8917 4.10826 14.1193 6.87032 14.5736C11.4307 15.3236 15.3236 11.4307 14.5736 6.87032C14.1194 4.10832 11.8917 1.88066 9.12966 1.42639ZM8.41332 3.27719L10.4467 2.69999C11.14 3.02666 11.7667 3.47999 12.2867 4.03999V6.16192L10.5467 6.73326L10.4733 6.67992L8.48666 5.23992L8.41332 5.19325V3.27719ZM5.55999 2.69999L7.58666 3.29072V5.19332L7.51332 5.23999L5.53332 6.67999L5.45999 6.73332L3.65499 6.14499L3.71999 4.03999C4.23332 3.47999 4.85999 3.02666 5.55999 2.69999ZM4.99739 11.4287L2.90666 10.8533C2.53999 10.2 2.29999 9.46666 2.20665 8.68666L3.44146 6.95806L5.19332 7.53332L5.22666 7.61999L5.97992 9.94666L6.01326 10.0333L4.99739 11.4287ZM9.13999 13.72V13.7267C8.77332 13.8 8.39332 13.8333 7.99999 13.8333C7.61332 13.8333 7.23332 13.8 6.86666 13.7267L5.64246 11.9541L6.68666 10.52H9.31326L10.3384 11.9279L9.13999 13.72ZM11.0251 11.453L9.98666 10.0267L10.0133 9.93999L10.7733 7.61332L10.8 7.52666L12.5457 6.97059L13.8 8.68666C13.7067 9.46666 13.46 10.1933 13.0933 10.8467L11.0251 11.453Z"/></svg>`,
        ownGoal: ()=>ICON_SVG.goal(RED),
        // referee-card.svg (red) / referee-card-1.svg (orange) — identical card shape, different fill.
        yellowCard: c=>`<svg viewBox="0 0 16 16"><path fill="${c}" d="M6.84696 1.49645L12.6425 3.04936C13.3538 3.23995 13.7759 3.97107 13.5853 4.68235L11.1697 13.6977C10.9791 14.409 10.248 14.8311 9.53669 14.6405L3.74114 13.0876C3.02985 12.897 2.60774 12.1659 2.79833 11.4546L5.21397 2.43926C5.40456 1.72797 6.13568 1.30586 6.84696 1.49645Z"/></svg>`,
        redCard: ()=>ICON_SVG.yellowCard(RED),
        // 2ndyellowcard.svg — card shape clipped, diagonal red/orange split.
        secondYellow: ()=>`<svg viewBox="0 0 16 16"><path d="M2.84271 12.4889L13.333 3.64254C13.5074 3.93962 13.5673 4.30371 13.4712 4.66276L11.0555 13.6781C10.8649 14.3893 10.1338 14.8115 9.4225 14.6209L3.62694 13.0679C3.28839 12.9773 3.01535 12.7641 2.84271 12.4889Z" fill="${ORANGE}"/><path d="M13.333 3.64254C13.1619 3.35109 12.8806 3.12415 12.5284 3.02977L6.73284 1.47685C6.02156 1.28627 5.29044 1.70837 5.09985 2.41966L2.68421 11.4349C2.58433 11.8077 2.65263 12.1859 2.84271 12.4889L13.333 3.64254Z" fill="${RED}"/></svg>`,
        // corners.svg — corner flag pennant.
        corner: c=>`<svg viewBox="0 0 16 16"><path fill="${c}" d="M6.3916 2.18891L12.7495 5.25513L6.3916 8.32257V14.5245H5.33331V1.33337H6.3916V2.18891Z"/></svg>`,
        // substitution.svg — solid up/down arrow shapes (not stroked lines).
        substitution: ()=>`<svg viewBox="0 0 16 16"><path fill="${GREEN}" d="M8.51159 5.35764C8.05606 5.35764 7.83339 4.78427 8.14719 4.4551L10.9713 1.49265C11.1737 1.28028 11.4875 1.28028 11.69 1.49265L14.5141 4.4551C14.838 4.78427 14.6153 5.35764 14.1598 5.35764H12.3479V9.60491C12.3479 10.1889 11.8924 10.6667 11.3357 10.6667C10.779 10.6667 10.3235 10.1889 10.3235 9.60491V5.35764H8.51159Z"/><path fill="${RED}" d="M7.48772 10.6424C7.94325 10.6424 8.16592 11.2158 7.85212 11.545L5.02802 14.5074C4.82557 14.7198 4.51179 14.7198 4.30934 14.5074L1.48524 11.545C1.16132 11.2158 1.38402 10.6424 1.83952 10.6424H3.6514V6.3952C3.6514 5.81119 4.10689 5.33338 4.66362 5.33338C5.22034 5.33338 5.67585 5.81119 5.67585 6.3952V10.6424H7.48772Z"/></svg>`,
        // penaltyscored.svg — camera glyph (lens) PLUS the same outer frame path as penaltyMissed,
        // just colored to match (grey), so both variants share identical visual size/weight.
        penaltyScored: c=>`<svg viewBox="0 0 16 16"><path fill="#fff" d="M6.77998 6.68357C6.42998 6.84691 6.11661 7.07357 5.85998 7.35357L5.82748 8.40607L6.72998 8.70024L7.75665 7.95357L7.79331 7.93024V6.97894L6.77998 6.68357ZM6.98995 10.3069L6.61331 9.14357L6.59665 9.10024L5.72071 8.8126L5.10332 9.6769C5.14998 10.0669 5.26998 10.4336 5.45331 10.7602L6.49868 11.0479L7.00665 10.3502L6.98995 10.3069ZM9.22328 6.68357L8.20661 6.97217V7.9302L8.24328 7.95354L9.23661 8.67354L9.27328 8.7002L10.1433 8.41454V7.35357C9.88328 7.07357 9.56994 6.84691 9.22328 6.68357ZM10.2728 8.81887L9.39998 9.0969L9.38664 9.14024L9.00664 10.3036L8.99331 10.3469L9.51254 11.0601L10.5466 10.7569C10.73 10.4302 10.8533 10.0669 10.9 9.6769L10.2728 8.81887ZM8.65661 10.5936H7.34331L6.82121 11.3106L7.43331 12.1969C7.61665 12.2336 7.80664 12.2502 7.99998 12.2502C8.19664 12.2502 8.38664 12.2336 8.56998 12.1969V12.1936L9.16921 11.2975L8.65661 10.5936Z"/><path fill="${c}" d="M8.56481 6.04652C6.28465 5.67152 4.33818 7.61798 4.71318 9.89815C4.94028 11.2791 6.05412 12.393 7.43515 12.6201C9.71534 12.9951 11.6618 11.0487 11.2868 8.76848C11.0597 7.38748 9.94584 6.27365 8.56481 6.04652ZM8.20661 6.97217L9.22328 6.68357C9.56994 6.84691 9.88328 7.07357 10.1433 7.35357V8.41454L9.27328 8.7002L9.23661 8.67354L8.24328 7.95354L8.20661 7.9302V6.97217ZM6.77998 6.68357L7.79331 6.97894V7.93024L7.75665 7.95357L6.72998 8.70024L5.82748 8.40607L5.85998 7.35357C6.11661 7.07357 6.42998 6.84691 6.77998 6.68357ZM6.49868 11.0479L5.45331 10.7602C5.26998 10.4336 5.14998 10.0669 5.10332 9.6769L5.72071 8.8126L6.59665 9.10024L6.61331 9.14357L6.98995 10.3069L7.00665 10.3502L6.49868 11.0479ZM8.56998 12.1936V12.1969C8.38664 12.2336 8.19664 12.2502 7.99998 12.2502C7.80664 12.2502 7.61665 12.2336 7.43331 12.1969L6.82121 11.3106L7.34331 10.5936H8.65661L9.16921 11.2975L8.56998 12.1936ZM9.51254 11.0601L8.99331 10.3469L9.00664 10.3036L9.38664 9.14024L9.39998 9.0969L10.2728 8.81887L10.9 9.6769C10.8533 10.0669 10.73 10.4302 10.5466 10.7569L9.51254 11.0601Z"/><path fill="${c}" d="M3.33331 4.66665C2.96458 4.66665 2.66665 4.96458 2.66665 5.33331V12C2.66665 12.3687 2.36871 12.6666 1.99998 12.6666C1.63125 12.6666 1.33331 12.3687 1.33331 12V5.33331C1.33331 4.22918 2.22918 3.33331 3.33331 3.33331H12.6666C13.7708 3.33331 14.6666 4.22918 14.6666 5.33331V12C14.6666 12.3687 14.3687 12.6666 14 12.6666C13.6312 12.6666 13.3333 12.3687 13.3333 12V5.33331C13.3333 4.96458 13.0354 4.66665 12.6666 4.66665H3.33331Z"/></svg>`,
        // penaltymissed.svg — same camera glyph PLUS viewfinder corner-bracket frame, both red.
        penaltyMissed: ()=>`<svg viewBox="0 0 16 16"><path fill="#fff" d="M6.77998 6.68357C6.42998 6.84691 6.11661 7.07357 5.85998 7.35357L5.82748 8.40607L6.72998 8.70024L7.75665 7.95357L7.79331 7.93024V6.97894L6.77998 6.68357ZM6.98995 10.3069L6.61331 9.14357L6.59665 9.10024L5.72071 8.8126L5.10332 9.6769C5.14998 10.0669 5.26998 10.4336 5.45331 10.7602L6.49868 11.0479L7.00665 10.3502L6.98995 10.3069ZM9.22328 6.68357L8.20661 6.97217V7.9302L8.24328 7.95354L9.23661 8.67354L9.27328 8.7002L10.1433 8.41454V7.35357C9.88328 7.07357 9.56994 6.84691 9.22328 6.68357ZM10.2728 8.81887L9.39998 9.0969L9.38664 9.14024L9.00664 10.3036L8.99331 10.3469L9.51254 11.0601L10.5466 10.7569C10.73 10.4302 10.8533 10.0669 10.9 9.6769L10.2728 8.81887ZM8.65661 10.5936H7.34331L6.82121 11.3106L7.43331 12.1969C7.61665 12.2336 7.80664 12.2502 7.99998 12.2502C8.19664 12.2502 8.38664 12.2336 8.56998 12.1969V12.1936L9.16921 11.2975L8.65661 10.5936Z"/><path fill="${RED}" d="M8.56481 6.04652C6.28465 5.67152 4.33818 7.61798 4.71318 9.89815C4.94028 11.2791 6.05412 12.393 7.43515 12.6201C9.71534 12.9951 11.6618 11.0487 11.2868 8.76848C11.0597 7.38748 9.94584 6.27365 8.56481 6.04652ZM8.20661 6.97217L9.22328 6.68357C9.56994 6.84691 9.88328 7.07357 10.1433 7.35357V8.41454L9.27328 8.7002L9.23661 8.67354L8.24328 7.95354L8.20661 7.9302V6.97217ZM6.77998 6.68357L7.79331 6.97894V7.93024L7.75665 7.95357L6.72998 8.70024L5.82748 8.40607L5.85998 7.35357C6.11661 7.07357 6.42998 6.84691 6.77998 6.68357ZM6.49868 11.0479L5.45331 10.7602C5.26998 10.4336 5.14998 10.0669 5.10332 9.6769L5.72071 8.8126L6.59665 9.10024L6.61331 9.14357L6.98995 10.3069L7.00665 10.3502L6.49868 11.0479ZM8.56998 12.1936V12.1969C8.38664 12.2336 8.19664 12.2502 7.99998 12.2502C7.80664 12.2502 7.61665 12.2336 7.43331 12.1969L6.82121 11.3106L7.34331 10.5936H8.65661L9.16921 11.2975L8.56998 12.1936ZM9.51254 11.0601L8.99331 10.3469L9.00664 10.3036L9.38664 9.14024L9.39998 9.0969L10.2728 8.81887L10.9 9.6769C10.8533 10.0669 10.73 10.4302 10.5466 10.7569L9.51254 11.0601Z"/><path fill="${RED}" d="M3.33331 4.66665C2.96458 4.66665 2.66665 4.96458 2.66665 5.33331V12C2.66665 12.3687 2.36871 12.6666 1.99998 12.6666C1.63125 12.6666 1.33331 12.3687 1.33331 12V5.33331C1.33331 4.22918 2.22918 3.33331 3.33331 3.33331H12.6666C13.7708 3.33331 14.6666 4.22918 14.6666 5.33331V12C14.6666 12.3687 14.3687 12.6666 14 12.6666C13.6312 12.6666 13.3333 12.3687 13.3333 12V5.33331C13.3333 4.96458 13.0354 4.66665 12.6666 4.66665H3.33331Z"/></svg>`,
        // whistle.svg — referee whistle, reused for "Penalty" (awarded, undecided) and full-width Kick off band.
        penaltyAwarded: c=>`<svg viewBox="0 0 16 16"><path fill="${c}" d="M6.18954 8.47146C6.42546 8.36596 6.69485 8.36075 6.93824 8.45714C7.18167 8.55356 7.37932 8.74384 7.48772 8.98579C7.59608 9.22782 7.60659 9.5023 7.51636 9.74816C7.42613 9.99398 7.24253 10.1913 7.0066 10.297C6.77059 10.4026 6.50077 10.4078 6.25725 10.3113C6.01389 10.2148 5.81609 10.0246 5.70777 9.78266C5.59952 9.54069 5.58959 9.26671 5.67978 9.02094C5.77003 8.77506 5.95353 8.57712 6.18954 8.47146Z"/><path fill="${c}" fill-rule="evenodd" clip-rule="evenodd" d="M4.96363 5.73383C5.82747 5.34713 6.8007 5.26947 7.726 5.51704L14.991 7.45258L14.0164 10.4454L10.448 10.1948C10.2199 11.4152 9.43183 12.4983 8.23251 13.0353C6.26734 13.9151 3.94085 12.9935 3.0385 10.978C2.8376 10.5292 2.72415 10.0619 2.69084 9.59972C2.14567 9.65436 1.59738 9.34986 1.35556 8.81C1.05508 8.13883 1.34248 7.35434 1.99683 7.06131C2.43066 6.86709 2.91581 6.93606 3.28264 7.19868C3.67483 6.57343 4.2443 6.05587 4.96363 5.73383ZM7.49358 6.47928C6.78372 6.29047 6.03545 6.3495 5.37183 6.64659C3.89814 7.30653 3.25175 9.06795 3.92847 10.5795C4.60524 12.0912 6.34978 12.7823 7.82366 12.1225C8.72282 11.72 9.3148 10.9094 9.48642 9.99034L9.64397 9.13943L13.3217 9.40115L13.7312 8.14269L10.2156 7.20519L10.1349 7.58149L10.0313 8.06651L9.07431 7.83735L9.17782 7.35297L9.26311 6.95193L7.49358 6.47928ZM2.83863 8.14594C2.76373 7.97863 2.56882 7.90107 2.40569 7.97407C2.24254 8.04711 2.17062 8.24424 2.24553 8.41157C2.32049 8.57863 2.51481 8.65559 2.67782 8.58279C2.70749 8.56951 2.73405 8.55319 2.7566 8.53396L2.7553 8.53201C2.78032 8.40899 2.8121 8.28546 2.84709 8.16482C2.84457 8.15918 2.84117 8.15163 2.83863 8.14594Z"/><path fill="${c}" d="M11.0704 2.67068C11.2439 2.50935 11.5083 2.49335 11.7006 2.63032L11.741 2.66157C11.9483 2.84386 11.9683 3.16003 11.7865 3.3673L10.6069 4.71235C10.4247 4.9196 10.1091 4.94007 9.90178 4.75857C9.69481 4.57692 9.67291 4.2608 9.85491 4.05284L11.0346 2.70779L11.0704 2.67068Z"/><path fill="${c}" d="M9.08147 1.93631C9.13541 1.66548 9.39876 1.49001 9.66936 1.54373L9.71884 1.5561C9.96118 1.6304 10.1125 1.87769 10.0619 2.13162L9.67196 4.09321C9.6214 4.34708 9.38646 4.51707 9.1342 4.49295L9.08342 4.48579C8.81299 4.43169 8.63697 4.16867 8.69084 3.8979L9.08147 1.93631Z"/><path fill="${c}" d="M7.40634 1.76248C7.65608 1.72086 7.90231 1.87448 7.97079 2.12381L8.44215 3.84972C8.51481 4.11531 8.35946 4.39028 8.09319 4.46365C7.82691 4.53644 7.55086 4.37965 7.47795 4.11339L7.00595 2.38878C6.93336 2.12352 7.08897 1.84745 7.35621 1.7742L7.40634 1.76248Z"/></svg>`,
        varReviewStart: c=>`<svg viewBox="0 0 16 16"><rect x="2.5" y="3" width="11" height="7.5" rx="1" fill="none" stroke="${c}" stroke-width="1.3"/><line x1="6" y1="13" x2="10" y2="13" stroke="${c}" stroke-width="1.3" stroke-linecap="round"/><line x1="8" y1="10.5" x2="8" y2="13" stroke="${c}" stroke-width="1.3"/></svg>`,
        varReviewEnd: c=>ICON_SVG.varReviewStart(c),
        injuryTime: c=>`<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="${c}" stroke-width="1.3"/><path d="M8 4.8V8l2.3 1.4" stroke="${c}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
        kickOff: c=>ICON_SVG.penaltyAwarded(c),
      };
      const ICON_COLOR = {goal:GREY,ownGoal:RED,yellowCard:ORANGE,secondYellow:null,redCard:RED,corner:RED,substitution:null,penaltyScored:GREY,penaltyMissed:null,penaltyAwarded:GREY,varReviewStart:GREY,varReviewEnd:GREY,injuryTime:RED,kickOff:GREY};
      const iconHtml = t => ICON_SVG[t] ? ICON_SVG[t](ICON_COLOR[t]) : '';
      const LABEL={goal:'Goal',ownGoal:'Own goal',yellowCard:'Yellow card',secondYellow:'2nd yellow card',redCard:'Red card',corner:'Corner',substitution:'Substitution',penaltyScored:'Penalty scored',penaltyMissed:'Penalty missed',penaltyAwarded:'Penalty',varReviewStart:'VAR review starts',varReviewEnd:'VAR review ends'};
      let hDots='';
      // Per the "Overlap requirements for incident timeline" spec (Timeline - FE Confluence)
      // and SBEUJE-6150 AC: two+ incidents at the exact same minute (normal time) or same
      // added-minute (injury time) that land on the same horizontal slot AND the same team
      // side must be ranked "one above the other" (stacked vertically) instead of drawn
      // exactly on top of each other. SBEUJE-6150 caps this at "2 stacks of 3 incidents per
      // team" — once a 4th incident lands in the SAME side+minute slot, a new stacking
      // "column" starts, shifted left of the original slot ("when the 6th card arrives, the
      // whole group will move to the left to make space") instead of piling indefinitely
      // upward into the filter chips row above the track.
      const MAX_STACK=3, STACK_COL_SHIFT=3;
      const dotSpecs=hItems.map(it=>{
        const min=it.minute||0, added=it.addedMinute||0;
        // Own goals stay on the side of the team whose player committed them (item.team,
        // no flip) — per the Figma "name needs 2 lines" full-match reference, an own goal
        // row/dot renders on the SCORING PLAYER's own team side; only the score digit that
        // gets bolded is flipped to the benefiting team (see isHome comment below).
        const top=it.team==='home';
        let dp, timeKey;
        if(min===PD&&added>0){dp=inj1Map.get(it);timeKey='inj1-'+added;}
        else if(min===PD*2&&added>0){dp=inj2Map.get(it);timeKey='inj2-'+added;}
        else if(min<=PD){dp=(Math.min(min,PD)/PD)*normalW1;timeKey='n-'+min;}
        else{dp=50+(Math.min(min-PD,PD)/PD)*normalW2;timeKey='n-'+min;}
        return {it,dp,top,groupKey:timeKey+'|'+(top?'top':'bottom')};
      });
      const stackRank=new Map();
      for(const spec of dotSpecs){
        const seq=(stackRank.get(spec.groupKey)||0);
        stackRank.set(spec.groupKey,seq+1);
        // Every MAX_STACK-th incident in the same side+minute slot starts a new column,
        // shifted left, instead of continuing to stack past the design's committed max.
        spec.col=Math.floor(seq/MAX_STACK);
        spec.rank=seq%MAX_STACK;
      }
      for(const {it,dp,top,rank,col} of dotSpecs){
        const offsetPx=8+rank*13;
        const dpShifted=Math.max(0,Math.min(100,dp-col*STACK_COL_SHIFT));
        hDots+=`<div class="tl-hbar-dot" style="left:${dpShifted}%;top:calc(50% ${top?'- '+offsetPx+'px':'+ '+offsetPx+'px'})">${iconHtml(it.type)}</div>`;
      }
      const sorted=[...items].reverse();
      const visible=filter==='all'?sorted:filter==='goals'?sorted.filter(i=>PHASES.includes(i.type)||GOALS.includes(i.type)):filter==='cards'?sorted.filter(i=>PHASES.includes(i.type)||CARDS.includes(i.type)):filter==='corners'?sorted.filter(i=>PHASES.includes(i.type)||i.type==='corner'):sorted;
      let rows='';
      // Half time/Match ends scorelines are derived LIVE from the actual goal incidents
      // instead of trusting the phase incident's own hand-typed scoreText field — this
      // way test data stays internally consistent even when a goal is injected/edited
      // after a fullTime incident already exists (a scenario that can't happen for real,
      // but looked broken in QA when the vertical timeline showed a newer score while
      // "Match ends" still showed a stale one). Half time only counts goals up to its own
      // minute; Match ends always reflects the single latest goal, whenever it was added.
      const scoreEvents=items.filter(i=>i.score).slice().sort((a,b)=>(a.minute||0)-(b.minute||0)||(a.addedMinute||0)-(b.addedMinute||0));
      function tlScoreAsOf(minuteLimit,useLatest){
        if(useLatest) return scoreEvents.length?scoreEvents[scoreEvents.length-1].score:null;
        let last=null;
        for(const e of scoreEvents){ if((e.minute||0)<=minuteLimit) last=e.score; else break; }
        return last;
      }
      // Per the "VAR incident without team data" Figma case: a VAR review start/end that
      // has no associated team renders as a full-width phase band ("VAR review started –
      // 68'"), not as a normal left/right row — unlike a VAR review WITH team data, which
      // keeps the regular row treatment (icon + "VAR review starts/ends" label on its side).
      const isNoTeamVarBand = it => (it.type==='varReviewStart'||it.type==='varReviewEnd') && !it.team;
      for(const item of visible){
        if(PHASES.includes(item.type) || isNoTeamVarBand(item)){
          const home=window._tlHomeTeam||'Home', away=window._tlAwayTeam||'Away';
          let icon='', txt='', scoreRow='';
          const minTxt=`${item.minute||''}${item.addedMinute?'+'+item.addedMinute:''}`;
          if(item.type==='kickOff'){txt='Kick off';}
          else if(item.type==='halfTime'){txt='Half time';const sc=tlScoreAsOf(item.minute||0,false)||item.scoreText;if(sc)scoreRow=`<div class="tl-phase-scoreline"><span class="tl-phase-team tl-home-team">${home}</span><span class="tl-phase-score">${sc.replace('-',' - ')}</span><span class="tl-phase-team tl-away-team">${away}</span></div>`;}
          else if(item.type==='secondHalfStart'){txt='Start of 2nd half time';}
          else if(item.type==='fullTime'){txt='Match ends';const sc=tlScoreAsOf(null,true)||item.scoreText;if(sc)scoreRow=`<div class="tl-phase-scoreline"><span class="tl-phase-team tl-home-team">${home}</span><span class="tl-phase-score">${sc.replace('-',' - ')}</span><span class="tl-phase-team tl-away-team">${away}</span></div>`;}
          else if(item.type==='injuryTime'){txt=`Injury time – ${item.extraMinutes||'?'} min added`;}
          else if(item.type==='varReviewStart'){txt=`VAR review started – <span class="tl-phase-minute">${minTxt}'</span>`;}
          else if(item.type==='varReviewEnd'){txt=`VAR review ended – <span class="tl-phase-minute">${minTxt}'</span>`;}
          const iconWrap=icon?`<span class="tl-phase-icon">${icon}</span>`:'';
          const titleClass=scoreRow?'tl-phase tl-phase-title':'tl-phase';
          rows+=`<div class="tl-phase-group"><div class="${titleClass}">${iconWrap}${txt}</div>${scoreRow}</div>`;
        }
        else{
          // Own goal ROW stays on the side of the team whose player committed it (per the
          // Figma "name needs 2 lines" full-match reference: Cody Gakpo's own goal renders
          // on Liverpool/home's column even though it benefits the away team) — isHome is
          // simply item.team here, no flip. Only the score digit that gets bolded flips to
          // the benefiting side (see scoringSide below).
          const isHome=item.team==='home';
          const icon=`<div class="tl-icon">${iconHtml(item.type)}</div>`;
          let body=`<div class="tl-inc-label">${LABEL[item.type]||item.type}</div>`;
          if(item.type==='substitution'){body+=`<div class="tl-sub-list"><span class="tl-sub-in"><span class="tl-sub-arrow">↑</span> ${item.playerIn||'—'}</span><span class="tl-sub-out"><span class="tl-sub-arrow">↓</span> ${item.playerOut||'—'}</span></div>`;}
          else{
            if(item.player)body+=`<div class="tl-player">${item.player}</div>`;
            if(item.assist)body+=`<div class="tl-assist">(Assist: ${item.assist})</div>`;
            if(item.score){
              const sp=String(item.score).split('-').map(s=>s.trim()), h=sp[0]||'', a=sp[1]||'';
              // Own goals credit (and bold) the BENEFITING team's score digit — the
              // opposite of isHome/item.team — while every other incident type bolds
              // the digit matching isHome.
              const scoringSide=item.type==='ownGoal'?(isHome?'away':'home'):(isHome?'home':'away');
              body+=`<div class="tl-score"><span style="font-weight:${scoringSide==='home'?800:600}">${h}</span> - <span style="font-weight:${scoringSide==='away'?800:600}">${a}</span></div>`;
            }
          }
          const content=`<div class="tl-content">${body}</div>`;
          const minuteTxt=`${item.minute||''}${item.addedMinute?'+'+item.addedMinute:''}`;
          const minute=`<div class="tl-minute">${minuteTxt}'</div>`;
          const homeSide=`<div class="tl-side tl-home">${isHome?content+icon:''}</div>`;
          const awaySide=`<div class="tl-side tl-away">${!isHome?icon+content:''}</div>`;
          rows+=`<div class="tl-row">${homeSide}${minute}${awaySide}</div>`;
        }
      }
      if(!rows)rows='<div style="text-align:center;color:#999;padding:24px;font-size:13px">No incidents yet</div>';
      // Per the "dev ready" Figma export (zip 23): filter pills are plain text (no icons),
      // solid orange fill when active, outlined grey pill otherwise.
      const chips=`<div class="tl-chips"><button class="tl-chip${filter==='all'?' tl-active':''}" onclick="window.tlSetFilter('all')">All</button>${hasGoals?`<button class="tl-chip${filter==='goals'?' tl-active':''}" onclick="window.tlSetFilter('goals')">Goals</button>`:''}${hasCards?`<button class="tl-chip${filter==='cards'?' tl-active':''}" onclick="window.tlSetFilter('cards')">Cards</button>`:''}${hasCorners?`<button class="tl-chip${filter==='corners'?' tl-active':''}" onclick="window.tlSetFilter('corners')">Corners</button>`:''}</div>`;
      // Per the "dev ready" Figma export (zip 23): no separate Home/Away/TIMELINE header row on
      // the desktop widget — the incident list starts right after the horizontal progress bar.
      p.innerHTML=`${chips}<div class="tl-hbar-wrap"><div class="tl-hbar-track"><div class="tl-hbar-progress" style="left:0;width:${pct1}%"></div><div class="tl-hbar-progress" style="left:50%;width:${pct2}%"></div>${knobPct!=null?`<div class="tl-hbar-knob" style="left:${knobPct}%"></div>`:''}<div class="tl-hbar-markers">${hDots}</div>${items.length?`<div class="tl-hbar-time">${curMinDisplay}:00</div>`:''}</div></div><div class="tl-list">${rows}</div><div class="tl-disclaimer">The score displayed and further information (e.g. time, scorer) is for reference only. We do not guarantee the accuracy of this information.</div>`;
    };
  }
})();/**
 * Timeline QA Tool v2 — Injectable bookmarklet (mode toggle edition)
 * Two modes (both are our OWN mock renderer — see IMPORTANT note below):
 *  - Data only: same mock tab/panel as Demo, but skips our demo CSS injection
 *  - Demo:      full mock tab+panel+CSS injection — shows how Timeline should look
 *
 * IMPORTANT — this tool is NOT wired to the real deployed Timeline feature:
 * the real Angular component is `sbb2b-match-timeline-container`
 * (libs/betting/match-timeline/src/match-timeline/match-timeline.container.ts),
 * currently still using MOCK_FOOTBALL_TIMELINE_DATA (real store wiring not yet built).
 *
 * CONFIRMED real domain contract (SBEUJE-6121, merged PR #20266, "SDK ticket, no
 * UI-reflected changes" — nothing to click-test in browser for that ticket):
 *   Input:  EventStatistic (libs/betting/ngx.sportsbook/.../game-statistic.model.ts)
 *     { reference, relReference?, eventPeriodId, minute, second, participantId,
 *       participantUsage: ParticipantUsage, gameResultTypeName, gameResultTypeId,
 *       gameResultValue: string /* raw passthrough, e.g. score "1-0" or injury mins "4" *\/,
 *       status: EventStatisticStatus }
 *   Pure mapper: TimelineUtil.mapEventStatisticsToTimeline(stats, schema): TimelineItem[]
 *     (libs/betting/match-timeline/src/util/timeline.util.ts) — filters to schema-mapped +
 *     Active/non-cancelled stats, groups children by relReference, sorts by minute/second.
 *   Output: TimelineItem
 *     { id, relReference?, minute, second, eventPeriodId, type, team: 'home'|'away',
 *       label, iconKey, gameResultTypeId, gameResultValue, children: TimelineItem[] }
 *   NOTE: no separate playerName/assistName/cardType metadata fields exist in the shipped
 *   model — assist/sub relationships are nested TimelineItem `children` via relReference,
 *   and card type / player name are expected to live in the raw `gameResultValue` passthrough.
 *   Our tool's mock incidents (flat player/assist/addedMinute fields) intentionally do NOT
 *   match this shape yet — this is a known gap to close once the consuming UI/selector
 *   tickets (SBEUJE-6123 selector, SBEUJE-6552/6592 components) are deployed and the real
 *   data flow can be observed end-to-end.
 *
 * CONFIRMED real vertical-timeline structure (SBEUJE-6552/6592, merged PR #20266,
 * libs/betting/match-timeline/src/vertical-timeline/): generic obg-vertical-timeline
 * component with a center spine line; each incident has direction: 'left'|'right'|'full'
 * (left≈home, right≈away, full spans across — e.g. Kick Off/Half Time/Match Ends/VAR/
 * Injury Time notices). This matches our tool's existing home-left/away-right/phase-full
 * layout conceptually. Per-incident component contract (FootballTimelineIncidentData):
 *   { time, direction, icon, title, oldScore?, newScore?: {isHighlighted?,goal}, player?,
 *     assist?, substitute?: {in,out}, message?: {messageTitle, teamHome, teamAway, notify?:
 *     {text, suffix?}}, review?: {reason} }
 * Confirmed exact rendering conventions applied to our mock (v0.1.20):
 *   - Assist shown as "(Assist: Name)", not a bullet-prefixed line.
 *   - Substitution always shows OUT player first with ↑, then IN player with ↓ (fixed order,
 *     not team/side dependent) — our tool previously had this reversed.
 *   - Notify-type phase text uses a plain hyphen separator, e.g. "Injury Time - 3 min added",
 *     "Kick Off" (capitalized), matching MOCK_FOOTBALL_TIMELINE_DATA in
 *     football-timeline-temp-metadata.mock.ts exactly.
 * Per that mock file's own header comment: "temporary mock data... to be used before real
 * data is available... will be removed once real data is integrated" — i.e. even the real
 * component ships with hardcoded mock data today, reinforcing that end-to-end real-data
 * testing isn't possible yet for any of these tickets (SBEUJE-6552/6592/6120/6118 dev
 * comments all independently confirm this: "no real data integration yet").
 *
 * Injecting this tool never touches or overrides the real component's DOM/CSS/data; it
 * only ever renders through our own `_tqInstallTlRender`. The inject button refuses to run
 * (with a warning) if `sbb2b-match-timeline-container` is already present on the page, so this
 * mock can't be mistaken for — or run alongside — the real feature once it's deployed.
 * Inject via evaluate_script (DevTools MCP) on any Betsson live event page.
 */
(function () {
  const TL_TOOL_VERSION = 'v0.1.36';
  window._tlToolVersion = TL_TOOL_VERSION;
  if (document.getElementById('tl-qa-panel')) {
    var ep = document.getElementById('tl-qa-panel');
    const opening = ep.style.display === 'none';
    ep.style.display = opening ? 'flex' : 'none';
    try { localStorage.setItem('tlQaOpen', opening ? '1' : '0'); } catch (e) {}
    // Re-detect the live incidentsTimeline.enabled value every time the panel is
    // reopened (not just on first injection), since the host page's config may only
    // have finished loading after our first init, or may have changed since.
    if (opening && typeof window._tlSyncFeatureFlag === 'function') window._tlSyncFeatureFlag();
    if (opening && typeof window._tlSyncObgRtStatus === 'function') window._tlSyncObgRtStatus();
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
    #tl-qa-header-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    #tl-qa-header-title { display: flex; align-items: baseline; gap: 6px; }
    #tl-qa-header span { font-weight: 700; font-size: 13px; color: #ff6600; }
    #tl-qa-version { font-weight: 600; font-size: 10px; color: #888; }
    #tl-qa-email { font-size: 10px; color: #888; text-decoration: none; }
    #tl-qa-email:hover { color: #ff6600; text-decoration: underline; }
    #tl-qa-close {
      background: none; border: none; color: #888; cursor: pointer;
      font-size: 16px; padding: 0 4px; line-height: 1;
    }
    #tl-qa-close:hover { color: #fff; }
    #tl-qa-minimize {
      background: none; border: none; color: #888; cursor: pointer;
      font-size: 14px; padding: 0 4px; line-height: 1; transition: transform .15s;
    }
    #tl-qa-minimize:hover { color: #fff; }
    #tl-qa-panel.tl-minimized #tl-qa-body { display: none; }
    #tl-qa-body { padding: 12px; display: flex; flex-direction: column; gap: 8px; }
    .tl-qa-section-header {
      display: flex; align-items: center; justify-content: space-between; cursor: pointer;
    }
    .tl-qa-section-header .tl-qa-label { margin-bottom: 0; }
    .tl-qa-collapse-btn {
      background: none; border: none; color: #888; cursor: pointer;
      font-size: 11px; padding: 2px 4px; line-height: 1; transition: transform .15s;
    }
    .tl-qa-collapse-btn:hover { color: #fff; }
    .tl-qa-section-body { display: flex; flex-direction: column; gap: 8px; margin-top: 6px; }
    .tl-qa-section.tl-qa-collapsed .tl-qa-collapse-btn { transform: rotate(-90deg); }
    .tl-qa-section.tl-qa-collapsed .tl-qa-section-body { display: none; }
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
    .tl-qa-btn.unsaved { background: #ff6600; color: #fff; }
    .tl-qa-btn.unsaved:hover { background: #ff7a1f; }
    .tl-qa-btn:disabled, .tl-qa-btn.disabled {
      background: #2a2a3a; color: #666; cursor: not-allowed; opacity: .6;
    }
    .tl-qa-btn:disabled:hover, .tl-qa-btn.disabled:hover { background: #2a2a3a; }
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
    #tl-qa-inc-list { max-height: 160px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
    .tl-qa-inc-row { display: flex; align-items: center; justify-content: space-between; gap: 6px; padding: 4px 8px; background: #24243a; border-radius: 4px; font-size: 11px; }
    .tl-qa-inc-row-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
    .tl-qa-inc-remove { background: none; border: none; color: #f5a0a0; cursor: pointer; font-size: 14px; line-height: 1; padding: 0 4px; flex: none; }
    .tl-qa-inc-remove:hover { color: #fff; }
    .tl-qa-inc-cancel, .tl-qa-inc-restore { background: none; border: none; color: #ffb066; cursor: pointer; font-size: 13px; line-height: 1; padding: 0 4px; flex: none; }
    .tl-qa-inc-cancel:hover, .tl-qa-inc-restore:hover { color: #fff; }
    .tl-qa-inc-cancelled-tag { color: #ffb066; font-size: 10px; font-weight: 600; text-transform: uppercase; }
    .tl-qa-inc-empty { font-size: 11px; color: #666; text-align: center; padding: 6px; }
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
      <div id="tl-qa-header-info">
        <div id="tl-qa-header-title"><span>⏱ Timeline QA</span><span id="tl-qa-version">${TL_TOOL_VERSION}</span></div>
        <a id="tl-qa-email" href="mailto:balazs.szonyi@betssongroup.com">balazs.szonyi@betssongroup.com</a>
      </div>
      <button id="tl-qa-minimize" title="Collapse tool to header only">▾</button>
      <button id="tl-qa-close" title="Close tool">✕</button>
    </div>
    <div id="tl-qa-body">

      <div class="tl-qa-section" data-section="feature">
        <div class="tl-qa-section-header"><span class="tl-qa-label">Feature flag</span><button class="tl-qa-collapse-btn" data-target="feature">▾</button></div>
        <div class="tl-qa-section-body">
          <div class="tl-qa-row">
            <label class="tl-qa-toggle">
              <input type="checkbox" id="tl-feat-cb">
              <span style="font-size:12px" id="tl-feat-label">incidentsTimeline.disabled</span>
            </label>
            <button class="tl-qa-btn grey" id="tl-feat-apply" style="flex:none;padding:6px 10px">Apply</button>
          </div>
          <div style="font-size:10px;color:#999;padding:0 2px">In-memory only — does NOT survive a reload. The real Timeline tab (event-main-tabs.container.ts) only reads this flag once, at component construction, so a reload is needed to see it take effect there — but reload also re-fetches the actual environment value, discarding this override.</div>
          <div class="tl-qa-row">
            <button class="tl-qa-btn grey" id="tl-expose-obgrt" style="width:100%">🔓 Expose obgRt (reloads page)</button>
          </div>
          <div id="tl-obgrt-status" style="font-size:10px;padding:0 2px"></div>

          <hr class="tl-qa-sep" style="margin:8px 0">
          <div class="tl-qa-row">
            <label class="tl-qa-toggle">
              <input type="checkbox" id="tl-autoov-cb">
              <span style="font-size:12px">🔁 Auto-persist across REAL reloads</span>
            </label>
          </div>
          <div id="tl-autoov-panel" style="display:none;flex-direction:column;gap:6px">
            <div style="font-size:10px;color:#999;padding:0 2px">A bookmarklet always runs AFTER the page's own scripts, so it can never intercept a real reload by itself (browser security, not a limitation we can code around) — pick ONE helper below to make the ${''}<code>incidentsTimeline.enabled</code> value above survive every future reload automatically:</div>
            <select id="tl-autoov-mechanism" class="tl-qa-btn grey" style="width:100%;padding:6px">
              <option value="ext">🧩 Browser extension — one-time install, then fully automatic (no running process)</option>
              <option value="cdp">💻 Chrome remote-debug companion (Node) — must keep a terminal running</option>
            </select>
            <div id="tl-autoov-instructions" style="font-size:10px;color:#999;padding:0 2px;white-space:pre-line"></div>
            <div class="tl-qa-row">
              <button class="tl-qa-btn grey" id="tl-autoov-download" style="width:100%">⬇️ Download helper files</button>
            </div>
            <div id="tl-autoov-status" style="font-size:10px;padding:0 2px"></div>
          </div>
        </div>
      </div>

      <hr class="tl-qa-sep">
      <div class="tl-qa-section" data-section="mode">
        <div class="tl-qa-section-header"><span class="tl-qa-label">Injection mode</span><button class="tl-qa-collapse-btn" data-target="mode">▾</button></div>
        <div class="tl-qa-section-body">
          <div id="tl-qa-mode-row">
            <button class="tl-qa-mode-btn" id="tl-mode-data">📊 Data only</button>
            <button class="tl-qa-mode-btn demo" id="tl-mode-demo">🎨 Demo (mock UI)</button>
          </div>
          <div id="tl-qa-mode-desc">Injects incidents only — deployed code renders</div>
        </div>
      </div>

      <hr class="tl-qa-sep">
      <div class="tl-qa-section" data-section="config">
        <div class="tl-qa-section-header"><span class="tl-qa-label">Match config</span><button class="tl-qa-collapse-btn" data-target="config">▾</button></div>
        <div class="tl-qa-section-body">
          <div class="tl-qa-row">
            <input class="tl-qa-input" type="number" id="tl-period-dur" placeholder="Period length (min)" value="45" min="1" max="90" style="flex:1">
            <button class="tl-qa-btn grey" id="tl-period-apply" style="flex:none;padding:6px 10px">Apply</button>
          </div>
          <div style="font-size:11px;color:#999;padding:2px 2px 0">Per SBOF-9706/9619/9809 (Expected Period Duration), each half's length is configurable — not fixed 45' — for testing extra-time/non-standard halves.</div>
        </div>
      </div>

      <hr class="tl-qa-sep">
      <div class="tl-qa-section" data-section="actions">
        <div class="tl-qa-section-header"><span class="tl-qa-label">Actions</span><button class="tl-qa-collapse-btn" data-target="actions">▾</button></div>
        <div class="tl-qa-section-body">
          <div class="tl-qa-row">
            <button class="tl-qa-btn" id="tl-inject-btn">Inject Tab</button>
            <button class="tl-qa-btn red" id="tl-clear-btn">Clear</button>
          </div>
          <div class="tl-qa-row">
            <button class="tl-qa-btn purple" id="tl-demo-btn" style="width:100%">🎬 Load Full Demo Match</button>
          </div>
        </div>
      </div>

      <hr class="tl-qa-sep">
      <div class="tl-qa-section" data-section="add">
        <div class="tl-qa-section-header"><span class="tl-qa-label">Add incident</span><button class="tl-qa-collapse-btn" data-target="add">▾</button></div>
        <div class="tl-qa-section-body">

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
        </div>
      </div>

      <hr class="tl-qa-sep">
      <div class="tl-qa-section" data-section="list">
        <div class="tl-qa-section-header"><span class="tl-qa-label">Injected incidents</span><button class="tl-qa-collapse-btn" data-target="list">▾</button></div>
        <div class="tl-qa-section-body">
          <div id="tl-qa-inc-list"></div>
        </div>
      </div>

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

  // ── Panel state persistence (open/closed, minimized, per-section collapsed) ──────
  // The tool is a bookmarklet with no always-on host, so a real page reload (needed
  // by "Expose obgRt" below) discards the whole injected DOM/JS — there is no way to
  // truly auto-re-inject without a userscript manager. The practical compromise: we
  // remember state in localStorage (survives across reloads, same origin) and restore
  // it the next time the tester re-clicks the bookmarklet, instead of always starting
  // from a blank default.
  function tlLsGet(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : v; } catch (e) { return fallback; }
  }
  function tlLsSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }

  // Per-section accordion collapse/expand.
  let collapsedSections;
  try { collapsedSections = new Set(JSON.parse(tlLsGet('tlQaCollapsedSections', '[]'))); }
  catch (e) { collapsedSections = new Set(); }
  panel.querySelectorAll('.tl-qa-section').forEach(sec => {
    const key = sec.dataset.section;
    if (collapsedSections.has(key)) sec.classList.add('tl-qa-collapsed');
    sec.querySelector('.tl-qa-section-header').addEventListener('click', () => {
      const collapsed = sec.classList.toggle('tl-qa-collapsed');
      if (collapsed) collapsedSections.add(key); else collapsedSections.delete(key);
      tlLsSet('tlQaCollapsedSections', JSON.stringify([...collapsedSections]));
    });
  });

  // Whole-tool minimize (collapse to header only) — distinct from the ✕ close button,
  // which fully hides the panel; this keeps the header (and re-open access) visible.
  if (tlLsGet('tlQaMinimized', '0') === '1') panel.classList.add('tl-minimized');
  function tlSyncMinimizeIcon() { $('tl-qa-minimize').textContent = panel.classList.contains('tl-minimized') ? '▸' : '▾'; }
  tlSyncMinimizeIcon();
  $('tl-qa-minimize').addEventListener('click', () => {
    const minimized = panel.classList.toggle('tl-minimized');
    tlLsSet('tlQaMinimized', minimized ? '1' : '0');
    tlSyncMinimizeIcon();
  });

  // Open/closed state, restored on (re-)creation; a pending-reload flag (set right
  // before any of our own reload-triggering actions) lets us confirm to the tester
  // that state was indeed carried over once they re-click the bookmarklet.
  if (tlLsGet('tlQaOpen', '1') === '0') panel.style.display = 'none';
  if (tlLsGet('tlQaPendingReload', '0') === '1') {
    tlLsSet('tlQaPendingReload', '0');
    setTimeout(() => tlStatus('↻ Reloaded — panel state restored (re-click the bookmarklet after any further reload)'), 200);
  }

  // ── Match tab sync ───────────────────────────────────────────────────────
  // Mirrors the Sportsbook Tool's real RT-scoreboard mechanism so manually-added
  // incidents also reflect on the real "Match" tab, exactly like editing score/red
  // cards in the Sportsbook Tool does. Only Goal/OwnGoal/PenaltyScored (score),
  // RedCard (red card count), and phase changes are pushed — the real system has
  // no live-update path for yellow cards/corners/subs/VAR/penalty-awarded/missed,
  // so those intentionally do not sync (same limitation as the Sportsbook Tool).
  const GOAL_TYPES = ['goal', 'ownGoal', 'penaltyScored'];
  const PHASE_SYNC_LABELS = { kickOff: 'Kick off', halfTime: 'Half time', secondHalfStart: '2nd half', fullTime: 'Match ends' };
  function getEventIdFromPage() {
    const params = new URLSearchParams(location.search);
    return params.get('eventId') || window._tlEventId || null;
  }

  // ── Auto score tracking ─────────────────────────────────────────────────
  // Lets "Add Incident" know the running score so goal-type incidents (Goal /
  // Own Goal / Penalty Scored) auto-compute their resulting score instead of
  // requiring manual entry. Own goals credit the OPPOSITE side of the scoring
  // player's own team (matches real football scoring rules).
  function sortKey(it) { return (it.minute || 0) + (it.addedMinute || 0) / 100; }
  function scoringSideOf(incident) {
    return incident.type === 'ownGoal' ? (incident.team === 'home' ? 'away' : 'home') : incident.team;
  }
  // Inserts a new incident keeping window._tlIncidents in chronological (minute) order,
  // so backfilling an earlier-minute incident after a later one already exists still
  // renders in the correct time sequence.
  function insertChronological(list, incident) {
    const key = sortKey(incident);
    let idx = list.length;
    for (let i = 0; i < list.length; i++) {
      if (sortKey(list[i]) > key) { idx = i; break; }
    }
    list.splice(idx, 0, incident);
  }
  // Score BEFORE the given moment (strictly earlier incidents only) — used to preview
  // what a new goal-type incident's resulting score would be while filling the form.
  function computeScoreBefore(minute, addedMinute) {
    const list = window._tlIncidents || [];
    const key = (minute || 0) + (addedMinute || 0) / 100;
    let home = 0, away = 0;
    for (const it of list) {
      if (!GOAL_TYPES.includes(it.type) || sortKey(it) >= key) continue;
      if (scoringSideOf(it) === 'home') home++; else away++;
    }
    return { home, away };
  }
  // Recomputes every goal-type incident's `.score` field from scratch in chronological
  // order — keeps all score annotations correct even after a retroactive/backfilled insert.
  function recomputeAllScores() {
    const list = window._tlIncidents || [];
    let home = 0, away = 0;
    for (const it of list) {
      if (!GOAL_TYPES.includes(it.type)) continue;
      if (scoringSideOf(it) === 'home') home++; else away++;
      it.score = `${home}-${away}`;
    }
  }

  // Reads the real match's team names from the event header so the vertical-timeline
  // phase rows (Half time / Match ends) show actual team names instead of literal
  // "Home"/"Away" placeholders. `.obg-event-info-participant-label` renders exactly
  // two elements in DOM order: home team first, away team second.
  function detectTeamNames() {
    try {
      // Scoped to the currently open event detail header, which always renders
      // exactly two participant labels (home first, away second) regardless of
      // how many other events/matches are listed elsewhere on the page.
      const selectors = ['.obg-m-event-header-participant-label', '.obg-event-info-participant-label'];
      for (const sel of selectors) {
        const els = document.querySelectorAll(sel);
        if (els.length >= 2) {
          window._tlHomeTeam = els[0].textContent.trim();
          window._tlAwayTeam = els[1].textContent.trim();
          return;
        }
      }
    } catch (e) { /* non-fatal, falls back to 'Home'/'Away' */ }
  }
  function syncToMatchTab(incident) {
    try {
      if (!window.obgRt || typeof window.obgRt.injectMessage !== 'function') {
        tlStatus('Match tab sync skipped — obgRt not exposed (run Sportsbook Tool Expose first)', true);
        return;
      }
      const eventId = getEventIdFromPage();
      if (!eventId) { tlStatus('Match tab sync skipped — event id not found in URL', true); return; }
      const state = window.xSbState || window.obgState;
      const sb = state && state.sportsbook && state.sportsbook.scoreboard && state.sportsbook.scoreboard[eventId];
      if (!sb) { tlStatus('Match tab sync skipped — scoreboard state not found for this event', true); return; }
      const homeId = sb.participants[0].id, awayId = sb.participants[1].id;
      const stats = sb.statistics;

      if (GOAL_TYPES.includes(incident.type) && incident.score) {
        const parts = String(incident.score).split('-').map(s => parseInt(s.trim(), 10));
        const h = parts[0], a = parts[1];
        if (!isNaN(h) && !isNaN(a)) {
          stats[homeId].goalsScored.value = h;
          stats[awayId].goalsScored.value = a;
          window.obgRt.injectMessage({ id: eventId, t: 41, d: { spp: { [homeId]: h, [awayId]: a }, st: stats, cvs: 0 } });
          tlStatus('Match tab score synced ✓');
        }
        return;
      }
      if (incident.type === 'redCard') {
        const teamId = incident.team === 'home' ? homeId : awayId;
        stats[teamId].redCards.value = (stats[teamId].redCards.value || 0) + 1;
        const homeScore = stats[homeId].goalsScored.value || 0, awayScore = stats[awayId].goalsScored.value || 0;
        window.obgRt.injectMessage({ id: eventId, t: 41, d: { spp: { [homeId]: homeScore, [awayId]: awayScore }, st: stats, cvs: 0 } });
        tlStatus('Match tab red card synced ✓');
        return;
      }
      if (PHASE_SYNC_LABELS[incident.type] && typeof window.obgRt.setGamePhase === 'function') {
        window.obgRt.setGamePhase(eventId, { id: incident.type, label: PHASE_SYNC_LABELS[incident.type] });
        tlStatus('Match tab phase synced ✓');
      }
    } catch (err) {
      tlStatus('Match tab sync error: ' + err.message, true);
    }
  }

  // ── Injected-incidents list (manual removal) ────────────────────────────
  const PHASE_TYPES = ['kickOff','halfTime','secondHalfStart','fullTime','injuryTime'];
  function renderIncidentList() {
    const container = $('tl-qa-inc-list');
    if (!container) return;
    const items = window._tlIncidents || [];
    if (!items.length) { container.innerHTML = '<div class="tl-qa-inc-empty">No incidents yet</div>'; return; }
    container.innerHTML = items.map(item => {
      const opt = document.querySelector(`#tl-type option[value="${item.type}"]`);
      const label = opt ? opt.textContent : item.type;
      const minTxt = item.minute ? ` ${item.minute}${item.addedMinute ? '+' + item.addedMinute : ''}'` : '';
      const teamTxt = (item.team && !PHASE_TYPES.includes(item.type)) ? ` (${item.team})` : '';
      const cancelled = item.status === 'cancelled';
      const cancelBtn = PHASE_TYPES.includes(item.type) ? '' : cancelled
        ? `<button class="tl-qa-inc-restore" data-id="${item._id}" title="Restore (undo VAR cancellation)">↺</button>`
        : `<button class="tl-qa-inc-cancel" data-id="${item._id}" title="Cancel via VAR (SBOF-9514/9513)">⊘</button>`;
      const cancelledTag = cancelled ? ' <span class="tl-qa-inc-cancelled-tag">cancelled</span>' : '';
      return `<div class="tl-qa-inc-row"><span class="tl-qa-inc-row-label">${label}${minTxt}${teamTxt}${cancelledTag}</span>${cancelBtn}<button class="tl-qa-inc-remove" data-id="${item._id}" title="Remove">✕</button></div>`;
    }).join('');
  }
  $('tl-qa-inc-list').addEventListener('click', e => {
    const removeBtn = e.target.closest('.tl-qa-inc-remove');
    if (removeBtn) { window.tlRemoveIncident(removeBtn.dataset.id); return; }
    const cancelBtn = e.target.closest('.tl-qa-inc-cancel');
    if (cancelBtn) { window.tlCancelIncident(cancelBtn.dataset.id); return; }
    const restoreBtn = e.target.closest('.tl-qa-inc-restore');
    if (restoreBtn) { window.tlRestoreIncident(restoreBtn.dataset.id); return; }
  });
  window.tlRemoveIncident = function(id) {
    if (!window._tlIncidents) return;
    window._tlIncidents = window._tlIncidents.filter(it => String(it._id) !== String(id));
    if (window.tlRender) window.tlRender();
    renderIncidentList();
    tlUpdateCount();
    tlStatus('Incident removed');
  };
  // Per SBOF-9514 (SB.StatisticsEngine)/SBOF-9513 (sb-provider-integration): a Cancel* event
  // (e.g. CancelGoal) matches a prior stat by Reference/RelatedReference and flips its Status
  // to Cancelled — it does NOT delete the record. We keep the incident in the QA test-data
  // list (so testers can see/undo it) but exclude it from the rendered timeline via tlRender's
  // status!=='cancelled' filter, matching the confirmed real mapper behavior.
  window.tlCancelIncident = function(id) {
    if (!window._tlIncidents) return;
    const inc = window._tlIncidents.find(it => String(it._id) === String(id));
    if (!inc) return;
    inc.status = 'cancelled';
    if (window.tlRender) window.tlRender();
    renderIncidentList();
    tlStatus('Incident cancelled via VAR (removed from timeline, kept in list)');
  };
  window.tlRestoreIncident = function(id) {
    if (!window._tlIncidents) return;
    const inc = window._tlIncidents.find(it => String(it._id) === String(id));
    if (!inc) return;
    delete inc.status;
    if (window.tlRender) window.tlRender();
    renderIncidentList();
    tlStatus('Incident restored');
  };

  // ── Mode toggle ────────────────────────────────────────────────────────
  function applyModeUI() {
    const isDemo = window._tqMode === 'demo';
    $('tl-mode-data').classList.toggle('active', !isDemo);
    $('tl-mode-demo').classList.toggle('active', isDemo);
    $('tl-qa-mode-desc').textContent = isDemo
      ? 'Full mock tab+CSS injected — shows how Timeline should look'
      : 'Mock tab, unstyled — NOT wired to real deployed code (pre-release only)';
    $('tl-inject-btn').textContent = window._tlInjected
      ? (isDemo ? '✓ Demo injected' : '✓ Data ready')
      : (isDemo ? 'Inject Demo Tab' : 'Inject Data Mode');
  }
  $('tl-mode-data').addEventListener('click', () => { window._tqMode = 'data'; applyModeUI(); });
  $('tl-mode-demo').addEventListener('click', () => { window._tqMode = 'demo'; applyModeUI(); });
  applyModeUI();

  // ── Dynamic form rows ──────────────────────────────────────────────────
  const PHASES = ['kickOff','halfTime','secondHalfStart','fullTime','injuryTime'];

  // ── Realistic player name auto-fill (never mixes home/away sides) ──────
  const HOME_PLAYERS = ['Harry Kane','Marcus Rashford','Jude Bellingham','Declan Rice','Kyle Walker','Phil Foden'];
  const AWAY_PLAYERS = ['B. Cipenga','N. Madueke','Y. Wissa','J. Timber','M. Odegaard','G. Jesus'];
  window._tlPlayerIdx = window._tlPlayerIdx || { home: 0, away: 0 };
  function nextPlayerName(team, exclude) {
    const pool = team === 'away' ? AWAY_PLAYERS : HOME_PLAYERS;
    let name, tries = 0;
    do {
      name = pool[window._tlPlayerIdx[team] % pool.length];
      window._tlPlayerIdx[team]++;
      tries++;
    } while (name === exclude && tries <= pool.length);
    return name;
  }
  function updatePlayerNames() {
    const t = $('tl-type').value;
    const team = $('tl-team').value || 'home';
    if (PHASES.includes(t)) return;
    if (t === 'substitution') {
      const out = nextPlayerName(team);
      $('tl-pout').value = out;
      $('tl-pin').value  = nextPlayerName(team, out);
    } else {
      const player = nextPlayerName(team);
      $('tl-player').value = player;
      if (GOAL_TYPES.includes(t)) $('tl-assist').value = nextPlayerName(team, player);
    }
  }
  function updateScorePreview() {
    const type = $('tl-type').value;
    const scoreInput = $('tl-score');
    if (!scoreInput || !GOAL_TYPES.includes(type)) return;
    const minute = parseInt($('tl-min').value) || 0;
    const team = $('tl-team').value;
    const before = computeScoreBefore(minute, 0);
    const side = type === 'ownGoal' ? (team === 'home' ? 'away' : 'home') : team;
    const after = { home: before.home, away: before.away };
    after[side] += 1;
    scoreInput.value = `${after.home}-${after.away}`;
  }
  function updateRows() {
    const t = $('tl-type').value;
    const isPhase = PHASES.includes(t);
    const isSub   = t === 'substitution';
    const isScore = GOAL_TYPES.includes(t);
    $('tl-row-base').style.display  = isPhase ? 'none' : 'flex';
    // Player name is irrelevant for substitutions (Player out/in are used instead),
    // and the assist/score row is only relevant for goal-scoring incident types
    // (auto-computed & disabled below) — cards/corners/etc. never show it.
    $('tl-player').style.display    = isSub ? 'none' : '';
    $('tl-row-goal').style.display  = isScore ? 'flex' : 'none';
    $('tl-row-sub').style.display   = isSub ? 'flex' : 'none';
    $('tl-row-phase').style.display = isPhase ? 'flex' : 'none';
    $('tl-team').style.display      = (t === 'kickOff') ? 'none' : '';
    $('tl-score').disabled = isScore;
    if (isScore) updateScorePreview();
    updatePlayerNames();
  }
  $('tl-type').addEventListener('change', updateRows);
  $('tl-team').addEventListener('change', () => { updateScorePreview(); updatePlayerNames(); });
  $('tl-min').addEventListener('input', updateScorePreview);
  updateRows();
  renderIncidentList();

  // ── Feature flag ───────────────────────────────────────────────────────
  // Live env value is read fresh every time (init + every reopen, see the
  // reopen-toggle branch near the top of this IIFE) — never assumed stale.
  function tlLiveFeatureFlagValue() {
    return !!window.obgClientEnvironmentConfig?.startupContext?.config?.sportsbook?.event?.incidentsTimeline?.enabled;
  }
  function tlUpdateFeatUI() {
    const cb = $('tl-feat-cb'), label = $('tl-feat-label'), applyBtn = $('tl-feat-apply');
    if (!cb) return;
    label.textContent = `incidentsTimeline.${cb.checked ? 'enabled' : 'disabled'}`;
    // Highlight Apply orange whenever the checkbox (what the tester is about to set)
    // differs from the actual live config value — so auto-detected state vs. an
    // un-applied manual toggle are never visually ambiguous.
    applyBtn.classList.toggle('unsaved', cb.checked !== tlLiveFeatureFlagValue());
  }
  window._tlSyncFeatureFlag = function() {
    const cb = $('tl-feat-cb');
    if (!cb) return;
    cb.checked = tlLiveFeatureFlagValue();
    tlUpdateFeatUI();
  };
  window._tlSyncFeatureFlag();
  $('tl-feat-cb').addEventListener('change', tlUpdateFeatUI);

  $('tl-feat-apply').addEventListener('click', () => {
    const cfg = window.obgClientEnvironmentConfig?.startupContext?.config?.sportsbook?.event;
    if (!cfg) { tlStatus('Config path not found', true); return; }
    cfg.incidentsTimeline = { ...(cfg.incidentsTimeline || {}), enabled: $('tl-feat-cb').checked };
    tlStatus(`incidentsTimeline.${$('tl-feat-cb').checked ? 'enabled' : 'disabled'}`);
    tlUpdateFeatUI();
    tlSyncAutoOverrideDesiredValue();
  });

  // ── Auto-persist override across REAL reloads ────────────────────────────
  // A bookmarklet only ever runs after the page's own scripts have already
  // executed, so it can NEVER intercept a real reload/navigation by itself —
  // this is a browser security boundary, not something we can code around
  // in-page. The only way to make incidentsTimeline.enabled survive a real
  // reload automatically (i.e. replicate what Chrome DevTools "Local
  // Overrides" does, but without any manual per-reload action) is to run our
  // patch EARLIER than any page script, via one of two external helpers:
  //   - a tiny browser extension content script at document_start, or
  //   - Chrome DevTools Protocol's Page.addScriptToEvaluateOnNewDocument,
  //     driven by a small Node companion connected over remote-debugging.
  // Both helpers read the SAME localStorage key ('tlQaAutoOverride') that this
  // panel writes, and both run the SAME generic deep-patch logic below, so
  // whichever one the tester installs, the desired value here is what applies.
  function tlAutoOverridePatchSource() {
    // Generic on-purpose: rather than hardcode the exact nesting path (which
    // may differ before/after Angular's own extendStartupContext() merge —
    // see startup-context.util.ts), this walks the whole config object and
    // patches every "incidentsTimeline" object it finds, at any depth.
    return [
      '(function(){',
      '  try {',
      "    var raw = window.localStorage.getItem('tlQaAutoOverride');",
      '    if (!raw) return;',
      '    var ov = JSON.parse(raw);',
      '    if (!ov || !ov.active) return;',
      '    var applied = false;',
      '    function patchDeep(obj, depth) {',
      "      if (!obj || typeof obj !== 'object' || depth > 6) return;",
      "      if (obj.incidentsTimeline && typeof obj.incidentsTimeline === 'object') {",
      '        obj.incidentsTimeline.enabled = !!ov.enabled;',
      '        applied = true;',
      // Also handle the case where the flag key does not exist yet at all
      // (e.g. the raw server config omits it entirely when disabled) — walk
      // straight to the known sportsbook.event path and create it there too,
      // instead of relying only on an already-present key to patch in place.
      "      } else if (obj.sportsbook && obj.sportsbook.event && typeof obj.sportsbook.event === 'object') {",
      '        obj.sportsbook.event.incidentsTimeline = Object.assign({}, obj.sportsbook.event.incidentsTimeline, { enabled: !!ov.enabled });',
      '        applied = true;',
      '      }',
      '      for (var k in obj) {',
      "        if (Object.prototype.hasOwnProperty.call(obj, k) && obj[k] && typeof obj[k] === 'object') {",
      '          try { patchDeep(obj[k], depth + 1); } catch (e) {}',
      '        }',
      '      }',
      '    }',
      '    var backing;',
      '    try {',
      "      Object.defineProperty(window, 'obgClientEnvironmentConfig', {",
      '        configurable: true,',
      '        enumerable: true,',
      '        get: function () { return backing; },',
      '        set: function (v) {',
      '          try { patchDeep(v, 0); } catch (e) {}',
      '          backing = v;',
      '        }',
      '      });',
      '    } catch (e) {}',
      // The real app may (a) redefine this property itself later with its own
      // getter/setter (startup-context.util.ts does exactly this), and/or (b)
      // merge in an ASYNC startup-context patch some time after our initial
      // patch ran, silently re-overwriting the flag with the true server
      // value again. Rather than try to out-guess that internal timing
      // exactly, keep re-forcing the value via direct in-place mutation for a
      // few seconds after load — this reliably wins the race against the
      // real Timeline component's one-time read during its own construction,
      // regardless of who currently owns the top-level property.
      '    var pollUntil = Date.now() + 8000;',
      '    var poll = setInterval(function () {',
      '      try { patchDeep(window.obgClientEnvironmentConfig, 0); } catch (e) {}',
      '      if (Date.now() > pollUntil) clearInterval(poll);',
      '    }, 150);',
      '    window.__tlQaAutoOverrideApplied = function () { return applied; };',
      '  } catch (e) {}',
      '})();'
    ].join('\n');
  }

  function tlAutoOverrideExtManifest() {
    return JSON.stringify({
      manifest_version: 3,
      name: 'Timeline QA — auto override',
      version: '1.0.0',
      description: 'Forces incidentsTimeline.enabled to the value chosen in the Timeline QA Tool, before every page load — so it survives real reloads without manual DevTools overrides.',
      content_scripts: [{
        matches: ['<all_urls>'],
        js: ['content.js'],
        run_at: 'document_start',
        all_frames: true,
        // CRITICAL: content scripts default to an ISOLATED world — they share
        // the DOM with the page, but NOT the page's own `window` object/JS
        // heap, so a plain `window.foo = ...` or Object.defineProperty(window,
        // ...) done here would be invisible to the page's own scripts (this
        // was the actual bug: the override applied inside our own isolated
        // window, never touching the real obgClientEnvironmentConfig the app
        // reads). "world": "MAIN" (Chrome 111+) makes this script execute
        // directly in the page's own JS context instead, so our
        // Object.defineProperty override actually affects what the app sees.
        world: 'MAIN'
      }]
    }, null, 2);
  }

  function tlDownloadFile(filename, content, mime) {
    const blob = new Blob([content], { type: mime || 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  function tlAutoOverrideCdpCompanionSource() {
    return [
      '#!/usr/bin/env node',
      '// tl-override-companion.js — keeps the incidentsTimeline.enabled override',
      "// applied across every real reload, by injecting the tool's patch script",
      '// before any page script runs on every tab (Page.addScriptToEvaluateOnNewDocument),',
      "// via Chrome's remote-debugging protocol. Requires `npm install` first.",
      '//',
      '// Setup:',
      '//   1. Close Chrome fully, then relaunch it with --remote-debugging-port=9222',
      '//      (e.g. add the flag to your Chrome shortcut target, or run from a',
      '//      terminal: chrome.exe --remote-debugging-port=9222)',
      '//   2. In this folder: npm install',
      '//   3. node tl-override-companion.js', 
      '//   4. Keep this terminal open — every reload on any tab now gets the',
      "//      override applied automatically, reading the desired value from",
      "//      this browser's localStorage (set via the Timeline QA Tool panel).",
      '',
      "const CDP = require('chrome-remote-interface');",
      '',
      'const OVERRIDE_SOURCE = ' + JSON.stringify(tlAutoOverridePatchSource()) + ';',
      '',
      'const attached = new Set();',
      '',
      'async function attachAll() {',
      '  let targets;',
      '  try { targets = await CDP.List({ port: 9222 }); }',
      '  catch (e) {',
      "    console.error('[tl-override] cannot reach Chrome on port 9222 — is it running with --remote-debugging-port=9222?', e.message);",
      '    return;',
      '  }',
      "  for (const t of targets) {",
      "    if (t.type !== 'page' || attached.has(t.id)) continue;",
      '    try {',
      '      const client = await CDP({ target: t.id, port: 9222 });',
      '      const { Page } = client;',
      '      await Page.enable();',
      '      await Page.addScriptToEvaluateOnNewDocument({ source: OVERRIDE_SOURCE });',
      '      attached.add(t.id);',
      "      console.log('[tl-override] attached to', t.url);",
      '      client.on(\'disconnect\', () => attached.delete(t.id));',
      '    } catch (e) {',
      "      console.error('[tl-override] failed to attach', t.url, e.message);",
      '    }',
      '  }',
      '}',
      '',
      'setInterval(attachAll, 2000);',
      'attachAll();',
      "console.log('[tl-override] companion running — override applies to every reload while this stays open.');"
    ].join('\n');
  }

  function tlAutoOverrideCdpPackageJson() {
    return JSON.stringify({
      name: 'tl-override-companion',
      version: '1.0.0',
      private: true,
      description: 'Companion script for Timeline QA Tool auto-persist override',
      main: 'tl-override-companion.js',
      scripts: { start: 'node tl-override-companion.js' },
      dependencies: { 'chrome-remote-interface': '^0.33.0' }
    }, null, 2);
  }

  const AUTOOV_INSTRUCTIONS = {
    ext: '1) Click "Download helper files" (manifest.json + content.js).\n2) Put both files in one empty folder.\n3) Chrome → chrome://extensions → enable "Developer mode" → "Load unpacked" → select that folder.\n4) Done. Every future reload on any page auto-applies the override while the extension stays enabled — no running process needed. To change the value later, just toggle the checkbox above and click Apply; no reinstall needed.\n\n⚠ Already installed an older version? Re-download both files (v0.1.36+ adds "world":"MAIN" to manifest.json — a critical fix, earlier versions ran in an isolated JS context that never actually reached the page\'s real config), overwrite the two files in your folder, then click the ↻ reload icon on the extension card in chrome://extensions (no need to remove/re-add it).',
    cdp: '1) Click "Download helper files" (tl-override-companion.js + package.json).\n2) Put both in one folder, then in a terminal there run: npm install\n3) Fully close Chrome, then relaunch it with the flag --remote-debugging-port=9222 (e.g. add it to your Chrome shortcut target).\n4) In the same folder run: node tl-override-companion.js — keep this terminal open.\n5) Every reload on any tab now gets the override applied automatically, for as long as the script keeps running.'
  };

  function tlSyncAutoOverrideInstructions() {
    const mech = $('tl-autoov-mechanism').value;
    $('tl-autoov-instructions').textContent = AUTOOV_INSTRUCTIONS[mech];
  }

  function tlUpdateAutoOverrideStatus() {
    const statusEl = $('tl-autoov-status');
    let persisted;
    try { persisted = JSON.parse(tlLsGet('tlQaAutoOverride', 'null')); } catch (e) { persisted = null; }
    if (!persisted || !persisted.active) { statusEl.textContent = ''; return; }
    const helperRan = typeof window.__tlQaAutoOverrideApplied === 'function';
    const wanted = !!persisted.enabled;
    const liveNow = tlLiveFeatureFlagValue();
    if (!helperRan) {
      statusEl.textContent = `🔒 incidentsTimeline.${wanted ? 'enabled' : 'disabled'} is queued to persist, but no helper detected on this page load — install/start one of the helpers below, then reload`;
      statusEl.style.color = '#777';
    } else if (liveNow === wanted) {
      statusEl.textContent = `✓ Auto-override active — incidentsTimeline.${wanted ? 'enabled' : 'disabled'} confirmed live right now`;
      statusEl.style.color = '#7ed957';
    } else {
      // The helper ran (it patched something at document_start and/or during
      // its post-load polling window), but the CURRENT live value still
      // doesn't match what was requested — most likely something re-applied
      // the real server value afterward (e.g. a later async startup-context
      // merge), or the config's actual shape differs from what patchDeep
      // expects on this page. Re-check a few times in case polling just
      // hasn't caught up yet before reporting a firm mismatch.
      statusEl.textContent = `⚠ Helper ran, but the live value is currently "${liveNow ? 'enabled' : 'disabled'}", not the requested "${wanted ? 'enabled' : 'disabled'}" — something reset it after the helper patched it. Re-checking...`;
      statusEl.style.color = '#faa200';
      setTimeout(() => {
        if (tlLiveFeatureFlagValue() === wanted) {
          statusEl.textContent = `✓ Auto-override active — incidentsTimeline.${wanted ? 'enabled' : 'disabled'} confirmed live right now`;
          statusEl.style.color = '#7ed957';
        } else {
          statusEl.textContent = `✗ Confirmed mismatch — live value stays "${tlLiveFeatureFlagValue() ? 'enabled' : 'disabled'}" despite the helper running. The config is likely re-applied by an async merge after our patch window, or its shape differs from the expected sportsbook.event.incidentsTimeline path.`;
          statusEl.style.color = '#ff6b6b';
        }
      }, 2500);
    }
  }

  // Writes the desired {active, enabled} pair to the shared localStorage key
  // that both external helpers read from. Unconditional on every Apply click —
  // NOT gated behind the "🔁 Auto-persist" checkbox below, since that checkbox
  // only shows/hides the helper setup instructions. Gating the write behind it
  // was the original v0.1.34 design and caused a real bug: testers who applied
  // a flag value without separately remembering to also tick that checkbox saw
  // the override silently not persist at all, even with the extension/companion
  // correctly installed and running.
  function tlSyncAutoOverrideDesiredValue() {
    tlLsSet('tlQaAutoOverride', JSON.stringify({ active: true, enabled: $('tl-feat-cb').checked }));
    tlUpdateAutoOverrideStatus();
  }

  // Restore persisted UI state (checkbox + chosen mechanism) on (re-)creation.
  // The checkbox itself only remembers whether the setup panel should be shown
  // expanded — it does NOT gate whether persistence is active (see above).
  $('tl-autoov-cb').checked = tlLsGet('tlQaAutoOverridePanelOpen', '0') === '1';
  $('tl-autoov-mechanism').value = tlLsGet('tlQaAutoOverrideMechanism', 'ext');
  $('tl-autoov-panel').style.display = $('tl-autoov-cb').checked ? 'flex' : 'none';
  tlSyncAutoOverrideInstructions();
  tlUpdateAutoOverrideStatus();

  $('tl-autoov-cb').addEventListener('change', () => {
    $('tl-autoov-panel').style.display = $('tl-autoov-cb').checked ? 'flex' : 'none';
    tlLsSet('tlQaAutoOverridePanelOpen', $('tl-autoov-cb').checked ? '1' : '0');
  });
  $('tl-autoov-mechanism').addEventListener('change', () => {
    tlLsSet('tlQaAutoOverrideMechanism', $('tl-autoov-mechanism').value);
    tlSyncAutoOverrideInstructions();
  });
  $('tl-autoov-download').addEventListener('click', () => {
    const mech = $('tl-autoov-mechanism').value;
    if (mech === 'ext') {
      tlDownloadFile('manifest.json', tlAutoOverrideExtManifest(), 'application/json');
      setTimeout(() => tlDownloadFile('content.js', tlAutoOverridePatchSource(), 'text/javascript'), 300);
      tlStatus('Downloaded manifest.json + content.js — see instructions above');
    } else {
      tlDownloadFile('tl-override-companion.js', tlAutoOverrideCdpCompanionSource(), 'text/javascript');
      setTimeout(() => tlDownloadFile('package.json', tlAutoOverrideCdpPackageJson(), 'application/json'), 300);
      tlStatus('Downloaded tl-override-companion.js + package.json — see instructions above');
    }
  });

  // ── Expose obgRt / obgState gating ───────────────────────────────────────
  // exposeObgRt and exposeObgState are two DISTINCT host-page flags: obgRt unlocks
  // window.obgRt.injectMessage/setGamePhase (the RT channel our Match-tab-sync writes
  // through), while obgState unlocks window.xSbState/window.obgState (the SB app's own
  // state snapshot our sync reads scoreboard/participant data from) — Match tab sync
  // needs BOTH. Our "Expose obgRt" button requests both flags together in one reload
  // (matching the Sportsbook Tool's own combined "Expose obg/xSbState and obgRt"
  // action), so from this tool's point of view they gate the exact same feature.
  function tlObgRtExposed() { return !!(window.obgRt && typeof window.obgRt.injectMessage === 'function'); }
  function tlObgStateExposed() { return !!(window.xSbState || window.obgState); }
  function tlUpdateObgRtStatus() {
    const btn = $('tl-expose-obgrt'), statusEl = $('tl-obgrt-status');
    if (!btn || !statusEl) return;
    const exposed = tlObgRtExposed() && tlObgStateExposed();
    // Per request: once successfully exposed, the one-shot action button itself is no
    // longer needed/relevant, so it's hidden rather than left clickable for no reason.
    btn.style.display = exposed ? 'none' : 'block';
    if (exposed) {
      statusEl.textContent = '✓ obgRt + obgState exposed — Match tab sync active';
      statusEl.style.color = '#7ed957';
    } else {
      statusEl.textContent = '🔒 Match tab sync disabled until exposed (needs both obgRt + obgState)';
      statusEl.style.color = '#777';
    }
  }
  window._tlSyncObgRtStatus = tlUpdateObgRtStatus;
  tlUpdateObgRtStatus();

  // ── Expose obgRt ─────────────────────────────────────────────────────────
  // Mirrors the Sportsbook Tool's own "Expose obg/xSbState and obgRt" button
  // (reloadPageWithFeature("exposeObgStateAndRt") -> appends ?exposeObgState=true&
  // exposeObgRt=true to the URL and reloads self) so testers don't need to separately
  // run the Sportsbook Tool just to unlock window.obgRt for our Match-tab-sync feature.
  $('tl-expose-obgrt').addEventListener('click', () => {
    // Remember that we're the ones causing the reload, so the tester gets a "state
    // restored" confirmation next time they re-click the bookmarklet (see panel state
    // persistence block above) instead of silently landing on a blank default panel.
    tlLsSet('tlQaPendingReload', '1');
    const url = new URL(window.location.href.replace(/\/$/, ''));
    url.searchParams.delete('exposeObgState');
    url.searchParams.append('exposeObgState', 'true');
    url.searchParams.delete('exposeObgRt');
    url.searchParams.append('exposeObgRt', 'true');
    window.open(url, '_self');
  });

  // ── Match config (Expected Period Duration, SBOF-9706/9619/9809) ────────
  window._tlConfig = window._tlConfig || { periodDuration: 45 };
  $('tl-period-dur').value = window._tlConfig.periodDuration;
  $('tl-period-apply').addEventListener('click', () => {
    const v = parseInt($('tl-period-dur').value, 10);
    if (!v || v < 1) { tlStatus('Invalid period length', true); return; }
    window._tlConfig.periodDuration = v;
    tlStatus(`Period length set to ${v}'`);
    if (window.tlRender) window.tlRender();
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

    // Guard: refuse to inject our mock Timeline tab if the REAL deployed feature
    // (Angular component `sbb2b-match-timeline-container`, per libs/betting/match-timeline)
    // is already present on the page. Our mock tool intentionally does NOT hook into the
    // real component's NgRx data (window._tlIncidents/window.tlRender are our own globals,
    // unrelated to the real ScoreboardSelector.getGameStatistics/EventPageSchemaSelector.getTimelineSchema
    // pipeline) — injecting alongside it would create a confusing duplicate tab and any
    // "test result" from our mock would NOT reflect the real implementation's behaviour.
    if (document.querySelector('sbb2b-match-timeline-container')) {
      tlStatus('⚠ Real Timeline feature detected on this page (sbb2b-match-timeline-container) — this mock tool is for pre-release QA only and must not be used once the real feature is deployed here', true);
      return;
    }

    const isDemo = window._tqMode === 'demo';

    // Scope to the actual event "main" tab bar (`obg-m-event-main-tabs-container`, the
    // Match / Statistics / Stream / Player stats row) — per Figma (node 12367-423068) the
    // Timeline tab belongs in THIS tab bar, not the betting-markets tab bar
    // (`obg-m-event-market-tabs-container`, "All / Popular / Goals / Halves / Corners"),
    // which is a separate widget entirely and was being mistakenly targeted before.
    // NOT just "first [test-id=scroller-content] in the document" — on competition/listing
    // pages (e.g. .../italian-serie-a?...&tab=liveAndUpcoming) an unrelated competition-level
    // nav tab bar ("Matches | Outrights | Standings") renders *before* the event's own tab bar
    // in DOM order and would otherwise be picked instead, silently injecting our Timeline tab
    // into the wrong place on the page (looks like nothing happened).
    const scrollerEl = document.querySelector('obg-m-event-main-tabs-container [test-id="scroller-content"]')
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

    // Per the "Timeline - FE" spec: "The tab should be available only after we receive
    // our first incident which most probably will be 'match kick off'" (Timeline tab
    // visibility gating, SBEUJE-6118) — i.e. a real Timeline tab never exists with zero
    // incidents, its very existence implies kick-off has already happened. So injecting
    // our mock tab with a completely empty incident list misrepresents the real minimum
    // state; seed a Kick off incident by default when nothing has been added yet.
    if (!window._tlIncidents || !window._tlIncidents.length) {
      window._tlIncidents = [{ type: 'kickOff', team: 'home', minute: 0, _id: 1 }];
    }
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
      // The inactive text colour must invert for dark theme (site uses light text on dark bg),
      // so we compute it dynamically instead of hardcoding the light-theme value.
      const inactiveColor = () => window._tlIsDarkTheme() ? 'rgba(255,255,255,.7)' : 'rgba(4,4,6,.7)';
      tabBtn.style.cssText = 'position:relative;display:inline-flex;align-items:center;justify-content:center;gap:4px;box-sizing:border-box;height:48px;padding:0 8px;border:none;background:transparent;cursor:pointer;font-size:14px;font-family:inherit;font-weight:400;line-height:16.8px;white-space:nowrap;flex-shrink:0';
      tabBtn.style.color = inactiveColor();
      scrollerEl.appendChild(tabBtn);

      const setActive = (active) => {
        tabBtn.style.color = active ? '#ff6600' : inactiveColor();
        tabBtn.classList.toggle('tl-active', active);
        // The real tabs share a single Angular-managed `.obg-tabs-underline` indicator that only
        // moves when a REAL tab is clicked — Angular has no idea our injected tab exists, so it
        // never hides/repositions that shared underline away from whichever real tab it was last
        // on. We hide it ourselves while our tab is active, and restore it when leaving.
        const underline = (scrollerEl.closest('obg-tabs') || document).querySelector('.obg-tabs-underline');
        if (underline) underline.style.opacity = active ? '0' : '';
      };

      // React live to the user toggling Light/Dark in Settings, without needing
      // to reload the page or re-inject the tool. Guarded with a global flag
      // since this whole block only runs once anyway (first injection).
      if (!window._tlThemeObserverInstalled) {
        window._tlThemeObserverInstalled = true;
        new MutationObserver(() => {
          if (!tabBtn.classList.contains('tl-active')) tabBtn.style.color = inactiveColor();
          if (typeof window.tlRender === 'function') window.tlRender();
        }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
      }

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

    detectTeamNames();
    window.tlRender();
    $('tl-inject-btn').textContent = isDemo ? '✓ Demo injected' : '✓ Tab injected';
    tlStatus(isDemo ? 'Demo tab injected ✓' : 'Tab injected ✓');
    tlUpdateCount();
    renderIncidentList();
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
    renderIncidentList();
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
      { type:'varReviewStart', team:'away', minute:40, player:'Penalty', _id:5 },
      { type:'varReviewEnd', team:'away', minute:42, player:'Penalty', _id:6 },
      { type:'penaltyScored', team:'away', minute:43, player:'Jude Bellingham', score:'1-1', _id:7 },
      { type:'injuryTime', team:'home', minute:45, extraMinutes:2, _id:8 },
      { type:'yellowCard', team:'home', minute:45, addedMinute:1, player:'Declan Rice', _id:8.5 },
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
      { type:'goal', team:'away', minute:90, addedMinute:2, player:'B. Cipenga', assist:'N. Madueke', score:'3-2', _id:19.5 },
      { type:'fullTime', team:'home', minute:90, scoreText:'3-2', _id:20 },
    ];
  }
  $('tl-demo-btn').addEventListener('click', () => {
    if (!window._tlInjected) { tlStatus('Inject the tab first!', true); return; }
    detectTeamNames();
    window._tlIncidents = buildFullDemoIncidents();
    window._tlFilter = 'all';
    window.tlRender();
    tlStatus('Full demo match loaded — all incident types ✓');
    tlUpdateCount();
    renderIncidentList();
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
      if (GOAL_TYPES.includes(type)) {
        incident.assist = $('tl-assist').value.trim() || undefined;
        // .score is auto-computed by recomputeAllScores() right after chronological
        // insertion below, so the (disabled) form value is never read directly here.
      }
    }
    if (!window._tlIncidents) window._tlIncidents = [];
    insertChronological(window._tlIncidents, incident);
    recomputeAllScores();
    window.tlRender();
    tlStatus(`Added: ${type}${incident.minute ? ' '+incident.minute+"'" : ''}`);
    tlUpdateCount();
    renderIncidentList();
    syncToMatchTab(incident);
    // Clear transient fields, then re-fill with fresh auto-suggested names for next add
    ['tl-player','tl-assist','tl-score','tl-pout','tl-pin','tl-scoretext'].forEach(id => { const el = $(id); if(el) el.value=''; });
    updateScorePreview();
    updatePlayerNames();
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
  $('tl-qa-close').addEventListener('click', () => { panel.style.display = 'none'; tlLsSet('tlQaOpen', '0'); });

})();
