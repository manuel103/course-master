import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '@app/shared/components/error-modal/error-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;
    let mockAuthService: jasmine.SpyObj<AuthService>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockDialog: jasmine.SpyObj<MatDialog>;

    beforeEach(async () => {
        mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule],
            declarations: [HomePageComponent],
            providers: [
                FormBuilder,
                { provide: AuthService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter },
                { provide: MatDialog, useValue: mockDialog }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not submit if form is invalid', () => {
        component.login();
        expect(mockAuthService.login).not.toHaveBeenCalled();
    });

    it('should navigate to dashboard on successful login', () => {
        mockAuthService.login.and.returnValue(true);

        component.loginForm.controls['username'].setValue('validUser');
        component.loginForm.controls['password'].setValue('validPassword');
        component.login();

        expect(mockAuthService.login).toHaveBeenCalledWith('validUser', 'validPassword');
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/app/dashboard']);
    });

    it('should open an error dialog on failed login', () => {
        mockAuthService.login.and.returnValue(false);

        component.loginForm.controls['username'].setValue('invalidUser');
        component.loginForm.controls['password'].setValue('invalidPassword');
        component.login();

        expect(mockAuthService.login).toHaveBeenCalledWith('invalidUser', 'invalidPassword');
        expect(mockDialog.open).toHaveBeenCalledWith(ErrorModalComponent, {
            width: '550px',
            disableClose: true,
            data: { message: "Invalid credentials" }
        });
    });

    // Add more tests as needed
});

