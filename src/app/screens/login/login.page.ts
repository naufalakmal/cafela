import { UserResponse } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserRequest } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2/dist/sweetalert2.js';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  status: string;
  isLogin = false;

  constructor(
    private router: Router,
    // private _toastr: ToastrService,
    private httpKlien: HttpClient,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required]),
    });
  }

  login(): void {
    if (this.form.valid) {
      const userAdmin = new UserRequest();
      userAdmin.username = this.form.get('username').value;
      userAdmin.password = this.form.get('password').value;
      this.httpKlien.post(environment.baseUrl + '/api/auth/login', userAdmin
      ).pipe(map(data => data as UserResponse))
        .subscribe(data => {
          this.isLogin = true;
          if (this.isLogin) {
            if (data.responseMessage == 'Berhasil Login') {
              localStorage.setItem('token', data.tokenKey);
              localStorage.setItem('currentLogin', JSON.stringify(data));
              this.router.navigate(['/options']);
            } else {
              this.presentToast(data.responseMessage);
            }
            // this.service.getData( userAdmin.userName, userAdmin.userPassword).subscribe(data =>{
            //   localStorage.setItem( "currentLogin", JSON.stringify(data.body));
            //   document.getElementById('login-loader').style.display = 'none';
            //   document.getElementById('loader-text').style.display = 'inline';
            // })
          } else {
            // this._toastr.error("Login Gagal");
            // document.getElementById('login-loader').style.display = 'none';
            // document.getElementById('loader-text').style.display = 'inline';
          }
          }, error => {
            // this._toastr.error("Login Gagal");
            // document.getElementById('login-loader').style.display = 'none';
            // document.getElementById('loader-text').style.display = 'inline';
        });
    }
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
