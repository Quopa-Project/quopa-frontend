import {Component, Inject} from '@angular/core';
import {CreateUserCompanyDto} from "../../models/create-user-company.dto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CompanyService} from "../../../core/services/company/company.service";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";

type AddUserCompany = {
  createUserCompany: CreateUserCompanyDto;
}

@Component({
  selector: 'app-create-user-company.dialog',
  standalone: false,
  templateUrl: './create-user-company.dialog.html',
  styleUrl: './create-user-company.dialog.css'
})
export class CreateUserCompanyDialog {
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateUserCompanyDto>,
    @Inject(MAT_DIALOG_DATA) public data: AddUserCompany,
    private snackBar: MatSnackBar,
    private companyService: CompanyService,
  ) { }

  onCreateCompanyWithUser() {
    this.loading = true;
    this.snackBar.open('Creando compañía');
    this.companyService.createUserAndCompany(this.data.createUserCompany).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.dismiss();
        this.dialogRef.close(response.company);
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
