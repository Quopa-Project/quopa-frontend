import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {BookingApiResponse} from "../../models/api-reponses/booking-api-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {BookingDto} from "../../models/booking.dto";

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseService<BookingApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'bookings';
  }

  create(body: BookingDto): Observable<BookingApiResponse> {
    return this.http.post<BookingApiResponse>(`${this.basePath}`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }
}
