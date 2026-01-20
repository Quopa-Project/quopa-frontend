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
import { ManageCourts } from './branch/pages/manage-courts/manage-courts';
import { CreateCourtDialog } from './branch/dialogs/create-court.dialog/create-court.dialog';
import {MatSelectModule} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import { HomeSuperadmin } from './core/pages/home-superadmin/home-superadmin';
import { DashboardSuperadmin } from './core/pages/dashboard-superadmin/dashboard-superadmin';
import { ManageCompanies } from './superadmin/pages/manage-companies/manage-companies';
import { CreateUserCompanyDialog } from './superadmin/dialogs/create-user-company.dialog/create-user-company.dialog';
import { ManageSports } from './superadmin/pages/manage-sports/manage-sports';
import { CreateSportDialog } from './superadmin/dialogs/create-sport.dialog/create-sport.dialog';
import { HomeClient } from './core/pages/home-client/home-client';
import { DashboardClient } from './core/pages/dashboard-client/dashboard-client';
import { ProfileClient } from './core/pages/profile-client/profile-client';
import { ProfileSuperadmin } from './core/pages/profile-superadmin/profile-superadmin';
import { BranchDetail } from './admin/pages/branch-detail/branch-detail';
import { FindCourts } from './client/pages/find-courts/find-courts';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import { CourtAvailability } from './branch/pages/court-availability/court-availability';
import { OpenReservations } from './client/pages/open-reservations/open-reservations';
import { BookCourt } from './client/pages/book-court/book-court';

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
    CreateUserBranchDialog,
    ManageCourts,
    CreateCourtDialog,
    HomeSuperadmin,
    DashboardSuperadmin,
    ManageCompanies,
    CreateUserCompanyDialog,
    ManageSports,
    CreateSportDialog,
    HomeClient,
    DashboardClient,
    ProfileClient,
    ProfileSuperadmin,
    BranchDetail,
    FindCourts,
    CourtAvailability,
    OpenReservations,
    BookCourt
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
    MatTabsModule,
    MatSelectModule,
    MatCheckbox,
    MatDatepickerModule
  ],
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE'}
  ],
  bootstrap: [App]
})
export class AppModule { }
