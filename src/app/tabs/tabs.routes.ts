import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'notes',
        loadComponent: () =>
          import('../tabs-menu/notes/notes.page').then((m) => m.NotesPage),
      },
      {
        path: 'labels',
        loadComponent: () =>
          import('../tabs-menu/labels/labels.page').then((m) => m.LabelsPage),
      },
      {
        path: 'trash',
        loadComponent: () =>
          import('../tabs-menu/trash/trash.page').then((m) => m.TrashPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../tabs-menu/settings/settings.page').then(
            (m) => m.SettingsPage
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/notes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/notes',
    pathMatch: 'full',
  },
];
