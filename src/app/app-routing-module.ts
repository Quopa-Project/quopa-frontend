import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Login} from "./security/pages/login/login";
import {HomePrincipal} from "./core/pages/home-principal/home-principal";
import {PageNotFound} from "./shared/pages/page-not-found/page-not-found";
import {noTokenGuard} from "./security/guards/no-token-guard";
import {tokenGuard} from "./core/guards/token-guard";
import {ManageBranches} from "./admin/pages/manage-branches/manage-branches";

const routes: Routes = [
  { path: 'login', component: Login, canActivate: [noTokenGuard] },
  {
    path: 'home/:role',
    component: HomePrincipal,
    canActivate: [tokenGuard],
    children: [
      { path: 'manage-branches', component: ManageBranches },
      { path: '', redirectTo: 'manage-branches', pathMatch: 'full' },
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
