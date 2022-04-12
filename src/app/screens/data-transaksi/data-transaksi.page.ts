import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transaksi } from './../../models/transaksi';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Data } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-data-transaksi',
  templateUrl: './data-transaksi.page.html',
  styleUrls: ['./data-transaksi.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTransaksiPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;
  form: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      idPegawai: this.formBuilder.control(null, [Validators.required]),
      tanggal: this.formBuilder.control(null, [Validators.required])
    });
    this.getData();
   }

  ngOnInit() {
  }

  getData(){
    this.columns = [
      { name: 'No.Transaksi' },
      { name: 'Kasir' },
      { name: 'Nominal' },
      { name: 'Tanggal' }
    ];
    const value: Transaksi = this.form.value;
    this.http.post<any[]>(`${environment.baseUrl}/api/transaksi/findDataTransaksi`, value)
      .subscribe((res) => {
        console.log(res);
        this.rows = res;
      });
  }

}
