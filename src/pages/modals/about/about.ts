import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component ({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {


  constructor (public navCtrl: NavController,
               public navParams: NavParams) {}


  dismiss() {
    this.navCtrl.pop(AboutPage);
  }

  goFacebook() {
    this.navCtrl.pop(AboutPage);
    window.location.href = 'https://www.facebook.com';
  }

  goTwitter() {
    this.navCtrl.pop(AboutPage);
    window.location.href = 'https://www.twitter.com';
  }

  goInstagram() {
    this.navCtrl.pop(AboutPage);
    window.location.href = 'https://www.instagram.com';
  }

}
