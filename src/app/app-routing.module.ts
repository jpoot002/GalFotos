import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CargaComponent } from './components/carga/carga.component';
import { AlgunComponent } from './components/algun/algun.component';

const routes: Routes = [
  { path: 'Inicio', component: InicioComponent },
  { path: 'Carga', component: CargaComponent },
  { path: 'Algun', component: AlgunComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'Inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
