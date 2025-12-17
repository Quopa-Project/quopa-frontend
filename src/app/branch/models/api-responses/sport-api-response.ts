import {SportDto} from "../sport.dto";

export interface SportApiResponse {
  sport: SportDto;
  sports: SportDto[];
}
