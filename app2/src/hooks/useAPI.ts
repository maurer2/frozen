import { Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';

import statusSchemaImport from '../../../api/schemas/status/status.js';
import tripSchemaImport from '../../../api/schemas/trip/trip.js';

const useAPI = (url: string) => {
  const apiClient = new Zodios(url, [
    // status
    {
      method: 'get',
      path: '/status',
      alias: 'getStatusData',
      description: 'Get status data',
      response: statusSchemaImport.statusSchema,
    }, // satisfies ZodiosEndpointDefinition,
    // trip
    {
      method: 'get',
      path: '/trip',
      alias: 'getTripData',
      description: 'Get trip data',
      response: tripSchemaImport.tripSchema,
    }, // satisfies ZodiosEndpointDefinition,
  ]);
  const apiHooks = new ZodiosHooks('ice', apiClient);

  return apiHooks;
};

export default useAPI;
