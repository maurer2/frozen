import { statusSchema, type StatusNew } from './schemas/status/status';
import { tripSchema, type TripNew } from './schemas/trip/trip';
import { type UsageInfoNew } from './schemas/usage-info/usage-info';

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
  trip: TripNew | null;
  usageInfo: UsageInfoNew | null;
  timestamp: number;
};
