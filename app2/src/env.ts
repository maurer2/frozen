/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const dirname = path.dirname(fileURLToPath(import.meta.url));
config({ debug: true, path: path.resolve(dirname, '../../.env') });
// console.log(path.resolve(dirname, '../../.env'));

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
