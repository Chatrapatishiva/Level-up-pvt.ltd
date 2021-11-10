import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTeamComponent } from './view-team/view-team.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from "./auth-guard/auth.guard";
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create-team',
    component: CreateTeamComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-team',
    component: ViewTeamComponent,
    canActivate: [AuthGuard]

  },
  {
    path        : '**',
    pathMatch   : 'full',
    component   : PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
