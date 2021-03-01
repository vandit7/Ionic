import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Alert, Platform } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-otppage',
  templateUrl: 'otppage.html',
})
export class OtppagePage {
  otp:any;
  disableButton:any;
  result: any;
  platform: any;
  otpMobile:any
  constructor(public navCtrl: NavController,
    platform: Platform, 
    public serviceProvider: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {

      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot(LoginPage);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtppagePage');
    this.otpMobile = localStorage.getItem("otpMobile");
  }
  otpSend()
  {

    if (this.otp== '' || this.otp == null || this.otp.trim() == "") {
      this.presentToast('Please Enter OTP !','bgRed');
    }
    else {
      this.disableButton = true;
      let otpObj = {
        "OTP": this.otp,
        "RegisterID": localStorage.getItem("Userregister_id"),
        "ValidData": localStorage.getItem("ValidDataJat"),
        "Type": "1"
      }
      let loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: "Please wait...",
      });
      loader.present();
      this.serviceProvider.VerifyMobileNoApi(otpObj).then(data => {
        this.result = data;
        this.disableButton = false;
        if (this.result.status == 1) {
          loader.dismiss();
          this.presentToast(this.result.msg ,'bgGreen');
          // this.navCtrl.setRoot(LoginPage);
          localStorage.setItem("register_id", this.result.info.register_id); 
          this.navCtrl.setRoot(TabsPage);
          localStorage.setItem("Islogin", '1'); 
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

  otpReSend()
  {

      this.disableButton = true;
      let otpObj = {
       "RegisterId": localStorage.getItem("Userregister_id"),
        "ValidData": localStorage.getItem("ValidDataJat"),
        "Type": "1"
      }
      let loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: "Please wait...",
      });
      loader.present();
      this.serviceProvider.ResendOTPApi(otpObj).then(data => {
        this.result = data;
        this.disableButton = false;
        if (this.result.status == 1) {
          loader.dismiss();
          this.presentToast(this.result.msg ,'bgGreen');
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
  skipOtp()
  {
    this.navCtrl.setRoot(LoginPage);
  }
  // moveFocus(event, nextElement, previousElement) {
  //   if (event.keyCode == 8 && previousElement) {
  //     previousElement.setFocus();
  //   } else if (event.keyCode >= 48 && event.keyCode <= 57) {
  //     if (nextElement) {
  //       nextElement.setFocus();
  //     }
  //   } else {
  //     event.path[0].value = '';
  //   }
  //    console.log(event.path[0].value)
  // }

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
