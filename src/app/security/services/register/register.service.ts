import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {RegisterApiResponse} from "../../models/api-responses/register-api-response";
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../../models/register.dto";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService<RegisterApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'users/register';
  }

  register(registerDto: RegisterDto) {
    return this.http.post<RegisterApiResponse>(this.basePath, registerDto, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }
}
