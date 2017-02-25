import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, ToastController } from 'ionic-angular';

import { Diagnostic, CameraPreview, CameraPreviewRect } from 'ionic-native';


@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})



export class CameraPage {

  public cameraData: string;
  public pictureTaken: boolean;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public platform: Platform
  ) {

    this.checkPermissions();

    this.pictureTaken = false;
    this.cameraData = 'http://placehold.it/' + window.innerWidth + 'x' + window.innerHeight;

  }
  /***END CONSTRUCTOR****/


  /***
   *
   * * * checkPermissions() * * *
   *
   *CHECKS FOR CAMERA PERMISSIONS
   *INITIALIZES CAMERAPREVIEW IF AUTHORIZED
   *REQUESTS PERMISSION IF NOT AUTHORIZED
   *PRESENTS TOAST IF NOT AUTHORIZED
   *
   ***/
  checkPermissions() {
    Diagnostic.isCameraAuthorized().then((authorized) => { //if user already has camera permissions
      if(authorized) {

        this.startPreview();  //start camerapreview

      } else {  //if user does not have camera permissions
        Diagnostic.requestCameraAuthorization().then((status) => {

          if (status == Diagnostic.permissionStatus.GRANTED) { //if user selects to authorize

            this.startPreview();

          } else {  //if user denied authorization

            this.toastCtrl.create({
              message: 'Cannot access camera',
              position: 'bottom',
              duration: 3000
            }).present();
          }
        });
      }
    });
    
  }
  /**** END CHECKPERMISSIONS() ****/



  /******************START CAMERAPREVIEW FUNCTIONS*******************/


  /***
   *
   * * * startPreview()* * *
   *SET PREVIEWRECT DIMENSIONS
   *CALL STARTCAMERA() WITH RECT AND PARAMETERS
   *SWITCH TO FRONT CAMERA, SHOW PREVIEW 
   *SET ONPICTURETAKENHANDLER() WITH OBSERVABLE PHOTO STRINGS
   *
   ***/
  startPreview() {
    
    let previewRect: CameraPreviewRect = {  //set preview dimensions to the device inner dimensions
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };

    CameraPreview.startCamera(   //start CameraPreview

      previewRect,  //dimensions
      'rear',      //camera direction
      false,        //dragEnabled
      false,        //tapEnabled
      true,         //toBack
      1             //alpha
    );

    CameraPreview.show();         //show CameraPreview 

    CameraPreview.switchCamera()  //switch to front camera, fixes a resolution bug

    CameraPreview.setOnPictureTakenHandler().subscribe((result) => {

      alert(JSON.stringify('result[0] = ' + result[0]));
      alert(JSON.stringify('result[1] = ' + result[1]));
      //this.cameraData = result[0];  //sets source url to previous image, first picture will be black
      this.cameraData = result[1];    //sets source url to newly captured image 
      CameraPreview.stopCamera();     //hides camera preview
      CameraPreview.hide();
      
    });
  }
  /***             END INITIALIZEPREVIEW()         ***/

 
  


  /***
   *
   * * * takePicture() * * *
   *CAPTURE CAMERAPREVIEW IMAGE AT SPECIFIED DIMENSIONS
   *
   ***/  
  takePicture(){

    let size = {
      maxWidth: window.innerWidth, 
      maxHeight: window.innerHeight
    };

    CameraPreview.takePicture(size);
    this.pictureTaken = true;  //toggles camera button with save+delete
  }
  /***            END TAKEPICTURE()          ***/
  



  switchCamera(){
    CameraPreview.switchCamera();
  }

  showCamera(){
    CameraPreview.show();
  }

  hideCamera(){
    CameraPreview.hide();
  }

  stopCamera(){
    CameraPreview.stopCamera();
  }
  /*****************END CAMERAPREVIEW FUNCTIONS**********************/




  /***
   *
   * * * deletePicture() * * *
   *VERIFY DELETION
   *RESTART CAMERAPREVIEW
   *TOGGLE CAMERA BUTTONS
   *
   ***/
  deletePicture() {

    this.alertCtrl.create({

      title: 'Delete Picture',
      message: 'Are you sure you want to delete this picture?',

      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancel clicked');
        }
      }, {
        text: 'Delete',
        handler: () => {
          this.cameraData = '';
          this.startPreview();
          this.pictureTaken = false;  //toggle camera buttons
        }
      }]

    }).present();
    
    
  }
  /*** END DELETEPICTURE() ***/




  /***
   *
   * * * savePicture() * * *
   *SAVE PICTURE TO GALLERY
   *
   ***/
  savePicture() {

    this.alertCtrl.create({

      title: 'Save Picture',
      message: 'Are you sure you want to save this picture?',

      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancel clicked');
        }
      }, {
        text: 'Save',
        handler: () => {
          this.cameraData = '';
          this.pictureTaken = false;
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }



}
