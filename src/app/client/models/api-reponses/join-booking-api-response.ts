import {JoinBookingDto} from "../join-booking.dto";

export interface JoinBookingApiResponse {
  joinBookings: JoinBookingDto[];
  joinBooking: JoinBookingDto;
}
