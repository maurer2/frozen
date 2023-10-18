import { z } from 'zod';

// https://iceportal.de/api1/rs/status

export const icePortalSchema = z
  .record(
    z.string()
      .min(1),
    z.string()
      .min(1)
      .startsWith('/'), // .url(),
  );

export type IcePortal = z.infer<typeof icePortalSchema>;
