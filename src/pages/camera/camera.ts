import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';

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
              public toastCtrl: ToastController,
              public platform: Platform
  ) {

    this.checkPermissions();

    this.pictureTaken = false;
    this.cameraData = '';

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


  /***
   *
   * * * startPreview()
   *SET PREVIEWRECT DIMENSIONS
   *CALL STARTCAMERA() WITH RECT AND PARAMETERS
   *CALL SHOW() 
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
      'front',      //camera direction
      false,        //dragEnabled
      false,        //tapEnabled
      true,         //toBack
      1             //alpha
    );

    CameraPreview.show();  //show CameraPreview 

    CameraPreview.setOnPictureTakenHandler().subscribe((result) => {

      CameraPreview.stopCamera();    //hides camera preview
      this.cameraData = result[0];   //sets source url to newly captured image
      this.pictureTaken = !this.pictureTaken;
      

    });
  }
  /*** END INITIALIZEPREVIEW() ***/




  /***
   *
   *START CAMERAPREVIEW FUNCTIONS
   *
   ***/
    
  stopCamera(){
    CameraPreview.stopCamera();
  }
    
  takePicture(){
    let size = {
      maxWidth: window.innerWidth, 
      maxHeight: window.innerHeight
    };

    CameraPreview.takePicture(size);
    this.pictureTaken = !this.pictureTaken;  //toggles camera button with save+delete
  }
    
  SwitchCamera(){
    CameraPreview.switchCamera();
  }

  showCamera(){
    CameraPreview.show();
  }

  hideCamera(){
    CameraPreview.hide();
  }
  /***END CAMERAPREVIEW FUNCTIONS***/




  /***
   *
   *DELETE CAMERAPREVEIW CAPTURE
   *RESTART CAMERAPREVIEW
   *TOGGLE CAMERA BUTTONS
   *
   ***/
  deletePicture() {
    this.cameraData = '';
    this.startPreview();
    
  }

  savePicture() {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }



}
