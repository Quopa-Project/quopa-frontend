import {CourtDto} from "../court.dto";

export interface CourtApiResponse {
  courts: CourtDto[];
  court: CourtDto;
}
