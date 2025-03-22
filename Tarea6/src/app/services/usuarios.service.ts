import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { IResponse } from '../interfaces/iresponse';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private httpClient = inject(HttpClient)
  private baseUrl: string = "https://peticiones.online/api/users"

  getAllPromise(url: string): Promise<IResponse> {
    url = (url === "") ? "https://peticiones.online/api/users" : url
    return lastValueFrom(this.httpClient.get<IResponse>(url))
  }

  getById(id: string): Promise<IUser> {
    console.log(this.baseUrl+"/"+id);

    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`))
  }
}
