import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Diagnostic, CameraPreview, CameraPreviewRect } from 'ionic-native';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})



export class CameraPage {

  public pictureTaken: boolean;           //global var for preview image and camera buttons
  public previewRect: CameraPreviewRect;  //global var for poisition and dimensions of CameraPreview
  public frontFacing: boolean;          //global var for camera direction toggle
  public switchIcon: string;              //global var for toggle button

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {

    this.previewRect = {         //set preview dimensions to the device inner dimensions
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    this.checkPermissions();

    this.pictureTaken = false;    //default state for template images and buttons

  }
  /***END CONSTRUCTOR****/


  /**
   * * * checkPermissions() * * *
   ***/
  checkPermissions() {
    Diagnostic.isCameraAuthorized().then((authorized) => {          //if user already has camera permissions
      if(authorized) {

        this.startPreview();  //start camerapreview

      } else {  //if user does not have camera permissions
        Diagnostic.requestCameraAuthorization().then((status) => {

          if (status == Diagnostic.permissionStatus.GRANTED) {      //if user selects to authorize

            this.startPreview();

          } else {      //if user denied authorization

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
   * * * startPreview()* * *
   ***/
  startPreview() {

    CameraPreview.startCamera(         //start CameraPreview

      this.previewRect,  //dimensions
      'front',           //camera direction
      false,             //dragEnabled
      false,             //tapEnabled
      true,              //toBack
      1                  //alpha
    );
    this.frontFacing = true;
    this.switchIcon = 'happy';
    CameraPreview.setOnPictureTakenHandler().subscribe((result) => {            //returns an observable that is a string array with 2 items

      CameraPreview.hide();  //hides camera preview
      (<HTMLImageElement>document.getElementById('camera')).src = result[1];    //sets source url to preview image
   
      
      

    });
  }
  /***             END INITIALIZEPREVIEW()         ***/

 
  


  /***
   * * * takePicture() * * *
   ***/  
  takePicture(){

    let size = {       //declare capture dimesions

      maxWidth: window.innerWidth, 
      maxHeight: window.innerHeight

    };

    CameraPreview.takePicture(size);     //executes native image capture and triggers onPictureTakenHandler()
    this.pictureTaken = true;            //toggles camera buttons
    this.toastCtrl.create({
      message: 'Hold camera steady until an image is captured',
      position: 'center',
      duration: 3000
    }).present();
  }
  /***            END TAKEPICTURE()          ***/
  



  switchCamera(){
    CameraPreview.switchCamera();                       //toggles front and rear camera
    this.frontFacing = this.frontFacing ? false : true;

    this.switchIcon = this.frontFacing ? 'happy' : 'people';
  }

  showCamera(){
    CameraPreview.show();            //shows CameraPreviewRect
  }

  hideCamera(){
    CameraPreview.hide();            //hides CameraPreviewRect
  }

  stopCamera(){
    CameraPreview.stopCamera();      //ends CameraPreview
  }
  /*****************END CAMERAPREVIEW FUNCTIONS**********************/




  /***
   * * * deletePicture() * * *
   ***/
  deletePicture() {

    this.alertCtrl.create({          //alert box with cancel and delete options

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
          this.pictureTaken = false;  //toggle camera buttons
          this.showCamera();

        }
      }]

    }).present();
    
    
  }
  /***    END DELETEPICTURE()      ***/




  /***
   * * * savePicture() * * *
   ***/
  savePicture() {

    this.alertCtrl.create({       //alert box with cancel and save options

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
