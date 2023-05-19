import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home',
        loadChildren: () => import('./presentation/pages/home/home.module').then(m => m.HomeModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'inventory',
        loadChildren: () => import('./presentation/pages/inventory/inventory.module').then(m => m.InventoryModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'reports',
        loadChildren: () => import('./presentation/pages/reports/reports.module').then(m => m.ReportsModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'billing',
        loadChildren: () => import('./presentation/pages/billing/billing.module').then(m => m.BillingModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./presentation/pages/profile/profile.module').then(m => m.ProfileModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {path: 'login', loadChildren: () => import('./presentation/pages/login/login.module').then(m => m.LoginModule)},
    {
        path: 'registration',
        loadChildren: () => import('./presentation/pages/registration/registration.module').then(m => m.RegistrationModule)
    },
    {
        path: '**',
        loadChildren: () => import('./presentation/pages/not-found/not-found.module').then(m => m.NotFoundModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
