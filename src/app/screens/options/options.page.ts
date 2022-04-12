import { ViewWillEnter } from '@ionic/angular';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit, ViewWillEnter {

  role: any = null;
  user = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }
  ionViewWillEnter(): void {
    this.user =JSON.parse(localStorage.getItem('currentLogin'));
    this.role = this.user.idRole;
  }

  ngOnInit() {
  }

  openmodal() {
    const swalWithBootstrapButtons = Swal.mixin({
    });
    swalWithBootstrapButtons.fire({
        title: 'Anda Yakin',
        text: 'Keluar Dari Akun?',
        type: 'warning',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        reverseButtons: true,
        confirmButtonColor: '#36c6d3',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.value) {
            this.logout();
        }
    });
  }

  logout(){
    this.authService.logout();
  }

}
