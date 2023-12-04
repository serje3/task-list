import {Routes} from '@angular/router';

export const APP_LAYOUT_ROUTES: Routes = [

  {
    path: '',
    loadChildren: () => import('@app/views/tasks/tasks.module').then(m => m.TasksModule)
  },
];
