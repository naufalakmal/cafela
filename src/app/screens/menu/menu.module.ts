import { MenuService } from './../new-menu/menu.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { CategoryItemModule } from 'src/app/components/category-item/category-item.module';
import { FoodCardModule } from 'src/app/components/food-card/food-card.module';
import { FoodEditCardModule } from 'src/app/components/foot-edit-card/food-edit-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    SearchbarModule,
    CategoryItemModule,
    FoodEditCardModule,
    HttpClientModule
  ],
  declarations: [MenuPage],
  providers: [
    MenuService
  ]
})
export class MenuPageModule {}
