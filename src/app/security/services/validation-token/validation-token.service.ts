import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {ValidationTokenApiResponse} from "../../models/api-responses/validation-token-api-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValidationTokenService extends BaseService<ValidationTokenApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'users/validate-token';
  }

  validateToken(token: string): Observable<ValidationTokenApiResponse> {
    return this.http.get<ValidationTokenApiResponse>(`${this.basePath}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).pipe(catchError(this.handleError));
  }
}
