import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StrukePage } from './struke.page';

const routes: Routes = [
  {
    path: '',
    component: StrukePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StrukePageRoutingModule {}
