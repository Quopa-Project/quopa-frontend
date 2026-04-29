import {Component, Input} from '@angular/core';
import {UserDto} from "../../models/user.dto";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {CommunicationService} from "../../../shared/services/communicacion/communication.service";

@Component({
  selector: 'app-home-tournament-staff',
  standalone: false,
  templateUrl: './home-tournament-staff.html',
  styleUrl: './home-tournament-staff.css'
})
export class HomeTournamentStaff {
  @Input() role: string = '';

  user: UserDto;

  userInfoChangedSubscription: Subscription;

  constructor(private router: Router, public userAuxService: UserAuxService,
              private communicationService: CommunicationService) {
    this.user = this.userAuxService.getUser();
    this.userInfoChangedSubscription = this.communicationService.userInfoChanged.subscribe((value) => {
      if (value.infoChanged === "User") {
        this.user = this.userAuxService.getUser();
      }
    });
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']).then();
  }
}
