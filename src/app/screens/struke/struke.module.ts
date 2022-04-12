import { StrukeService } from './struke.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { StrukePageRoutingModule } from './struke-routing.module';

import { StrukePage } from './struke.page';
// import { File } from '@ionic-native/file';
// import { FileOpener } from '@ionic-native/file-opener';
import { RouteReuseStrategy } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StrukePageRoutingModule,
    HttpClientModule,
    NgxPrintModule
  ],
  declarations: [StrukePage],
  providers: [
    // File,
    // FileOpener,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    StrukeService,]
})
export class StrukePageModule {}
