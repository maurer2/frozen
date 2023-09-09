import { z } from "zod";

export const statusSchema = z
  // non-strict to ignore superfluous keys and future key additions
  .object({
    connection: z.boolean(),
    serviceLevel: z.enum(["AVAILABLE_SERVICE"]), // todo: find out about other values
    gpsStatus: z.enum(["VALID", "INVALID"]),
    internet: z.enum(["HIGH", "LOW"]),
    latitude: z.number(),
    longitude: z.number(),
    speed: z.number().nonnegative(),
    trainType: z.enum(["ICE", "IC"]),
    tzn: z.string().min(1), // train number
    wagonClass: z.enum(["FIRST", "SECOND"]),
  });

export type StatusNew = z.infer<typeof statusSchema>;
