import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {HttpClient} from "@angular/common/http";
import {SportApiResponse} from "../../models/api-responses/sport-api-response";

@Injectable({
  providedIn: 'root'
})
export class SportService extends BaseService<SportApiResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath = this.basePath + 'sports';
  }
}
