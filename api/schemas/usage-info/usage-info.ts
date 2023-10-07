import { z } from 'zod';

// http://login.wifionice.de/usage_info/

// starts at 1 and goes up when using the wifi in 1st class
// starts at 1 and goes down when using the wifi in 2nd class(?)
export const usageInfoSchema = z.number().nonnegative();

export type UsageInfoNew = z.infer<typeof usageInfoSchema>;
