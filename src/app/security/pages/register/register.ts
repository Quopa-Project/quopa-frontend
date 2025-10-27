import { Component } from '@angular/core';
import {RegisterDto} from "../../models/register.dto";
import {RegisterService} from "../../services/register/register.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  loading: boolean = false;

  registerDto: RegisterDto = {} as RegisterDto;

  constructor(private registerService: RegisterService, private snackBar: MatSnackBar,
              private router: Router) {}

  register() {
    this.loading = true;
    this.snackBar.open('Registrando usuario');
    this.registerService.register(this.registerDto).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.dismiss();
        this.router.navigate(['/login']).then();
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    })
  }
}
