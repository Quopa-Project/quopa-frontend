import {Component, OnInit} from '@angular/core';
import {CompanyDto} from "../../../admin/models/company.dto";
import {CompanyService} from "../../../core/services/company/company.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";
import {CreateUserCompanyDialog} from "../../dialogs/create-user-company.dialog/create-user-company.dialog";

@Component({
  selector: 'app-manage-companies',
  standalone: false,
  templateUrl: './manage-companies.html',
  styleUrl: './manage-companies.css'
})
export class ManageCompanies implements OnInit {
  dataLoaded: number = 0;

  companies: CompanyDto[];

  displayedColumns: string[] = ['name'];

  constructor(private companyService: CompanyService, private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.companies = [];
  }

  ngOnInit() {
    this.refreshCompanies();
  }

  refreshCompanies() {
    this.dataLoaded = 0;
    this.companyService.getAll().subscribe({
      next: (response) => {
        this.dataLoaded = 1;
        this.companies = response.companies;
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
      createUserCompany: {
        user: {},
        company: {}
      }
    };

    const dialogRef = this.dialog.open(CreateUserCompanyDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((result: CompanyDto) => {
      if (result) {
        this.refreshCompanies();
      }
    });
  }
}
