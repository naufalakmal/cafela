import { RegisterUser } from './../../models/user';
import { RegisterService } from './register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, ViewWillEnter{

  listRole: Array<any> = [];

  form: FormGroup;

  constructor(
    private service: RegisterService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController
  ) {
    this.service.getRole().subscribe(data=>{
      this.listRole = data.body;
    });

    this.form = this.formBuilder.group({
      fullName: this.formBuilder.control(null, [Validators.required]),
      username: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required]),
      idRole: this.formBuilder.control(null, [Validators.required]),
    });
  }

  ionViewWillEnter(): void {
  }

  ngOnInit() {
  }

  save(){
    if(this.form.valid){
      const swalWithBootstrapButtons = Swal.mixin({
      });
      swalWithBootstrapButtons.fire({
          title: 'Anda Yakin',
          text: 'Menambahkan Akun Dengan Nama '+ this.form.get('fullName').value +' ?',
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
              const user: RegisterUser = this.form.value;
              this.service.register(user).subscribe(response=>{
                this.presentToast('User Baru Ditambahkan');
                this.ionViewWillEnter();
              }, error=>{
                // eslint-disable-next-line eqeqeq
                if(error.status == 200){
                  this.presentToast('User Baru Ditambahkan');
                  this.form.reset();
                } else {
                  this.presentToast('Gagal Menambahkan User');
                }
              });
          }
      });
    } else {
      this.presentToast('Form Tidak Valid');
    }
  }

  doRefresh() {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.form.reset();
      // event.target.complete();
    }, 2000);
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

}
