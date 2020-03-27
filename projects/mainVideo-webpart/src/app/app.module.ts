import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';
import { SharedLibModule } from 'shared-lib';

import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CarouselModule } from 'ngx-bootstrap';
import { SafePipe } from './sanitizer';
import { MainFormDialogComponent } from './components/dialogs/main-form-dialog/main-form-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    MainFormDialogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    BrowserAnimationsModule,
    CarouselModule,
    FlexLayoutModule,
    SharedLibModule.forRoot(environment),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
