import {Component, OnInit} from '@angular/core';
import {BookingDto} from "../../models/booking.dto";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {BookingService} from "../../service/booking/booking.service";
import {UserDto} from "../../../core/models/user.dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CompanyDto} from "../../../admin/models/company.dto";
import {CreateSeeRatingDialog} from "../../dialogs/create-see-rating.dialog/create-see-rating.dialog";

@Component({
  selector: 'app-my-bookings',
  standalone: false,
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css'
})
export class MyBookings implements OnInit {
  selectedTab: string = "CURRENT";

  dataLoaded: number = 0;

  user: UserDto;

  currentBookings: BookingDto[];
  pastBookings: BookingDto[];

  displayedColumns: string[] = ['dateTime', 'status', 'court', 'people', 'public', 'actions'];

  constructor(private bookingService: BookingService, private userAuxService: UserAuxService,
              private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.user = this.userAuxService.getUser();
    this.currentBookings = [];
    this.pastBookings = [];
  }

  ngOnInit() {
    this.refreshBookings();
  }

  refreshBookings() {
    this.dataLoaded = 0;
    this.bookingService.getByUserId(this.user.id).subscribe({
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

  openRatingDialog(b: BookingDto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      booking: { ...b },
      mode: b.rating ? 'VIEW' : 'CREATE',
      rating: { bookingId: b.id, score: 1 }
    };

    const dialogRef = this.dialog.open(CreateSeeRatingDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((result: CompanyDto) => {
      if (result) {
        this.refreshBookings();
      }
    });
  }

  openJoinRequests(b: BookingDto) {
    console.log(b)
  }
}
