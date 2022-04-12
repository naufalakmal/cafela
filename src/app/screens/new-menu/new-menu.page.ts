import { Menu } from './../../models/menu';
import { MenuService } from './menu.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.page.html',
  styleUrls: ['./new-menu.page.scss'],
})
export class NewMenuPage implements OnInit {


  form: FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;

  constructor(
    private service: MenuService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController
    ) {

      this.form = this.formBuilder.group({
        namaNemu: this.formBuilder.control(null, [Validators.required]),
        idKategori: this.formBuilder.control(null, [Validators.required]),
        hargaSatuan: this.formBuilder.control(null, [Validators.required]),
        deskripsi: this.formBuilder.control(null, [Validators.required]),
        vol: this.formBuilder.control(null, [Validators.required])
      });

      this.form.get('hargaSatuan').setValue(0);
    }

  ngOnInit() {
  }

  selectFile(event){
    const filename = event.target.files[0].name;
    // $('#label-file').text(filename);
    document.getElementById('label-file').textContent = filename;
    this.selectedFiles = event.target.files;
  }

  save(){
    if(this.form.valid){
      this.progress = 0;
      this.currentFile = this.selectedFiles.item(0);
      console.log(this.currentFile);
      // eslint-disable-next-line eqeqeq
      if(this.currentFile != undefined){
        const swalWithBootstrapButtons = Swal.mixin({
        });
        swalWithBootstrapButtons.fire({
            title: 'Anda Yakin',
            text: 'Menambahkan Menu Berupa '+ this.form.get('namaNemu').value +' ?',
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
                const user: Menu = this.form.value;
                this.service.upload(this.currentFile).subscribe(
                  event => {
                    if (event.type === HttpEventType.UploadProgress) {
                      this.progress = Math.round( 100 * event.loaded / event.total);
                    }else if (event instanceof HttpResponse) {
                      console.log(event.body);
                      user.file = event.body.file;
                      this.service.save(user).subscribe(response=>{
                        this.presentToast('Menu Baru Ditambahkan');
                        this.form.reset();
                        this.selectedFiles = undefined;
                        this.currentFile = undefined;
                        this.progress = 0;
                      }, error=>{
                        // eslint-disable-next-line eqeqeq
                        if(error.status == 200){
                          this.presentToast('Menu Baru Ditambahkan');
                          this.form.reset();
                          this.progress = 0;
                          this.currentFile = undefined;
                        } else {
                          this.presentToast('Gagal Menambahkan Menu');
                          this.progress = 0;
                          this.currentFile = undefined;
                        }
                      });
                    }
                  },
                  err => {
                    this.progress = 0;
                    this.currentFile = undefined;
                    this.presentToast('Could not upload the file!');
                  });
                  this.progress = 0;
                  this.currentFile = undefined;
            }
        });
      }
    } else {
      this.presentToast('Form Tidak Valid');
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
