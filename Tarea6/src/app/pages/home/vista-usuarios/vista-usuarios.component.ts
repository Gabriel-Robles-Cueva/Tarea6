import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../../interfaces/iuser';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-vista-usuarios',
  imports: [RouterLink],
  templateUrl: './vista-usuarios.component.html',
  styleUrl: './vista-usuarios.component.css'
})

export class VistaUsuariosComponent {
  @Input() idUsuario: string = "";
  elUsuario!: IUser;
  usuarioServices = inject(UsuariosService);
  router= inject(Router);

  async ngOnInit() {
    let id = this.idUsuario;
    console.log(id);


    try {
      this.elUsuario = await this.usuarioServices.getById(id)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUser(id: string) {
    try {
      let conf = confirm(`Vas a borrar al empleado ${this.elUsuario.first_name} ${this.elUsuario.last_name}`);

      if (conf) {
        await this.usuarioServices.delete(id);
        alert("Usuario eliminado correctamente");
        this.router.navigate(['/home'])
      } else {
        alert("Acción cancelada");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Hubo un error al eliminar el usuario.");
    }
  }
}
