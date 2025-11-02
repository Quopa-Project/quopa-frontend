import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {UserDto} from "../../models/user.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {BranchDto} from "../../../admin/models/branch.dto";

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

  constructor(private router: Router, public userAuxService: UserAuxService) {
    this.user = userAuxService.getUser();
    this.branch = userAuxService.getBranch();
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']).then();
  }
}
