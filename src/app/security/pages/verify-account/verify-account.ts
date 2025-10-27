import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ValidationTokenService} from "../../services/validation-token/validation-token.service";
import {firstValueFrom} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";

@Component({
  selector: 'app-verify-account',
  standalone: false,
  templateUrl: './verify-account.html',
  styleUrl: './verify-account.css'
})
export class VerifyAccount implements OnInit {
  token: string;

  constructor(private validationTokenService: ValidationTokenService, private route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar) {
    this.token = this.route.snapshot.params['token'];
  }

  async ngOnInit(): Promise<void> {
    try {
      await firstValueFrom(this.validationTokenService.validateToken(this.token));
      this.snackBar.open('Usuario verificado', '', {
        duration: 2000
      });
    } catch (error: any) {
      this.snackBar.openFromComponent(ErrorSnackBar, {
        data: {
          messages: error.message
        },
        duration: 2000
      });
    }
    this.router.navigate(['/login']).then();
  }
}
