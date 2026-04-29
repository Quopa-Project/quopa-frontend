import {TeamDto} from "../team.dto";

export interface TeamApiResponse {
  team: TeamDto;
  teams: TeamDto[];
}
