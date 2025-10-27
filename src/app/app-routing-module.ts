import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Login} from "./security/pages/login/login";
import {HomePrincipal} from "./core/pages/home-principal/home-principal";
import {PageNotFound} from "./shared/pages/page-not-found/page-not-found";
import {noTokenGuard} from "./security/guards/no-token-guard";
import {tokenGuard} from "./core/guards/token-guard";
import {ManageBranches} from "./admin/pages/manage-branches/manage-branches";
import {ProfilePrincipal} from "./core/pages/profile-principal/profile-principal";
import {DashboardPrincipal} from "./core/pages/dashboard-principal/dashboard-principal";
import {adminRoleGuard} from "./core/guards/admin-role-guard";
import {correctRoleGuard} from "./core/guards/correct-role-guard";
import {Register} from "./security/pages/register/register";

const routes: Routes = [
  { path: 'login', component: Login, canActivate: [noTokenGuard] },
  { path: 'register', component: Register, canActivate: [noTokenGuard] },
  {
    path: 'home/:role',
    component: HomePrincipal,
    canActivate: [tokenGuard],
    children: [
      { path: 'dashboard', component: DashboardPrincipal, canActivate: [correctRoleGuard] },
      { path: 'manage-branches', component: ManageBranches, canActivate: [correctRoleGuard, adminRoleGuard] },
      { path: 'profile', component: ProfilePrincipal, canActivate: [correctRoleGuard] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
