import { Component } from '@angular/core';  //basic angular2 modules
import { NavController, NavParams, ModalController, ActionSheetController, AlertController } from 'ionic-angular';  //ionic modules


import { ModalPage } from '../modal/modal';  //import pages and custom components


//metadata for EditPage
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})


//exported scripts for EditPage
export class EditPage {


  //starting variables for template inputs
  public tFrames: number = 7;
  public tFps: number = 1;


  //constructor accepts 5 parameters that are imported ionic modules
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController
   ) {
    //this.tFrames = 7;
    //this.tFps = 1;
  }
 



  //Creates alert windows before saving the gif
  //2 parameters of frames and fps 

  saveGif(frames: number, fps: number) {

    //declare local variables as the parameters
    if(isNaN(frames)) {
      this.tFrames = 7;
    }else{
      this.tFrames = frames;
    }

    if(isNaN(fps)) {
      this.tFps = 1;
    }else{
      this.tFps = fps;
    } 


    let saveAlert = this.alertCtrl.create({

      //alert title
      title: 'Confirm',

      //alert message
      message: 'Do you want to save? (Frames\: ' + this.tFrames + ' fps: ' +  this.tFps + ')', 

      //array of buttons
      buttons: [ 
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
	  }
        },

        {
          text: 'Save',
          handler: () => {
            console.log('Saved Gif');
          }

        }
      ]  
    }); 
    //End of create function

    //show alert
    saveAlert.present();  
 }



  //Creates modal window with imported component and displays it
  showPreviewModal() {
    let previewModal = this.modalCtrl.create(ModalPage);
   

    //show Modal
    previewModal.present();
 }





  //Shows action menu
  presentActionSheet() {

    let actionSheet = this.actionSheetCtrl.create({

      //actionSheet title
      title: 'Share your gif', 

      //actionSheet buttons
      buttons: [  //actionSheet options as buttons
        {
          text: 'Facebook',
          handler: () => {
            window.location.href = "https://www.facebook.com";
            console.log('Facebook clicked');
          }
        },{
          text: 'Instagram',
          handler: () => {
            window.location.href = "https://www.instagram.com";
            console.log('Instagram clicked');
          }
        },{
          text: 'Twitter',
          handler: () => {
            window.location.href = "https://www.twitter.com";
            console.log('Twitter clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    //show actionSheet
    actionSheet.present();
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

}






