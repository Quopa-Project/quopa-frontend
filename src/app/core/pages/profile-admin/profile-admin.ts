import {Component, Input} from '@angular/core';
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserDto} from "../../models/user.dto";
import {CompanyDto} from "../../../admin/models/company.dto";
import {UserService} from "../../services/user/user.service";
import {CompanyService} from "../../services/company/company.service";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {ErrorMessage} from "../../../shared/models/error-message";

@Component({
  selector: 'app-profile-admin',
  standalone: false,
  templateUrl: './profile-admin.html',
  styleUrl: './profile-admin.css'
})
export class ProfileAdmin {
  @Input() role: string = '';

  savingUser: boolean = false;
  savingCompany: boolean = false;

  user: UserDto;
  userToUpdate: UserDto;
  company: CompanyDto;
  companyToUpdate: CompanyDto;

  constructor(private userService: UserService, private companyService: CompanyService,
              private userAuxService: UserAuxService, private snackBar: MatSnackBar) {
    this.user = this.userAuxService.getUser();
    this.userToUpdate = {...this.user};
    this.company = this.userAuxService.getCompany();
    this.companyToUpdate = {...this.company};
  }

  onUpdateUser() {
    this.savingUser = true;
    this.snackBar.open('Actualizando usuario');
    this.userService.update(this.userToUpdate.id, this.userToUpdate).subscribe({
      next: (response) => {
        this.savingUser = false;
        this.snackBar.dismiss();
        this.userAuxService.setUser(response.user);
      },
      error: (error: ErrorMessage) => {
        this.savingUser = false;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  onUpdateCompany() {
    this.savingCompany = true;
    this.snackBar.open('Actualizando compañía');
    this.companyService.update(this.companyToUpdate.id, this.companyToUpdate).subscribe({
      next: (response) => {
        this.savingCompany = false;
        this.snackBar.dismiss();
        this.userAuxService.setCompany(response.company);
      },
      error: (error: ErrorMessage) => {
        this.savingCompany = false;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }
}
