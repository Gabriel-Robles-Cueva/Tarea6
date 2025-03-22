import { Component, inject } from '@angular/core';
import { IUser } from '../../../interfaces/iuser';
import { UsuariosService } from '../../../services/usuarios.service';
import { IResponse } from '../../../interfaces/iresponse';
import { UsuarioCardComponent } from "../../../usuario-card/usuario-card.component";

@Component({
  selector: 'app-lista-usuarios',
  imports: [UsuarioCardComponent],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {
  arrUsuariosPromises: IUser[] = [];
  usuariosServices = inject(UsuariosService);

  async ngOnInit() {

    this.cargarUsuarios();

  }

  async cargarUsuarios(url: string = "") {
    /* Consumición Promises - generico javascript */
    try {
      let response: IResponse = await this.usuariosServices.getAllPromise(url)
      this.arrUsuariosPromises = response.results
    } catch (error) {
      console.log(error)
    }
  }
}
