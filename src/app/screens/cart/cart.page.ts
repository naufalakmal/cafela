import { TransaksiService } from './transaksi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaksi, DetailTransaksi } from './../../models/transaksi';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, ToastController, ViewWillEnter } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, ViewWillEnter {
  cartItems$: Observable<CartItem[]>;
  cartitem: CartItem[];
  totalAmount$: Observable<number>;
  totalAmount: number;
  // transaksi: Transaksi;
  user: any;

  constructor(
    private cartService: CartService,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {}
  ionViewWillEnter(): void {
    this.cartService.getCart().subscribe( data => {
      this.cartitem = data as CartItem[];
      console.log(this.cartitem);
      this.cartService.getTotalAmount().subscribe(amount=> {
        this.totalAmount = amount as number;
      });
    });
    this.user =JSON.parse(localStorage.getItem('currentLogin'));
  }

  ngOnInit() {
    this.cartItems$ = this.cartService.getCart();
    this.totalAmount$ = this.cartService.getTotalAmount();
  }

  onIncrease(item: CartItem) {
    this.cartService.changeQty(1, item.id);
  }

  onDecrease(item: CartItem) {
    if (item.quantity === 1) this.removeFromCart(item);
    else this.cartService.changeQty(-1, item.id);
  }

  async removeFromCart(item: CartItem) {
    const alert = await this.alertCtrl.create({
      header: 'Remove',
      message: 'Are you sure you want to remove?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.cartService.removeItem(item.id),
        },
        {
          text: 'No',
        },
      ],
    });

    alert.present();
  }

  async presentProfileModal(transaksi: Transaksi) {
    const profileModal = await this.modalCtrl.create({
      component: Bayar,
      componentProps: transaksi,
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop()
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    profileModal.present();
  }

  save(){
    const swalWithBootstrapButtons = Swal.mixin({
    });
    swalWithBootstrapButtons.fire({
        title: 'Anda Yakin',
        text: 'Menambahkan Menu Berupa  ?',
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
          const transaksi = new Transaksi();
          transaksi.uangJumlah = this.totalAmount;
          const item: DetailTransaksi[] = [];
          // console.log(this.cartitem);
          for(let datas of this.cartitem){
            const pugs = new DetailTransaksi();
            console.log(datas);
            pugs.idMenu = datas.id;
            pugs.volume = datas.quantity;
            item.push(pugs);
          }
          transaksi.daftarMenu = item;
          console.log(transaksi.daftarMenu);
          transaksi.idPegawai = this.user.id;
          this.presentProfileModal(transaksi);
        }
    });
  }

}


@Component({
  selector: 'app-bayar',
  templateUrl: './bayar.html',
  styleUrls: ['./bayar.scss']
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class Bayar implements ViewWillEnter{

  transaction: any;
  form: FormGroup;
  kembali = false;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private service: TransaksiService,
    private router: Router,
    private cartService: CartService
  ){
    this.form = this.formBuilder.group({
      vMasuk: this.formBuilder.control(null, [Validators.required]),
      vKeluar: this.formBuilder.control(null, [Validators.required]),
    });

    this.form.patchValue({
      vMasuk : 0,
    });
  }
  ionViewWillEnter(): void {
    this.transaction = this.navParams.data;
    console.log(this.transaction);
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      mode: 'ios',
      duration: 1000,
      position: 'top',
    });

    toast.present();
  }

  process(){
    if(this.form.get('vMasuk').value < this.transaction.uangJumlah){
      this.presentToast('Uang Masuk Kurang dari Jumlah Transaksi');
    } else {
      this.form.get('vKeluar').setValue(this.form.get('vMasuk').value - this.transaction.uangJumlah);
      this.kembali = true;
    }
  }

  save(){
    const values = new Transaksi();
    values.daftarMenu = this.transaction.daftarMenu;
    values.uangJumlah = this.transaction.uangJumlah;
    values.idPegawai = this.transaction.idPegawai;
    values.uangMasuk = this.form.get('vMasuk').value;
    values.uangKeluar = this.form.get('vKeluar').value;
    this.service.newTransaksi(values).subscribe(response=> {
      this.presentToast('Transaksi Berhasil');
      this.router.navigate(['/struke']);
      for(let del of this.transaction.daftarMenu){
        this.cartService.removeItem(del.idMenu);
      }
    }, error=>{
      this.presentToast('Transaksi Gagal');
    });
  }

  // save(){

  // }

}

