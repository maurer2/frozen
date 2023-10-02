import { z } from 'zod';

// http://login.wifionice.de/usage_info/

// todo: find out if number is remaining data volume or used data volume
export const usageInfoSchema = z.number().nonnegative().max(1);

export type UsageInfoNew = z.infer<typeof usageInfoSchema>;
