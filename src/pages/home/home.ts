import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, LoadingController, Events, Platform, App, Nav, AlertController, Navbar } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Slides, Tabs } from 'ionic-angular';
import $ from "jquery";
import { ServiceProvider } from '../../providers/service/service';
import { ChatwindowPage } from '../chatwindow/chatwindow';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
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
  income_id:any;
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public serviceProvider: ServiceProvider,
    public platform: Platform,
    public events: Events,
    public alertCtrl: AlertController,
    public app: App,) {
    $('.tabbar ').css('display', 'flex');
    this.userNotFound = false;
    this.noInternet = false;
    this.exitText = false;
    this.hei = window.screen.height;
    this.finalHe = (this.hei) - 112;
    $('.hDevice').css('height', this.finalHe + 'px');
    platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.presentToast1();
        this.exitText = true;
        setTimeout(() => { this.counter = 0 }, 2000)
      } else {
        // console.log("exitapp");
        platform.exitApp();
      }
    }, 0)
    this.widthCss = ((this.platform.width() / 2.7));

    // hDevice

  }


  ionViewWillEnter() {
    this.widthCss = ((this.platform.width() / 2.7));
    this.getAllUserDetails();
    this.countNo = 0;
    this.allUserList(this.countNo);
    $("#tab-t0-0").attr("aria-selected", "true");
    $("#tab-t0-1").attr("aria-selected", "false");
    $("#tab-t0-2").attr("aria-selected", "false");
    $("#tab-t0-3").attr("aria-selected", "false");
    $(".ion-md-person").attr("ng-reflect-is-active", "false");

    this.platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.exitText = true;
        this.presentToast1();
        setTimeout(() => { this.counter = 0 }, 2000)
      } else {
        // console.log("exitapp");
        this.platform.exitApp();
      }
    }, 0)
  }
  ionViewDidEnter() {

    this.hei = window.screen.height;
    this.finalHe = (this.hei) - 112;
    $('.hDevice').css('height', this.finalHe + 'px');

    this.platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.exitText = true;
        this.presentToast1();
        setTimeout(() => { this.counter = 0 }, 2000)
      } else {
        // console.log("exitapp");
        this.platform.exitApp();
      }
    }, 0)
  }
  presentToast1() {
    this.exitText = true;
    setTimeout(() => { this.exitText = false; }, 2000)
  }
  ionViewDidLoad() {
    this.hei = window.screen.height;
    console.log(this.hei)
    this.finalHe = (this.hei) - 56;
    $('.hDevice').css('height', this.finalHe + 'px');
    console.log('ionViewDidLoad HomePage');
    //  this.allUserList();
  }

  openApp() {
    // this.navCtrl.popToRoot();
    this.navCtrl.setRoot(LoginPage);
  }
  gotoProfileDetails(id) {
    // console.log(id)
    const animationsOptions = {
      animation: 'ios-transition',
      duration: 500
    }
    localStorage.setItem("pageToHome", '0')
    localStorage.setItem("Profile_id", id),
      this.navCtrl.push('HomedetailsPage', { id: id }, animationsOptions);
  }

  allUserList(StartLimit) {
    let userListObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "2",
      "StartLimit": StartLimit
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.UserListing(userListObj).then(data => {
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
          this.finalHe = (this.hei) - 112;
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
        this.income_id = this.result.info.user_detail.income_id;
        localStorage.setItem("income_id", this.income_id);
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
    localStorage.setItem("pageTo", '0')
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


  topTab(no) {
    if (no == '1') {
      $('.tab1').addClass('activePtags')
      $('.tab2').removeClass('activePtags')
      $('.tab3').removeClass('activePtags')
    }
    else if (no == '2') {
      $('.tab2').addClass('activePtags')
      $('.tab1').removeClass('activePtags')
      $('.tab3').removeClass('activePtags')
    }
    else if (no == '3') {
      $('.tab3').addClass('activePtags')
      $('.tab2').removeClass('activePtags')
      $('.tab1').removeClass('activePtags')
    }
  }

  gotoEditPreference() {
    this.navCtrl.push('EditpreferencePage');
    localStorage.setItem("pageToPlan", '0')
  }

  userLikeHis() {
    this.navCtrl.push('UserlikehisPage');
    localStorage.setItem("pageToPlan", '0')
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
