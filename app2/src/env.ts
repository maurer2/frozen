/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createEnv } from '@t3-oss/env-core';
import { config } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const dirname = path.dirname(fileURLToPath(import.meta.url));
config({ debug: true, path: path.resolve(dirname, '../../.env') });
// console.log(path.resolve(dirname, '../../.env'));

const env = createEnv({
  client: {
    PORT: z.coerce.number().positive(),
    URL: z.string().url(),
  },
  clientPrefix: '',
  // @ts-ignore
  runtimeEnv: import.meta.env,
});

export default env;
