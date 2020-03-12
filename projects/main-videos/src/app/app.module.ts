import { NgModule } from '@angular/core';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedLibModule } from 'shared-lib';
//import 'hammerjs';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment'

//Custom components
import { MainFormComponent } from './components/forms/main-form/main-form.component';
import { MainFormDialogComponent } from './components/dialogs/main-form-dialog/main-form-dialog.component';
import { MainTableComponent } from './components/table/main-table/main-table.component';


//Material components
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
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    MainFormComponent,
    MainFormDialogComponent,
    MainTableComponent
  ],
  entryComponents:[
    MainFormDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    MatButtonModule,
    MatChipsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    SharedLibModule.forRoot(environment),
    MatSelectModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: {color: 'primary'}
  }],
  bootstrap: [AppComponent],

})
export class AppModule { }
