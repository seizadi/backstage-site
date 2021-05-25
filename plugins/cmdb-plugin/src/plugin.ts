import { createPlugin, createRoutableExtension } from '@backstage/core';

import { rootRouteRef } from './routes';

export const cmdbPluginPlugin = createPlugin({
  id: 'cmdb-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const CmdbPluginPage = cmdbPluginPlugin.provide(
  createRoutableExtension({
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
