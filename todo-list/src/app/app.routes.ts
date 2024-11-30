import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'mainList',
        loadComponent: () =>
          import('./features/main-list/main-list.component').then(
            (m) => m.MainListComponent
          ),
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./features/tasks-list/tasks-list.component').then(
            (m) => m.TasksListComponent
          ),
      },
      {
        path: 'completed',
        loadComponent: () =>
          import('./features/completed-list/completed-list.component').then(
            (m) => m.CompletedListComponent
          ),
      },
      { path: '', redirectTo: '/mainList', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/mainList' },
];
