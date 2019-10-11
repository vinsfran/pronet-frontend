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
      // Ruta para Deudas
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
      // Ruta para Pantalla1
      {
        path: '',
        loadChildren: '../modulos/pantalla1/pantalla1.module#Pantalla1Module'
      },
      // Ruta para Pantalla2
      {
        path: '',
        loadChildren: '../modulos/pantalla2/pantalla2.module#Pantalla2Module'
      },
      // Ruta para Pantalla3
      {
        path: '',
        loadChildren: '../modulos/pantalla3/pantalla3.module#Pantalla3Module'
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
