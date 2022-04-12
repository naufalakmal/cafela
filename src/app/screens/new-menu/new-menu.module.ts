import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMenuPageRoutingModule } from './new-menu-routing.module';

import { NewMenuPage } from './new-menu.page';
import { DetailPageRoutingModule } from '../detail/detail-routing.module';
import { BadgeModule } from 'src/app/components/badge/badge.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG} from 'ng2-currency-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { MenuService } from './menu.service';

export const customCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: 'Rp.',
  suffix: '',
  thousands: '.'
};


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewMenuPageRoutingModule,
    DetailPageRoutingModule,
    BadgeModule,
    ButtonModule,
    NgxCurrencyModule,
    HttpClientModule
  ],
  declarations: [NewMenuPage],
  providers:[
    {provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig},
    MenuService
  ]
})
export class NewMenuPageModule {}
