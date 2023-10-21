import { Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';

import { statusSchema } from '../../../api/schemas/status/status.js';
import { tripSchema } from '../../../api/schemas/trip/trip.js';

const useAPI = (url: string | URL) => {
  const apiClient = new Zodios(url.toString(), [
    // status
    {
      method: 'get',
      path: '/status',
      alias: 'getStatusData',
      description: 'Get status data',
      response: statusSchema,
    }, // satisfies ZodiosEndpointDefinition,
    // trip
    {
      method: 'get',
      path: '/tripInfo/trip',
      alias: 'getTripData',
      description: 'Get trip data',
      response: tripSchema,
    }, // satisfies ZodiosEndpointDefinition,
  ]);
  const apiHooks = new ZodiosHooks('ice', apiClient);

  return apiHooks;
};

export default useAPI;
