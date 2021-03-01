import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Alert, Platform, ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { IncomepopupPage } from '../incomepopup/incomepopup';

@IonicPage()
@Component({
  selector: 'page-loginotp',
  templateUrl: 'loginotp.html',
})
export class LoginotpPage {
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
    public modalCtrl: ModalController,
    public navParams: NavParams) {
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot(LoginPage);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginotpPage');
    this.otpMobile = localStorage.getItem("loginotpMobile");
  }
  appLogin()
  {
    if (this.otp== '' || this.otp == null || this.otp.trim() == "") {
      this.presentToast('Please Enter OTP !','bgRed');
    }
    else {
      this.disableButton = true;
      let signinObj = {
        "UserName":  localStorage.getItem("loginotpMobile"),
        "Password": '',
        "ValidData": localStorage.getItem("ValidDataJat"),
        "Type": "1",
        "OTPCode":this.otp,
        "PackageID" : "",
      }
      let loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: "Please wait...",
      });
      loader.present();
      this.serviceProvider.loginApi(signinObj).then(data => {
        this.result = data;
        this.disableButton = false;
        if (this.result.status == 1) {
          loader.dismiss();
          this.presentToast(this.result.msg ,'bgGreen');
           localStorage.setItem("register_id", this.result.info.register_id); 
           this.navCtrl.setRoot(TabsPage);
        // this.navCtrl.setRoot(HomePage);
        
           localStorage.setItem("Islogin", '1'); 
        }
        else if(this.result.status == 2){
          loader.dismiss();
          this.presentToast(this.result.msg,'bgGreen'); 
          this.navCtrl.push("OtppagePage"); 
          localStorage.setItem("Userregister_id", this.result.info.register_id);
          localStorage.setItem("otpMobile", this.result.info.mobile_no);
        }
        else if(this.result.status == 4){
          loader.dismiss();
          this.presentToast(this.result.msg,'bgRed'); 
          localStorage.setItem("otp", this.otp);
          const profileModal = this.modalCtrl.create('IncomepopupPage', { info: this.result.info }, { cssClass: "mymodal4" });
          profileModal.onDidDismiss(data => {
            // console.log(data);
          });
          profileModal.present();
          // localStorage.setItem("Userregister_id", this.result.info.register_id);
         
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
        "RegisterId":localStorage.getItem("loginotpMobile"),
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
