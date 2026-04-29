import {CourtDto} from "../../branch/models/court.dto";
import {TournamentDto} from "../../superadmin/models/tournament.dto";
import {TeamDto} from "../../superadmin/models/team.dto";

export interface MatchDto {
  id: number;
  homeScore: number;
  awayScore: number;
  court: CourtDto;
  tournament: TournamentDto;
  homeTeam: TeamDto;
  awayTeam: TeamDto;

  courtId: number;
  tournamentId: number;
  homeTeamId: number;
  awayTeamId: number;
}
