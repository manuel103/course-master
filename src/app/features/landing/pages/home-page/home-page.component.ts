import { Component } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '@app/shared/components/error-modal/error-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return
    }

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (this.authService.login(username, password)) {
      this.router.navigate(['/app/dashboard']);
    } else {
      this.dialog.open(ErrorModalComponent, {
        width: '550px',
        disableClose: true,
        data: {
          message: "Invalid credentials",
        }
      });
    }
  }
}
