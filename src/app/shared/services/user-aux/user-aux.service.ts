import { Injectable } from '@angular/core';
import {UserDto} from "../../../core/models/user.dto";
import {CompanyDto} from "../../../admin/models/company.dto";
import {BranchDto} from "../../../admin/models/branch.dto";
import {CourtDto} from "../../../branch/models/court.dto";

@Injectable({
  providedIn: 'root'
})
export class UserAuxService {
  private user: UserDto = {} as UserDto;
  private company: CompanyDto = {} as CompanyDto;
  private branch: BranchDto = {} as BranchDto;
  private branchDetail: BranchDto = {} as BranchDto;
  private court: CourtDto = {} as CourtDto;

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

  setBranchDetailUser(user: UserDto) {
    this.branchDetail.user = user;
  }

  setCourt(court: CourtDto) {
    this.court = court;
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

  getCourt() {
    return this.court;
  }

  getUserRole(): string {
    return this.user.role;
  }
}
