import { Component } from '@angular/core';

import { ViewController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';

import { UserService } from '../../../app/user.service';

@Component({
  selector: 'page-save-capture',
  templateUrl: 'savecapture.html'  
})
export class SaveCapturePage {

  public USERNAME: string;           //set user associated to profiles
  public selectedIndex: number;      //sets index number of selected profile

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public user: UserService
  ) {


  }

  ngOnInit() {

    this.selectedIndex = null;
    this.USERNAME = this.user.getName();      //this.user.name;

    console.log(' initial selectedIndex = ' + this.selectedIndex);
  }

  /***********/
  add() {                                           
    this.alertCtrl.create({
      title: 'Create New Lapse',

      inputs: [{
        name: 'title',
        placeholder: 'Enter a title'
      }],

      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancel clicked');
        }
      }, {
        text: 'Add',
        handler: (data) => {
          if(data.title !== '') {
            if(!this.user.checkForProfile(data.title)) {
              this.user.addProfile(data.title);
              console.log('add clicked', data.title);
            }
          }
        }  
      }]

    }).present();
  }
  /***** END ADD() *****/



  /**********/
  remove(i: number) {

    this.alertCtrl.create({

      title: 'Delete',
      message: 'Are you sure you want to delete this profile?',
      buttons: [{

        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancel clicked');
        }

      }, {

        text: 'Delete',
        handler: () => {
          this.user.removeProfile(i);           //remove item at index location
        }
      }]
    }).present();    
  }
  /*** END REMOVE() ***/




  /************/
  select(i: number) {

    if (i === this.selectedIndex)  {                       //deselect option
      this.selectedIndex = null;
      console.log('selectedIndex = ' + this.selectedIndex);

    } else {                             //select
        this.selectedIndex = i;
        console.log('selectedIndex = ' + this.selectedIndex);
    }
  }
  /*** END SELECT() ***/




  /*********/
  savePicture() {

    this.alertCtrl.create({       //alert box with cancel and save options

      title: 'Confirm Save',
      message: 'Selected profile\: ' + this.user.getProfileTitle(this.selectedIndex),

      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancel clicked');
        }
      }, {
        text: 'Save',
        handler: () => {
          let data = false;
          this.viewCtrl.dismiss(data);
          this.toastCtrl.create({

            message: 'image saved',
            position: 'bottom',
            duration: 3000

          }).present();
        }
      }]  //end buttons array

    }).present();
  }
  /*** END SAVEPICTURE FUNCTION ***/



  /**********/
  dismiss() {
    //this.navCtrl.pop(SaveCapturePage);
    let data = false;
    this.viewCtrl.dismiss(data);
  }
  /*** END DISMISS() ***/
}
