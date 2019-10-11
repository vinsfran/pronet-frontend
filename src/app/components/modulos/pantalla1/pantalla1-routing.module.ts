import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Pantalla1ListComponent} from './list/pantalla1-list.component';
import {Pantalla1Component} from './pantalla1.component';

const routes: Routes = [
  {
    path: '',
    component: Pantalla1Component,
    children: [
      {
        path: 'pantalla1',
        component: Pantalla1ListComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Pantalla1RoutingModule {
}
