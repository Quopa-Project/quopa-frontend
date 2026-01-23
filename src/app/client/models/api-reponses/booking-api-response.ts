import {BookingDto} from "../booking.dto";

export interface BookingApiResponse {
  bookings: BookingDto[];
  booking: BookingDto;
}
