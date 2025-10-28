import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserDto} from "../../models/user.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {CompanyService} from "../../services/company/company.service";
import {CompanyDto} from "../../models/company.dto";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorMessage} from "../../../shared/models/error-message";

@Component({
  selector: 'app-home-admin',
  standalone: false,
  templateUrl: './home-admin.html',
  styleUrl: './home-admin.css'
})
export class HomeAdmin implements OnInit {
  @Input() role: string = '';

  user: UserDto;
  company: CompanyDto;

  constructor(private companyService: CompanyService, private router: Router,
              private snackBar: MatSnackBar, public userAuxService: UserAuxService) {
    this.user = userAuxService.getUser();
    this.company = {} as CompanyDto;
  }

  ngOnInit(): void {
    this.companyService.getObject().subscribe({
      next: (response) => {
        this.company = response.company;
        this.userAuxService.setCompany(response.company);
      },
      error: (error: ErrorMessage) => {
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']).then();
  }
}
