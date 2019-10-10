import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Pantalla3ListComponent} from './list/pantalla3-list.component';
import {Pantalla3Component} from './pantalla3.component';

const routes: Routes = [
  {
    path: '',
    component: Pantalla3Component,
    children: [
      {
        path: 'pantalla3',
        component: Pantalla3ListComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Pantalla3RoutingModule {
}
