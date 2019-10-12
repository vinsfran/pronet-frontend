import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {TransaccionesRoutingModule} from './transacciones-routing.module';
import {TransaccionesComponent} from './transacciones.component';
import {TransaccionesListComponent} from './list/transacciones-list.component';
import {TransaccionesService} from '../../../services/transacciones.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    TransaccionesRoutingModule
  ],
  declarations: [
    TransaccionesComponent,
    TransaccionesListComponent
  ],
  providers: [
    TransaccionesService
  ]
})

export class TransaccionesModule {
}
