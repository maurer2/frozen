import { Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';

import { statusSchema } from '../../../api/schemas/status/status.js';
import { tripSchema } from '../../../api/schemas/trip/trip.js';

const useAPI = (url: URL | string) => {
  const apiClient = new Zodios(url.toString(), [
    // status
    {
      alias: 'getStatusData',
      description: 'Get status data',
      method: 'get',
      path: '/status',
      response: statusSchema,
    }, // satisfies ZodiosEndpointDefinition,
    // trip
    {
      alias: 'getTripData',
      description: 'Get trip data',
      method: 'get',
      path: '/tripInfo/trip',
      response: tripSchema,
    }, // satisfies ZodiosEndpointDefinition,
  ]);
  const apiHooks = new ZodiosHooks('ice', apiClient);

  return apiHooks;
};

export default useAPI;
