import { Zodios } from '@zodios/core';

// import { statusSchema} from '../../../api/schemas/status/status.js'; // todo fix
import type { StatusNew } from '../../../api/schemas/status/status.js';

import { z } from "zod";

// https://iceportal.de/api1/rs/status

// temp workaround
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
    tzn: z.string().min(2), // train number with train type
    wagonClass: z.enum(["FIRST", "SECOND"]),
    serverTime: z.number(),
  });

const useAPI = async (url: string): Promise<StatusNew> => {
  const apiClient = new Zodios(url, [
    {
      method: 'get',
      path: '/status',
      alias: 'getStatusData',
      description: 'Get status data from api',
      response: statusSchema,
    },
  ]);

  const statusData = await apiClient.getStatusData({});

  return statusData;
}

export default useAPI;
