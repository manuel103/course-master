import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CartModule } from '../cart/cart.module';


@NgModule({
    declarations: [
        DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatInputModule,
        FormsModule,
        SharedModule,
        CartModule
    ],
    exports: [
        DashboardComponent
    ],
    providers: []
})
export class DashboardModule { }