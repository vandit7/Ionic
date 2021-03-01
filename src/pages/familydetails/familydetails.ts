import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform } from 'ionic-angular';
import $ from "jquery";
import { ProfilePage } from '../profile/profile';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-familydetails',
  templateUrl: 'familydetails.html',
})
export class FamilydetailsPage {
  result: any;
  familyType1: any[] = [];
  familyType: {}[];
  selectedFamilyType: any;
  familyTypeName: any;

  familyStates1: any[] = [];
  familyStates: {}[];
  selectedFamilyStates: any;
  familyStatesName: any;

  fatherStates1: any[] = [];
  fatherStates: {}[];
  selectedFatherStates: any;
  fatherStatesName: any;

  motherStates1: any[] = [];
  motherStates: {}[];
  selectedMotherStates: any;
  motherStatesName: any;

  noBrothers1: any[] = [];
  noBrothers: {}[];
  selectedNoBrothers: any;
  noBrothersName: any;

  broMarried1: any[] = [];
  broMarried: {}[];
  selectedBroMarried: any;
  broMarriedName: any;

  noSisters1: any[] = [];
  noSisters: {}[];
  selectedNoSisters: any;
  noSistersName: any;

  sisMarried1: any[] = [];
  sisMarried: {}[];
  selectedSisMarried: any;
  sisMarriedName: any;
  disableButton:any;
  constructor(public navCtrl: NavController,
    public serviceProvider: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    platform: Platform,) {
    $('.tabbar ').css('display', 'none');

    this.noBrothers = [
      { id: 1, name: '0' },
      { id: 2, name: '1' },
      { id: 3, name: '2' },
      { id: 4, name: '3' },
      { id: 5, name: '4' },
      { id: 6, name: '5' },
    ];
    this.broMarried = [
      { id: 1, name: '0' },
      { id: 2, name: '1' },
      { id: 3, name: '2' },
      { id: 4, name: '3' },
      { id: 5, name: '4' },
      { id: 6, name: '5' },
    ];
    this.noSisters = [
      { id: 1, name: '0' },
      { id: 2, name: '1' },
      { id: 3, name: '2' },
      { id: 4, name: '3' },
      { id: 5, name: '4' },
      { id: 6, name: '5' },
    ];
    this.sisMarried = [
      { id: 1, name: '0' },
      { id: 2, name: '1' },
      { id: 3, name: '2' },
      { id: 4, name: '3' },
      { id: 5, name: '4' },
      { id: 6, name: '5' },
    ];

    platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot(ProfilePage);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FamilydetailsPage');
    this.getAllFamliyInfo();
    this.getAllUserDetails(); 
  }

  getAllUserDetails() {
    let familyObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1"
    }
  
    this.serviceProvider.getAllUserDetails(familyObj).then(data => {
      this.result = data;

      if (this.result.status == 1) {
        this.selectedFamilyType=this.result.info.user_detail.family_type;
        this.selectedFamilyStates=this.result.info.user_detail.family_status;
        this.selectedFatherStates=this.result.info.user_detail.father_status;
        this.selectedMotherStates=this.result.info.user_detail.mother_status;
        this.selectedNoBrothers=this.result.info.user_detail.no_brother;
        this.selectedBroMarried=this.result.info.user_detail.brother_married;
        this.selectedNoSisters=this.result.info.user_detail.no_sister;
        this.selectedSisMarried=this.result.info.user_detail.sister_married;
      }
      else {
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
    
    });
  }



  getAllFamliyInfo() {

    let signinObj = {
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.familyType = [];
    this.familyType1 = [];
    this.serviceProvider.getAllFamliyInfo(signinObj).then(data => {
      this.result = data;

      if (this.result.status == 1) {
        loader.dismiss();
        //FamilyType
        for (let i = 0; i < this.result.info.FamilyType.length; i++) {
          this.familyType1.push(this.result.info.FamilyType[i])
        }
        this.familyType = this.familyType1;

        //FamilyStatus
        for (let i = 0; i < this.result.info.FamilyStatus.length; i++) {
          this.familyStates1.push(this.result.info.FamilyStatus[i])
        }
        this.familyStates = this.familyStates1;

        //FatherStatus
        for (let i = 0; i < this.result.info.FatherStatus.length; i++) {
          this.fatherStates1.push(this.result.info.FatherStatus[i])
        }
        this.fatherStates = this.fatherStates1;

        //MotherStatus
        for (let i = 0; i < this.result.info.MotherStatus.length; i++) {
          this.motherStates1.push(this.result.info.MotherStatus[i])
        }
        this.motherStates = this.motherStates1;
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



  gobackProfile() {
    this.navCtrl.setRoot(ProfilePage);
  }
  onChangeFyType($event) {
    this.familyTypeName = $event;
    if (this.familyTypeName == undefined || this.familyTypeName == null) { }
    else {
      //console.log(this.familyTypeName)
    }
  }
  onChangeFyStates($event) {
    this.familyStatesName = $event;
    if (this.familyStatesName == undefined || this.familyStatesName == null) { }
    else {
      //console.log(this.familyStatesName)
    }
  }
  onChangeFaStates($event) {
    this.fatherStatesName = $event;
    if (this.fatherStatesName == undefined || this.fatherStatesName == null) { }
    else {
      //console.log(this.fatherStatesName)
    }
  }
  onChangeMoStates($event) {
    this.motherStatesName = $event;
    if (this.motherStatesName == undefined || this.motherStatesName == null) { }
    else {
      //console.log(this.motherStatesName)
    }
  }
  onChangeNoBro($event) {
    this.noBrothersName = $event;
    if (this.noBrothersName == undefined || this.noBrothersName == null) { }
    else {
      //console.log(this.noBrothersName)
    }
  }

  onChangeBroMarried($event) {
    this.broMarriedName = $event;
    if (this.broMarriedName == undefined || this.broMarriedName == null) { }
    else {
      //console.log(this.broMarriedName)
    }
  }

  onChangeNoSis($event) {
    this.noSistersName = $event;
    if (this.noSistersName == undefined || this.noSistersName == null) { }
    else {
      // console.log(this.noSistersName)
    }
  }

  onChangeSisMarried($event) {
    this.sisMarriedName = $event;
    if (this.sisMarriedName == undefined || this.sisMarriedName == null) { }
    else {
      // console.log(this.sisMarriedName)
    }
  }

  updateFamilyDetails() {
    if (this.selectedFamilyType == '' || this.selectedFamilyType == null || this.selectedFamilyType == undefined) {
      this.presentToast('Please  Select Family Type!', 'bgRed');
    }
    else if (this.selectedFamilyStates == '' || this.selectedFamilyStates == null || this.selectedFamilyStates == undefined) {
      this.presentToast('Please Select Family Status !', 'bgRed');
    }
    else if (this.selectedFatherStates == '' || this.selectedFatherStates == null || this.selectedFatherStates == undefined) {
      this.presentToast('Please Select  Father Status !', 'bgRed');
    }
    else if (this.selectedMotherStates == '' || this.selectedMotherStates == null || this.selectedMotherStates == undefined) {
      this.presentToast('Please Select Mother Status !', 'bgRed');
    }
    else if (this.selectedNoBrothers == '' || this.selectedNoBrothers == null || this.selectedNoBrothers == undefined) {
      this.presentToast('Please Select No of Brothers !', 'bgRed');
    }
    else if (this.selectedBroMarried == '' || this.selectedBroMarried == null || this.selectedBroMarried == undefined) {
      this.presentToast('Please Select How many Brothers are Married !', 'bgRed');
    }
    else if (this.selectedNoBrothers  < this.selectedBroMarried)
    {
      this.presentToast('Please Select valid option in How many Brothers are Married !', 'bgRed');
    }
    else if (this.selectedNoSisters == '' || this.selectedNoSisters == null || this.selectedNoSisters == undefined) {
      this.presentToast('Please Select No of Sisters !', 'bgRed');
    }
    else if (this.selectedSisMarried == '' || this.selectedSisMarried == null || this.selectedSisMarried == undefined) {
      this.presentToast('Please Select How many Sisters are Married !', 'bgRed');
    }
    else if (this.selectedNoSisters  < this.selectedSisMarried)
    {
      this.presentToast('Please Select valid option in How many Sisters are Married !', 'bgRed');
    }
    else {
      this.disableButton = true;
      let updateDetailssObj = {
          "FamilyType" : this.selectedFamilyType,
          "FamilyStatus" : this.selectedFamilyStates,
          "FatherStatus" : this.selectedFatherStates,
          "MotherStatus" : this.selectedMotherStates,
          "NoBrother" : this.selectedNoBrothers,
          "NoBrotherMarried" : this.selectedBroMarried,
          "NoSister" : this.selectedNoSisters,
          "NoSisterMarried" : this.selectedSisMarried,
          "RegisterId": localStorage.getItem("register_id"),
          "ValidData": localStorage.getItem("ValidDataJat"),
          "Type" : "1"
      }
      let loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: "Please wait...",
      });
      loader.present();
      this.serviceProvider.updateFamilyDetails(updateDetailssObj).then(data => {
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
