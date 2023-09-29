import { Zodios } from '@zodios/core';

import statusSchemaImport from '../../../api/schemas/status/status.js';
import type { StatusNew } from '../../../api/schemas/status/status.js';

const useAPI = async (url: string): Promise<StatusNew> => {
  const apiClient = new Zodios(url, [
    {
      method: 'get',
      path: '/status',
      alias: 'getStatusData',
      description: 'Get status data from api',
      response: statusSchemaImport.statusSchema,
    },
  ]);

  const statusData = await apiClient.getStatusData({});

  return statusData;
}

export default useAPI;
