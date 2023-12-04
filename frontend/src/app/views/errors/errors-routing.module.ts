import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error1Component } from './error-1/error-1.component';
import { Error504Component } from './error-504/error-504.component';

const routes: Routes = [
    {
        path: 'error-1',
        component: Error1Component
    },
    {
        path: '504',
        component: Error504Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ErrorsRoutingModule { }
