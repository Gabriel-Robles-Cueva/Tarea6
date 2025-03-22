import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../../interfaces/iuser';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-vista-usuarios',
  imports: [],
  templateUrl: './vista-usuarios.component.html',
  styleUrl: './vista-usuarios.component.css'
})
export class VistaUsuariosComponent {
  @Input() idUsuario: string = "";
  elUsuario!: IUser;
  usuarioServices = inject(UsuariosService);


  async ngOnInit() {

    let id = this.idUsuario;
    console.log(id);

    try {
      this.elUsuario = await this.usuarioServices.getById(id)
    } catch (error) {
      console.log(error)
    }
  }
}
