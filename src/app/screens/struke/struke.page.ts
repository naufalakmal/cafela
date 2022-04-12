import { StrukeService } from './struke.service';
import { NavController, Platform, ViewWillEnter } from '@ionic/angular';
import { Transaksi } from './../../models/transaksi';
import { Component, OnInit } from '@angular/core';
// import { NavController, Platform } from '';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare let require: any;
const htmlToPdfmake = require('html-to-pdfmake');

// import { File } from '@ionic-native/file';
// import { FileOpener } from '@ionic-native/file-opener';


@Component({
  selector: 'app-struke',
  templateUrl: './struke.page.html',
  styleUrls: ['./struke.page.scss'],
})
export class StrukePage implements OnInit, ViewWillEnter {

  pdfObj = null;
  struke = false;
  data: Transaksi = null;
  // options: any;

  // eslint-disable-next-line max-len
  constructor(private service: StrukeService) { }
  ionViewWillEnter(): void {
    this.service.findLastTransaksi().subscribe(data=>{
      this.data = data.body;
      console.log(this.data);
      this.struke = true;
    });
  }

  print(){
    const html = htmlToPdfmake('./struke.page.html');
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    // document.addEventListener('deviceready', function() {
      // cordova.plugins.printer is now available
      // cordova.plugins.printer.print();
    // }, false);
    const doc = {
      pageSize : 'A4',
      pageOrientation : 'potrait',
      pageMargins: [20, 10, 40, 60],
      content: html
    };

    this.pdfObj = pdfMake.createPdf(doc);

    this.pdfObj.download('struke.pdf');

  }

  ngOnInit() {
  }

}
