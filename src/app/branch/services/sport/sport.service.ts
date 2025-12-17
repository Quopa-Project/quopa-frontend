import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {HttpClient} from "@angular/common/http";
import {SportApiResponse} from "../../models/api-responses/sport-api-response";
import {catchError, Observable} from "rxjs";
import {SportDto} from "../../models/sport.dto";

@Injectable({
  providedIn: 'root'
})
export class SportService extends BaseService<SportApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'sports';
  }

  create(body: SportDto): Observable<SportApiResponse> {
    return this.http.post<SportApiResponse>(`${this.basePath}`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }
}
