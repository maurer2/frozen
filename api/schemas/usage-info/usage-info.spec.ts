import { describe, expect, it } from 'vitest';

// import type { StatusNew } from "./status";
import JSONFile from '../../dumps/usage_info-f8r.json' assert { type: 'json' };
import { usageInfoSchema } from './usage-info.js';

describe('UsageInfo Schema', () => {
  it('should work with dumped json', () => {
    expect(() => usageInfoSchema.parse(JSONFile)).not.toThrow();
  });
});
