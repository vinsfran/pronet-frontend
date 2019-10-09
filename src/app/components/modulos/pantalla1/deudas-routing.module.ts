import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeudasListComponent} from './list/deudas-list.component';
import {DeudasComponent} from './deudas.component';
import {DeudasFormComponent} from './form/deudas-form.component';

const routes: Routes = [
  {
    path: '',
    component: DeudasComponent,
    children: [
      {
        path: 'deudas',
        component: DeudasListComponent
      },
      {
        path: 'deudas/form',
        component: DeudasFormComponent
      },
      {
        path: 'deudas/form/:id',
        component: DeudasFormComponent
      },
      // {
      //   path: 'deudas/pagar/:id',
      //   component: RealizarPagoPrestamoFormComponent
      // },
      // {
      //   path: 'deudas/detalles/:id',
      //   component: VerDetallesPrestamoFormComponent
      // }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeudasRoutingModule {
}
