import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {Pantalla2RoutingModule} from './pantalla2-routing.module';
import {Pantalla2Component} from './pantalla2.component';
import {Pantalla2ListComponent} from './list/pantalla2-list.component';
import {TransaccionesService} from '../../../services/transacciones.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    Pantalla2RoutingModule
  ],
  declarations: [
    Pantalla2Component,
    Pantalla2ListComponent
  ],
  providers: [
    TransaccionesService
  ]
})

export class Pantalla2Module {
}
