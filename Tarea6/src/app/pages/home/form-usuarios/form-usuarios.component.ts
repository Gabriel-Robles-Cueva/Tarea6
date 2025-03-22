import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../../interfaces/iuser';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-usuarios',
  imports: [ReactiveFormsModule],
  templateUrl: './form-usuarios.component.html',
  styleUrl: './form-usuarios.component.css'
})

export class FormUsuariosComponent {
  @Input() idUsuario: string = "";
  usuario!: IUser;
  usuarioServices = inject(UsuariosService);
  router= inject(Router);
  userForm: FormGroup = new FormGroup({}, [])
  title: string= "Añadir";

  async ngOnInit() {
    if (this.idUsuario) {
      try {
        this.usuario = await this.usuarioServices.getById(this.idUsuario);
        this.title = 'Actualizar'
      } catch (msg: any) {
        console.log(msg);
      }
    }
  }

}
