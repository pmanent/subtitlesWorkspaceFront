import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule ,HTTP_INTERCEPTORS }    from '@angular/common/http';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';


import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationInterceptor } from './services/authorization.interceptor';
import { DialogComponent } from './views/dialog/dialog.component';
import { SpinnerComponent } from './views/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    SpinnerComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent,SpinnerComponent]
})
export class AppModule { }
