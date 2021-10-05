import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatGridListModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatGridListModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppMaterialAngularModule {}
