import {Component, Inject} from '@angular/core';
import {JoinBookingDto} from "../../models/join-booking.dto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JoinBookingService} from "../../service/join-booking/join-booking.service";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";

type ManageJoinBooking = {
  joinBooking: JoinBookingDto;
};

@Component({
  selector: 'app-manage-join-booking.dialog',
  standalone: false,
  templateUrl: './manage-join-booking.dialog.html',
  styleUrl: './manage-join-booking.dialog.css'
})
export class ManageJoinBookingDialog {
  savingJoinBooking: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ManageJoinBookingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ManageJoinBooking,
    private snackBar: MatSnackBar,
    private joinBookingService: JoinBookingService,
  ) { }

  onUpdateJoinBooking() {
    this.savingJoinBooking = true;
    this.snackBar.open('Actualizando petición');
    this.joinBookingService.update(this.data.joinBooking.id, this.data.joinBooking).subscribe({
      next: (response) => {
        this.savingJoinBooking = false;
        this.snackBar.dismiss();
        this.dialogRef.close(response.joinBooking);
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
