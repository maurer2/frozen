/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const env = createEnv({
  clientPrefix: '',
  client: {
    URL_DEV: z.string().url(),
    PORT_DEV: z.coerce.number(),
  },
  // @ts-ignore
  runtimeEnv: import.meta.env,
});

export default env;
