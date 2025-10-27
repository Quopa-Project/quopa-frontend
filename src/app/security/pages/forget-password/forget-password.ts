import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {map, Observable} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {VerificationDto} from "../../models/verification.dto";
import {VerificationService} from "../../services/verification/verification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatStepper} from "@angular/material/stepper";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";

@Component({
  selector: 'app-forget-password',
  standalone: false,
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword {
  private breakpointObserver = inject(BreakpointObserver);
  stepperOrientation: Observable<StepperOrientation> = this.breakpointObserver
    .observe('(min-width: 767px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

  loading: boolean = false;

  verificationDto: VerificationDto = {} as VerificationDto;

  isEmailVerified: boolean = false;
  isCodeVerified: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private verificationService: VerificationService,
              private snackBar: MatSnackBar, private router: Router) {
    this.verificationDto.invalidateTokens = false;
  }

  onSendCode(stepper: MatStepper) {
    this.loading = true;
    this.snackBar.open('Enviando código a correo');
    this.verificationService.sendVerificationCode(this.verificationDto).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.open(response.message, "Entendido", { duration: 2000 });
        this.isEmailVerified = true;
        this.cdr.detectChanges();
        stepper.next();
      },
      error: (error: ErrorMessage) => {
        this.loading = false;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  onVerifyCode(stepper: MatStepper) {
    this.loading = true;
    this.snackBar.open('Verificando código');
    this.verificationService.verifyCode(this.verificationDto).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.open(response.message, "Entendido", { duration: 2000 });
        this.isCodeVerified = true;
        this.cdr.detectChanges();
        stepper.next();
      },
      error: (error: ErrorMessage) => {
        this.loading = false;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  onUpdatePassword() {
    if (this.verificationDto.password === this.verificationDto.confirmPassword) {
      this.loading = true;
      this.snackBar.open('Actualizando contraseña');
      this.verificationService.resetPassword(this.verificationDto).subscribe({
        next: (response) => {
          this.loading = false;
          this.snackBar.open(response.message, "Entendido", { duration: 2000 });
          this.router.navigate(['/login']).then();
        },
        error: (error: ErrorMessage) => {
          this.loading = false;
          this.snackBar.openFromComponent(ErrorSnackBar, {
            data: {
              messages: error.message
            },
            duration: 2000
          });
        }
      });
    } else {
      this.snackBar.open("Las contraseñas deben coincidir", "Entendido", { duration: 2000 });
    }
  }
}
