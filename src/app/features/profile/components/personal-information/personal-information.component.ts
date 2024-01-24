import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  personalInformationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.personalInformationForm = this.formBuilder.group({
      displayName: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      aboutYourself: [null, [Validators.maxLength(100), Validators.required]],
      areaOfInterest: [null, Validators.required],
      studentOrProfessional: [null, Validators.required],
      expertise: [null],
      experience: [null],
      role: [null]
    })
  }

  ngOnInit(): void {
    this.updateRequiredState();
  }

  updateRequiredState() {
    this.personalInformationForm.get('studentOrProfessional')?.valueChanges.subscribe((value) => {
      if (value === 'professional') {
        this.personalInformationForm?.get('expertise')?.setValidators(Validators.required);
        this.personalInformationForm?.get('expertise')?.updateValueAndValidity();
        this.changeDetectorRef.detectChanges();

        this.personalInformationForm?.get('experience')?.setValidators(Validators.required);
        this.personalInformationForm?.get('experience')?.updateValueAndValidity();
        this.changeDetectorRef.detectChanges();

        this.personalInformationForm?.get('role')?.setValidators([Validators.required, Validators.maxLength(200)]);
        this.personalInformationForm?.get('role')?.updateValueAndValidity();
        this.changeDetectorRef.detectChanges();
      } else {
        this.personalInformationForm?.get('expertise')?.setValidators(null);
        this.personalInformationForm?.get('expertise')?.updateValueAndValidity();
        this.changeDetectorRef.detectChanges();

        this.personalInformationForm?.get('experience')?.setValidators(null);
        this.personalInformationForm?.get('experience')?.updateValueAndValidity();
        this.changeDetectorRef.detectChanges();

        this.personalInformationForm?.get('role')?.setValidators(null);
        this.personalInformationForm?.get('role')?.updateValueAndValidity();
        this.changeDetectorRef.detectChanges();
      }
    })
  }

  submit() {
    if (this.personalInformationForm.invalid) {
      return
    }

    this.dialog.open(ProfileUpdateComponent, {
      width: '550px',
      disableClose: true
    });
  }
}
