import {TeamDto} from "../../superadmin/models/team.dto";

export interface TableItemDto {
  id: number;
  team: TeamDto;
  awayScore: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}
