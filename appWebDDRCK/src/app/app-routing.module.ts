import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarContactoComponent } from './listar-contacto/listar-contacto.component';
import { AgregarContactoComponent } from './agregar-contacto/agregar-contacto.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar-contactos', pathMatch: 'full' },  
  { path: 'listar-contactos', component: ListarContactoComponent },  
  { path: 'agregar-contacto', component: AgregarContactoComponent },  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
