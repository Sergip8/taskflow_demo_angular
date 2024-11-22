import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementRoutes, SettingRoutes, ViewRoutes } from './view.routes';
import { ProfileComponent } from './common/settings/profile/profile.component';
import { UsersComponent } from './common/settings/users/users.component';
import { AdminPageNotFoundComponent } from './common/page-not-found/admin-page-not-found.component';
import { TableComponent } from './common/elements/table/table.component';
import { TicketDetailsComponent } from './common/elements/ticket-details/ticket-details.component';
import { TicketsComponent } from './common/elements/tickets/ticket.component';
import { AppRoutes } from '../../app.routes';



const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Project+"/"+ ViewRoutes.Tickets,
    pathMatch: 'full',
  },

 
  {
    title: 'Projects',
    path: ViewRoutes.Project,
    children: [
      
      {
        title: 'ticket details',
        path: "details/:ticketId",
        component: TicketDetailsComponent,
      },
      {
        title: 'User stories',
        path: ":projectName/:projectId",
        component: TableComponent,
      },
      {
        title: 'tickets',
        path: ViewRoutes.Tickets,
        component: TicketsComponent,
      },
     
    ],
  },

  {
    path: ViewRoutes.Settings,
    children: [
      {
        title: 'Settings',
        path: SettingRoutes.Profile,
        component: ProfileComponent,
      },
      {
        title: 'Users',
        path: SettingRoutes.Users,
        component: UsersComponent,
      },
    ],
  },
  { path: '**', component: AdminPageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

