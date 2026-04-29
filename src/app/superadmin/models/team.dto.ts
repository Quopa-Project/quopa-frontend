import {TournamentDto} from "./tournament.dto";
import {PlayerDto} from "./player.dto";

export interface TeamDto {
  id: number;
  name: string;
  tournament: TournamentDto;

  players: PlayerDto[];
}
