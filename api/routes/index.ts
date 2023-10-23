import { z } from 'zod';

export const routesSchema = z
  .object({
    host: z.string().min(1),
    routes: z.record(
      z.string().min(1),
      z.object({
        pathname: z.string().min(1).startsWith('/'),
        savedApiResponse: z.string().min(1).endsWith('.json'),
      }),
    ),
  })
  .strict();

export type RoutesObject = z.infer<typeof routesSchema>;
export type Routes = RoutesObject['routes'];
export type Route = Routes[number];
