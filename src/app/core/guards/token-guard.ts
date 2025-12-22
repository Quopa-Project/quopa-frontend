import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../services/user/user.service";
import {catchError, map, of, switchMap} from "rxjs";
import {ErrorMessage} from "../../shared/models/error-message";
import {ErrorSnackBar} from "../../shared/pages/error-snack-bar/error-snack-bar";
import {UserAuxService} from "../../shared/services/user-aux/user-aux.service";
import {CompanyService} from "../services/company/company.service";
import {BranchService} from "../../admin/services/branch/branch.service";

export const tokenGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const userService = inject(UserService);
  const companyService = inject(CompanyService);
  const branchService = inject(BranchService);
  const userAuxService = inject(UserAuxService);

  if (localStorage.getItem('token')) {
    const roleParam = route.parent?.paramMap.get('role');

    return userService.getObject().pipe(
      switchMap(response => {
        userAuxService.setUser(response.user);

        const role = roleParam ?? response.user.role;

        if (role === 'ADMIN') {
          return companyService.getObject().pipe(
            map(companyResponse => {
              userAuxService.setCompany(companyResponse.company);
              return true;
            })
          );
        } else if (role === 'BRANCH') {
          return branchService.getObject().pipe(
            map(branchResponse => {
              userAuxService.setBranch(branchResponse.branch);
              return true;
            })
          );
        } else {
          return of(true);
        }
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
