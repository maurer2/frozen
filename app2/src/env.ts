import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const env = createEnv({
  clientPrefix: '',
  client: {
    URL_DEV: z.string(), // .url(),
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  runtimeEnv: import.meta.env,
});

export default env;
