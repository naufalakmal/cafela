import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataTransaksiPage } from './data-transaksi.page';

const routes: Routes = [
  {
    path: '',
    component: DataTransaksiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataTransaksiPageRoutingModule {}
