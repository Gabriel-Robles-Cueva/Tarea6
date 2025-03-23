import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    }else {
      this.usuario = { first_name: '', last_name: '', email: '', image: '' } as IUser;
    }

    this.userForm = new FormGroup({
      _id: new FormControl(this.idUsuario || null, []),
      first_name: new FormControl(this.usuario.first_name || '', [Validators.required, Validators.minLength(2)]),
      last_name: new FormControl(this.usuario.last_name || '', [Validators.required, Validators.minLength(2)]),
      email: new FormControl(this.usuario.email || '', [Validators.required, Validators.email]),
      image: new FormControl(this.usuario.image || '', [Validators.required])
    });
  }

  async getDataForm() {
    if (this.userForm.invalid) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    let response: IUser | any
    try {
      if (this.userForm.value._id) {
        response = await this.usuarioServices.update(this.userForm.value);
        alert("Usuario "+response.id+" Modificado")
      } else {
        response = await this.usuarioServices.insert(this.userForm.value)
        alert("Usuario Añadido Con ID: "+response.id)
      }
      if (response.createdAt || response.updateAt) {
        this.router.navigate(['/home'])
      }
    } catch (msg: any) {
      console.log(msg);
    }
  }

  isInvalid(field: string) {
    return this.userForm.get(field)?.invalid && this.userForm.get(field)?.touched;
  }

}
