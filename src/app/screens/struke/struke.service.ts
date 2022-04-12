import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrukeService {

  constructor(
    private http: HttpClient
  ) { }

  public findLastTransaksi(){
    return this.http.get<any>(`${environment.baseUrl}/api/transaksi/findLastTransaksi`, {observe : 'response'});
  }
}
