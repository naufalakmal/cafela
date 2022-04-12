import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewWillEnter {

  role: any = null;
  user = null;

  constructor() { }
  ionViewWillEnter(): void {
    this.user = JSON.parse(localStorage.getItem('currentLogin'));
    this.role = this.user.idRole;
  }
  ngOnInit() {

  }

}
