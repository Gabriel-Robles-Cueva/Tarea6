import { Component, inject, Input } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-usuario-card',
  imports: [RouterLink],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class UsuarioCardComponent {
  @Input() miUsuario!: IUser;
  usuarioServices = inject(UsuariosService);
  router = inject(Router);

  async deleteUser(id: string) {
    try {
      let conf = confirm(`Vas a borrar al empleado ${this.miUsuario.first_name} ${this.miUsuario.last_name}`);

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
