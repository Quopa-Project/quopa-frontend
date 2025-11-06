import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {UserDto} from "../../models/user.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {BranchDto} from "../../../admin/models/branch.dto";
import {Subscription} from "rxjs";
import {CommunicationService} from "../../../shared/services/communicacion/communication.service";

@Component({
  selector: 'app-home-branch',
  standalone: false,
  templateUrl: './home-branch.html',
  styleUrl: './home-branch.css'
})
export class HomeBranch {
  @Input() role: string = '';

  user: UserDto;
  branch: BranchDto;

  userInfoChangedSubscription: Subscription;

  constructor(private router: Router, public userAuxService: UserAuxService,
              private communicationService: CommunicationService) {
    this.user = userAuxService.getUser();
    this.branch = userAuxService.getBranch();
    this.userInfoChangedSubscription = this.communicationService.userInfoChanged.subscribe((value) => {
      if (value.infoChanged === "User") {
        this.user = this.userAuxService.getUser();
      } else if (value.infoChanged === "Branch") {
        this.branch = userAuxService.getBranch();
      }
    });
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']).then();
  }
}
