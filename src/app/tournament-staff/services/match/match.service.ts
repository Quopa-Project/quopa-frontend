import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {MatchApiResponse} from "../../models/api-responses/match-api-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {MatchDto} from "../../models/match.dto";

@Injectable({
  providedIn: 'root'
})
export class MatchService extends BaseService<MatchApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'matches';
  }

  create(body: MatchDto): Observable<MatchApiResponse> {
    return this.http.post<MatchApiResponse>(`${this.basePath}`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }

  getTableByTournamentId(tournamentId: number): Observable<MatchApiResponse> {
    return this.http.get<MatchApiResponse>(`${this.basePath}/table/${tournamentId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }

  getByTournamentId(tournamentId: number): Observable<MatchApiResponse> {
    return this.http.get<MatchApiResponse>(`${this.basePath}/tournament/${tournamentId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }
}
