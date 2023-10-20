import { z } from 'zod';

// https://iceportal.de/api1/rs/tripInfo/trip

export const tripSchema = z.object({
  // loose mode to ignore unnecessary keys and keys that might be added in the future
  trip: z.object({
    actualPosition: z.number().nonnegative(),
    distanceFromLastStop: z.number().nonnegative(),
    stopInfo: z.object({
      actualLast: z.string(),
      actualLastStarted: z.string(),
      actualNext: z.string(),
      finalStationEvaNr: z.string(),
      finalStationName: z.string(),
      scheduledNext: z.string(),
    }),
    stops: z.array(
      z.object({
        delayReasons: z
          .array(
            z.object({
              code: z.string(),
              text: z.string(),
            }),
          )
          .nullable(),
        info: z.object({
          distance: z.number(),
          distanceFromStart: z.number(),
          // passed -> stop(s) before previous stop
          // arrived -> current stop, only shown when train is stopping at the station
          passed: z.boolean(),
          // departed -> previous stop
          positionStatus: z.enum(['future', 'passed', 'departed', 'arrived']),
          status: z.number(),
        }),
        station: z.object({
          code: z.string().nullable(),
          evaNr: z.string(),
          geocoordinates: z.object({
            latitude: z.number(),
            longitude: z.number(),
          }),
          name: z.string(),
        }),
        timetable: z.object({
          actualArrivalTime: z.number().nullable(),
          actualDepartureTime: z.number().nullable(),
          arrivalDelay: z.string(), // maybe .nullable()
          departureDelay: z.string(), // maybe .nullable()
          scheduledArrivalTime: z.number().nullable(),
          scheduledDepartureTime: z.number().nullable(),
          showActualArrivalTime: z.boolean().nullable(),
          showActualDepartureTime: z.boolean().nullable(),
        }),
        track: z.object({
          actual: z.string(),
          scheduled: z.string(),
        }),
      }),
    ),
    totalDistance: z.number().nonnegative(),
    trainType: z.enum(['ICE', 'IC']),
    tripDate: z.string(), // short date
    vzn: z.string(), // train number without type
  }),
});

export type TripNew = z.infer<typeof tripSchema>;
export type Stop = TripNew['trip']['stops'][number];
