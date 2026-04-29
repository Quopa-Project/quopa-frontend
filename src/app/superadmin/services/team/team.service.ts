import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {TeamApiResponse} from "../../models/api-responses/team-api-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService<TeamApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'teams';
  }

  validateTournamentName(name: string): Observable<TeamApiResponse> {
    return this.http.get<TeamApiResponse>(`${this.basePath}/validate-name/${name}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }

  getByTournamentId(tournamentId: number): Observable<TeamApiResponse> {
    return this.http.get<TeamApiResponse>(`${this.basePath}/tournament/${tournamentId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }
}
