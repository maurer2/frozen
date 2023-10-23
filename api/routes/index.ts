import { z } from 'zod';
// import routesIcePortal from './iceportal.json' assert { type: 'json' };
// import routesWifionice from './wifionice.json' assert { type: 'json' };

export const routesSchema = z
  .object({
    host: z.string().min(1),
    pathnames: z.record(
      z.string().min(1),
      z.string().min(1).startsWith('/'),
    ),
    savedApiResponses: z.record(
      z.string().min(1),
      z.string().min(1).endsWith('./json'),
    ),
  })
  .strict();

export type Routes = z.infer<typeof routesSchema>;
