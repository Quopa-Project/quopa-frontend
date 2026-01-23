import {UserDto} from "../../core/models/user.dto";
import {CourtDto} from "../../branch/models/court.dto";
import {RatingDto} from "./rating.dto";

export interface BookingDto {
  id: number;
  date: Date;
  time: string;
  numberOfPeople: number;
  isPublic: boolean;
  user: UserDto;
  court: CourtDto;
  rating: RatingDto;
  status: string;

  userId: number;
  courtId: number;
}
