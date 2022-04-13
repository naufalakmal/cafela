import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  getFoods(): Food[] {
    return [];
  }

  getFood(id: number): Food {
    return this.getFoods().find((food) => food.id === id);
  }
}
