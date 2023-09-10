import { z } from "zod";

// http://login.wifionice.de/usage_info/

export const usageInfoSchema = z.number().nonnegative().max(1); // todo: find out if number is remaining data volume or used data volume

export type UsageInfoNew = z.infer<typeof usageInfoSchema>;
