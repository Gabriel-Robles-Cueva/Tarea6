import { Component, Input } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario-card',
  imports: [RouterLink],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class UsuarioCardComponent {
  @Input() miUsuario!: IUser;
}
