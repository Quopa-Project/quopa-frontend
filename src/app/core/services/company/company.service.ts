import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {CompanyApiResponse} from "../../models/api-responses/company-api-response";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService<CompanyApiResponse>{

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'companies';
  }
}
