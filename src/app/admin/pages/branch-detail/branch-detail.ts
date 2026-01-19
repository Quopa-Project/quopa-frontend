import { Component } from '@angular/core';
import {BranchDto} from "../../models/branch.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";

@Component({
  selector: 'app-branch-detail',
  standalone: false,
  templateUrl: './branch-detail.html',
  styleUrl: './branch-detail.css'
})
export class BranchDetail {
  branch: BranchDto;

  constructor(private userAuxService: UserAuxService) {
    this.branch = this.userAuxService.getBranchDetail();
  }
}
