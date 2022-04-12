import { Transaksi } from './../../models/transaksi';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  constructor(
    private http: HttpClient
  ) { }

  public newTransaksi(value: Transaksi){
    return this.http.post<any>(`${environment.baseUrl}/api/transaksi/new`, value, {observe : 'response'});
  }
}
