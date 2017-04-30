import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';

//plugins
import { Diagnostic, CameraPreview, CameraPreviewRect } from 'ionic-native';

//custom modal
import { SaveCapturePage } from '../modals/save/savecapture';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})


export class CameraPage {

  public pictureTaken: boolean;           //preview image and camera buttons
  public previewRect: CameraPreviewRect;  //poisition and dimensions of CameraPreview
  public frontFacing: boolean;            //camera direction toggle
  public optionsOpen: boolean;            //global var for options toggle
  public opacity: number;                 //overlay opacity value

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController
  ) {

    this.previewRect = {         //set preview dimensions to the device inner dimensions
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    this.checkPermissions();

    this.pictureTaken = false;    //default state for template images and buttons
    this.optionsOpen = false;     //default state for options 
    this.opacity = 0;             //initial overlay opacity
  }
  /*** END CONSTRUCTOR ***/


  /**********/
  checkPermissions() {
    Diagnostic.isCameraAuthorized().then((authorized) => {     //plugin runs permissions query returning a promise     

      if(authorized) {       //if user already has camera permissions

        this.startCamera();  //start camerapreview

      } else {               //if user does not have camera permissions

        Diagnostic.requestCameraAuthorization().then((status) => {  //plugin requests camera permissions, returning a promise

          if (status == Diagnostic.permissionStatus.GRANTED) {      //if user selects to authorize

            this.startCamera();                                     //start camerapreview

          } else {                                                  //if user denied authorization

            this.toastCtrl.create({                                 //create and show toast, no camera access
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





  /*********/
  toggleOptions() {
    this.optionsOpen = !this.optionsOpen;
  }
  /*** END TOGGLEOPTIONS() ***/





  /****************** START CAMERAPREVIEW PLUGIN *******************/


  /********/
  startCamera() {

    CameraPreview.startCamera(         //start CameraPreview

      this.previewRect,  //dimensions
      'back',           //camera direction
      false,             //dragEnabled
      false,             //tapEnabled
      true,              //toBack
      1                  //alpha
    );

    this.frontFacing = false;      //syncs button toggle and camera direction
    CameraPreview.switchCamera();  //switch camera direction
    CameraPreview.setOnPictureTakenHandler().subscribe((result) => {            //returns an observable that is a string array with 2 items

      CameraPreview.hide();  //stops camera preview

      (<HTMLImageElement>document.getElementById('camera')).src = result[1];    //sets source url to preview image
   
    });
  }
  /*** END INITIALIZEPREVIEW() ***/

 
  


  /********/  
  takePicture(){

    let size = {                       //declare capture dimensions

      maxWidth: window.innerWidth, 
      maxHeight: window.innerHeight

    };

    if (this.optionsOpen) {            //close option window before capture
      this.toggleOptions();
    }

    this.toastCtrl.create({
      message: 'Hold camera steady until an image is captured',
      position: 'top',
      duration: 3000
    }).present();

    this.pictureTaken = true;          //toggles camera buttons

    CameraPreview.takePicture(size);   //executes native image capture and triggers onPictureTakenHandler()
    
  }
  /*** END TAKEPICTURE() ***/
  



  switchCamera(){
    CameraPreview.switchCamera();            //toggles front and rear camera
    this.frontFacing = !this.frontFacing;    //custom toggle for button
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
  /***************** END CAMERAPREVIEW PLUGIN **********************/




  /*******/
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
  /*** END DELETEPICTURE() ***/


/*******/
  showSaveModal() {
    
    let saveModal = this.modalCtrl.create(SaveCapturePage);
    saveModal.onDidDismiss((data) => {
      if(data === false) {              //if the save is a success, restart the camerapreview
        this.pictureTaken = data;
        this.showCamera();
      }
    });
    saveModal.present();
  }
/*** END SHOWSAVEMODAL() ***/



  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }



}
