import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('@app/core/layouts/unauthenticated-layout/unauthenticated-layout.module').then(m => m.UnauthenticatedModule)
  },
  {
    path: 'app',
    loadChildren: () => import('@app/core/layouts/authenticated-layout/authenticated-layout.module').then(m => m.AuthenticatedLayoutModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
