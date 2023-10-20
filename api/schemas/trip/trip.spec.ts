import { describe, expect, it } from 'vitest';

import JSONFile from '../../dumps/status-00p.json' assert { type: 'json' };
import { tripSchema } from './trip.js';

describe('Trip Schema', () => {
  it('should work with dumped json', () => {
    expect(() => tripSchema.parse(JSONFile)).not.toThrow();
  });
});
