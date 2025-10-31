import {Component, OnInit} from '@angular/core';
import {CompanyDto} from "../../../core/models/company.dto";
import {UserAuxService} from "../../../shared/services/user-aux/user-aux.service";
import {BranchService} from "../../services/branch/branch.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BranchDto} from "../../../core/models/branch.dto";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {MatSidenav} from "@angular/material/sidenav";

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

  displayedColumns: string[] = ['address', 'branchDishes', 'extraBranches', 'actions'];

  constructor(private branchService: BranchService, private snackBar: MatSnackBar,
              public userAuxService: UserAuxService) {
    this.company = userAuxService.getCompany();
    this.branches = [];
    this.branchToEdit = {} as BranchDto;
    this.branchToEdit.company = {} as CompanyDto;
  }

  ngOnInit(): void {
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

  }

  onUpdateBranch(editDrawer: MatSidenav) {

  }

  openEditDrawer(editDrawer: MatSidenav, b: any) {

  }
}
