import { type StatusNew, statusSchema } from './schemas/status/status.js';
import { type TripNew, tripSchema } from './schemas/trip/trip.js';
import { type UsageInfoNew } from './schemas/usage-info/usage-info.js';

// workaround until const import is implemented: https://github.com/microsoft/TypeScript/issues/32063
export const isStatusNew = (
  unknownObject: unknown,
): unknownObject is StatusNew => statusSchema.safeParse(unknownObject).success;

// eslint-disable-next-line arrow-body-style
export const isTripNew = (unknownObject: unknown): unknownObject is TripNew => {
  return tripSchema.safeParse(unknownObject).success;
};

export type TestResponse = {
  status: StatusNew | null;
  timestamp: number;
  trip: TripNew | null;
  usageInfo: UsageInfoNew | null;
};
