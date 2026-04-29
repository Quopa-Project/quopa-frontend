import {TournamentDto} from "../tournament.dto";

export interface TournamentApiResponse {
  tournament: TournamentDto;
  tournaments: TournamentDto[];
}
