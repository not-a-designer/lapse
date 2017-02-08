import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }


  dismiss() {
    this.navCtrl.pop(ModalPage);
  }

}
