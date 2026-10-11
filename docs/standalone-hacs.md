# HACS Dashboard installation and release procedure

The standalone repository is **matanmesika/dreame-device-card** and its
category is **Dashboard** (called `plugin` in the HACS backend).

## Installation from HACS now

1. Install and configure the **Dreame Wet & Dry integration** separately.
2. Home Assistant → HACS → three-dot menu → **Custom repositories**.
3. Repository URL: `https://github.com/matanmesika/dreame-device-card`.
   Type: **Dashboard**. Select **Add**.
4. Find **Dreame Wet & Dry Dashboard** and select **Download**.
   Without GitHub Releases, HACS installs the contents of `main`.
5. Verify the resource `/hacsfiles/dreame-device-card/dreame-device-card.js`
   is registered as JavaScript Module (HACS may add it automatically).
6. Add `type: custom:dreame-device-card` using the real HA entity registry.

Do not also register `/local/dreame-device-card.js` if the HACS resource
is loaded; duplicate card definitions are undesirable.

## Updates

Use HACS to download newer default-branch builds. When tagged GitHub
Releases exist, HACS can offer those too. A release is deliberately **not**
tagged until physical H14/H15 actions have been verified.

## Public catalog submission (later)

Being a usable **Custom Repository** does not mean being listed in HACS's
default public catalog. A stable GitHub Release, repository description,
topics, a validated HACS action and maintainer approval are needed before
requesting that listing in `hacs/default`.

## Current limitations

H15 Pro Heat entity mapping is still experimental; never interpret missing
`Unknown` readbacks as successful actions. Home Assistant controls are
shown only for entities exposed by the installed integration.

Source reference for card parity:
https://github.com/matanmesika/dreame-wet-dry-vacuum-home-assistant/tree/release/dreame-card-standalone-prep/dashboard-release


## GitHub metadata check (for HACS validation)

The repository **About** section must contain a description and accurate
GitHub topics. Recommended topics: `home-assistant`, `hacs`,
`lovelace`, `dashboard`, `dreame`, `custom-card` and `vacuum`.

Avoid mistyped topic labels such as `deshboard` or `lovlace-card`.
These metadata fields are set through the GitHub repository About editor;
they are not controlled by `hacs.json`.

The HACS validation action can be rerun from GitHub Actions. A passing
GitHub Action verifies metadata and distribution layout; it does not
replace a real-device H14/H15 test or automatic public HACS listing.
