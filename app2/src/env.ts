/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const env = createEnv({
  clientPrefix: '',
  client: {
    URL: z.string().url(),
    PORT: z.coerce.number().positive(),
  },
  // @ts-ignore
  runtimeEnv: import.meta.env,
});

export default env;
