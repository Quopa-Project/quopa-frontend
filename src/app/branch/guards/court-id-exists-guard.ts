import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserAuxService} from "../../shared/services/user-aux/user-aux.service";
import {catchError, map, of} from "rxjs";
import {ErrorMessage} from "../../shared/models/error-message";
import {ErrorSnackBar} from "../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CourtService} from "../services/court/court.service";

export const courtIdExistsGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const userAuxService = inject(UserAuxService);
  const courtService = inject(CourtService);

  const role = userAuxService.getUserRole();

  const courtIdParam = route.paramMap.get('id');
  const userBranchId = userAuxService.getBranch().id;

  return courtService.getById(Number(courtIdParam)).pipe(
    map(response => {
      if (response.court.branch.id === userBranchId) {
        userAuxService.setCourt(response.court);
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
