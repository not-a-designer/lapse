import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-iglogin',
  templateUrl: 'iglogin.html'
})
export class IgLoginPage {
  
  public igLoggedIn: boolean;

  constructor (public viewCtrl: ViewController,
               public navParams: NavParams
  ) {

    //this.igLoggedIn = this.navParams.get('status');
    //console.log('status is ' + this.igLoggedIn);
  }



  dismiss() {
    let data = 'cancel';
    this.viewCtrl.dismiss(data);
  }

  tryLogin() {
    let data = 'login';
    this.viewCtrl.dismiss(data);
  }
}
