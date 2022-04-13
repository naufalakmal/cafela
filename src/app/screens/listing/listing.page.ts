import { ViewWillEnter } from '@ionic/angular';
import { MenuService } from './../new-menu/menu.service';
import { Menu } from './../../models/menu';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit, ViewWillEnter {
  categories: Category[] = [];
  foods: Food[] = [];
  menu: Menu[] = [];

  constructor(private foodService: FoodService, private router: Router, private service: MenuService) {}

  ionViewWillEnter(): void {
    this.service.findMenu().subscribe(data=>{
      this.menu = data.body;
    });
  }

  ngOnInit() {
    this.foods = this.foodService.getFoods();
  }

  goToDetailPage(id: number) {
    this.router.navigate(['detail', id]);
  }
}
