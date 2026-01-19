import { Injectable } from '@angular/core';
import {UserDto} from "../../../core/models/user.dto";
import {CompanyDto} from "../../../admin/models/company.dto";
import {BranchDto} from "../../../admin/models/branch.dto";

@Injectable({
  providedIn: 'root'
})
export class UserAuxService {
  private user: UserDto = {} as UserDto;
  private company: CompanyDto = {} as CompanyDto;
  private branch: BranchDto = {} as BranchDto;
  private branchDetail: BranchDto = {} as BranchDto;

  setUser(user: UserDto) {
    this.user = user;
  }

  setCompany(company: CompanyDto) {
    this.company = company;
  }

  setBranch(branch: BranchDto) {
    this.branch = branch;
  }

  setBranchDetail(branchDetail: BranchDto) {
    this.branchDetail = branchDetail;
  }

  getUser() {
    return this.user;
  }

  getCompany() {
    return this.company;
  }

  getBranch() {
    return this.branch;
  }

  getBranchDetail() {
    return this.branchDetail;
  }

  getUserRole(): string {
    return this.user.role;
  }
}
