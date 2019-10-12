import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiciosListComponent} from './list/servicios-list.component';
import {ServiciosComponent} from './servicios.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
    children: [
      {
        path: 'servicios',
        component: ServiciosListComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule {
}
