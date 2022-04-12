import { NgxCurrencyModule } from 'ngx-currency';
import { TransaksiService } from './transaksi.service';
import { HttpClientModule } from '@angular/common/http';
import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage, Bayar } from './cart.page';
import { CartItemModule } from 'src/app/components/cart-item/cart-item.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG} from 'ng2-currency-mask';

export const customCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: 'Rp.',
  suffix: '',
  thousands: '.'
};

export const INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Bayar),
  multi: true,
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    CartItemModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  declarations: [CartPage, Bayar],
  providers: [
    {provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig},
    TransaksiService]
})
export class CartPageModule {}
