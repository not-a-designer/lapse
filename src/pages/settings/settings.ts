import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ModalController, ToastController, AlertController } from 'ionic-angular';
import { Auth } from '@ionic/cloud-angular';

//native functionality libraries
import { Facebook } from 'ionic-native';
//import { TwitterConnect } from 'ionic-native';
//import { Instagram } from 'ionic-native';

import { UserService } from '../../app/user.service';

import { AboutPage } from '../modals/about/about';
import { SchedulePage } from '../modals/schedule/schedule';
import { EmailLoginPage } from '../modals/emaillogin/emaillogin';
//Prototype modals for login page
//import { IgLoginPage } from '../modals/iglogin/iglogin';
//import { FbLoginPage } from '../modals/fblogin/fblogin';
//import { TwLoginPage } from '../modals/twlogin/twlogin';




@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  //default login statuses
  public fbLink: boolean;
  public igLink: boolean;
  public twLink: boolean;
  public emailLink: boolean;

  //facebook app id number
  public FB_APP_ID: number = 1355955421093900;


  //checkbox values
  public oneWeek: boolean;
  public twoWeek: boolean;
  public threeWeek: boolean;
  public fourWeek: boolean;
  public twoMonth: boolean;
  public threeMonth: boolean;
  public fourMonth: boolean;
  public sixMonth: boolean;
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public auth: Auth,
              public user: UserService
  ) {

    //DEFAULT VALUES

    //initial login values
    this.igLink = false;
    this.fbLink = false;
    this.twLink = false;
    this.emailLink = false;

    //initial checkbox values
    this.oneWeek = false;
    this.twoWeek = false;
    this.threeWeek = false;
    this.fourWeek = false;
    this.twoMonth = false;
    this.threeMonth = false;
    this.fourMonth = false;
    this.sixMonth = false;

    //initialize Facebook SDK
    Facebook.browserInit(this.FB_APP_ID, 'v2.8');
    
  }
 

  //Ionic 2 built function
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  

/****** TOGGLE CONTROLS *******/

  // toggles daily push notifications
  togglePush() {

    //this.user.toggleAlertStatus();                //toggle daily push value

    //declare 2 alternate toast strings
    let toastText: string = !this.user.getAlertStatus() ? 'Don\'t forget to take a daily selfie for best results' : 'You will now receive a daily push to take a selfie';
    
    //create toast notification for toggling a push notification
    this.toastCtrl.create({
      message: toastText,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'close'
    }).present();   
  }
/**** END TOGGLEPUSH() *****/





/******* MODALS *******/

  //display About modal
  showAbout() {

    let aboutModal = this.modalCtrl.create(AboutPage);
    aboutModal.enableBack();
    aboutModal.present();
  }


  //display schedule modal
  showScheduleModal() {
      let scheduleModal = this.modalCtrl.create(SchedulePage);

      scheduleModal.enableBack();
      scheduleModal.present();
    
  }


  





/*********** LOGINS ******************/

  /****************/
  //INSTAGRAM LOGIN
  /****************/

  checkLoginIg() {
    
    /**************************/
    //CLOUD ANGULAR AUTH LOGIN
    /**************************/
    if(this.igLink === false) {

      this.auth.login('instagram').then((response) => {

        this.toastCtrl.create({
          message: 'Lapse is now linked to your Instagram account',
          duration: 3000,
          position: 'bottom'
        }).present();
        
        //alert(JSON.stringify(response));

        this.igLink = !this.igLink;
      });
    } else { //if user is logged in

      this.alertCtrl.create({

        title: 'Log out of Instagram',
        message: 'Are you sure you want to logout?',

        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.igLink = this.igLink;
            }
          }, {
            text: 'Log out',
            handler: () => {
              this.auth.logout();
              this.igLink = !this.igLink;
    
              this.toastCtrl.create({
                message: 'Lapse is no longer linked to your Instagram account',
                duration: 3000,
                position: 'bottom'
              }).present();
            }
          }
        ] //end buttons
      }).present();
    }


    /***************/
    //ORIGINAL MODAL
    /***************/
    /*if(this.igLink === false) { //if user is not logged into instagram

      let igModal = this.modalCtrl.create(IgLoginPage);

      igModal.enableBack();

      igModal.onDidDismiss(data => {
        if (data === 'cancel') {
          this.igLink = this.igLink;
        } else { //login success

          this.igLink = !this.igLink; 
   
          this.toastCtrl.create({
            message: 'Lapse is now linked to your Instagram account',
            duration: 3000,
            position: 'bottom'
          }).present();
        }
        console.log('igLink after modal is ' + this.igLink);
      });

      igModal.present();

    } else {
      this.alertCtrl.create({

        title: 'Log out of Instagram',
        message: 'Are you sure you want to logout?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {

              this.igLink = this.igLink;

            }
          }, {
            text: 'Log out',
            handler: () => {

              this.igLink = !this.igLink;
              this.toastCtrl.create({
                message: 'Lapse is no longer linked to your Instagram account',
                duration: 3000,
                position: 'bottom'
              }).present();
            }
          }
        ] //end buttons
      }).present();
    }*/
    /****************/
    
  }

  


  /****************/
  //FACEBOOK LOGIN
  /****************/

  checkLoginFb() {
    /**************************/
    //CLOUD ANGULAR AUTH LOGIN
    /**************************/
    /***
     *Throws InternalServiceError
     *'The Facebook access_token endpoint
     *had an error: This IP can't make
     *requests from that application' status 500
     ***/

    /*if (this.fbLink === false) {
      this.auth.login('facebook').then((response) => {

        this.fbLink = !this.fbLink;
        this.toastCtrl.create({
          message: 'Lapse is now linked to your Facebook account',
          duration: 3000,
          position: 'bottom'
        }).present();
      });

    } else {
      this.alertCtrl.create({

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
              this.auth.logout();
              this.fbLink = !this.fbLink;
              this.toastCtrl.create({
                message: 'Lapse is no longer linked to your Facebook account',
                duration: 3000,
                position: 'bottom'
              }).present();

              console.log('fbLink after alert is ' + this.fbLink);
              console.log('logged out of facebook');
            }
          }
        ] //end buttons
      }).present();

    }*/
    /****END CLOUD AUTH FACEBOOK LOGIN****/



    /***********************/
    //FACEBOOK NATIVE LOGIN
    /***********************/
    if(this.fbLink === false) {

      Facebook.login(['email']).then((response) => {
        if(response.authResponse) {
          this.fbLink = !this.fbLink;
          this.toastCtrl.create({
            message: 'Lapse is now linked to your Facebook account',
            duration: 3000,
            position: 'bottom'
          }).present();
        }
        else {
          this.toastCtrl.create({
            message: 'User cancelled login or did not fully authorize',
            duration: 3000,
            position: 'bottom'
          }).present();
        }
      });  
    } //end if

    else { //if fbLink === true
      this.alertCtrl.create({
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
              Facebook.logout().then((response) => {
                this.fbLink = !this.fbLink;
                this.toastCtrl.create({
                  message: 'Lapse is no longer linked to your Facebook account',
                  duration: 3000,
                  position: 'bottom'
                }).present();
              });
              
              console.log('fbLink after alert is ' + this.fbLink);
              console.log('logged out of facebook');
            }
          }] //end buttons
      }).present();
    }
    /********END NATIVE FACEBOOK LOGIN**********/
    

    /***************/
    //ORIGINAL MODAL
    /***************/
    /*if(this.fbLink === false) { //if user is not logged into facebook

      console.log('fbLink is ' + this.fbLink);

      let fbModal = this.modalCtrl.create(FbLoginPage);

      fbModal.enableBack();

      fbModal.onDidDismiss(data => {
        if (data === 'cancel') {
          this.fbLink = this.fbLink;
        } else {

          this.fbLink = !this.fbLink;
          this.toastCtrl.create({
            message: 'Lapse is now linked to your Facebook account',
            duration: 3000,
            position: 'bottom'
          }).present();
        }
        console.log('fbLink after modal is ' + this.fbLink);
      });

      fbModal.present();

    } else {
      this.alertCtrl.create({

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
              this.toastCtrl.create({
                message: 'Lapse is no longer linked to your Facebook account',
                duration: 3000,
                position: 'bottom'
              }).present();

              console.log('fbLink after alert is ' + this.fbLink);
              console.log('logged out of facebook');
            }
          }
        ] //end buttons
      }).present();
    }*/
    /*******END ORIGINAL MODAL*******/

  }



  /***************/
  //TWITTER LOGIN
  /***************/

  checkLoginTw() {

    /**************************/
    //CLOUD ANGULAR AUTH LOGIN
    /**************************/
    if (this.twLink === false) {

      this.auth.login('twitter').then((response) => {

        this.toastCtrl.create({
          message: 'Lapse is now linked to your Instagram account',
          duration: 3000,
          position: 'bottom'
        }).present();

        this.twLink = !this.twLink;

      });

    } else {

      this.alertCtrl.create({
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
              this.auth.logout();
              this.twLink = !this.twLink;
              this.toastCtrl.create({
                message: 'Lapse is no longer linked to your Twitter account',
                duration: 3000,
                position: 'bottom'
              }).present();
              

              console.log('twLink after alert is ' + this.twLink);
              console.log('logged out of twitter');
            }
          }
        ] //end buttons
      }).present();
    }
    /********************/


    /******************************/
    //FABRIC API - TWITTER CONNECT
    /******************************/
    /*if(this.twLink === false) {
      TwitterConnect.login().then((response) => {
        if (response.token) {
          this.twLink = !this.twLink;
          this.toastCtrl.create({
            message: 'Lapse is now linked to your Twitter account',
            duration: 3000,
            position: 'bottom'
          }).present();
        }

      }, (error) => {
        this.toastCtrl.create({
          message: JSON.stringify(error),
          duration: 3000,
          position: 'bottom'
        }).present();
      });

    } else { //if twLink = true
      this.alertCtrl.create({
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
              TwitterConnect.logout().then((response) => {
                this.twLink = !this.twLink;
                this.toastCtrl.create({
                  message: 'Lapse is no longer linked to your Twitter account',
                  duration: 3000,
                  position: 'bottom'
                }).present();
              });
              

              console.log('twLink after alert is ' + this.twLink);
              console.log('logged out of twitter');
            }
          }] //end buttons
      }).present();
    }*/
    /******************/




    /***************/
    //ORIGINAL MODAL
    /***************/
    /*if(this.twLink === false) { //if user is not logged into twitter

      console.log('twLink is ' + this.twLink);

      let twModal = this.modalCtrl.create(TwLoginPage);

      twModal.enableBack();

      twModal.onDidDismiss(data => {
        if (data === 'cancel') {
          this.twLink = this.twLink;
        } else {

          this.twLink = !this.twLink;
          this.toastCtrl.create({
            message: 'Lapse is now linked to your Twitter account',
            duration: 3000,
            position: 'bottom'
          }).present();
        }
        console.log('twLink after modal is ' + this.twLink);
      });

      twModal.present();

    } else {  //if user is logged in
      this.alertCtrl.create({
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

              this.toastCtrl.create({
                message: 'Lapse is no longer linked to your Twitter account',
                duration: 3000,
                position: 'bottom'
              }).present();

              console.log('twLink after alert is ' + this.twLink);
              console.log('logged out of twitter');
            }
          }
        ] //end buttons
      }).present();
    }*/
    
  }/*************/




  checkLoginEmail() {

    /***************/
    //CLOUD AUTH
    /***************/
    /*if (this.emailLink === false) {
      this.auth.login('basic').then((response) => { 
        this.emailLink = !this.emailLink;
        this.toastCtrl.create({
          message: 'Lapse is now linked to your email account',
          duration: 3000,
          position: 'bottom'
        }).present();
      });
    } else {
      this.alertCtrl.create({ 
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel clicked');
          }
        }, {
          text: 'Logout',
          handler: () => {
            this.auth.logout();
            this.emailLink = !this.emailLink;
            this.toastCtrl.create({
              message: 'Lapse is no longer linked to your Twitter account',
              duration: 3000,
              position: 'bottom'
            }).present();
          }
        }]
      }).present();
    }*/
    /**************/


    /***************/
    //ORIGINAL MODAL
    /***************/
    if(this.emailLink === false) { //if user is not logged into an email

      console.log('emailLink is ' + this.emailLink);

      let emailModal = this.modalCtrl.create(EmailLoginPage);

      emailModal.enableBack();

      emailModal.onDidDismiss(data => {
        if (data === 'cancel') {
          this.emailLink = this.emailLink;
        } else {

          this.emailLink = !this.emailLink;
          this.toastCtrl.create({
            message: 'Lapse is now linked to your email account',
            duration: 3000,
            position: 'bottom'
          }).present();
        }
        console.log('emailLink after modal is ' + this.emailLink);
      });

      emailModal.present();

    } else {
      this.alertCtrl.create({
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
              this.auth.logout();
              this.emailLink = !this.emailLink;
              this.toastCtrl.create({
                message: 'Lapse is no longer linked to your email account',
                duration: 3000,
                position: 'bottom'
              }).present();

              console.log('emailLink after alert is ' + this.emailLink);
              console.log('logged out of email');
            }
          }
        ] //end buttons
      }).present();
    }
  } /**************/
}
