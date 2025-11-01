import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import {provideHttpClient} from "@angular/common/http";
import {MatToolbar} from "@angular/material/toolbar";
import { Login } from './security/pages/login/login';
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ErrorSnackBar } from './shared/pages/error-snack-bar/error-snack-bar';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { HomePrincipal } from './core/pages/home-principal/home-principal';
import { HomeAdmin } from './core/pages/home-admin/home-admin';
import { PageNotFound } from './shared/pages/page-not-found/page-not-found';
import { ManageBranches } from './admin/pages/manage-branches/manage-branches';
import { HomeBranch } from './core/pages/home-branch/home-branch';
import {MatIcon} from "@angular/material/icon";
import { ProfilePrincipal } from './core/pages/profile-principal/profile-principal';
import { ProfileAdmin } from './core/pages/profile-admin/profile-admin';
import { ProfileBranch } from './core/pages/profile-branch/profile-branch';
import { DashboardPrincipal } from './core/pages/dashboard-principal/dashboard-principal';
import { DashboardAdmin } from './core/pages/dashboard-admin/dashboard-admin';
import { DashboardBranch } from './core/pages/dashboard-branch/dashboard-branch';
import { Register } from './security/pages/register/register';
import { VerifyAccount } from './security/pages/verify-account/verify-account';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { ForgetPassword } from './security/pages/forget-password/forget-password';
import {MatStepperModule} from "@angular/material/stepper";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import { CreateUserBranchDialog } from './admin/dialogs/create-user-branch.dialog/create-user-branch.dialog';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    App,
    Login,
    ErrorSnackBar,
    HomePrincipal,
    HomeAdmin,
    PageNotFound,
    ManageBranches,
    HomeBranch,
    ProfilePrincipal,
    ProfileAdmin,
    ProfileBranch,
    DashboardPrincipal,
    DashboardAdmin,
    DashboardBranch,
    Register,
    VerifyAccount,
    ForgetPassword,
    CreateUserBranchDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatButton,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatSnackBarModule,
    MatIcon,
    MatProgressSpinner,
    MatStepperModule,
    MatSidenavModule,
    MatTableModule,
    MatIconButton,
    MatCardModule,
    MatDivider,
    MatListModule,
    MatDialogModule,
    MatTabsModule
  ],
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
