import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html'
})
export class PreviewPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }


  dismiss() {
    this.navCtrl.pop(PreviewPage);
  }

}
