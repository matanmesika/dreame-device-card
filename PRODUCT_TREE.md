# Dreame Device Card — standalone HACS Dashboard

This **repository root** contains the entire Dashboard product. It is
separate from the Dreame Wet & Dry integration.

```text
dreame-device-card/
├── .github/
│   └── workflows/
│       └── validate.yml             # JavaScript tests and HACS validation
├── dist/
│   └── dreame-device-card.js        # The actual installable Lovelace card
├── docs/
│   ├── CURRENT_UI.md                # Actual iPhone card UI specification
│   └── standalone-hacs.md           # HACS installation and release notes
├── examples/
│   ├── card.yaml                    # Minimal Lovelace configuration
│   └── dashboard.yaml               # Example dashboard
├── tests/
│   └── test_device_card.cjs         # Node.js behavior regressions
├── CHANGELOG.md
├── LICENSE
├── README.md
├── RELEASE_CHECKLIST.md
├── PRODUCT_TREE.md
├── info.md
├── hacs.json
├── package.json
└── .gitignore
```

HACS installs `dist/dreame-device-card.js` to
`www/community/dreame-device-card/dreame-device-card.js`. Its frontend
module URL is `/hacsfiles/dreame-device-card/dreame-device-card.js`.

The **integration** is a different repository:
https://github.com/matanmesika/dreame-wet-dry-vacuum-home-assistant.
Its platform mapping, cloud communication, `manifest.json`, and **Dreame
icon/logo assets** remain there; they are intentionally not copied here.

This card does not invent sensor values or commands. H15 mappings still need
real-device validation before a stable public release.
