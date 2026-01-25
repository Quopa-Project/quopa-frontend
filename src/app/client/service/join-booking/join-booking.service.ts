import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {JoinBookingApiResponse} from "../../models/api-reponses/join-booking-api-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {JoinBookingDto} from "../../models/join-booking.dto";

@Injectable({
  providedIn: 'root'
})
export class JoinBookingService extends BaseService<JoinBookingApiResponse>{

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'join-bookings';
  }

  create(body: JoinBookingDto): Observable<JoinBookingApiResponse> {
    return this.http.post<JoinBookingApiResponse>(`${this.basePath}`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }

  getByUserId(id: number): Observable<JoinBookingApiResponse> {
    return this.http.get<JoinBookingApiResponse>(`${this.basePath}/user/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }

  getByBookingId(id: number): Observable<JoinBookingApiResponse> {
    return this.http.get<JoinBookingApiResponse>(`${this.basePath}/booking/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }

  update(id: number, body: JoinBookingDto): Observable<JoinBookingApiResponse> {
    return this.http.put<JoinBookingApiResponse>(`${this.basePath}/${id}`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }
}
