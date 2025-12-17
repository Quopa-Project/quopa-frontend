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
import {adminRoleGuard} from "./admin/guards/admin-role-guard";
import {correctRoleGuard} from "./core/guards/correct-role-guard";
import {Register} from "./security/pages/register/register";
import {VerifyAccount} from "./security/pages/verify-account/verify-account";
import {ForgetPassword} from "./security/pages/forget-password/forget-password";
import {ManageCourts} from "./branch/pages/manage-courts/manage-courts";
import {branchRoleGuard} from "./branch/guards/branch-role-guard";
import {ManageCompanies} from "./superadmin/pages/manage-companies/manage-companies";
import {superadminRoleGuard} from "./superadmin/guards/superadmin-role-guard";
import {ManageSports} from "./superadmin/pages/manage-sports/manage-sports";

const routes: Routes = [
  { path: 'login', component: Login, canActivate: [noTokenGuard] },
  { path: 'register', component: Register, canActivate: [noTokenGuard] },
  { path: 'account-verification/:token', component: VerifyAccount, canActivate: [noTokenGuard] },
  { path: 'forget-password', component: ForgetPassword, canActivate: [noTokenGuard] },
  {
    path: 'home/:role',
    component: HomePrincipal,
    canActivate: [tokenGuard],
    children: [
      { path: 'dashboard', component: DashboardPrincipal, canActivate: [correctRoleGuard] },
      { path: 'profile', component: ProfilePrincipal, canActivate: [correctRoleGuard] },

      { path: 'manage-companies', component: ManageCompanies, canActivate: [correctRoleGuard, superadminRoleGuard] },
      { path: 'manage-sports', component: ManageSports, canActivate: [correctRoleGuard, superadminRoleGuard] },

      { path: 'manage-branches', component: ManageBranches, canActivate: [correctRoleGuard, adminRoleGuard] },

      { path: 'manage-courts', component: ManageCourts, canActivate: [correctRoleGuard, branchRoleGuard] },

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
