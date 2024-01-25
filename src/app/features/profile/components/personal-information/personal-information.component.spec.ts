import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PersonalInformationComponent } from './personal-information.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

describe('ProfileComponent', () => {
    let component: PersonalInformationComponent;
    let fixture: ComponentFixture<PersonalInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PersonalInformationComponent],
            imports: [
                ReactiveFormsModule, MatDialogModule,
                NoopAnimationsModule, FormsModule,
                MatFormFieldModule, TextFieldModule,
                MatSelectModule, MatInputModule
            ],
            providers: [
                FormBuilder,
                { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PersonalInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the initial form controls invalid', () => {
        expect(component.personalInformationForm.invalid).toBeTrue();
    });

    it('should initialize the personalInformationForm form group', () => {
        expect(component.personalInformationForm).toBeDefined();
        expect(component.personalInformationForm.get('displayName')).toBeDefined();
        expect(component.personalInformationForm.get('firstName')).toBeDefined();
        expect(component.personalInformationForm.get('lastName')).toBeDefined();
        expect(component.personalInformationForm.get('aboutYourself')).toBeDefined();
        expect(component.personalInformationForm.get('areaOfInterest')).toBeDefined();
        expect(component.personalInformationForm.get('studentOrProfessional')).toBeDefined();
        expect(component.personalInformationForm.get('expertise')).toBeDefined();
        expect(component.personalInformationForm.get('experience')).toBeDefined();
        expect(component.personalInformationForm.get('role')).toBeDefined();
    });

    it('should set expertise, experience, and role to required if studentOrProfessional is professional', () => {
        component.personalInformationForm.get('studentOrProfessional')?.setValue('professional');
        fixture.detectChanges();

        const expertiseField = component.personalInformationForm.get('expertise');
        const experienceField = component.personalInformationForm.get('experience');
        const roleField = component.personalInformationForm.get('role');

        expect(expertiseField?.errors).toEqual({ required: true });
        expect(experienceField?.errors).toEqual({ required: true });
        expect(roleField?.errors).toEqual({ required: true });
    });

    it('should open dialog on valid form submit', () => {
        component.personalInformationForm.setValue({
            displayName: 'John Doe',
            firstName: 'John',
            lastName: 'Doe',
            aboutYourself: 'Software Engineer with 5 years of experience',
            areaOfInterest: ['programming', 'machine learning'],
            studentOrProfessional: 'professional',
            expertise: 'frontend',
            experience: '5-10',
            role: 'Senior Developer'
        });

        component.submit();
        expect(component.dialog.open).toHaveBeenCalled();
    });


    it('should not do anything on submit if form is invalid', () => {
        // Set the form to an invalid state
        component.personalInformationForm.setValue({
            displayName: '', // Required field left empty
            firstName: '', // Required field left empty
            lastName: '', // Required field left empty
            aboutYourself: '', // Required field left empty
            areaOfInterest: null, // Required field left empty
            studentOrProfessional: null, // Required field left empty
            expertise: '', // Can be empty since 'studentOrProfessional' is not 'professional'
            experience: '', // Can be empty since 'studentOrProfessional' is not 'professional'
            role: '' // Can be empty since 'studentOrProfessional' is not 'professional'
        });

        component.submit();
        expect(component.dialog.open).not.toHaveBeenCalled();
    });


});
