import { MenuService } from './../new-menu/menu.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { CartItem } from 'src/app/models/cart-item.model';
import { Food } from 'src/app/models/food.model';
import { Menu } from 'src/app/models/menu';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, ViewWillEnter {
  id: number;
  food: Menu;
  menu: Menu;
  views = false;

  role: any = null;
  user = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private toastCtrl: ToastController,
    private service: MenuService,
    private router: Router
  ) {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    // this.service.findMenuById(this.id).subscribe(data=>{
    //   // console.log(data.body);
    //   this.food = data.body;
    // });
  }

  ionViewWillEnter(): void {
    this.user =JSON.parse(localStorage.getItem('currentLogin'));
    this.role = this.user.idRole;
    this.views = false;
    this.service.findMenuById(this.id).subscribe(data => {
      this.food = data.body;
      this.views = true;
    });
  }

  ngOnInit() {
  }
  

  addItemToCart() {
    const cartitem: CartItem = {
      id: this.food.id,
      name: this.food.namaNemu,
      price: this.food.hargaSatuan,
      image: '/appservice/api/menu/file/' + this.food.file,
      quantity: 1,
    };

    this.cartService.addToCart(cartitem);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Food added to the cart',
      mode: 'ios',
      duration: 1000,
      position: 'top',
    });

    toast.present();
  }
}
