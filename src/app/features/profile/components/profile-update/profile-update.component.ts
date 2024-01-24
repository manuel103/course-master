import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent {
  constructor(
    public dialogRef: MatDialogRef<ProfileUpdateComponent>
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
