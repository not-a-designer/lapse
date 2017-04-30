import { Component } from '@angular/core';  //basic angular2 modules
import { NavController, NavParams, ModalController, ActionSheetController, AlertController } from 'ionic-angular';  //ionic modules

//modal page imports
import { PreviewPage } from '../modals/preview/preview';


@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})


export class EditPage {

  public totalFrames: any;           //ngModel for frames range, min and max values
  public MIN_FRAMES: number = 7;
  public MAX_FRAMES: number = 1825;

  public fps: number;          //ngModel for fps range, min and max values
  public MIN_FPS: number = 1;
  public MAX_FPS: number = 24;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController
   ) {

    this.totalFrames = {'lower': 7, 'upper': 1825 };   //initialize duaKnobs on frames range
    this.fps = 1;          //initialize fps range
  }
 

  /***********/
  saveGif() {

    let frames = this.totalFrames.upper - this.totalFrames.lower;   //the difference of the two knobs

    this.alertCtrl.create({                         //show alert box confirming save

      title: 'Confirm',
      message: 'Do you want to save? (Frames\: ' + frames + ' fps: ' +  this.fps + ')', 

      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
	}
      }, {
        text: 'Save',
        handler: () => {
          console.log('Saved Gif');
        }
      }]  
    }).present();  
  }
  /*** END SAVEGIF() ***/



  /**************/
  showPreviewModal() {
    let previewModal = this.modalCtrl.create(PreviewPage);
   

    //show Modal
    previewModal.present();
  }
  /*** END SHOWPREVIEWMODAL() ***/




  /************/
  presentShareActionSheet() {

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
  /*** END PRESENTSHAREACTIONSHEET() ***/



  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

}






