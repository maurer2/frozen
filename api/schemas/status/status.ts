import { z } from 'zod';

// https://iceportal.de/api1/rs/status

export const statusSchema = z
  // non-strict to ignore superfluous keys and future key additions
  .object({
    connection: z.boolean(),
    gpsStatus: z.enum(['VALID', 'INVALID']),
    internet: z.enum(['HIGH', 'LOW']),
    latitude: z.number(),
    longitude: z.number(),
    serverTime: z.number(),
    serviceLevel: z.enum(['AVAILABLE_SERVICE']), // todo: find out about other values
    speed: z.number().nonnegative(),
    trainType: z.enum(['ICE', 'IC']),
    tzn: z.string().min(2), // train number with train type
    wagonClass: z.enum(['FIRST', 'SECOND']),
  });

export type StatusNew = z.infer<typeof statusSchema>;
