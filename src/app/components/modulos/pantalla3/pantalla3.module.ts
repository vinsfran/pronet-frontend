import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {Pantalla3RoutingModule} from './pantalla3-routing.module';
import {Pantalla3Component} from './pantalla3.component';
import {Pantalla3ListComponent} from './list/pantalla3-list.component';
import {TransaccionesService} from '../../../services/transacciones.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    Pantalla3RoutingModule
  ],
  declarations: [
    Pantalla3Component,
    Pantalla3ListComponent
  ],
  providers: [
    TransaccionesService
  ]
})

export class Pantalla3Module {
}
