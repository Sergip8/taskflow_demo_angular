import { Routes } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { HomeComponent } from './components/public/home/home.component';
import { PublicComponent } from './components/public/public.component';
import { hasRoleGuard } from './common/guard/has-role';


export enum AppRoutes{
    Project = "project",
    Home = "",
    Dashboard = "dashboard"

}
export enum Role{
  ROLE_USER = "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN",
}

export const routes: Routes = [
    {path: AppRoutes.Home,
        component: PublicComponent,
      loadChildren: () => import('./components/public/public.module').then((m) => m.PublicModule)
    },
    {
        path: AppRoutes.Dashboard,
        component: ViewComponent,
        canActivate : [hasRoleGuard],
        data:{
          roles: [Role.ROLE_ADMIN, Role.ROLE_USER]
        },
        loadChildren: () => import('./components/view/view.module').then((m) => m.ViewModule),
      },
];
