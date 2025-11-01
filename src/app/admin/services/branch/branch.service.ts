import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {BranchApiResponse} from "../../models/api-responses/branch-api-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {CreateUserBranchDto} from "../../models/create-user-branch.dto";

@Injectable({
  providedIn: 'root'
})
export class BranchService extends BaseService<BranchApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'branches';
  }

  createUserAndBranch(body: CreateUserBranchDto): Observable<BranchApiResponse> {
    return this.http.post<BranchApiResponse>(`${this.basePath}/user-branch`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }

  getByCompanyId(id: number): Observable<BranchApiResponse> {
    return this.http.get<BranchApiResponse>(`${this.basePath}/company/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }
}
