import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Alert, Platform } from 'ionic-angular';
import $ from "jquery";
import { ServiceProvider } from '../../providers/service/service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  hei: any;
  emailId:any;
  result: any;
  types: any;
  disableButton:any;
  finalHe: any;
  constructor(public navCtrl: NavController, 
    public serviceProvider: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    platform: Platform,) {
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot(LoginPage);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
    this.hei = window.screen.height;
    this.finalHe = (this.hei/2)+70; 
    $('.heightCss').css('height',this.finalHe+'px'); 
  }

  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }
  forgotPassword()
  {
    if (this.emailId== '' || this.emailId == null) {
      this.presentToast('Please Enter Mobile No/Email ID !','bgRed');
    }
  
    else {
      this.disableButton = true;
      let forgotObj = {
        "MobileNo": this.emailId,
        "ValidData": localStorage.getItem("ValidDataJat"),
        "Type": "1"
      }
      let loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: "Please wait...",
      });
      loader.present();
      this.serviceProvider.forgotPwdApi(forgotObj).then(data => {
        this.result = data;
        this.disableButton = false;
        if (this.result.status == 1) {
          loader.dismiss();
          this.presentToast(this.result.msg ,'bgGreen');
          this.navCtrl.push(LoginPage);
        }
        else {
          loader.dismiss();
          this.presentToast(this.result.msg,'bgRed');
        }
      }, error => {
        this.disableButton = false;
        this.presentToast('No Internet connection !','bgRed');
        console.log(error.json());
        loader.dismiss();
      });
    }
  }

   /**
  * 
  * @param msg 
  */
 presentToast(msg,bgColor) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000, 
    position: 'top',
    cssClass: bgColor,
  });

  toast.onDidDismiss(() => {
  });
  toast.present();
}

}
