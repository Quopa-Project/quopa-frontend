import {BookingDto} from "./booking.dto";

export interface RatingDto {
  id: number;
  score: number;
  comment: string;
  booking: BookingDto;

  bookingId: number;
}
