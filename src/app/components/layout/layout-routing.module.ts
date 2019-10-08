import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Ruta para Clientes
      {
        path: '',
        loadChildren: '../modulos/clientes/clientes.module#ClientesModule'
      },
      // Ruta para Prestamos
      {
        path: '',
        loadChildren: '../modulos/deudas/deudas.module#DeudasModule'
      },
      // Ruta para Servicios
      {
        path: '',
        loadChildren: '../modulos/servicios/servicios.module#ServiciosModule'
      },
      // Ruta para Transacciones
      {
        path: '',
        loadChildren: '../modulos/transacciones/transacciones.module#TransaccionesModule'
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}