import {Component, Input} from '@angular/core';
import {UserDto} from "../../models/user.dto";
import {BranchDto} from "../../../admin/models/branch.dto";
import {UserService} from "../../services/user/user.service";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BranchService} from "../../../admin/services/branch/branch.service";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {Router} from "@angular/router";
import {CommunicationService} from "../../../shared/services/communicacion/communication.service";

@Component({
  selector: 'app-profile-branch',
  standalone: false,
  templateUrl: './profile-branch.html',
  styleUrl: './profile-branch.css'
})
export class ProfileBranch {
  @Input() role: string = '';

  savingUser: boolean = false;
  savingBranch: boolean = false;

  user: UserDto;
  userToUpdate: UserDto;
  branch: BranchDto;
  branchToUpdate: BranchDto;

  constructor(private userService: UserService, private branchService: BranchService,
              private userAuxService: UserAuxService, private communicationService: CommunicationService,
              private snackBar: MatSnackBar, private router: Router) {
    this.user = this.userAuxService.getUser();
    this.userToUpdate = {...this.user};
    this.branch = this.userAuxService.getBranch();
    this.branchToUpdate = {...this.branch};
  }

  onUpdateUser() {
    this.savingUser = true;
    this.snackBar.open('Actualizando usuario');
    this.userService.update(this.userToUpdate.id, this.userToUpdate).subscribe({
      next: (response) => {
        this.savingUser = false;
        this.snackBar.dismiss();
        this.userAuxService.setUser(response.user);
        this.communicationService.emitUserInfoChange({ infoChanged: "User" });
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

  onUpdateBranch() {
    this.savingBranch = true;
    this.snackBar.open('Actualizando sucursal');
    this.branchService.update(this.branchToUpdate.id, this.branchToUpdate).subscribe({
      next: (response) => {
        this.savingBranch = false;
        this.snackBar.dismiss();
        this.userAuxService.setBranch(response.branch);
        this.communicationService.emitUserInfoChange({ infoChanged: "Branch" });
      },
      error: (error: ErrorMessage) => {
        this.savingBranch = false;
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
