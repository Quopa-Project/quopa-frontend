import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {CourtApiResponse} from "../../models/api-responses/court-api-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {CourtDto} from "../../models/court.dto";

@Injectable({
  providedIn: 'root'
})
export class CourtService extends BaseService<CourtApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'courts';
  }

  create(body: CourtDto): Observable<CourtApiResponse> {
    return this.http.post<CourtApiResponse>(`${this.basePath}`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<CourtApiResponse> {
    return this.http.get<CourtApiResponse>(`${this.basePath}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }

  getByBranchId(id: number): Observable<CourtApiResponse> {
    return this.http.get<CourtApiResponse>(`${this.basePath}/branch/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }

  update(id: number, body: CourtDto): Observable<CourtApiResponse> {
    return this.http.put<CourtApiResponse>(`${this.basePath}/${id}`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }
}
