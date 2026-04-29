import {TournamentDto} from "./tournament.dto";
import {UserDto} from "../../core/models/user.dto";

export interface TournamentStaffDto {
  id: number;
  tournament: TournamentDto;
  user: UserDto;
}
