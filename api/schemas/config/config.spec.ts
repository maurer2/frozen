import { describe, expect, it } from 'vitest';

import JSONFile from '../../saved-api-responses/config-uQYFvhUEt6kYHWNTPjDY5.json';
import { configSchema } from './config';

describe('Config Schema', () => {
  it('should work with dumped json', () => {
    expect(() => configSchema.parse(JSONFile)).not.toThrow();
  });
});
