import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourtDto} from "../../../branch/models/court.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BookingService} from "../../service/booking/booking.service";
import {BookingDto} from "../../models/booking.dto";
import {UserDto} from "../../../core/models/user.dto";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-court',
  standalone: false,
  templateUrl: './book-court.html',
  styleUrl: './book-court.css'
})
export class BookCourt {
  savingBooking: boolean = false;

  court: CourtDto;
  user: UserDto;

  booking: BookingDto;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  availableTimes = [
    '08:00', '09:00', '10:00', '11:00',
    '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  constructor(private bookingService: BookingService, private userAuxService: UserAuxService,
              private _formBuilder: FormBuilder, private snackBar: MatSnackBar,
              private router: Router, private route: ActivatedRoute) {
    this.court = this.userAuxService.getCourt();
    this.user = this.userAuxService.getUser();
    this.booking = { courtId: this.court.id, userId: this.user.id } as BookingDto;
    this.firstFormGroup = this._formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      numberOfPeople: [2, [Validators.required, Validators.min(1), Validators.max(this.court.capacity)]],
      isPublic: [false]
    });
  }

  selectTime(time: string) {
    this.firstFormGroup.controls['time'].setValue(time);
  }

  createBooking() {
    this.savingBooking = true;
    this.snackBar.open('Creando reserva');
    this.booking.date = this.firstFormGroup.controls['date'].value;
    this.booking.time = this.firstFormGroup.controls['time'].value;
    this.booking.numberOfPeople = this.secondFormGroup.controls['numberOfPeople'].value;
    this.booking.isPublic = this.secondFormGroup.controls['isPublic'].value;
    this.bookingService.create(this.booking).subscribe({
      next: () => {
        this.savingBooking = false;
        this.snackBar.dismiss();
        this.router.navigate(['../../my-bookings'], { replaceUrl: true, relativeTo: this.route }).then();
      },
      error: (error: ErrorMessage) => {
        this.savingBooking = false;
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
