import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Alert, Platform } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { LoginPage } from '../login/login';
import $ from "jquery";
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the IncomepopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incomepopup',
  templateUrl: 'incomepopup.html',
})
export class IncomepopupPage {

  infoIncome:any;
  gender: {}[];
  genderName:any;
  selectedIncome: any;
  otp:any;
  disableButton:any;
  result: any;
  platform: any;
  otpMobile:any
  selectedIncome1:any;
  
  constructor(public navCtrl: NavController,
    public serviceProvider: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    platform: Platform,) {
    this.infoIncome = this.navParams.get('info');
    console.log(this.infoIncome)
  }

  ionViewDidLoad() {
    this.gender = [
      {
        id: 1, name: 'Male',
      },
      {
        id: 2, name: 'Female'
      }
    ];

    console.log('ionViewDidLoad IncomepopupPage');
  }

  onChangeIncome($event) {
    //this.selectedIncome = $event.income;
    this.selectedIncome1 = $event.id;
    // if (this.selectedIncome == undefined || this.selectedIncome == null) { }
    // else {
    //   //   console.log(this.genderName.name)
    // }
  }

  appLogin()
  {
      let signinObj = {
        "UserName":  localStorage.getItem("loginotpMobile"),
        "Password": '',
        "ValidData": localStorage.getItem("ValidDataJat"),
        "Type": "1",
        "OTPCode":localStorage.getItem("otp"),
        "PackageID" : this.selectedIncome,
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
