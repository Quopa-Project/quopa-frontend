import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {UserDto} from "../../models/user.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {CompanyDto} from "../../../admin/models/company.dto";
import {Subscription} from "rxjs";
import {CommunicationService} from "../../../shared/services/communicacion/communication.service";

@Component({
  selector: 'app-home-admin',
  standalone: false,
  templateUrl: './home-admin.html',
  styleUrl: './home-admin.css'
})
export class HomeAdmin {
  @Input() role: string = '';

  user: UserDto;
  company: CompanyDto;

  userInfoChangedSubscription: Subscription;

  constructor(private router: Router, public userAuxService: UserAuxService,
              private communicationService: CommunicationService) {
    this.user = userAuxService.getUser();
    this.company = userAuxService.getCompany();
    this.userInfoChangedSubscription = this.communicationService.userInfoChanged.subscribe((value) => {
      if (value.infoChanged === "User") {
        this.user = this.userAuxService.getUser();
      } else if (value.infoChanged === "Company") {
        this.company = this.userAuxService.getCompany();
      }
    });
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']).then();
  }
}
