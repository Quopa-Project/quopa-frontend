import {UserDto} from "../../core/models/user.dto";
import {BookingDto} from "./booking.dto";

export interface JoinBookingDto {
  id: number;
  isPayed: boolean;
  status: string;
  user: UserDto;
  booking: BookingDto;

  userId: number;
  bookingId: number;
}
