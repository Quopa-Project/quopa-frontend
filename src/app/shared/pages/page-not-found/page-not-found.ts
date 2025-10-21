import {Component, Input} from '@angular/core';
import {UserService} from "../../../core/services/user/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-page-not-found',
  standalone: false,
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {
  @Input() injected: boolean = false;

  constructor(private userService: UserService, private snackBar: MatSnackBar,
              private router: Router) { }

  return() {
    if (localStorage.getItem('token') && !this.injected) {
      this.snackBar.open('Regresando a pagina principal');
      this.userService.getObject().subscribe({
        next: (response) => {
          this.snackBar.dismiss();
          this.router.navigate(['/home', response.user.role]).then();
        },
        error: () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']).then();
        }
      });
    } else {
      localStorage.removeItem('token');
      this.router.navigate(['/login']).then();
    }
  }
}
