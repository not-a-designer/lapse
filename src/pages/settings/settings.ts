import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { IgLoginPage } from '../iglogin/iglogin';
import { FbLoginPage } from '../fblogin/fblogin';
import { TwLoginPage } from '../twlogin/twlogin';
import { EmailLoginPage } from '../emaillogin/emaillogin';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public dailyPush: boolean;

  public autoGenChecked: boolean;
  public autoGenDisabled: boolean;

  public toggleIcon: string;
  public toggleOpen: boolean;

  public fbLink: boolean;
  public igLink: boolean;
  public twLink: boolean;
  public emailLink: boolean;
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ModalCtrl: ModalController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController
  ) {
    this.dailyPush = true;

    this.autoGenChecked = false;
    this.autoGenDisabled = false;

    this.toggleIcon = 'arrow-dropright';
    this.toggleOpen = false;

    this.igLink = false;
    this.fbLink = false;
    this.twLink = false;
    this.emailLink = false;
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  goFacebook() {
    window.location.href = 'https://www.facebook.com';
  }

  goTwitter() {
    window.location.href = 'https://www.twitter.com';
  }

  goInstagram() {
    window.location.href = 'https://www.instagram.com';
  }

  // toggles daily push notifications
  togglePush(bool: boolean) {

    let myBool = bool;  //push

    console.log('myBool: ' + myBool);
    
    let vMessage: string = !myBool ? 'Don\'t forget to take a daily selfie for best results' : 'You will now receive a daily push to take a selfie';
    
    let toast = this.toastCtrl.create({
      message: vMessage,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'close'
    });

    toast.present();


    if (!myBool) {
      this.autoGenChecked = false;
      this.toggleOpen = false;
      this.toggleIcon = 'arrow-dropright';
    }
    this.autoGenDisabled = !myBool;
    
  }

  showAbout() {

    let aboutModal = this.ModalCtrl.create(AboutPage);
    aboutModal.enableBack();
    aboutModal.present();
  }



  toggleAutoGen(myBool: boolean) {

    if (myBool === false) {
      this.autoGenChecked = false;
      this.toggleOpen = false;
    }
    else {
      this.autoGenChecked = !this.autoGenChecked;
    }

    if(this.autoGenChecked === false) {
      this.toggleOpen = false;
      this.toggleIcon = 'arrow-dropright';
    }

    console.log('autogenchecked: ' + this.autoGenChecked);
  }



  toggleVisible() {

    if (this.autoGenChecked) {

      this.toggleOpen = !this.toggleOpen;

      this.toggleIcon = this.toggleOpen ? 'arrow-dropdown' : 'arrow-dropright';

    }
  }



  checkLoginIg() {
    
    if(this.igLink === false) { //if user is not logged into instagram

      console.log('igLink is ' + this.igLink);

      let igModal = this.ModalCtrl.create(IgLoginPage);

      igModal.enableBack();

      igModal.onDidDismiss(data => {
        if (data === 'cancel') {
          this.igLink = this.igLink;
        } else { //login success

          this.igLink = !this.igLink; 
   
          let igToast = this.toastCtrl.create({
            message: 'Lapse is now linked to your Instagram account',
            duration: 3000,
            position: 'bottom'
          });
          igToast.present();
        }
        console.log('igLink after modal is ' + this.igLink);
      });

      igModal.present();

    } else {
      let igAlert = this.alertCtrl.create({

        title: 'Log out of Instagram',
        message: 'Are you sure you want to logout?',

        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.igLink = this.igLink;
              console.log('igLink after alert is ' + this.igLink);
              console.log('cancel');
            }
          }, {
            text: 'Log out',
            handler: () => {
              this.igLink = !this.igLink;
    
              let igToast = this.toastCtrl.create({
                message: 'Lapse is no longer linked to your Instagram account',
                duration: 3000,
                position: 'bottom'
              });

              igToast.present();
         
              console.log('igLink after alert is ' + this.igLink);
              console.log('logged out');
            }
          }
        ] //end buttons
      });

      igAlert.present();
    }
    
  }

  


  checkLoginFb() {
    if(this.fbLink === false) { //if user is not logged into facebook

      console.log('fbLink is ' + this.fbLink);

      let fbModal = this.ModalCtrl.create(FbLoginPage);

      fbModal.enableBack();

      fbModal.onDidDismiss(data => {
        if (data === 'cancel') {
          this.fbLink = this.fbLink;
        } else {

          this.fbLink = !this.fbLink;
          let fbToast = this.toastCtrl.create({
            message: 'Lapse is now linked to your Facebook account',
            duration: 3000,
            position: 'bottom'
          });
          fbToast.present();
        }
        console.log('fbLink after modal is ' + this.fbLink);
      });

      fbModal.present();

    } else {
      let fbAlert = this.alertCtrl.create({

        title: 'Log out of Facebook',
        message: 'Are you sure you want to logout?',

        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.fbLink = this.fbLink;
              console.log('fbLink after alert is ' + this.fbLink)
              console.log('cancel');
            }
          }, {
            text: 'Log out',
            handler: () => {
              this.fbLink = !this.fbLink;
              let fbToast = this.toastCtrl.create({
                message: 'Lapse is no longer linked to your Facebook account',
                duration: 3000,
                position: 'bottom'
              });

              fbToast.present();

              console.log('fbLink after alert is ' + this.fbLink);
              console.log('logged out');
            }
          }
        ] //end buttons
      });

      fbAlert.present();
    }
  }



  checkLoginTw() {
    if(this.twLink === false) { //if user is not logged into twitter

      console.log('twLink is ' + this.twLink);

      let twModal = this.ModalCtrl.create(TwLoginPage);

      twModal.enableBack();

      twModal.onDidDismiss(data => {
        if (data === 'cancel') {
          this.twLink = this.twLink;
        } else {

          this.twLink = !this.twLink;
          let twToast = this.toastCtrl.create({
            message: 'Lapse is now linked to your Twitter account',
            duration: 3000,
            position: 'bottom'
          });
          twToast.present();
        }
        console.log('twLink after modal is ' + this.twLink);
      });

      twModal.present();

    } else {  //if user is logged in
      let twAlert = this.alertCtrl.create({

        title: 'Log out of Twitter',
        message: 'Are you sure you want to logout?',

        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.twLink = this.twLink;
              console.log('twLink after alert is ' + this.twLink)
              console.log('cancel');
            }
          }, {
            text: 'Log out',
            handler: () => {
              this.twLink = !this.twLink;

              let twToast = this.toastCtrl.create({
                message: 'Lapse is no longer linked to your Twitter account',
                duration: 3000,
                position: 'bottom'
              });

              twToast.present();

              console.log('twLink after alert is ' + this.twLink);
              console.log('logged out');
            }
          }
        ] //end buttons
      });

      twAlert.present();
    }
  }




  checkLoginEmail() {
    if(this.emailLink === false) { //if user is not logged into an email

      console.log('emailLink is ' + this.emailLink);

      let emailModal = this.ModalCtrl.create(EmailLoginPage);

      emailModal.enableBack();

      emailModal.onDidDismiss(data => {
        if (data === 'cancel') {
          this.emailLink = this.emailLink;
        } else {

          this.emailLink = !this.emailLink;
          let emailToast = this.toastCtrl.create({
            message: 'Lapse is now linked to your email account',
            duration: 3000,
            position: 'bottom'
          });
          emailToast.present();
        }
        console.log('emailLink after modal is ' + this.emailLink);
      });

      emailModal.present();

    } else {
      let emailAlert = this.alertCtrl.create({

        title: 'Log out of your email',
        message: 'Are you sure you want to logout?',

        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.emailLink = this.emailLink;
              console.log('emailLink after alert is ' + this.emailLink)
              console.log('cancel');
            }
          }, {
            text: 'Log out',
            handler: () => {
              this.emailLink = !this.emailLink;

              let emailToast = this.toastCtrl.create({
                message: 'Lapse is no longer linked to your email account',
                duration: 3000,
                position: 'bottom'
              });

              emailToast.present();

              console.log('emailLink after alert is ' + this.emailLink);
              console.log('logged out');
            }
          }
        ] //end buttons
      });

      emailAlert.present();
    }
  }
}
