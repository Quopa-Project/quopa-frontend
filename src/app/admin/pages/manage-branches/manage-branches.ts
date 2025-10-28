import { Component } from '@angular/core';
import {CompanyDto} from "../../../core/models/company.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";

@Component({
  selector: 'app-manage-branches',
  standalone: false,
  templateUrl: './manage-branches.html',
  styleUrl: './manage-branches.css'
})
export class ManageBranches {
  company: CompanyDto;

  constructor(public userAuxService: UserAuxService) {
    this.company = userAuxService.getCompany();
  }
}
