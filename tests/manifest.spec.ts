// @vitest-environment node
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('manifest icons', () => {
  it('includes maskable icons', () => {
    const manifestPath = path.resolve('public/manifest.webmanifest');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    const icons = manifest.icons || [];
    const hasMaskable = icons.some((i: any) => typeof i.purpose === 'string' && i.purpose.includes('maskable'));
    expect(hasMaskable).toBe(true);
  });
});
