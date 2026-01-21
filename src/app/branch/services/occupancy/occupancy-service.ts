import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {OccupancyApiResponse} from "../../models/api-responses/occupancy-api-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {OccupancyDto} from "../../models/occupancy.dto";

@Injectable({
  providedIn: 'root'
})
export class OccupancyService extends BaseService<OccupancyApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'occupancies';
  }

  create(body: OccupancyDto): Observable<OccupancyApiResponse> {
    return this.http.post<OccupancyApiResponse>(`${this.basePath}`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }

  getByCourtIdAndActive(id: number): Observable<OccupancyApiResponse> {
    return this.http.get<OccupancyApiResponse>(`${this.basePath}/court/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }
}
