# Timeline QA Tool v0.1.69

This bookmarklet-loadable script is a state-only normalized realtime feed simulator. It sends football Timeline records through `window.obgRt.injectMessage`; it does not create a tab, copy Timeline UI, alter startup configuration, or render incidents itself.

Before app startup, use a DevTools Local Override for `config.json` and set `sportsbook.event.incidentsTimeline.enabled` to the boolean `true`. If `obgState`/`obgRt` are not exposed, use **Expose state + RT and reload**, then manually load the bookmarklet again.

The simulator always re-reads current state and sends a complete `ts` map, preserving foreign incidents and scoreboard fields. Clear changes only exact key/reference pairs owned by this page session. It cancels rather than deletes them. Score and provider-specific advanced scenarios remain blocked until their runtime contract can be verified.

## Local development

```powershell
npm.cmd ci
npm.cmd run test:contract
npm.cmd run build
```

`npm run build` generates the public `timeline-qa-tool.js` and a clean `site/` staging directory. Publication is intentionally outside this repository workflow.
