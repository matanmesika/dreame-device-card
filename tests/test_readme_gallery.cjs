const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const hacs = JSON.parse(fs.readFileSync(path.join(root, 'hacs.json'), 'utf8'));
const names = [
  'operation', 'status', 'maintenance', 'cleaning-settings', 'wash-dry-settings',
  'device-settings', 'advanced-settings', 'operation-he', 'status-he',
  'maintenance-he', 'operation-light', 'operation-h14',
];
const screenshotsUrl = 'https://raw.githubusercontent.com/matanmesika/dreame-device-card/main/docs/screenshots/';

test('Dreame company logo is first and gallery appears before installation instructions', () => {
  assert.match(readme, /^<img src="https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/f\/f9\/Logo_of_Dreame\.svg"/);
  assert(readme.indexOf('## Dashboard screenshots') > 0);
  assert(readme.indexOf('## Dashboard screenshots') < readme.indexOf('## Install manually through HACS'));
});

test('all twelve gallery images are present, referenced, and valid PNG files', () => {
  for (const name of names) {
    const filename = name + '.png';
    const p = path.join(root, 'docs', 'screenshots', filename);
    assert(fs.existsSync(p), 'Missing: ' + p);
    const signature = fs.readFileSync(p).subarray(0, 8);
    assert.equal(signature.toString('hex'), '89504e470d0a1a0a', 'PNG signature: ' + filename);
    assert(readme.includes('](' + screenshotsUrl + filename + ')'), 'Not embedded: ' + filename);
  }
});

test('HACS renders project README with the gallery', () => {
  assert.equal(hacs.render_readme, true);
});
