import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeudasListComponent} from './list/deudas-list.component';
import {DeudasComponent} from './deudas.component';

const routes: Routes = [
  {
    path: '',
    component: DeudasComponent,
    children: [
      {
        path: 'deudas',
        component: DeudasListComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeudasRoutingModule {
}
