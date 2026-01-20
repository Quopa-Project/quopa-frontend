import {Component} from '@angular/core';
import {UserDto} from "../../models/user.dto";
import {UserService} from "../../services/user/user.service";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {CommunicationService} from "../../../shared/services/communicacion/communication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";

@Component({
  selector: 'app-profile-client',
  standalone: false,
  templateUrl: './profile-client.html',
  styleUrl: './profile-client.css'
})
export class ProfileClient {
  savingUser: boolean = false;

  user: UserDto;
  userToUpdate: UserDto;

  constructor(private userService: UserService, private userAuxService: UserAuxService,
              private communicationService: CommunicationService,
              private snackBar: MatSnackBar, private router: Router) {
    this.user = this.userAuxService.getUser();
    this.userToUpdate = {...this.user};
  }

  onUpdateUser() {
    this.savingUser = true;
    this.snackBar.open('Actualizando usuario');
    this.userService.update(this.userToUpdate.id, this.userToUpdate).subscribe({
      next: (response) => {
        this.savingUser = false;
        this.snackBar.dismiss();
        this.userAuxService.setUser(response.user);
        this.user = this.userAuxService.getUser();
        this.userToUpdate = {...this.user};
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

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']).then();
  }
}
