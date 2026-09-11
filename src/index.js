/* Timeline QA Tool v0.1.69.  State-only RT feed simulator; it never renders Timeline. */
const VERSION = "v0.1.69";
const NS = "__timelineQaNormalizedFeed";
const STATUS = { Unset: 0, Active: 1, Disabled: 2, Cancelled: 3 };
const USAGE = { HomeTeam: 1, HomePlayer: 2, AwayTeam: 3, AwayPlayer: 4, H2H: 5 };
const suffixes = ["KickOff","StopFirstHalf","StartSecondHalf","StopSecondHalf","StartFirstHalfExtraTime","StopFirstHalfExtraTime","StartSecondHalfExtraTime","StopSecondHalfExtraTime","StartPenaltyShootout","MatchFinished","InjuryTime","Goal","OwnGoal","GoalScorer","GoalAssist","YellowCard","YellowCardPlayer","YellowRedCard","YellowRedCardPlayer","RedCard","RedCardPlayer","SubPlayerOn","SubPlayerOff","Corner","PenaltyAwarded","PenaltyScored","PenaltyMissed","VarStarted","VarReasonGoal","VarReasonPenalty","VarReasonCards","VarReasonPenaltyNotAwarded","VarReasonRedCardUpgrade","VarReasonMistakenIdentity","VarReasonOther","VarReasonGoalNotAwarded","VarReasonRefereeDecisionConfirmed","VarReasonRefereeDecisionCancelled","VarReasonRedCardGiven","VarFinished","CancelGoal","CancelYellowCard","CancelRedCard","CancelYellowRedCard","CancelCorner","CancelPenalty","CancelSubstitution"];
const CATALOG = Object.freeze(suffixes.map((suffix, offset) => ({ id: 96 + offset, suffix, name: `GameEvent${suffix}`, label: suffix.replace(/([A-Z])/g, " $1").trim() })));
const byId = new Map(CATALOG.map((entry) => [entry.id, entry]));
const SCORE_TYPES = new Set([107, 108, 121]);
const PLAYER_TYPES = new Set([109, 110, 112, 114, 116]);
const VAR_TYPES = new Set([123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135]);
const ROOT_CHILDREN = new Map([[107,[109,110]],[108,[109,110]],[111,[112]],[113,[114]],[115,[116]],[121,[109]],[123,[124,125,126,127,128,129,130,131,132,133,134]],[135,[124,125,126,127,128,129,130,131,132,133,134]]]);
const CHILD_PARENT_TYPES = new Map([...ROOT_CHILDREN].flatMap(([root, children]) => children.map((child) => [child, root])));
const SUB_TYPES = new Set([117, 118]);

const clone = (value) => value === undefined ? undefined : structuredClone(value);
const error = (code, message) => Object.assign(new Error(message), { code });
const exactInteger = (value, label) => {
  if (!/^(0|[1-9]\d*)$/.test(String(value)) || !Number.isSafeInteger(Number(value))) throw error("INVALID_IDENTIFIER", `${label} must be a safe integer.`);
  return Number(value);
};
const field = (object, ...names) => names.find((name) => object && object[name] !== undefined) ? object[names.find((name) => object && object[name] !== undefined)] : undefined;

function getState() {
  const candidate = window.xSbState || window.obgState;
  if (!candidate || !candidate.sportsbook) throw error("STATE_MISSING", "The exposed sportsbook state is unavailable.");
  return candidate;
}
function resolveContext() {
  const state = getState();
  const sb = state.sportsbook;
  const route = state.route?.current || {};
  const eventId = String(field(route.params, "eventId", "id") ?? field(route.queryParams, "eventId" ) ?? "");
  const events = sb.event?.events || {};
  const event = events[eventId];
  const scoreboard = sb.scoreboard?.[eventId];
  if (!eventId || !event || !scoreboard) throw error("EVENT_CONTEXT_CONFLICT", "No unambiguous routed event and scoreboard are available.");
  if (event.phase !== "Live") throw error("EVENT_NOT_LIVE", "The current event is not live.");
  if (Number(event.categoryId) !== 1 && !/football/i.test(String(event.categoryName ?? event.category?.name ?? ""))) throw error("EVENT_NOT_FOOTBALL", "The current event is not football.");
  const participants = event.participants || [];
  const home = participants.filter((p) => Number(p.side) === 1);
  const away = participants.filter((p) => Number(p.side) === 2);
  if (home.length !== 1 || away.length !== 1) throw error("PARTICIPANT_MAPPING_MISSING", "Exactly one Home and Away participant are required.");
  const players = (event.subParticipants || []).filter((player) => player?.id !== undefined);
  return { state, eventId, event, scoreboard, home: home[0], away: away[0], players, map: scoreboard.timelineStatistics || {} };
}
function readiness() {
  const enabled = window.obgClientEnvironmentConfig?.startupContext?.config?.sportsbook?.event?.incidentsTimeline?.enabled;
  if (enabled !== true) throw error("TIMELINE_DISABLED", "Timeline injection is blocked: enable incidentsTimeline.enabled in config.json before startup, then reload and restart this bookmarklet.");
  if (!window.obgRt || typeof window.obgRt.injectMessage !== "function") throw error("RT_MISSING", "window.obgRt.injectMessage is not exposed. Use Expose, reload, then restart the bookmarklet.");
}
function makeEnvelope(context, map) {
  const board = context.scoreboard;
  const d = { spp: clone(board.scorePerParticipant), st: clone(board.statistics), cvs: clone(board.currentVarState), pst: clone(board.playerStatistics), eed: board.expectedEventDuration, epc: board.expectedPeriodCount, epd: board.expectedPeriodDuration, ts: map };
  if (board.igps !== undefined) d.igps = clone(board.igps);
  return { id: context.eventId, t: 41, d };
}
function recordInput(input, identity) {
  const catalog = byId.get(Number(input.type));
  if (!catalog) throw error("INVALID_TYPE", "Select a valid result type.");
  const period = exactInteger(input.period, "Period");
  const minute = Number(input.minute), second = Number(input.second);
  if (!Number.isInteger(minute) || minute < 0 || !Number.isInteger(second) || second < 0 || second > 59) throw error("INVALID_TIME", "Minute must be a non-negative integer and second must be 0–59.");
  const teamless = input.side === "none";
  const participant = teamless ? 0 : exactInteger(input.participantId, "Participant ID");
  const usage = teamless ? USAGE.H2H : input.player ? (input.side === "home" ? USAGE.HomePlayer : USAGE.AwayPlayer) : (input.side === "home" ? USAGE.HomeTeam : USAGE.AwayTeam);
  return { reference: identity.reference, ...(input.parentReference ? { relReference: input.parentReference } : {}), eventPeriodId: period, minute, second, participantId: participant, participantUsage: usage, gameResultTypeId: catalog.id, gameResultTypeName: catalog.name, gameResultValue: String(input.value ?? ""), status: input.status ?? STATUS.Active };
}
function playerRecord(input, identity, parent, type, player) {
  return recordInput({ ...input, type, player: true, participantId: player.id, value: String(player.id), parentReference: parent.reference }, identity);
}
function compatible(parent, type) {
  return parent && (CHILD_PARENT_TYPES.get(type) === parent.record.gameResultTypeId || (SUB_TYPES.has(type) && SUB_TYPES.has(parent.record.gameResultTypeId) && type !== parent.record.gameResultTypeId) || (VAR_TYPES.has(type) && VAR_TYPES.has(parent.record.gameResultTypeId)));
}
function formRecipe(raw, context, ledger) {
  const type = Number(raw.type); const team = raw.side === "home" ? context.home : raw.side === "away" ? context.away : null;
  const players = context.players;
  const getPlayer = (name) => { const id = raw[name]; const player = players.find((p) => String(p.id) === String(id)); if (!player) throw error("PLAYER_REQUIRED", `Select a current event player for ${name}.`); return player; };
  const allocate = () => ledger.allocate(context.map);
  if (raw.delivery === "child") {
    const parent = ledger.records(context.eventId).get(Number(raw.parentKey));
    if (!compatible(parent, type)) throw error("INCOMPATIBLE_PARENT", "The selected parent cannot receive this child type.");
    const player = PLAYER_TYPES.has(type) ? getPlayer("player") : null;
    const identity = allocate();
    return [{ identity, record: player ? playerRecord(raw, identity, parent.record, type, player) : recordInput({ ...raw, parentReference: parent.reference, participantId: parent.record.participantId }, identity), role: "child" }];
  }
  const rootIdentity = allocate(); const root = recordInput({ ...raw, participantId: team?.id ?? 0 }, rootIdentity); const result = [{ identity: rootIdentity, record: root, role: "root" }];
  if (raw.delivery !== "complete") return result;
  if (type === 107 || type === 108 || type === 121) {
    const scorerIdentity = allocate(); result.push({ identity: scorerIdentity, record: playerRecord(raw, scorerIdentity, root, 109, getPlayer("player")), role: "scorer" });
    if (raw.assist) { const assistIdentity = allocate(); result.push({ identity: assistIdentity, record: playerRecord(raw, assistIdentity, root, 110, getPlayer("assist")), role: "assist" }); }
  } else if (ROOT_CHILDREN.has(type) && raw.player) {
    const childType = ROOT_CHILDREN.get(type)[0], childIdentity = allocate(); result.push({ identity: childIdentity, record: playerRecord(raw, childIdentity, root, childType, getPlayer("player")), role: "child" });
  } else if (SUB_TYPES.has(type)) {
    const on = getPlayer("player"), off = getPlayer("subOut");
    if (on.id === off.id) throw error("SUBSTITUTION_PLAYERS_EQUAL", "Substitution IN and OUT players must differ.");
    const opposite = type === 117 ? 118 : 117, memberIdentity = allocate();
    result.push({ identity: memberIdentity, record: playerRecord(raw, memberIdentity, root, opposite, off), role: "substitution-member" });
  }
  return result;
}
function createLedger() {
  const session = crypto.randomUUID(); let counter = 0; const byEvent = new Map(); const keys = new Set();
  return {
    records(eventId) { return byEvent.get(eventId) || new Map(); },
    allocate(map) { let key; for (let i = 0; i < 30; i++) { key = Math.floor(1 + crypto.getRandomValues(new Uint32Array(1))[0] * 0x1fffff); if (!keys.has(key) && !Object.hasOwn(map, key)) { keys.add(key); return { key, reference: `timeline-qa-${session}-${++counter}` }; } } throw error("IDENTITY_ALLOCATION_FAILED", "Could not allocate a collision-free incident identity."); },
    commit(eventId, owned) { if (!byEvent.has(eventId)) byEvent.set(eventId, new Map()); byEvent.get(eventId).set(owned.key, owned); },
  };
}
function createPanel(app) {
  const old = document.getElementById("timeline-qa-normalized-panel"); if (old) { old.hidden = !old.hidden; app.refresh(); return old; }
  const root = document.createElement("section"); root.id = "timeline-qa-normalized-panel"; root.setAttribute("aria-label", "Timeline QA feed simulator");
  const style = document.createElement("style"); style.textContent = `#timeline-qa-normalized-panel{position:fixed;z-index:2147483647;right:16px;top:16px;width:360px;max-height:90vh;overflow:auto;background:#fff;color:#161616;border:1px solid #bbb;border-radius:8px;padding:12px;font:13px system-ui;box-shadow:0 8px 28px #0005}#timeline-qa-normalized-panel label{display:block;margin:7px 0 2px}#timeline-qa-normalized-panel input,#timeline-qa-normalized-panel select,#timeline-qa-normalized-panel button{box-sizing:border-box;width:100%;padding:6px}#timeline-qa-normalized-panel button{margin-top:8px;cursor:pointer}#timeline-qa-normalized-panel .row{display:flex;gap:6px}.row>*{flex:1}#tq-status{white-space:pre-wrap;padding:8px 0}#tq-records{padding-left:20px}`; document.head.append(style);
  root.innerHTML = `<div class="row"><strong>Timeline QA ${VERSION}</strong><button type="button" id="tq-close">Close</button></div><div id="tq-status" role="status" aria-live="polite"></div><fieldset><legend>Actions</legend><button type="button" id="tq-refresh">Refresh readiness</button><button type="button" id="tq-expose">Expose state + RT and reload</button><button type="button" id="tq-demo">Start full demo</button><button type="button" id="tq-stop" disabled>Stop demo</button><button type="button" id="tq-clear">Cancel owned records for this event</button></fieldset><form id="tq-form" novalidate><fieldset><legend>Add incident</legend><label>Feed <select name="feed"><option value="opta">Opta</option><option value="runningball">RunningBall</option></select></label><label>Incident <select name="type"></select></label><label>Delivery <select name="delivery"><option value="parent">Parent only</option><option value="complete">Complete</option><option value="child">Child update</option></select></label><label class="tq-parent" hidden>Compatible parent <select name="parentKey"></select></label><div class="row"><label>Period<input name="period" type="number" min="1" value="1" required></label><label>Minute<input name="minute" type="number" min="0" value="1" required></label><label>Second<input name="second" type="number" min="0" max="59" value="0" required></label></div><label>Team <select name="side"><option value="home">Home</option><option value="away">Away</option><option value="none">No team / H2H</option></select></label><label>Player <select name="player"><option value="">None</option></select></label><label class="tq-sub" hidden>Player out <select name="subOut"><option value="">Select player</option></select></label><label>Assist <select name="assist"><option value="">None</option></select></label><label>Value <input name="value" value=""></label><button type="submit">Add normalized incident</button></fieldset></form><h4>Injected incidents</h4><ol id="tq-records"></ol>`;
  const select = root.querySelector('[name="type"]'); CATALOG.forEach((item) => { const option = document.createElement("option"); option.value = item.id; option.textContent = `${item.id} — ${item.label}`; select.append(option); });
  root.querySelector("#tq-close").onclick = () => { root.hidden = true; };
  root.querySelector("#tq-refresh").onclick = () => app.refresh();
  root.querySelector("#tq-clear").onclick = () => app.clear();
  root.querySelector("#tq-expose").onclick = () => { const url = new URL(location.href); url.searchParams.set("exposeObgState", "true"); url.searchParams.set("exposeObgRt", "true"); location.assign(url.href); };
  root.querySelector("#tq-demo").onclick = () => app.demo();
  root.querySelector("#tq-stop").onclick = () => app.stopDemo();
  root.querySelector("form").onsubmit = (event) => { event.preventDefault(); app.add(Object.fromEntries(new FormData(event.currentTarget))); };
  root.querySelector('[name="type"]').onchange = () => app.updateForm();
  root.querySelector('[name="delivery"]').onchange = () => app.updateForm();
  document.body.append(root); return root;
}
function bootstrap() {
  const ledger = createLedger(); let pending = Promise.resolve(); let panel; let demoAbort;
  const app = {
    show(message, bad = false) { const node = panel?.querySelector("#tq-status"); if (node) { node.textContent = message; node.style.color = bad ? "#b00020" : "#075c25"; } },
    refresh() { try { readiness(); const ctx = resolveContext(); this.show(`Ready for live event ${ctx.eventId}. ${Object.keys(ctx.map).length} current incident records preserved.`); this.render(ctx); } catch (e) { this.show(`${e.code || "ERROR"}: ${e.message}`, true); } },
    render(ctx) { const list = panel?.querySelector("#tq-records"); if (!list || !ctx) return; list.replaceChildren(); for (const owned of ledger.records(ctx.eventId).values()) { const row = document.createElement("li"), actions = document.createElement("span"); row.append(`${owned.record.gameResultTypeName} · ${owned.record.reference} · ${Object.entries(STATUS).find(([, value]) => value === owned.record.status)?.[0]} `); for (const [label, status] of [["Disable", STATUS.Disabled], ["Cancel", STATUS.Cancelled], ["Activate", STATUS.Active]]) { const button = document.createElement("button"); button.type = "button"; button.textContent = label; button.onclick = () => this.setStatus(owned.key, status); actions.append(button); } row.append(actions); list.append(row); } this.updateForm(ctx); },
    updateForm(ctx) { if (!panel) return; try { ctx ||= resolveContext(); const form = panel.querySelector("form"), data = new FormData(form), type = Number(data.get("type")), child = data.get("delivery") === "child"; panel.querySelector(".tq-parent").hidden = !child; panel.querySelector(".tq-sub").hidden = !SUB_TYPES.has(type); const parent = form.elements.parentKey; parent.replaceChildren(); for (const owned of ledger.records(ctx.eventId).values()) if (compatible(owned, type)) { const option = document.createElement("option"); option.value = owned.key; option.textContent = `${owned.record.gameResultTypeName} — ${owned.reference}`; parent.append(option); } for (const name of ["player", "assist", "subOut"]) { const select = form.elements[name], prior = select.value; select.replaceChildren(); const blank = document.createElement("option"); blank.value = ""; blank.textContent = name === "assist" ? "None" : "Select player"; select.append(blank); for (const player of ctx.players) { const option = document.createElement("option"); option.value = player.id; option.textContent = player.label || player.name || String(player.id); select.append(option); } select.value = prior; } } catch {} },
    enqueue(work) { pending = pending.then(work, work); return pending; },
    add(raw) { return this.enqueue(async () => { try { readiness(); const ctx = resolveContext(); const side = raw.side; if (VAR_TYPES.has(Number(raw.type)) && raw.feed === "opta" && side === "none") throw error("PROFILE_REQUIRES_SIDE", "Opta VAR requires Home or Away."); if (VAR_TYPES.has(Number(raw.type)) && raw.feed === "runningball" && side !== "none") throw error("PROFILE_REQUIRES_H2H", "RunningBall VAR must use No team / H2H."); const recipe = formRecipe(raw, ctx, ledger); for (const item of recipe) { const latest = resolveContext(); if (latest.eventId !== ctx.eventId || Object.hasOwn(latest.map, item.identity.key)) throw error("NAVIGATION_OR_OWNERSHIP_CONFLICT", "The event changed or an allocated key is no longer safe."); const map = clone(latest.map); map[item.identity.key] = item.record; window.obgRt.injectMessage(makeEnvelope(latest, map)); ledger.commit(ctx.eventId, { ...item.identity, record: item.record, feed: raw.feed, role: item.role }); } this.show(`Sent ${recipe.length} normalized realtime record(s); verify the native Timeline.`); this.render(resolveContext()); } catch (e) { this.show(`${e.code || "ERROR"}: ${e.message}`, true); } }); },
    setStatus(key, status) { return this.enqueue(async () => { try { readiness(); const ctx = resolveContext(), owned = ledger.records(ctx.eventId).get(key), map = clone(ctx.map); if (!owned || map[key]?.reference !== owned.reference) throw error("OWNERSHIP_CONFLICT", "This record is no longer owned at its original key/reference."); map[key].status = status; window.obgRt.injectMessage(makeEnvelope(ctx, map)); owned.record.status = status; this.show(`Updated ${owned.reference} status.`); this.render(ctx); } catch (e) { this.show(`${e.code || "ERROR"}: ${e.message}`, true); } }); },
    clear() { return this.enqueue(async () => { try { readiness(); const ctx = resolveContext(), map = clone(ctx.map); let changed = 0; for (const owned of ledger.records(ctx.eventId).values()) { const current = map[owned.key]; if (current?.reference !== owned.reference) throw error("OWNERSHIP_CONFLICT", "An owned record was replaced externally; Clear stopped without changing it."); current.status = STATUS.Cancelled; owned.record.status = STATUS.Cancelled; changed++; } if (changed) window.obgRt.injectMessage(makeEnvelope(ctx, map)); this.show(changed ? `Cancelled ${changed} owned records.` : "No owned records exist for this event."); this.render(ctx); } catch (e) { this.show(`${e.code || "ERROR"}: ${e.message}`, true); } }); },
    async demo() { if (demoAbort) return; demoAbort = new AbortController(); panel.querySelector("#tq-demo").disabled = true; panel.querySelector("#tq-stop").disabled = false; const steps = [[96,"none"],[107,"home"],[111,"away"],[119,"home"],[123,"home"],[121,"away"],[117,"home"],[106,"none"],[98,"none"],[108,"away"],[105,"none"]]; try { for (let i = 0; i < steps.length; i++) { if (demoAbort.signal.aborted) throw error("DEMO_STOPPED", "Demo stopped."); await this.add({ feed:"opta", type:String(steps[i][0]), delivery:"parent", period:i < 7 ? "1" : "2", minute:String(i * 5 + 1), second:"0", side:steps[i][1], value:"" }); await new Promise((resolve) => setTimeout(resolve, 80)); } this.show("Full demo delivery completed."); } catch (e) { this.show(`${e.code || "ERROR"}: ${e.message}`, true); } finally { demoAbort = undefined; panel.querySelector("#tq-demo").disabled = false; panel.querySelector("#tq-stop").disabled = true; } },
    stopDemo() { demoAbort?.abort(); },
  };
  panel = createPanel(app); app.refresh(); window[NS] = { version: VERSION, refresh: () => app.refresh(), catalog: CATALOG };
}
if (typeof window !== "undefined" && typeof document !== "undefined") {
  if (window[NS]) { if (window[NS].version !== VERSION) console.error("Timeline QA: a different version is already loaded; reload before injecting."); else window[NS].refresh(); } else bootstrap();
}

export { CATALOG, STATUS, USAGE, createLedger, formRecipe, recordInput, makeEnvelope };
