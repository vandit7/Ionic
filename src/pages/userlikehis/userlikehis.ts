import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, Events, Platform, App, Nav, AlertController, Navbar, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Slides, Tabs } from 'ionic-angular';
import $ from "jquery";
import { ServiceProvider } from '../../providers/service/service';
import { ChatwindowPage } from '../chatwindow/chatwindow';
@IonicPage()
@Component({
  selector: 'page-userlikehis',
  templateUrl: 'userlikehis.html',
})
export class UserlikehisPage {

  //@ViewChild(Slides) slides: Slides;
  //Configuration for each Slider
  @ViewChild(Nav) nav: Nav;
  @ViewChild('navbar') navBar: Navbar;
  receivedTab: any;
  sendTab: any;
  result: any;
  dataSet: any;
  userList: any[] = [];
  LinkList: any[] = [];
  LinkListFull: any
  userNotFound: any;
  countNo: any;
  done: boolean;
  // receiveList:any[]=[];
  // receiveNotFound:any;
  noInternet: any;
  is_expire: any;
  current_plan: any;
  view_contact: any;
  public counter = 0;
  exitText: any;
  finalHe: any;
  hei: any;
  widthCss: any;
  linkListAll: any;
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public serviceProvider: ServiceProvider,
    public platform: Platform,
    public events: Events,
    public alertCtrl: AlertController,
    public app: App, ) {

    this.userNotFound = false;
    this.noInternet = false;
    this.exitText = false;
    this.hei = window.screen.height;
    this.finalHe = (this.hei) - 56;
    $('.hDevice').css('height', this.finalHe + 'px');
    $('.tabbar').css('display', 'none')

    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      $('.tabbar').css('display', 'flex');
    });
    this.widthCss = ((this.platform.width() / 2.7));
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      $('.tabbar').css('display', 'flex');
    });
    this.allUserList(this.countNo);
  }

  ionViewDidEnter() {
    this.hei = window.screen.height;
    this.finalHe = (this.hei) - 56;
    $('.hDevice').css('height', this.finalHe + 'px');
  }
  presentToast1() {
    this.exitText = true;
    setTimeout(() => { this.exitText = false; }, 2000)
  }
  ionViewDidLoad() {
    this.hei = window.screen.height;
    this.finalHe = (this.hei) - 56;
    $('.hDevice').css('height', this.finalHe + 'px');
    console.log('ionViewDidLoad UserlikehisPage');
    //  this.allUserList();
  }


  gotoProfileDetails(id) {
    // console.log(id)
    const animationsOptions = {
      animation: 'ios-transition',
      duration: 500
    }
    localStorage.setItem("", id);
    localStorage.setItem("pageToHome", '1')
    localStorage.setItem("Profile_id", id),
      this.navCtrl.push('HomedetailsPage', { id: id }, animationsOptions);
  }

  allUserList(StartLimit) {

    this.linkListAll = 'LinkList_' + localStorage.getItem("register_id")

    let userListObj = {
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "2",
      "RegisterId": localStorage.getItem("register_id"),
      "LikeArray": JSON.parse(localStorage.getItem(this.linkListAll))
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.UserLikeHistory(userListObj).then(data => {
      this.noInternet = false;
      this.result = data;
      this.userList = []
      this.done = true;
      if (this.result.status == 1) {
        //this.userList=[]
        this.dataSet = this.result.info;
        for (let i = 0; i < Object.keys(this.dataSet).length; i++) {
          this.userList.push(this.result.info[i]);
        }
        setTimeout(function () {
          this.hei = window.screen.height;
          this.finalHe = (this.hei) - 56;
          $('.hDevice').css('height', this.finalHe + 'px');
        }, 400);
        loader.dismiss();
        this.userNotFound = false;

      }
      else if (this.result.status == 0) {
        this.done = false;
        loader.dismiss();
        this.userNotFound = true;
      }
      else {
        this.done = false;
        loader.dismiss();
        this.userNotFound = true;
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      this.noInternet = true;
      console.log(error.json());
      loader.dismiss();
    });
  }
  connectNow(ToRegisterId) {
    let connectNowObj = {
      "FromRegisterId": localStorage.getItem("register_id"),
      "ToRegisterId": ToRegisterId,
      "Type": "1",
      "ValidData": localStorage.getItem("ValidDataJat"),

    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.connectNow(connectNowObj).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        this.presentToast(this.result.msg, 'bgGreen');
        this.allUserList(this.countNo);
        loader.dismiss();
      }
      else {
        this.presentToast(this.result.msg, 'bgRed');
        loader.dismiss();

      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }
  getAllUserDetails() {
    let allUserObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1"
    }
    this.serviceProvider.getAllUserDetails(allUserObj).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        this.is_expire = this.result.info.user_detail.is_expire;
        localStorage.setItem("is_expire", this.is_expire);
        this.current_plan = this.result.info.user_detail.current_plan;
        localStorage.setItem("current_plan", this.current_plan);
        this.view_contact = this.result.info.user_detail.view_contact;
        localStorage.setItem("view_contact", this.view_contact);
      }
      else {
      }
    }, error => {
      console.log(error.json());
    });
  }
  ShowPopupCancelReq(RequestID) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure want to cancel this request ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.UpdateStatus(RequestID, '3')
          }
        }
      ]
    });
    alert.present();
  }


  UpdateStatus(RequestID, UpdateStatus) {
    let UpdateStatusObj = {
      "Mode": "1",
      "UpdateStatus": UpdateStatus,
      "RequestId": RequestID,
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1",
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.UpdateStatus(UpdateStatusObj).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        this.presentToast(this.result.msg, 'bgGreen');
        this.allUserList(this.countNo);
        loader.dismiss();
      }
      else {
        this.presentToast(this.result.msg, 'bgRed');
        loader.dismiss();

      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }

  doInfinite(infiniteScroll) {
    this.countNo = this.countNo + 1;
    setTimeout(() => {
      //  this.allUserList(this.countNo); 
      infiniteScroll.complete();
    }, 2000);


  }

  moreDataCanBeLoaded() {
    //console.log(this.done)
    return this.done;

  }
  joinChat(Id) {
    localStorage.setItem("con_id", Id);
    this.navCtrl.push('ChatwindowPage');
    localStorage.setItem("pageTo", '1')
    //  this.app.getActiveNav().push(ChatwindowPage)
  }

  linkPro(proId) {
    this.linkListAll = 'LinkList_' + localStorage.getItem("register_id")

    this.LinkListFull = JSON.parse(localStorage.getItem(this.linkListAll));
    if (this.LinkListFull != null) {

      for (let i = 0; i < Object.keys(this.LinkListFull).length; i++) {
        if (this.LinkListFull[i] === proId) {
          this.LinkList.push(this.LinkListFull[i]);
          break;
        }
      }
    }
    else { }

    this.LinkList = JSON.parse(localStorage.getItem(this.linkListAll));
    if (this.LinkList != null) { }
    else {
      this.LinkList = []
    }
    this.LinkList.push(proId);
    localStorage.setItem(this.linkListAll, JSON.stringify(this.LinkList))

  }
  unLinkPro(proId1) {
    this.linkListAll = 'LinkList_' + localStorage.getItem("register_id")
    this.LinkListFull = JSON.parse(localStorage.getItem(this.linkListAll));
    if (this.LinkListFull != null) {

      for (let i = 0; i < Object.keys(this.LinkListFull).length; i++) {
        if (this.LinkListFull[i] === proId1) {
          this.LinkListFull.splice(i, 1);
          localStorage.setItem(this.linkListAll, JSON.stringify(this.LinkListFull))
          break;
        }
      }
    }
  }

  test(id) {
    this.linkListAll = 'LinkList_' + localStorage.getItem("register_id")
    this.LinkListFull = JSON.parse(localStorage.getItem(this.linkListAll));
    var matchFound = false
    if (this.LinkListFull != null) {

      for (let i = 0; i < Object.keys(this.LinkListFull).length; i++) {
        if (this.LinkListFull[i] === id) {
          matchFound = true;
          break;
        }
      }

      return matchFound;
    }
  }



  goback() {
    //this.navCtrl.setRoot(ProfilePage); 
    this.navCtrl.pop();
    $('.tabbar').css('display', 'flex');
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
