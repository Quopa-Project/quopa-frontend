import {Component, OnInit} from '@angular/core';
import {SportDto} from "../../../branch/models/sport.dto";
import {SportService} from "../../../branch/services/sport/sport.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {CreateSportDialog} from "../../dialogs/create-sport.dialog/create-sport.dialog";

@Component({
  selector: 'app-manage-sports',
  standalone: false,
  templateUrl: './manage-sports.html',
  styleUrl: './manage-sports.css'
})
export class ManageSports implements OnInit {
  dataLoaded: number = 0;

  sports: SportDto[];

  displayedColumns: string[] = ['name', 'description'];

  constructor(private sportService: SportService, private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.sports = [];
  }

  ngOnInit(): void {
    this.refreshSports();
  }

  refreshSports() {
    this.dataLoaded = 0;
    this.sportService.getAll().subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.sports = response.sports;
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

  openCreateDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      sport: {}
    };

    const dialogRef = this.dialog.open(CreateSportDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((result: SportDto) => {
      if (result) {
        this.refreshSports();
      }
    });
  }
}
