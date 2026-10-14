# Dreame Wet & Dry Dashboard

## Install manually through HACS

[![Add Dreame Device Card to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=matanmesika&repository=dreame-device-card&category=plugin)

**[Open the HACS custom repository shortcut](https://my.home-assistant.io/redirect/hacs_repository/?owner=matanmesika&repository=dreame-device-card&category=plugin)** · [GitHub repository](https://github.com/matanmesika/dreame-device-card)

If the shortcut does not open, in Home Assistant go to **HACS → ⋮ → Custom repositories**, paste `https://github.com/matanmesika/dreame-device-card`, select **Dashboard**, and press **Add**. Then locate and download the repository in HACS. This is a custom repository, not necessarily listed in the default HACS catalog.

## Real project visuals

![Dreame Device Card — existing project asset](https://raw.githubusercontent.com/matanmesika/dreame-wet-dry-vacuum-home-assistant/main/custom_components/dreame_wet_dry_vacuum/brand/logo.png)

The image above is the Dreame brand logo already used by the companion integration, not a screenshot. Verified screenshots of the actual card are not yet available for publication.

**A standalone Home Assistant Lovelace card for supported Dreame wet & dry vacuum entities.**

![Dreame Wet & Dry wordmark — integration branding only, not a dashboard screenshot](https://raw.githubusercontent.com/matanmesika/dreame-wet-dry-vacuum-home-assistant/main/custom_components/dreame_wet_dry_vacuum/brand/logo.png)

<sub>Dreame brand image from the separate integration repository, shown only
to identify the product. This is **not a dashboard screenshot**. The actual
card's design is described in [CURRENT_UI.md](docs/CURRENT_UI.md).
This standalone card does not bundle the Dreame brand image.</sub>

> **HACS CUSTOM REPOSITORY — v0.1.0-alpha.1.** This is the separate, installable **Dashboard** repository for `dreame-device-card`. It is **not yet listed in the public HACS catalog** and is not a stable H15 release. The card is unofficial and is not affiliated with Dreame. Integration branding belongs to the underlying Dreame integration, not this card.

**Actual UI:** The card displays the Dreame Wet & Dry header, H15 Pro Heat status and battery/connection badges, a round vacuum illustration, **Operation / Device status / Maintenance** tabs, and expandable setting groups. Its colors and panel surfaces inherit your Home Assistant theme. See [the real-card UI specification](docs/CURRENT_UI.md), based on the owner's iPhone screenshot. The screenshot is intentionally not uploaded publicly.

## What the dashboard does

The card shows existing Home Assistant entities belonging to the selected Dreame device. It does **not** query the Dreame cloud, create sensors or reinterpret unknown H15 values. It also does not install or replace the underlying integration.

| Screen | What you can see / do |
| --- | --- |
| **Operation** | Start/stop supported self-cleaning or drying, review cleaning/water/suction choices, and open device settings. Select options before confirming; offline controls are disabled. Only controls exposed by the installed integration are available. |
| **Device status** | Read battery level, connection, charging, current work state, cleaning and drying progress (when actually reported), and available working statistics. Unknown data is not shown as zero or as a successful action. |
| **Maintenance** | Inspect reported water-tank warnings, filter and roller-brush life, service alerts, and reset controls. Resets require an explicit confirmation and do not fake a successful reset before state feedback arrives. |

### Operation

The first tab prioritizes daily operation. Cleaning/wash/dry, return-to-wash, scheduling, temperature and arm settings are grouped to avoid a long control panel. They appear only when the integration provides matching device entities. Unsupported and unavailable actions are not offered as working capabilities.

### Device status

Status is driven by Home Assistant state and the integration's device/entity registry. Battery, progress, and activity are only rendered from data supplied by the installed device integration. The visual style follows Home Assistant light/dark theme variables. On iPhone/narrow viewports, card content scrolls with the page instead of clipping its final settings inside an internal 340px scroll panel.

### Maintenance

The maintenance tab covers filter and front roller-brush lifetime, water warnings, and faults. A remaining **percentage** is shown only when a valid device maximum is known. Missing tank-level telemetry is **not** inferred from the absence of an alarm. Reset actions have a confirmation step.

## Compatibility and limitations

- The card is intended for models represented by the [Dreame Wet & Dry integration](https://github.com/matanmesika/dreame-wet-dry-vacuum-home-assistant). The visual editor provides **H14**, **H15**, or automatic model selection.
- **H15 Pro Heat** (`dreame.hold.w2449e`) mapping is incomplete and still experimental. Some write actions, alert meanings, and readbacks require physical confirmation.
- Existing H14 mappings are preserved by the *integration*; the card does not change integration-side mappings.
- Device/entity registry access is needed for automatic selection; individual entities can be explicitly configured in the editor. With a specific device selected, **write-capable controls must belong to that Dreame device**; read-only helper sensors may be overridden for display.
- No phone/browser/live Home Assistant acceptance test has been recorded for this release candidate. A green unit-test run is not equivalent to an end-to-end test.

## Install and update through HACS (recommended)

**Install the Dreame Wet & Dry Home Assistant integration first.**
The Dashboard card displays that integration's existing entities; it does
not add sensors or replace its cloud/local connection.

1. In Home Assistant, open **HACS → ⋮ → Custom repositories**.
2. Enter **`https://github.com/matanmesika/dreame-device-card`**.
3. Select the type **Dashboard**, then choose **Add**.
4. Find **Dreame Wet & Dry Dashboard** in HACS and select **Download**.
   HACS can install the latest `main` branch even when no GitHub Release
   is published. This is a pre-release build.
5. Check **Settings → Dashboards → ⋮ → Resources**. HACS typically registers
   the JavaScript module for you. If it did not, add
   **`/hacsfiles/dreame-device-card/dreame-device-card.js`** as a
   **JavaScript module** (do not register a second resource if already present).
6. Refresh Home Assistant or restart the mobile companion app if it previously
   cached another version. Add this card to your dashboard:

```yaml
type: custom:dreame-device-card
model: H15
language: en
title: H15 Pro Heat
# device_id: YOUR_REAL_HOME_ASSISTANT_DEVICE_ID  # Optional
```

For H14 use `model: H14`; choose `model: auto` only when the integration
can identify your device. Set `language: he` for Hebrew. Use
[examples/card.yaml](examples/card.yaml) or the built-in visual editor to
configure only **real** HA device/entity IDs.

**Updates:** After this repository is added, updates to the default branch
can be downloaded again through HACS; no manual JS copying is necessary.
No release or versioned stability guarantee is implied. The card must be tested on real H15/H14 devices before tagging a stable release.

### Manual fallback (only when HACS is unavailable)

Copy `dist/dreame-device-card.js` to `<config>/www/dreame-device-card.js`
and add `/local/dreame-device-card.js` as a JavaScript module under
Dashboards → Resources. **Do not load both manual and HACS resource URLs**
for the same custom element, or you may see duplicate-registration errors.

## Quality and release policy

```sh
node --check dist/dreame-device-card.js\nnode --test tests/test_device_card.cjs
node --test tests/test_device_card.cjs
```

- The distributed `dist/dreame-device-card.js` was copied directly from the tested `www/dreame-device-card.js` in the source development branch. The standalone Node tests target the actual distributed file.
- GitHub Actions test both the JavaScript syntax and the card behavior. HACS repository acceptance is checked separately from physical H15 device validation.
- Review model selection, English/Hebrew layouts, the three tabs, iOS scroll handling, service command safety, and the maintenance reset dialog on a running Home Assistant.
- The original schematic SVG images have been removed because they did not match the actual interface. See [docs/CURRENT_UI.md](docs/CURRENT_UI.md) for a faithful layout and explicit separation of the outer dashboard and card. Add a real, redacted screenshot only with explicit publication permission.
- **Integration branding is not part of this card:** the logo/icon belongs in the installed integration at `custom_components/dreame_wet_dry_vacuum/brand/icon.png` (with `icon@2x.png` for high-density displays). The dashboard release package deliberately omits these brand assets.

## Privacy, support and contribution

The card runs within Home Assistant and uses the supplied `hass` state and service methods; it does not itself send credentials or telemetry to a separate cloud API. The underlying integration is a separate project and may communicate with Dreame's cloud. Do not include personal credentials or device identifiers in screenshots or issue reports. This card is maintained here; the [Dreame Wet & Dry integration](https://github.com/matanmesika/dreame-wet-dry-vacuum-home-assistant) is developed separately.

---

## עברית — בקצרה

זהו כרטיס דשבורד ל־Home Assistant המיועד למכשירי Dreame Wet & Dry נתמכים, עם **שלוש לשוניות: תפעול, מצב המכשיר ותחזוקה**. הכרטיס משתמש בישויות האמיתיות של האינטגרציה; הוא אינו ממציא חיישנים ואינו משנה את מיפויי המכשיר. ניתן לבחור `language: he`, ואת דגם H14 או H15 בעורך.

האייקון והלוגו שייכים לאינטגרציה עצמה, תחת `custom_components/dreame_wet_dry_vacuum/brand/`. חבילת הדשבורד אינה מכילה לוגו נפרד.

**חשוב:** המיפוי של H15 עדיין ניסיוני וחלקו דורש אימות מול מכשיר אמיתי. הסרנו את תמונות ההמחשה שלא התאימו לממשק האמיתי. תיאור הפריסה המעודכן נמצא בקובץ `docs/CURRENT_UI.md`; צילום המסך האישי לא פורסם ב־GitHub. אפשר להתקין את הכרטיס דרך HACS באמצעות הוספת המאגר הזה כ־Custom Repository מסוג Dashboard. הכרטיס עדיין בשלב בדיקות וללא גרסת Release יציבה.
