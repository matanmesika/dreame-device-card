# Dreame Device Card — acceptance checklist

## HACS Custom Repository
- [x] Dedicated public repository `matanmesika/dreame-device-card` created
- [x] Product files moved to the repository **root**
- [x] `hacs.json` at root, with `filename: dreame-device-card.js`
- [x] Real `dist/dreame-device-card.js` exactly as previously tested
- [x] Source test suite and accurate H15 UI docs included
- [x] Brand icon/logo intentionally in the **integration**, not this card
- [x] GitHub Actions JavaScript and HACS validation passed on the standalone repository (2026-10-11)
- [ ] User confirms HACS can add this repo as **Dashboard** and load the card
- [ ] User confirms iPhone browser / mobile scroll behavior

## Stable public listing (not yet)
- [ ] Verify operation and maintenance services with physical H14 and H15
- [ ] Complete/confirm H15 mapping; no fake readbacks or controls
- [x] GitHub repository description and valid topics configured
- [ ] Publish a full GitHub Release following physical acceptance
- [ ] Request listing in the HACS public catalog only after required checks

## Safety
- Do not publish a stable release solely because automated CI passes.
- Do not upload private Home Assistant screenshots without permission.
- Keep this Dashboard independent of the integration and XPENG projects.

## Pre-release hardening
- [x] Reject manual write controls belonging to a different device
- [x] Clear stale overrides when changing selected devices
- [x] Include already-mapped but previously hidden H15 settings in menus
- [x] Prevent stale asynchronous operations from changing a new device's state
- [ ] Final hardening CI green on the exact committed changes
