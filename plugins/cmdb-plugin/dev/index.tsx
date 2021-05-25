import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { cmdbPluginPlugin, CmdbPluginPage } from '../src/plugin';

createDevApp()
  .registerPlugin(cmdbPluginPlugin)
  .addPage({
    element: <CmdbPluginPage />,
    title: 'Root Page',
  })
  .render();
