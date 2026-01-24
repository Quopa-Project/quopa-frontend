import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {RatingApiResponse} from "../../models/api-reponses/rating-api-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {RatingDto} from "../../models/rating.dto";

@Injectable({
  providedIn: 'root'
})
export class RatingService extends BaseService<RatingApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'ratings';
  }

  create(body: RatingDto): Observable<RatingApiResponse> {
    return this.http.post<RatingApiResponse>(`${this.basePath}`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }

  getByBranchId(id: number): Observable<RatingApiResponse> {
    return this.http.get<RatingApiResponse>(`${this.basePath}/branch/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }
}
