import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserAuxService} from "../../shared/services/user-aux/user-aux.service";

export const tournamentStaffRoleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const userAuxService = inject(UserAuxService);

  const roleParam = route.parent?.paramMap.get('role');

  if (roleParam === 'TOURNAMENT_MANAGER') {
    return true;
  } else {
    const role = userAuxService.getUserRole();
    return router.createUrlTree(['/home', role]);
  }
};
