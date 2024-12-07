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
        path: 'list/:id',
        loadComponent: () =>
          import('./features/other-list/other-list.component').then(
            (m) => m.OtherListComponent
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
