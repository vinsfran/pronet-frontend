import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {ClientesService} from '../../../services/clientes.service';
import {DeudasService} from '../../../services/deudas.service';
import {DashboardService} from '../../../services/dashboard.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    DashboardService,
    DeudasService,
    ClientesService
  ]
})

export class DashboardModule {
}

