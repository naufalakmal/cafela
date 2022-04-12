import { DataTransaksiService } from './data-transaksi.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataTransaksiPageRoutingModule } from './data-transaksi-routing.module';

import { DataTransaksiPage } from './data-transaksi.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataTransaksiPageRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ],
  declarations: [DataTransaksiPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DataTransaksiService
  ]
})
export class DataTransaksiPageModule {}
