import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-fblogin',
  templateUrl: 'fblogin.html'
})
export class FbLoginPage {
  

  constructor (public viewCtrl: ViewController,
               public navParams: NavParams) {}

  dismiss() {
    let data = 'cancel';
    this.viewCtrl.dismiss(data);
  }

  tryLogin() {
    let data = 'login';
    this.viewCtrl.dismiss(data);
  }
}
