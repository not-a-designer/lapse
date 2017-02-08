import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-emaillogin',
  templateUrl: 'emaillogin.html'
})
export class EmailLoginPage {
  

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
