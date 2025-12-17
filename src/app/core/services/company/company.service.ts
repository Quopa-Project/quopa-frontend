import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {CompanyApiResponse} from "../../../admin/models/api-responses/company-api-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {CompanyDto} from "../../../admin/models/company.dto";
import {CreateUserCompanyDto} from "../../../superadmin/models/create-user-company.dto";

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService<CompanyApiResponse>{

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'companies';
  }

  createUserAndCompany(body: CreateUserCompanyDto): Observable<CompanyApiResponse> {
    return this.http.post<CompanyApiResponse>(`${this.basePath}/user-company`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }

  update(id: number, body: CompanyDto): Observable<CompanyApiResponse> {
    return this.http.put<CompanyApiResponse>(`${this.basePath}/${id}`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }
}
