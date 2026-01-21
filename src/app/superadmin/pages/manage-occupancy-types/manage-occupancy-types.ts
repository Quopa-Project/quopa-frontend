import {Component, OnInit} from '@angular/core';
import {OccupancyTypeDto} from "../../models/occupancy-type.dto";
import {OccupancyTypeService} from "../../services/occupancy-type/occupancy-type.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {CreateOccupancyTypeDialog} from "../../dialogs/create-occupancy-type.dialog/create-occupancy-type.dialog";

@Component({
  selector: 'app-manage-occupancy-types',
  standalone: false,
  templateUrl: './manage-occupancy-types.html',
  styleUrl: './manage-occupancy-types.css'
})
export class ManageOccupancyTypes implements OnInit {
  dataLoaded: number = 0;

  occupancyTypes: OccupancyTypeDto[];

  displayedColumns: string[] = ['name', 'icon'];

  constructor(private occupancyTypeService: OccupancyTypeService, private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.occupancyTypes = [];
  }

  ngOnInit(): void {
    this.refreshOccupancyTypes();
  }

  refreshOccupancyTypes() {
    this.dataLoaded = 0;
    this.occupancyTypeService.getAll().subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.occupancyTypes = response.occupancyTypes;
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
      occupancyType: {}
    };

    const dialogRef = this.dialog.open(CreateOccupancyTypeDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((result: OccupancyTypeDto) => {
      if (result) {
        this.refreshOccupancyTypes();
      }
    });
  }
}
