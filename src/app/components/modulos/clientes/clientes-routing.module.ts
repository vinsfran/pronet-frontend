import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientesListComponent} from './list/clientes-list.component';
import {ClientesComponent} from './clientes.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    children: [
      {
        path: 'clientes',
        component: ClientesListComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {
}
