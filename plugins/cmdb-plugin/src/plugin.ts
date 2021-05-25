import {createApiFactory, createPlugin, createRoutableExtension, discoveryApiRef} from '@backstage/core';

import { rootRouteRef } from './routes';
import {cmdbApiRef, CmdbClient} from "./api";

export const cmdbPluginPlugin = createPlugin({
    id: 'cmdb-plugin',
    apis: [
        createApiFactory({
            api: cmdbApiRef,
            deps: { discoveryApi: discoveryApiRef },
            factory: ({ discoveryApi }) => new CmdbClient({ discoveryApi }),
        }),
    ],
    routes: {
        root: rootRouteRef,
    },
});

export const CmdbPluginPage = cmdbPluginPlugin.provide(
  createRoutableExtension({
    component: () =>
      import('./components/CmdbComponent').then(m => m.CmdbComponent),
    mountPoint: rootRouteRef,
  }),
);
