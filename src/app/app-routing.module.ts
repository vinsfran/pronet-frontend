import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const dirComponents = './components/';

const routes: Routes = [
  {
    path: '',
    loadChildren: dirComponents + 'layout/layout.module#LayoutModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
