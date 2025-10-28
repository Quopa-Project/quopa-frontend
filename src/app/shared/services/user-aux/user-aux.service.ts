import { Injectable } from '@angular/core';
import {UserDto} from "../../../core/models/user.dto";
import {CompanyDto} from "../../../core/models/company.dto";

@Injectable({
  providedIn: 'root'
})
export class UserAuxService {
  private user: UserDto = {} as UserDto;
  private company: CompanyDto = {} as CompanyDto;

  setUser(user: UserDto) {
    this.user = user;
  }

  setCompany(company: CompanyDto) {
    this.company = company;
  }

  getUser() {
    return this.user;
  }

  getCompany() {
    return this.company;
  }

  getUserRole(): string {
    return this.user.role;
  }
}
