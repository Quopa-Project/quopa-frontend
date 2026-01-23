import {UserDto} from "../../core/models/user.dto";
import {CourtDto} from "../../branch/models/court.dto";

export interface BookingDto {
  id: number;
  date: Date;
  time: string;
  numberOfPeople: number;
  isPublic: boolean;
  user: UserDto;
  court: CourtDto;

  userId: number;
  courtId: number;
}
