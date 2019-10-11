import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {Pantalla1RoutingModule} from './pantalla1-routing.module';
import {Pantalla1Component} from './pantalla1.component';
import {Pantalla1ListComponent} from './list/pantalla1-list.component';
import {DeudasService} from '../../../services/deudas.service';
import {ServiciosService} from '../../../services/servicios.service';
import {ClientesService} from '../../../services/clientes.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    Pantalla1RoutingModule
  ],
  declarations: [
    Pantalla1Component,
    Pantalla1ListComponent
  ],
  providers: [
    DeudasService,
    ServiciosService,
    ClientesService
  ]
})

export class Pantalla1Module {
}
