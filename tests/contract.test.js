import test from "node:test";
import assert from "node:assert/strict";

globalThis.window = {};
const { CATALOG, STATUS, USAGE, createLedger, formRecipe, recordInput, makeEnvelope } = await import("../src/index.js");

test("catalog is a complete exact GameEvent sequence", () => {
  assert.equal(CATALOG.length, 47);
  assert.deepEqual(CATALOG.map(({ id }) => id), Array.from({ length: 47 }, (_, i) => i + 96));
  assert.equal(new Set(CATALOG.map(({ name }) => name)).size, 47);
  assert.equal(CATALOG[11].name, "GameEventGoal");
  assert.equal(CATALOG.at(-1).name, "GameEventCancelSubstitution");
});

test("normalized record uses dictionary contract and rejects unsafe values", () => {
  const record = recordInput({ type: 107, period: "1", minute: "12", second: "3", side: "home", participantId: "42", value: "1-0" }, { reference: "timeline-qa-test-1" });
  assert.deepEqual(record, { reference: "timeline-qa-test-1", eventPeriodId: 1, minute: 12, second: 3, participantId: 42, participantUsage: USAGE.HomeTeam, gameResultTypeId: 107, gameResultTypeName: "GameEventGoal", gameResultValue: "1-0", status: STATUS.Active });
  assert.throws(() => recordInput({ type: 107, period: 1, minute: 1, second: 60, side: "home", participantId: "2" }, { reference: "x" }), /0–59/);
});

test("envelope preserves fields and sends ts rather than obsolete gs", () => {
  const context = { eventId: "99", scoreboard: { scorePerParticipant: { 1: { score: 2 } }, statistics: { goals: { value: 2, metadata: { keep: true } } }, currentVarState: { active: false }, playerStatistics: { 5: { shots: 1 } }, expectedEventDuration: 90, expectedPeriodCount: 2, expectedPeriodDuration: 45, igps: { pi: 1, pss: 0 } } };
  const envelope = makeEnvelope(context, { 123: { reference: "foreign" } });
  assert.equal(envelope.id, "99"); assert.equal(envelope.t, 41); assert.ok("ts" in envelope.d); assert.ok(!("gs" in envelope.d));
  envelope.d.st.goals.metadata.keep = false;
  assert.equal(context.scoreboard.statistics.goals.metadata.keep, true);
});

test("complete goal is delivered as a flat root and direct scorer child", () => {
  const ledger = createLedger();
  const context = { eventId: "event-1", map: {}, home: { id: "1" }, away: { id: "2" }, players: [{ id: "10", label: "Home striker" }] };
  const recipe = formRecipe({ type: "107", delivery: "complete", period: "1", minute: "4", second: "0", side: "home", player: "10", value: "1-0" }, context, ledger);
  assert.equal(recipe.length, 2);
  assert.equal(recipe[0].record.gameResultTypeId, 107);
  assert.equal(recipe[1].record.gameResultTypeId, 109);
  assert.equal(recipe[1].record.relReference, recipe[0].record.reference);
  assert.notEqual(recipe[1].identity.key, recipe[0].identity.key);
});
