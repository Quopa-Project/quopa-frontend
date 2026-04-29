import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {TournamentApiResponse} from "../../models/api-responses/tournament-api-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {TournamentDto} from "../../models/tournament.dto";

@Injectable({
  providedIn: 'root'
})
export class TournamentService extends BaseService<TournamentApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'tournaments';
  }

  create(body: TournamentDto): Observable<TournamentApiResponse> {
    return this.http.post<TournamentApiResponse>(`${this.basePath}`, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(catchError(this.handleError));
  }

  validateTournamentName(name: string): Observable<TournamentApiResponse> {
    return this.http.get<TournamentApiResponse>(`${this.basePath}/validate-name/${name}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }

  getByIdAndUserId(id: number, userId: number): Observable<TournamentApiResponse> {
    return this.http.get<TournamentApiResponse>(`${this.basePath}/${id}/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }

  getByUserId(id: number): Observable<TournamentApiResponse> {
    return this.http.get<TournamentApiResponse>(`${this.basePath}/user/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleError));
  }
}
