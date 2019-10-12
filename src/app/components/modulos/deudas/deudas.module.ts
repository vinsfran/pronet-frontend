import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {DeudasRoutingModule} from './deudas-routing.module';
import {DeudasComponent} from './deudas.component';
import {DeudasListComponent} from './list/deudas-list.component';
import {DeudasService} from '../../../services/deudas.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    DeudasRoutingModule
  ],
  declarations: [
    DeudasComponent,
    DeudasListComponent
  ],
  providers: [
    DeudasService
  ]
})

export class DeudasModule {
}
