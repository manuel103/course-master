import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';

@NgModule({
    declarations: [
        ProfileLayoutComponent,
        PersonalInformationComponent, ProfileUpdateComponent
    ],
    imports: [
        ProfileRoutingModule,
        MatTabsModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        SharedModule,
        TextFieldModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: []
})
export class ProfileModule { }