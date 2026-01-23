import {Component, Input, OnInit} from '@angular/core';
import {BookingDto} from "../../../client/models/booking.dto";
import {BranchDto} from "../../../admin/models/branch.dto";
import {BookingService} from "../../../client/service/booking/booking.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSidenav} from "@angular/material/sidenav";
import {RatingDto} from "../../../client/models/rating.dto";

@Component({
  selector: 'app-manage-bookings',
  standalone: false,
  templateUrl: './manage-bookings.html',
  styleUrl: './manage-bookings.css'
})
export class ManageBookings implements OnInit {
  @Input() injected: boolean = false;

  selectedTab: string = "CURRENT";

  dataLoaded: number = 0;

  branch: BranchDto;

  bookingSelected: BookingDto;

  currentBookings: BookingDto[];
  pastBookings: BookingDto[];

  displayedColumns: string[] = ['dateTime', 'status', 'user', 'court', 'people', 'price', 'rating', 'actions'];

  constructor(private bookingService: BookingService, private userAuxService: UserAuxService,
              private snackBar: MatSnackBar) {
    this.branch = this.userAuxService.getBranch();
    this.bookingSelected = {} as BookingDto;
    this.bookingSelected.rating = {} as RatingDto;
    this.currentBookings = [];
    this.pastBookings = [];
  }

  ngOnInit() {
    if (this.injected) {
      this.branch = this.userAuxService.getBranchDetail();
    }
    this.refreshBookings();
  }

  refreshBookings() {
    this.dataLoaded = 0;
    this.bookingService.getByBranchId(this.branch.id).subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.pastBookings = [];
        this.currentBookings = [];
        response.bookings.forEach((booking) => {
          if (booking.status === 'Terminado' || booking.status === 'Cancelado') {
            this.pastBookings.push(booking);
          } else {
            this.currentBookings.push(booking);
          }
        });
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

  onTabChange(index: number): void {
    this.selectedTab = index === 0 ? 'CURRENT' : 'PAST';
  }

  confirmBooking(b: BookingDto) {
    this.dataLoaded = 0;
    this.bookingService.update(b.id, "Confirmado").subscribe({
      next: () => {
        this.refreshBookings();
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

  finishBooking(b: BookingDto) {
    this.dataLoaded = 0;
    this.bookingService.update(b.id, "Terminado").subscribe({
      next: () => {
        this.refreshBookings();
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

  cancelBooking(b: BookingDto) {
    this.dataLoaded = 0;
    this.bookingService.update(b.id, "Cancelado").subscribe({
      next: () => {
        this.refreshBookings();
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

  openDetailDrawer(editDrawer: MatSidenav, b: BookingDto) {
    editDrawer.open().then();
    this.bookingSelected = {
      ...b,
      rating: {...b.rating}
    }
  }
}
