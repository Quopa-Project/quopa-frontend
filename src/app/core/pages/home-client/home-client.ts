import {Component, Input} from '@angular/core';
import {UserDto} from "../../models/user.dto";
import {Router} from "@angular/router";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {Subscription} from "rxjs";
import {CommunicationService} from "../../../shared/services/communicacion/communication.service";

@Component({
  selector: 'app-home-client',
  standalone: false,
  templateUrl: './home-client.html',
  styleUrl: './home-client.css'
})
export class HomeClient {
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
