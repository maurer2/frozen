import { z } from "zod";

// https://iceportal.de/api1/rs/tripInfo/trip

export const tripSchema = z.object({
  // loose mode to ignore unnecessary keys and keys that might be added in the future
  trip: z.object({
    tripDate: z.string(), // short date
    trainType: z.enum(["ICE", "IC"]),
    vzn: z.string(), // train number without type
    actualPosition: z.number().nonnegative(),
    distanceFromLastStop: z.number().nonnegative(),
    totalDistance: z.number().nonnegative(),
    stopInfo: z.object({
      scheduledNext: z.string(),
      actualNext: z.string(),
      actualLast: z.string(),
      actualLastStarted: z.string(),
      finalStationName: z.string(),
      finalStationEvaNr: z.string(),
    }),
    stops: z.array(
      z.object({
        station: z.object({
          evaNr: z.string(),
          name: z.string(),
          code: z.string().nullable(),
          geocoordinates: z.object({
            latitude: z.number(),
            longitude: z.number(),
          }),
        }),
        timetable: z.object({
          scheduledArrivalTime: z.number().nullable(),
          actualArrivalTime: z.number().nullable(),
          showActualArrivalTime: z.boolean().nullable(),
          arrivalDelay: z.string(), // maybe .nullable()
          scheduledDepartureTime: z.number().nullable(),
          actualDepartureTime: z.number().nullable(),
          showActualDepartureTime: z.boolean().nullable(),
          departureDelay: z.string(), // maybe .nullable()
        }),
        track: z.object({
          scheduled: z.string(),
          actual: z.string(),
        }),
        info: z.object({
          status: z.number(),
          passed: z.boolean(),
          positionStatus: z.enum(["future", "passed", "departed"]), // departed -> previous stop // passed -> stops before previous stop
          distance: z.number(),
          distanceFromStart: z.number(),
        }),
        delayReasons: z.array(
          z.object({
            code: z.string(),
            text: z.string(),
          })
        ).nullable(),
      })
    ),
  }),
});

export type TripNew = z.infer<typeof tripSchema>;
