import { describe, expect, it } from 'vitest';

// import type { StatusNew } from "./status";
import JSONFile from '../../dumps/trip-pp9.json' assert { type: 'json' };
import { statusSchema } from './status.js';

describe('Status Schema', () => {
  it('should work with dumped json', () => {
    expect(() => statusSchema.parse(JSONFile)).not.toThrow();
  });
});
