import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-image-type-modal',
  templateUrl: 'image-type-modal.html',
})
export class ImageTypeModalPage {

  userId: number;
  profileImg:any;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
   // console.log('UserId', navParams.get('userId'));
    this.userId = navParams.get('userId');
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewModalPage'); 
  }
 
  dismissModal() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data); 
  }
  ImageType(type)
  {
     
      let data = { 'foo': type ,'type1':''};
      this.viewCtrl.dismiss(data);  
    
  }
  showPreviewImage(event: any) {
    this.profileImg=event.target.files[0];
    let data = { 'foo': 'gallery' ,'type1':this.profileImg};
      this.viewCtrl.dismiss(data);  
  }
}
