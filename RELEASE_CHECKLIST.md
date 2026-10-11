# Dreame Device Card — acceptance checklist

## HACS Custom Repository
- [x] Dedicated public repository `matanmesika/dreame-device-card` created
- [x] Product files moved to the repository **root**
- [x] `hacs.json` at root, with `filename: dreame-device-card.js`
- [x] Real `dist/dreame-device-card.js` exactly as previously tested
- [x] Source test suite and accurate H15 UI docs included
- [x] Brand icon/logo intentionally in the **integration**, not this card
- [ ] GitHub Actions validation passes on this new repository
- [ ] User confirms HACS can add this repo as **Dashboard** and load the card
- [ ] User confirms iPhone browser / mobile scroll behavior

## Stable public listing (not yet)
- [ ] Verify operation and maintenance services with physical H14 and H15
- [ ] Complete/confirm H15 mapping; no fake readbacks or controls
- [ ] Add GitHub repository description and topics (via repository settings)
- [ ] Publish a full GitHub Release following physical acceptance
- [ ] Request listing in the HACS public catalog only after required checks

## Safety
- Do not publish a stable release solely because automated CI passes.
- Do not upload private Home Assistant screenshots without permission.
- Keep this Dashboard independent of the integration and XPENG projects.
