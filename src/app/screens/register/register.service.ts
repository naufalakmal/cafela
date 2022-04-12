import { RegisterUser } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  public getRole(){
    return this.http.get<any>(`${environment.baseUrl}/api/user/roles`, {observe : 'response'});
  }

  public register(user: RegisterUser){
    return this.http.post<any>(`${environment.baseUrl}/api/user/save`, user, {observe : 'response'});
  }
}
