import {Component, Inject} from '@angular/core';
import {OccupancyTypeDto} from "../../models/occupancy-type.dto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OccupancyTypeService} from "../../services/occupancy-type/occupancy-type.service";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";

type AddOccupancyType = {
  occupancyType: OccupancyTypeDto;
};

@Component({
  selector: 'app-create-occupancy-type.dialog',
  standalone: false,
  templateUrl: './create-occupancy-type.dialog.html',
  styleUrl: './create-occupancy-type.dialog.css'
})
export class CreateOccupancyTypeDialog {
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateOccupancyTypeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddOccupancyType,
    private snackBar: MatSnackBar,
    private occupancyTypeService: OccupancyTypeService
  ) { }

  onCreateSport() {
    this.loading = true;
    this.snackBar.open('Creando deporte');
    this.occupancyTypeService.create(this.data.occupancyType).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.dismiss();
        this.dialogRef.close(response.occupancyType);
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
