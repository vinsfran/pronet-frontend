import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Pantalla2ListComponent} from './list/pantalla2-list.component';
import {Pantalla2Component} from './pantalla2.component';

const routes: Routes = [
  {
    path: '',
    component: Pantalla2Component,
    children: [
      {
        path: 'pantalla2',
        component: Pantalla2ListComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Pantalla2RoutingModule {
}
