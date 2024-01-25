import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RemoveSymbolsPipe } from './pipes/remove-symbols.pipe';
import { RoundUpPipe } from './pipes/round-up.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';

@NgModule({
  declarations: [
    RemoveSymbolsPipe,
    RoundUpPipe,
    ErrorModalComponent
  ],
  imports: [
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    MatSnackBarModule,
    CommonModule
  ],
  exports: [RemoveSymbolsPipe, RoundUpPipe]
})
export class SharedModule { }