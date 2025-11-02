import {Component, OnInit} from '@angular/core';
import {CompanyDto} from "../../models/company.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {BranchService} from "../../services/branch/branch.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BranchDto} from "../../models/branch.dto";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSidenav} from "@angular/material/sidenav";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateUserBranchDialog} from "../../dialogs/create-user-branch.dialog/create-user-branch.dialog";

@Component({
  selector: 'app-manage-branches',
  standalone: false,
  templateUrl: './manage-branches.html',
  styleUrl: './manage-branches.css'
})
export class ManageBranches implements OnInit {
  dataLoaded: number = 0;
  savingBranch: boolean = false;

  company: CompanyDto;

  branches: BranchDto[];

  branchToEdit: BranchDto;

  displayedColumns: string[] = ['name', 'address', 'actions'];

  constructor(private branchService: BranchService, private snackBar: MatSnackBar,
              private dialog: MatDialog, public userAuxService: UserAuxService) {
    this.company = userAuxService.getCompany();
    this.branches = [];
    this.branchToEdit = {} as BranchDto;
    this.branchToEdit.company = {} as CompanyDto;
  }

  ngOnInit(): void {
    this.refreshBranches();
  }

  refreshBranches() {
    this.dataLoaded = 0;
    this.branchService.getByCompanyId(this.company.id).subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.branches = response.branches;
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
      createUserBranch: {
        user: {},
        branch: {
          companyId: this.company.id
        }
      }
    };

    const dialogRef = this.dialog.open(CreateUserBranchDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((result: BranchDto) => {
      if (result) {
        this.refreshBranches();
      }
    });
  }

  onUpdateBranch(editDrawer: MatSidenav) {
    this.savingBranch = true;
    this.snackBar.open('Actualizando sede');
    this.branchService.update(this.branchToEdit.id, this.branchToEdit).subscribe({
      next: () => {
        this.savingBranch = false;
        this.snackBar.dismiss();
        editDrawer.close().then();
        this.refreshBranches();
      },
      error: (error: ErrorMessage) => {
        this.savingBranch = false;
        this.snackBar.openFromComponent(ErrorSnackBar, {
          data: {
            messages: error.message
          },
          duration: 2000
        });
      }
    });
  }

  openEditDrawer(editDrawer: MatSidenav, branch: BranchDto) {
    editDrawer.open().then();
    this.branchToEdit = {
      ...branch,
      company: {...branch.company}
    };
  }
}
