import { Menu } from './../../models/menu';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient
  ) { }

  public save(user: Menu){
    return this.http.post<any>(`${environment.baseUrl}/api/menu/save`, user, {observe : 'response'});
  }

  public findMenu(){
    return this.http.get<any>(`${environment.baseUrl}/api/menu/findAll`, {observe : 'response'});
  }

  public findMenuById(id){
    return this.http.get<any>(`${environment.baseUrl}/api/menu/findById/${id}`, {observe : 'response'});
  }

  public upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', environment.baseUrl + '/api/menu/filesupload', formData, {
        reportProgress: true,
        responseType: 'json'
    });

    return this.http.request(req);
  }
}
