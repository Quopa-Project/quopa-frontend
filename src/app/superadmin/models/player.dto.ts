import {TeamDto} from "./team.dto";

export interface PlayerDto {
  id: number;
  name: string;
  number: number;
  team: TeamDto;
}
