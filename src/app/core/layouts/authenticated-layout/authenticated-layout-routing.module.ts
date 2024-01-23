import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedLayoutComponent } from './authenticated-layout.component';

const routes: Routes = [
    {
        path: '',
        component: AuthenticatedLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('@app/features/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'wishlist',
                loadChildren: () => import('@app/features/wishlist/wishlist.module').then(m => m.WishlistModule)
            },
            {
                path: 'cart',
                loadChildren: () => import('@app/features/cart/cart.module').then(m => m.CartModule)
            },
            {
                path: 'course-details',
                loadChildren: () => import('@app/features/course-details/course-details.module').then(m => m.CourseDetailsModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('@app/features/profile/profile.module').then(m => m.ProfileModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticatedLayoutRoutingModule { }