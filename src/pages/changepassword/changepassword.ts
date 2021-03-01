import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform } from 'ionic-angular';
import $ from "jquery";
import { ProfilePage } from '../profile/profile';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  result: any;
  oldPassword:any;
  newPassword:any;
  confirmPassword:any;
  disableButton:any;
  constructor(public navCtrl: NavController, 
    public serviceProvider: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    platform: Platform,) {
    $('.tabbar ').css('display','none');
    platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot(ProfilePage);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }
  gobackProfile()
  {
    this.navCtrl.setRoot(ProfilePage); 
  }

  changePassword()
  {
    if (this.oldPassword == '' || this.oldPassword == null || this.oldPassword == undefined || this.oldPassword.trim() == "") {
      this.presentToast('Please Enter Old Password !','bgRed');
    }
    else if (this.newPassword == '' || this.newPassword == null || this.newPassword == undefined || this.newPassword.trim() == "") {
      this.presentToast('Please Enter New Password !','bgRed');
    }
    else if(this.newPassword.length < 6){
      this.presentToast('Short Passwords Are Easy To Guess. Try One With At least 6 Characters.!','bgRed');
    }
    else if (this.confirmPassword == '' || this.confirmPassword == null || this.confirmPassword == undefined || this.confirmPassword.trim() == "") {
      this.presentToast('Please Enter Confirm Password !','bgRed');
    }
    else if(this.newPassword != this.confirmPassword )
    {
      this.presentToast('Confirm Password Does Not Match !','bgRed');
    }
    else{
      this.disableButton = true;
      let changePasswordObj = {
        "OldPassword":this.oldPassword,
        "NewPassword": this.newPassword,
        "RegisterId": localStorage.getItem("register_id"), 
        "ValidData": localStorage.getItem("ValidDataJat"),
        "Type": "1"
      }
      let loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: "Please wait...",
      });
      loader.present();
      this.serviceProvider.changePassword(changePasswordObj).then(data => { 
        this.result = data;
        this.disableButton = false;
        if (this.result.status == 1) {
          loader.dismiss();
          this.presentToast(this.result.msg ,'bgGreen');
          this.newPassword='';
          this.oldPassword='';
          this.confirmPassword='';
        }
        else {
          loader.dismiss();
          this.presentToast(this.result.msg,'bgRed');
        }
      }, error => {
        this.disableButton = false;
        this.presentToast('No Internet connection !', 'bgRed');
        console.log(error.json());
        loader.dismiss();
      });
    }
  }

    /**
  * 
  * @param msg 
  */
 presentToast(msg, bgColor) {
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
