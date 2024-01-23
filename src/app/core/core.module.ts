import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MobileSidenavComponent } from './components/mobile-sidenav/mobile-sidenav.component';
import { AuthenticatedLayoutComponent } from './layouts/authenticated-layout/authenticated-layout.component';
import { LandingPageHeaderComponent } from './components/landing-page-header/landing-page-header.component';
import { UnauthenticatedLayoutComponent } from './layouts/unauthenticated-layout/unauthenticated-layout.component';
import { LandingPageSideNavComponent } from './components/landing-page-side-nav/landing-page-side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
    declarations: [
        BodyComponent,
        SidenavComponent,
        HeaderComponent,
        MobileSidenavComponent,
        AuthenticatedLayoutComponent,
        UnauthenticatedLayoutComponent,
        LandingPageHeaderComponent,
        LandingPageSideNavComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatInputModule,
        MatRippleModule,
        MatBadgeModule
    ],
    exports: [
        BodyComponent,
        SidenavComponent,
        HeaderComponent,
        MobileSidenavComponent,
        LandingPageHeaderComponent
    ]
})
export class CoreModule { }