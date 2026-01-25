import {Component, OnInit} from '@angular/core';
import {BookingDto} from "../../models/booking.dto";
import {JoinBookingService} from "../../service/join-booking/join-booking.service";
import {BookingService} from "../../service/booking/booking.service";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserDto} from "../../../core/models/user.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {JoinBookingDto} from "../../models/join-booking.dto";
import {MatSidenav} from "@angular/material/sidenav";
import {CourtDto} from "../../../branch/models/court.dto";
import {SportDto} from "../../../branch/models/sport.dto";
import {BranchDto} from "../../../admin/models/branch.dto";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ManageJoinBookingDialog} from "../../dialogs/manage-join-booking.dialog/manage-join-booking.dialog";

@Component({
  selector: 'app-open-reservations',
  standalone: false,
  templateUrl: './open-reservations.html',
  styleUrl: './open-reservations.css'
})
export class OpenReservations implements OnInit {
  dataLoadedBookings: number = 0;
  dataLoadedJoinBooking: number = 0;
  savingJoinRequest: boolean = false;

  user: UserDto;

  joinBooking: JoinBookingDto;

  joinBookings: JoinBookingDto[];
  bookings: BookingDto[];

  displayedColumns: string[] = ['date', 'time', 'court', 'address', 'actions'];
  displayedColumnsJoinBooking: string[] = ['branch', 'court', 'isPayed', 'status', 'actions'];

  constructor(private joinBookingService: JoinBookingService, private bookingService: BookingService,
              private userAuxService: UserAuxService, private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.user = this.userAuxService.getUser();
    this.joinBooking = {
      booking: {
        user: {} as UserDto,
        court: {
          sport: {} as SportDto,
          branch: {} as BranchDto,
        } as CourtDto,
      } as BookingDto,
    } as JoinBookingDto;
    this.joinBookings = [];
    this.bookings = [];
  }

  ngOnInit() {
    this.refreshJoinBookings();
    this.refreshBookings();
  }

  refreshJoinBookings() {
    this.dataLoadedJoinBooking = 0;
    this.joinBookingService.getByUserId(this.user.id).subscribe({
      next: (response) => {
        this.dataLoadedJoinBooking = 1;
        this.joinBookings = response.joinBookings;
      },
      error: (error: ErrorMessage) => {
        this.dataLoadedJoinBooking = -1;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    })
  }

  refreshBookings() {
    this.dataLoadedBookings = 0;
    this.bookingService.getByIsPublic(true).subscribe({
      next: (response) => {
        this.dataLoadedBookings = 1;
        this.bookings = response.bookings;
      },
      error: (error: ErrorMessage) => {
        this.dataLoadedBookings = -1;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    })
  }

  joinBookingForm(formDrawer: MatSidenav, booking: BookingDto) {
    formDrawer.open().then();
    this.joinBooking = {
      isPayed: false,
      booking: { ...booking },
      bookingId: booking.id,
      userId: this.user.id
    } as JoinBookingDto;
  }

  manageJoinBooking(joinBooking: JoinBookingDto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      joinBooking: { ...joinBooking }
    };

    const dialogRef = this.dialog.open(ManageJoinBookingDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((result: JoinBookingDto) => {
      if (result) {
        this.refreshJoinBookings();
      }
    });
  }

  onCreateJoinRequest(editDrawer: MatSidenav) {
    this.savingJoinRequest = true;
    this.snackBar.open('Guardando petición');
    this.joinBookingService.create(this.joinBooking).subscribe({
      next: () => {
        this.savingJoinRequest = false;
        this.snackBar.dismiss();
        editDrawer.close().then();
        this.refreshJoinBookings();
        this.refreshBookings();
      },
      error: (error: ErrorMessage) => {
        this.savingJoinRequest = false;
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
