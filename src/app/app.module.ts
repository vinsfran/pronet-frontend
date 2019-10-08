import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeEsPy from '@angular/common/locales/es-PY';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import {AppRoutingModule} from './app-routing.module';
import 'angular2-navigate-with-data';

registerLocaleData(localeEsPy);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es_PY'},
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
