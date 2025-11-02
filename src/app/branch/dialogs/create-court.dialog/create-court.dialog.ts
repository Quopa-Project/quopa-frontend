import {Component, Inject, OnInit} from '@angular/core';
import {CourtDto} from "../../models/court.dto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CourtService} from "../../services/court/court.service";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {SportService} from "../../services/sport/sport.service";
import {SportDto} from "../../models/sport.dto";

type AddCourt = {
  court: CourtDto;
};

@Component({
  selector: 'app-create-court.dialog',
  standalone: false,
  templateUrl: './create-court.dialog.html',
  styleUrl: './create-court.dialog.css'
})
export class CreateCourtDialog implements OnInit {
  loading: boolean = false;

  sports: SportDto[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateCourtDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddCourt,
    private snackBar: MatSnackBar,
    private courtService: CourtService,
    private sportService: SportService
  ) { }

  ngOnInit(): void {
    this.sportService.getAll().subscribe({
      next: (response) => {
        this.sports = response.sports;
      },
      error: (error: ErrorMessage) => {
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  onCreateCourt() {
    this.loading = true;
    this.snackBar.open('Creando cancha');
    this.courtService.create(this.data.court).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.dismiss();
        this.dialogRef.close(response.court);
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
    })
  }
}
