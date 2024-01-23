import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthenticatedLayoutComponent } from './unauthenticated-layout.component';

const routes: Routes = [
    {
        path: '',
        component: UnauthenticatedLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('@app/features/landing/landing.module').then(m => m.LandingModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnauthenticatedRoutingModule { }