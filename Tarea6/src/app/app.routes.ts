import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './pages/home/lista-usuarios/lista-usuarios.component';
import { VistaUsuariosComponent } from './pages/home/vista-usuarios/vista-usuarios.component';
import { FormUsuariosComponent } from './pages/home/form-usuarios/form-usuarios.component';

export const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: ListaUsuariosComponent },
  { path: 'user/:idUsuario', component: VistaUsuariosComponent },
  { path: 'newUser', component: FormUsuariosComponent },
  { path: 'updateUser/:idUsuario', component: FormUsuariosComponent },
  { path: '**', redirectTo: 'home' }
];
