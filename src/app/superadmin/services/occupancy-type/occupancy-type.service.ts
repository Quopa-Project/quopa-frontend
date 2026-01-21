import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {OccupancyTypeApiResponse} from "../../models/api-responses/occupancy-type-api-response";
import {HttpClient} from "@angular/common/http";
import {OccupancyTypeDto} from "../../models/occupancy-type.dto";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OccupancyTypeService extends BaseService<OccupancyTypeApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'occupancy-types';
  }

  create(body: OccupancyTypeDto): Observable<OccupancyTypeApiResponse> {
    return this.http.post<OccupancyTypeApiResponse>(`${this.basePath}`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }
}
