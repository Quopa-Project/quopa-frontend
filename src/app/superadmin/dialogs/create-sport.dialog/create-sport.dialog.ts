import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SportService} from "../../../branch/services/sport/sport.service";
import {SportDto} from "../../../branch/models/sport.dto";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";

type AddSport = {
  sport: SportDto;
};

@Component({
  selector: 'app-create-sport.dialog',
  standalone: false,
  templateUrl: './create-sport.dialog.html',
  styleUrl: './create-sport.dialog.css'
})
export class CreateSportDialog {
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateSportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddSport,
    private snackBar: MatSnackBar,
    private sportService: SportService
  ) { }

  onCreateSport() {
    this.loading = true;
    this.snackBar.open('Creando deporte');
    this.sportService.create(this.data.sport).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.dismiss();
        this.dialogRef.close(response.sport);
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
