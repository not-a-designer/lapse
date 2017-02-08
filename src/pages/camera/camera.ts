import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Camera } from 'ionic-native';



@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})



export class CameraPage {

  public cameraData: string;
  public width: number;
  public height: number;



  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public platform: Platform
  ) {

    this.width = this.platform.width();
    this.height = this.platform.height();
    this.cameraData = 'http://placehold.it/' + this.width + 'x' + this.height;

  }




  
  openCamera() {

    //set camera options
    var options = {
      quality: 50,
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.DATA_URL,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true,
      targetWidth: this.platform.width(),
      targetHeight: this.platform.height()
    };

    //run getPicture with the parameter of options
    Camera.getPicture(options).then((imageData) => {

        this.cameraData = 'data:image/jpeg;base64,' + imageData;
    }, 
    (err) => {

      // Handle error
      console.log(err);
    });
       
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }



}
