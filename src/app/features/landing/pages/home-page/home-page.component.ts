import { Component } from '@angular/core';
import { LandingPageSections } from '../../landing-pages-data';
import { AuthService } from '@app/core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  sectionContent = LandingPageSections;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
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
      // alert('Invalid credentials');
      this.snackBar.open('Invalid credentials', '', {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
    }
  }
}
