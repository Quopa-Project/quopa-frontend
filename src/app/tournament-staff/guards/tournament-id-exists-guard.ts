import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserAuxService} from "../../shared/services/user-aux/user-aux.service";
import {catchError, map, of} from "rxjs";
import {ErrorMessage} from "../../shared/models/error-message";
import {ErrorSnackBar} from "../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TournamentService} from "../../superadmin/services/tournament/tournament.service";

export const tournamentIdExistsGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const userAuxService = inject(UserAuxService);
  const tournamentService = inject(TournamentService);

  const role = userAuxService.getUserRole();

  const tournamentIdParam = route.paramMap.get('id');
  const userId = userAuxService.getUser().id;

  return tournamentService.getByIdAndUserId(Number(tournamentIdParam), userId).pipe(
    map(response => {
      userAuxService.setTournamentDetail(response.tournament)
      return true;
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
