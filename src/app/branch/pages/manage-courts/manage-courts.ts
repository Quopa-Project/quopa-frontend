import {Component, Input, OnInit} from '@angular/core';
import {BranchDto} from "../../../admin/models/branch.dto";
import {CourtDto} from "../../models/court.dto";
import {CourtService} from "../../services/court/court.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSidenav} from "@angular/material/sidenav";
import {CreateCourtDialog} from "../../dialogs/create-court.dialog/create-court.dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {CourtAvailabilityDialog} from "../../dialogs/court-availability.dialog/court-availability.dialog";

@Component({
  selector: 'app-manage-courts',
  standalone: false,
  templateUrl: './manage-courts.html',
  styleUrl: './manage-courts.css'
})
export class ManageCourts implements OnInit {
  @Input() injected: boolean = false;

  dataLoaded: number = 0;
  savingCourt: boolean = false;

  role: string;

  branch: BranchDto;

  courts: CourtDto[];

  courtToEdit: CourtDto;

  displayedColumns: string[] = ['description', 'capacity', 'price', 'actions'];

  constructor(private courtService: CourtService, private snackBar: MatSnackBar,
              private dialog: MatDialog, public userAuxService: UserAuxService,
              private router: Router, private route: ActivatedRoute) {
    this.role = this.route.parent?.snapshot.params['role'];
    this.branch = userAuxService.getBranch();
    this.courts = [];
    this.courtToEdit = {} as CourtDto;
    this.courtToEdit.branch = {} as BranchDto;
  }

  ngOnInit(): void {
    if (this.injected) {
      this.branch = this.userAuxService.getBranchDetail();
    }
    this.refreshCourts();
  }

  refreshCourts() {
    this.dataLoaded = 0;
    this.courtService.getByBranchId(this.branch.id).subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.courts = response.courts;
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
      court: {
        branchId: this.branch.id
      }
    };

    const dialogRef = this.dialog.open(CreateCourtDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((result: CourtDto) => {
      if (result) {
        this.refreshCourts();
      }
    });
  }

  onUpdateCourt(editDrawer: MatSidenav) {
    this.savingCourt = true;
    this.snackBar.open('Actualizando cancha');
    this.courtService.update(this.courtToEdit.id, this.courtToEdit).subscribe({
      next: () => {
        this.savingCourt = false;
        this.snackBar.dismiss();
        editDrawer.close().then();
        this.refreshCourts();
      },
      error: (error: ErrorMessage) => {
        this.savingCourt = false;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  openEditDrawer(editDrawer: MatSidenav, court: CourtDto) {
    editDrawer.open().then();
    this.courtToEdit = {
      ...court,
      branch: {...court.branch}
    };
  }

  goToCourtAvailability(court: CourtDto) {
    if (this.role === 'BRANCH') {
      this.router.navigate(['../court-availability', court.id], { relativeTo: this.route }).then();
    } else {
      this.userAuxService.setCourt(court);

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.maxWidth = '900px';
      dialogConfig.data = {
        court: court
      };

      this.dialog.open(CourtAvailabilityDialog, dialogConfig);
    }
  }
}
