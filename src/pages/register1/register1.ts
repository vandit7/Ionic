import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Alert, Platform } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { LoginPage } from '../login/login';
import $ from "jquery";
@IonicPage()
@Component({
  selector: 'page-register1',
  templateUrl: 'register1.html',
})
export class Register1Page {
  public event = {
    month: '1990-02-19',
  }
  gaming: any;
  result: any;

  cities: { id: number; name: string; avatar: string; }[];

  profileFor1: any[] = [];
  profileFor: {}[];
  selectedProfileFor: any;
  profileForName: any;

  gender1: any[] = [];
  gender: {}[];
  selectedGender: any;
  genderName: any;

  accountName: any;
  mocode: any;
  mobile: any;
  emailAddress: any;
  password: any;
  fullname: any;
  lastname: any;
  dob: any;
  userName: any;
  confirmpassword: any;
  endMax: any;
  platform: any;
  disableButton: boolean;
  constructor(public navCtrl: NavController,
    public serviceProvider: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    platform: Platform, ) {

    this.endMax = (new Date()).getFullYear() - 18;

    platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register1Page');
    this.disableButton = false;
    this.gender = [
      {
        id: 1, name: 'Male',
      },
      {
        id: 2, name: 'Female'
      }
    ];
    this.getAllInfo();
    this.mocode = "91";

    if (localStorage.getItem("Jstep1") == '1') {
      this.accountName = localStorage.getItem("Jaccountname");
      this.selectedProfileFor = localStorage.getItem("JProfileFor");
      this.mocode = localStorage.getItem("Jmocode");
      this.mobile = localStorage.getItem("Jmobile");
      this.emailAddress = localStorage.getItem("JemailAddress");
      this.userName = localStorage.getItem("JuserName");
      // this.password=localStorage.getItem("Jpassword");
      // this.confirmpassword=localStorage.getItem("JCpassword");
      this.fullname = localStorage.getItem("Jfullname");
      this.lastname = localStorage.getItem("Jlastname");
      this.selectedGender = localStorage.getItem("JGender");
      this.dob = localStorage.getItem("Jdob");
    }
  }

  keyPress(event: any) {
    var key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8 || (key >= 97 && key <= 122));
  }

  getAllInfo() {

    let signinObj = {
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.profileFor = [];
    this.profileFor1 = [];
    this.serviceProvider.getAllInfo(signinObj).then(data => {
      this.result = data;

      if (this.result.status == 1) {
        loader.dismiss();
        for (let i = 0; i < this.result.info.ProfileFor.length; i++) {
          this.profileFor1.push(this.result.info.ProfileFor[i])
        }
        this.profileFor = this.profileFor1;
      }
      else {
        loader.dismiss();
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }

  gotoLogin() {
    this.navCtrl.push(LoginPage);
  }
  stepReg1() {

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(this.emailAddress);

    // var letters = /^[A-Za-z]+$/;
    // let result1 = letters.test(this.userName);

    if (this.accountName == '' || this.accountName == null || this.accountName == undefined || this.accountName.trim() == "") {
      this.presentToast('Please Enter Account Name !', 'bgRed');
    }
    else if (this.selectedProfileFor == '' || this.selectedProfileFor == null || this.selectedProfileFor == undefined) {
      this.presentToast('Please Select Profile For !', 'bgRed');
    }
    else if (this.mocode == '' || this.mocode == null || this.mocode == undefined || this.mocode.trim() == "") {
      this.presentToast('Please Enter Mobile Code !', 'bgRed');
    }
    else if (this.mobile == '' || this.mobile == null || this.mobile == undefined || this.mobile.trim() == "") {
      this.presentToast('Please Enter Mobile No !', 'bgRed');
    }
    else if (this.userName == '' || this.userName == null || this.userName == undefined || this.userName.trim() == "") {
      this.presentToast('Please Enter Username !', 'bgRed');
    }
    // else if (result1 == false) {
    //   this.presentToast('Please Enter Valid Username. Please Input Alphabet Characters Only !', 'bgRed');
    // }
    else if (this.emailAddress == '' || this.emailAddress == null || this.emailAddress == undefined) {
      this.presentToast('Please Enter Email Address !', 'bgRed');
    }
    else if (result == false) {
      this.presentToast('Please Enter Valid Email Address !', 'bgRed');
    }
    // else if (this.password == '' || this.password == null || this.password == undefined || this.password.trim() == "") {
    //   this.presentToast('Please Enter Password !','bgRed');
    // }
    // else if(this.password.length < 6){
    //   this.presentToast('Short Passwords Are Easy To Guess. Try One With At least 6 Characters.!','bgRed');
    // }
    // else if (this.confirmpassword == '' || this.confirmpassword == null || this.confirmpassword == undefined || this.confirmpassword.trim() == "") {
    //   this.presentToast('Please Enter Confirm Password !','bgRed');
    // }
    // else if(this.password != this.confirmpassword )
    // {
    //   this.presentToast('Confirm Password Does Not Match !','bgRed');
    // }
    else if (this.fullname == '' || this.fullname == null || this.fullname == undefined || this.fullname.trim() == "") {
      this.presentToast('Please Enter First Name !', 'bgRed');
    }
    else if (this.lastname == '' || this.lastname == null || this.lastname == undefined || this.lastname.trim() == "") {
      this.presentToast('Please Enter Last Name !', 'bgRed');
    }
    else if (this.selectedGender == '' || this.selectedGender == null || this.selectedGender == undefined) {
      this.presentToast('Please Select Gender !', 'bgRed');
    }
    else if (this.dob == '' || this.dob == null || this.dob == undefined) {
      this.presentToast('Please Select Date Of Birth !', 'bgRed');
    }
    else {

      this.disableButton = true;
      let checkObj = {
        "MobileNo": this.mobile,
        "UserName": this.userName,
        "EmailId": this.emailAddress,
        "ValidData": localStorage.getItem("ValidDataJat"),
        "Type": "1"
      }
      let loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: "Please wait...",
      });
      loader.present();
      this.serviceProvider.CheckDublicateValueApi(checkObj).then(data => {
        this.result = data;
        this.disableButton = false;
        if (this.result.status == 1) {
          localStorage.setItem("Jaccountname", this.accountName);
          localStorage.setItem("JProfileFor", this.selectedProfileFor);
          localStorage.setItem("Jmocode", this.mocode);
          localStorage.setItem("Jmobile", this.mobile);
          localStorage.setItem("JemailAddress", this.emailAddress);
          localStorage.setItem("JuserName", this.userName);
          // localStorage.setItem("Jpassword", this.password);
          // localStorage.setItem("JCpassword", this.confirmpassword);
          localStorage.setItem("Jfullname", this.fullname);
          localStorage.setItem("Jlastname", this.lastname);
          localStorage.setItem("JGender", this.selectedGender);
          localStorage.setItem("Jdob", this.dob);

          localStorage.setItem("Jstep1", '1');
          loader.dismiss();
          this.navCtrl.push('Register2Page');
        }
        else {
          loader.dismiss();
          this.presentToast(this.result.msg, 'bgRed');
        }
      }, error => {
        this.disableButton = false;
        this.presentToast('No Internet connection !', 'bgRed');
        console.log(error.json());
        loader.dismiss();
      });





    }
  }

  onChange($event) {
    this.profileForName = $event;
    if (this.profileForName == undefined || this.profileForName == null) { }
    else {
      // console.log(this.profileForName.name)
    }
  }
  onChangeGender($event) {
    this.genderName = $event;
    if (this.genderName == undefined || this.genderName == null) { }
    else {
      //   console.log(this.genderName.name)
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
