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
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`))
  }

  delete(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${id}`));
  }

  update(user: IUser): Promise<IUser> {
    let { _id, ...userBody } = user;
    return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${_id}`, userBody))
  }

  insert(user: IUser): Promise<IUser> {
    let { _id, ...userBody } = user;
    return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, userBody))
  }
}
