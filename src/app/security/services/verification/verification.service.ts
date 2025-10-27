import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {VerificationApiResponse} from "../../models/api-responses/verification-api-response";
import {HttpClient} from "@angular/common/http";
import {VerificationDto} from "../../models/verification.dto";
import {catchError, Observable} from "rxjs";
import {ValidationTokenApiResponse} from "../../models/api-responses/validation-token-api-response";

@Injectable({
  providedIn: 'root'
})
export class VerificationService extends BaseService<VerificationApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'users/verification';
  }

  sendVerificationCode(verificationDto: VerificationDto): Observable<VerificationApiResponse> {
    return this.http.post<VerificationApiResponse>(`${this.basePath}/send-verification-code`, verificationDto, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }

  verifyCode(verificationDto: VerificationDto): Observable<VerificationApiResponse> {
    return this.http.post<VerificationApiResponse>(`${this.basePath}/verify-code`, verificationDto, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }

  resetPassword(verificationDto: VerificationDto): Observable<VerificationApiResponse> {
    return this.http.post<VerificationApiResponse>(`${this.basePath}/reset-password`, verificationDto, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }
}
