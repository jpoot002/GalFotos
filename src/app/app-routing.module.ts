import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagenesComponent } from './components/imagenes/imagenes.component';
import { CargaComponent } from './components/carga/carga.component';

const routes: Routes = [
  { path: 'Inico', component: ImagenesComponent },
    { path: 'Carga', component: CargaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'fotos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
