import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing.routing.module';
import { MatButtonModule } from '@angular/material/button';
import { HomePageComponent } from './pages/home-page/home-page.component';


@NgModule({
    declarations: [HomePageComponent],
    imports: [
        CommonModule,
        LandingRoutingModule,
        MatButtonModule
    ],
    exports: []
})
export class LandingModule { }