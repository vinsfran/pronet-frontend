import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {ServiciosRoutingModule} from './servicios-routing.module';
import {ServiciosComponent} from './servicios.component';
import {ServiciosListComponent} from './list/servicios-list.component';
import {ServiciosFormComponent} from './form/servicios-form.component';
import {ServiciosService} from '../../../services/servicios.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    ServiciosRoutingModule
  ],
  declarations: [
    ServiciosComponent,
    ServiciosFormComponent,
    ServiciosListComponent,
  ],
  providers: [
    ServiciosService
  ]
})

export class ServiciosModule {
}
