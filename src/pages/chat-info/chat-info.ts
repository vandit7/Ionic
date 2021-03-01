import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-chat-info',
  templateUrl: 'chat-info.html',
})
export class ChatInfoPage {
  InfoName: any;
  InfoToUserDetail: any;
  InfoAbout: any;
  InfoCity: any;
  InfoCountry: any;
  InfoDOB: any;
  InfoEmailID: any;
  InfoMobileNo: any;
  InfoIsBlock: any;
  InfoState: any;
  result: any;
  blockText:any;
  blockMsg:any;
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public serviceProvider: ServiceProvider,
    public loadingCtrl: LoadingController,
    platform: Platform,
    private toastCtrl: ToastController, ) {
    platform.registerBackButtonAction(() => {
      this.dismissModal();
    });

    this.blockText=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatInfoPage');
    this.InfoName = localStorage.getItem("InfoName")
    this.InfoToUserDetail = localStorage.getItem("InfoToUserDetail")
    this.InfoAbout = localStorage.getItem("InfoAbout")
    this.InfoCity = localStorage.getItem("InfoCity")
    this.InfoCountry = localStorage.getItem("InfoCountry")
    this.InfoDOB = localStorage.getItem("InfoDOB")
    this.InfoEmailID = localStorage.getItem("InfoEmailID")
    this.InfoMobileNo = localStorage.getItem("InfoMobileNo")
    this.InfoIsBlock = localStorage.getItem("InfoIsBlock")
    this.InfoState = localStorage.getItem("InfoState")
  }
  dismissModal() {
    this.viewCtrl.dismiss();
  }

  presentConfirmBlock() {
    let alert = this.alertCtrl.create({
      message: 'Block ' + localStorage.getItem("InfoName") + ' ? Blocked contacts will no longer be able to send you messages.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Block',
          handler: () => {
            this.userBlock();
          }
        }
      ]
    });
    alert.present();
  }
  presentConfirmUnBlock() {
    let alert = this.alertCtrl.create({
      message: 'Unblock ' + localStorage.getItem("InfoName") + ' to send you messages.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Unblock',
          handler: () => {
            this.userBlock();
          }
        }
      ]
    });
    alert.present();
  }
  userBlock() {
    let UserBlockUnblockObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ToRegisterId": localStorage.getItem("con_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1",
      "Block": parseInt(localStorage.getItem("InfoIsBlock")) + 1,
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.UserBlockUnblock(UserBlockUnblockObj).then(data => {
      this.result = data;
      loader.dismiss();
      if (this.result.status == 1) {
        this.blockText=true;
        this.blockMsg=this.result.msg
        setTimeout(() => {
         this.blockText = false;
        }, 2000);
      //  this.presentToast(this.result.msg, 'bgGreen');
        this.InfoIsBlock=this.result.info;
        // setTimeout(() => {
        //   this.InfoIsBlock=localStorage.getItem("InfoIsBlock");
        // }, 1000);
       
      }
    }, error => {
      // this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());

    });
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
