import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiciosListComponent} from './list/servicios-list.component';
import {ServiciosComponent} from './servicios.component';
import {ServiciosFormComponent} from './form/servicios-form.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
    children: [
      {
        path: 'servicios',
        component: ServiciosListComponent
      },
      {
        path: 'servicios/form',
        component: ServiciosFormComponent
      },
      {
        path: 'servicios/form/:id',
        component: ServiciosFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule {
}
