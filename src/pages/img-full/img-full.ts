import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-img-full',
  templateUrl: 'img-full.html',
})
export class ImgFullPage {
  imgUrl:any;
  name:any;
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public platform: Platform,
     public navParams: NavParams) {
      this.platform.registerBackButtonAction(() => {
        this.dismissModal();
      }, 0)  
  }
  ionViewDidEnter()
  {
    this.platform.registerBackButtonAction(() => {
      this.dismissModal();
    }, 0) 
  }
  ionViewDidLoad() {
    this.imgUrl=localStorage.getItem("PopImgUrl");
    this.name=localStorage.getItem("PopName");
    console.log('ionViewDidLoad ImgFullPage');
    
  }
  dismissModal() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
}
