import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../services/user/user.service";
import {catchError, forkJoin, map, of} from "rxjs";
import {ErrorMessage} from "../../shared/models/error-message";
import {ErrorSnackBar} from "../../shared/pages/error-snack-bar/error-snack-bar";
import {UserAuxService} from "../../shared/services/user-aux/user-aux.service";
import {CompanyService} from "../services/company/company.service";

export const tokenGuard: CanActivateFn = () => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const userService = inject(UserService);
  const companyService = inject(CompanyService);
  const userAuxService = inject(UserAuxService);

  if (localStorage.getItem('token')) {
    return forkJoin({
      userRes: userService.getObject(),
      companyRes: companyService.getObject()
    }).pipe(
      map((response) => {
        userAuxService.setUser(response.userRes.user);
        userAuxService.setCompany(response.companyRes.company);
        return true;
      }),
      catchError((error: ErrorMessage) => {
        localStorage.removeItem('token');
        snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
        return of(router.createUrlTree(['/login']));
      })
    );
  } else {
    return router.createUrlTree(['/login']);
  }
};
