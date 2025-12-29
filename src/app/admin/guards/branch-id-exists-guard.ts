import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserAuxService} from "../../shared/services/user-aux/user-aux.service";
import {BranchService} from "../services/branch/branch.service";
import {catchError, map, of} from "rxjs";
import {ErrorMessage} from "../../shared/models/error-message";
import {ErrorSnackBar} from "../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSnackBar} from "@angular/material/snack-bar";

export const branchIdExistsGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const userAuxService = inject(UserAuxService);
  const branchService = inject(BranchService);

  const role = userAuxService.getUserRole();

  const branchIdParam = route.paramMap.get('id');
  const userCompanyId = userAuxService.getCompany().id;

  return branchService.getById(Number(branchIdParam)).pipe(
    map(response => {
      if (response.branch.company.id === userCompanyId) {
        return true;
      } else {
        return router.createUrlTree(['/home', role]);
      }
    }),
    catchError((error: ErrorMessage) => {
      snackBar.openFromComponent(ErrorSnackBar, {
        data: {
          messages: error.message
        },
        duration: 2000
      });
      return of(router.createUrlTree(['/home', role]));
    })
  );
};
