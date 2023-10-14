import type { Simplify } from 'type-fest';

import { z } from 'zod';

// https://iceportal.de/bap/api/config

const coachSchema = z.object({
  coachNumber: z.number().int().positive(),
  hasFirstClass: z.boolean(),
  hasSecondClass: z.boolean(),
});

const messageSchema = z.object({
  messageType: z.enum(['ERROR', 'HINT']),
  text: z.string().min(1),
  // messageType: z.union([z.literal('ERROR'), z.literal('HINT')]),
});

export const configSchema = z
  // non-strict to ignore superfluous keys and future key additions
  .object({
    coachList: z.object({
      coaches: z.array(coachSchema).nonempty(),
      errorMessage: messageSchema,
      hintMessage: messageSchema,
    }),
  });

export type ConfigNew = Simplify<z.infer<typeof configSchema>>;
