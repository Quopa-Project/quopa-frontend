import {Component, Inject, OnInit} from '@angular/core';
import {BookingDto} from "../../models/booking.dto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JoinBookingService} from "../../service/join-booking/join-booking.service";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {JoinBookingDto} from "../../models/join-booking.dto";

type ManageJoinBookings = {
  booking: BookingDto;
};

@Component({
  selector: 'app-manage-join-bookings.dialog',
  standalone: false,
  templateUrl: './manage-join-bookings.dialog.html',
  styleUrl: './manage-join-bookings.dialog.css'
})
export class ManageJoinBookingsDialog implements OnInit {
  dataLoaded: number = 0;
  savingJoinBooking: boolean = false;

  joinBookings: JoinBookingDto[];

  displayedColumns: string[] = ['user', 'isPayed', 'status', 'actions'];

  constructor(
    public dialogRef: MatDialogRef<ManageJoinBookingsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ManageJoinBookings,
    private snackBar: MatSnackBar,
    private joinBookingService: JoinBookingService,
  ) {
    this.joinBookings = [];
  }

  ngOnInit() {
    this.dataLoaded = 0;
    this.joinBookingService.getByBookingId(this.data.booking.id).subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.joinBookings = response.joinBookings;
      },
      error: (error: ErrorMessage) => {
        this.dataLoaded = -1;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  confirmJoinRequest(joinBooking: JoinBookingDto) {
    this.savingJoinBooking = true;
    joinBooking.status = 'Confirmado';
    this.snackBar.open('Actualizando petición');
    this.joinBookingService.update(joinBooking.id, joinBooking).subscribe({
      next: (response) => {
        this.savingJoinBooking = false;
        this.snackBar.dismiss();
        this.joinBookings = this.joinBookings.map(joinBooking => joinBooking.id === response.joinBooking.id ? response.joinBooking : joinBooking);
      },
      error: (error: ErrorMessage) => {
        this.savingJoinBooking = false;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  cancelJoinRequest(joinBooking: JoinBookingDto) {
    this.savingJoinBooking = true;
    joinBooking.status = 'Cancelado';
    this.snackBar.open('Actualizando petición');
    this.joinBookingService.update(joinBooking.id, joinBooking).subscribe({
      next: (response) => {
        this.savingJoinBooking = false;
        this.snackBar.dismiss();
        this.joinBookings = this.joinBookings.map(joinBooking => joinBooking.id === response.joinBooking.id ? response.joinBooking : joinBooking);
      },
      error: (error: ErrorMessage) => {
        this.savingJoinBooking = false;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }
}
