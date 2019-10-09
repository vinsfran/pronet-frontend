import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransaccionesListComponent} from './list/transacciones-list.component';
import {TransaccionesComponent} from './transacciones.component';
import {TransaccionesFormComponent} from './form/transacciones-form.component';

const routes: Routes = [
  {
    path: '',
    component: TransaccionesComponent,
    children: [
      {
        path: 'transacciones',
        component: TransaccionesListComponent
      },
      {
        path: 'transacciones/form',
        component: TransaccionesFormComponent
      },
      {
        path: 'transacciones/form/:id',
        component: TransaccionesFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaccionesRoutingModule {
}
