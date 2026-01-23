import {Component, Inject} from '@angular/core';
import {BookingDto} from "../../models/booking.dto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RatingDto} from "../../models/rating.dto";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {RatingService} from "../../service/rating/rating.service";

type CreateSeeRating = {
  booking: BookingDto;
  mode: string;
  rating: RatingDto;
};

@Component({
  selector: 'app-create-see-rating.dialog',
  standalone: false,
  templateUrl: './create-see-rating.dialog.html',
  styleUrl: './create-see-rating.dialog.css'
})
export class CreateSeeRatingDialog {
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateSeeRatingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CreateSeeRating,
    private snackBar: MatSnackBar,
    private ratingService: RatingService
  ) { }

  onCreateRating() {
    this.loading = true;
    this.snackBar.open('Creando calificación');
    this.ratingService.create(this.data.rating).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.dismiss();
        this.dialogRef.close(response.rating);
      },
      error: (error: ErrorMessage) => {
        this.loading = false;
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
