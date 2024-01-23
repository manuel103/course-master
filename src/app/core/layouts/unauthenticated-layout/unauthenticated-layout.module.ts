import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthenticatedRoutingModule } from './unauthenticated-layout-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UnauthenticatedRoutingModule
  ],
  exports: []
})
export class UnauthenticatedModule { }