import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BranchService} from "../../services/branch/branch.service";
import {CreateUserBranchDto} from "../../models/create-user-branch.dto";
import {ErrorMessage} from "../../../shared/models/error-message";
import {ErrorSnackBar} from "../../../shared/pages/error-snack-bar/error-snack-bar";

type AddUserBranch = {
  createUserBranch: CreateUserBranchDto;
};

@Component({
  selector: 'app-create-user-branch.dialog',
  standalone: false,
  templateUrl: './create-user-branch.dialog.html',
  styleUrl: './create-user-branch.dialog.css'
})
export class CreateUserBranchDialog {
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateUserBranchDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddUserBranch,
    private snackBar: MatSnackBar,
    private branchService: BranchService,
  ) { }

  onCreateBranchWithUser() {
    this.loading = true;
    this.snackBar.open('Creando sucursal');
    this.branchService.createUserAndBranch(this.data.createUserBranch).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.dismiss();
        this.dialogRef.close(response.branch);
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
