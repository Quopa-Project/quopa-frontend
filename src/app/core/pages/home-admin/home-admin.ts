import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {UserDto} from "../../models/user.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {CompanyDto} from "../../../admin/models/company.dto";

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

  constructor(private router: Router, public userAuxService: UserAuxService) {
    this.user = userAuxService.getUser();
    this.company = userAuxService.getCompany();
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']).then();
  }
}
