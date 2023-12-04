import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from "@app/views/tasks/task/task.component";
import {AuthGuard} from "@app/views/tasks/auth/guards/auth.guard";
import {SharedTasksComponent} from "@app/views/tasks/shared-tasks/shared-tasks.component";

const routes: Routes = [
    {
        path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'tasks', component: TaskComponent, data: {
            hidePageHeader: true
        }, canActivate: [AuthGuard]
    },
    {
        path: 'tasks/:uuid', component: SharedTasksComponent, data: {
            hidePageHeader: true
        }, canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {
}
