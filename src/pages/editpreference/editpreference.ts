import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Alert, Platform } from 'ionic-angular';
import $ from "jquery";
import * as ionRangeSlidere from 'ion-rangeslider';
import { ProfilePage } from '../profile/profile';
import { ServiceProvider } from '../../providers/service/service';
declare var myfunction: any;
@IonicPage()
@Component({
  selector: 'page-editpreference',
  templateUrl: 'editpreference.html',
})

export class EditpreferencePage {
  result: any;

  ageSlider: any = { lower: 18, upper: 25 };
  ageMin2: any = 18;
  ageMax2: any = 50;
  ageMin: any = 18;
  ageMax: any = 50;

  heightSlider: any = { lower: 0, upper: 0 };
  heightMin2: any;
  heightMax2: any;

  timeMin: any = 1;
  timeMax: any = 10;

  martialStatus1: any[] = [];
  martialStatus: {}[];
  selectedMartialStatus: any;
  martialStatusName: any;

  countryList1: any[] = [];
  countryList: {}[];
  selectedCountryList: any;
  countryListName: any;
  countryId: any;

  countryCurrency1: any[] = [];
  countryCurrency: {}[];
  selectedCountryCurrency: any;
  countryCurrencyName: any;

  stateList1: any[] = [];
  stateList: {}[];
  selectedStateList: any;
  stateListName: any;
  stateId: any;

  cityList1: any[] = [];
  cityList: {}[];
  selectedCityList: any;
  cityListName: any;
  cityId: any

  educationLevel1: any[] = [];
  educationLevel: {}[];
  selectedEducationLevel: any;
  educationLevelName: any;

  educationField1: any[] = [];
  educationField: {}[];
  selectedEdeducationField: any;
  educationFieldName: any;

  smoke1: any[] = [];
  smoke: {}[];
  selectedSmoke: any;
  smokeName: any;

  drink1: any[] = [];
  drink: {}[];
  selectedDrink: any;
  drinkName: any;

  income1: any[] = [];
  income: {}[];
  selectedIncome: any;
  incomeName: any;

  showMorePre: any;
  showMoreText: any;

  heightAll: any;
  disableButton: any;

  gotraList: any[];
  gotraName: any;
  gotraArrayFiind: any;
  selectedGotra: any;
  mGotraName: any;

  motherGotraList: any;
  mothergotraName: any;
  motherGotraArrayFind: any[];
  othergotraList: any;
  othergotraName: any;
  othergotraArrayFind: any[];

  gmotherGotraList: any;
  gmothergotraName: any;
  gmotherGotraArrayFind: any[];
  gMGotraName: any;
  khapName: any;
  khap: any;
  religion: any;
  skinName: any;
  physicalName: any;
  physical: any;
  skin: any;
  selectedMGotra: any;
  selectedGMGotra: any;
  gMotherGotraBoxDetails: any;
  selectedKhap: any;
  selectedReligion: any;
  selectedPhysical: any;
  selectedSkin: any;
  religionName: any;
  othergotra: any;
  incomeId: any;
  incomeArray: any;
  GotraBoxDetail:any;
  gotraBox:any;
  MotherGotraBoxDetails:any;
  motherGotraBox:any;
  gMotherGotraBox:any;
  khapBoxBoxDetail:any;
  khapBox:any;
  countryName:any;

  constructor(public navCtrl: NavController,
    public serviceProvider: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    platform: Platform,) {
    $('.tabbar ').css('display', 'none')
    //this.showMorePre = false;
    //this.showMoreText = true;
    platform.registerBackButtonAction(() => {
       this.navCtrl.setRoot(ProfilePage);
      if (localStorage.getItem("pageToPlan") == '0') {
       $('.tabbar').css('display', 'flex');
      }
      else { }
    });
  }

  onkeypress(ev) {
    if (ev.target.value.length >= 2) {
      this.gotraList = [];
      this.gotraName = ev.target.value;
      //this.gotraArrayFiind = this.result.info.gotra;
      // this.gotraList = this.gotraArrayFiind.filter(v => v.name == this.gotraName.toLowerCase());
      this.gotraList = this.gotraArrayFiind.filter((item) => {
        return (item.name.toLowerCase().indexOf(this.gotraName.toLowerCase()) > -1);
      })
    }
  }
  onkeypressmgotra(ev) {
    if (ev.target.value.length >= 2) {
      this.motherGotraList = [];
      this.mothergotraName = ev.target.value;
      this.motherGotraArrayFind = this.gotraArrayFiind;
      // this.gotraList = this.gotraArrayFiind.filter(v => v.name == this.gotraName.toLowerCase());
      this.motherGotraList = this.motherGotraArrayFind.filter((item) => {
        return (item.name.toLowerCase().indexOf(this.mothergotraName.toLowerCase()) > -1);
      })
    }
  }
  onkeypressGmgotra(ev) {
    if (ev.target.value.length >= 2) {
      this.gmotherGotraList = [];
      this.gmothergotraName = ev.target.value;
      this.gmotherGotraArrayFind = this.gotraArrayFiind;
      // this.gotraList = this.gotraArrayFiind.filter(v => v.name == this.gotraName.toLowerCase());
      this.gmotherGotraList = this.gmotherGotraArrayFind.filter((item) => {
        return (item.name.toLowerCase().indexOf(this.gmothergotraName.toLowerCase()) > -1);
      })
    }
  }

  
  onkeypressOthergotra(ev) {
    if (ev.target.value.length >= 2) {
      this.othergotraList = [];
      this.othergotraName = ev.target.value;
      this.othergotraArrayFind = this.gotraArrayFiind;
      // this.gotraList = this.gotraArrayFiind.filter(v => v.name == this.gotraName.toLowerCase());
      this.othergotraList = this.othergotraArrayFind.filter((item) => {
        return (item.name.toLowerCase().indexOf(this.othergotraName.toLowerCase()) > -1);
      })
    }
  }
  onChangeGotra($event) {
    this.gotraName = $event;
    if (this.gotraName == undefined || this.gotraName == null) { }
    else {
      if (this.gotraName.name == 'OTHER') {
      }
    }
  }

  onChangeMGotra($event) {
    this.mGotraName = $event;
    if (this.mGotraName == undefined || this.mGotraName == null) { }
    else {
      if (this.mGotraName.name == 'OTHER') {
      }
    }
  }

  onChangeOtherGotra($event) {
    this.othergotraName = $event;
    if (this.othergotraName == undefined || this.othergotraName == null) { }
    else {
      if (this.othergotraName.name == 'OTHER') {
      }
    }
  }

  onChangeGMGotra($event) {
    this.gMGotraName = $event;
    if (this.gMGotraName == undefined || this.gMGotraName == null) { }
    else {
      //  console.log(this.gMGotraName.name)
    }
  }

  onChangeKhap($event) {
    this.khapName = $event;
    if (this.khapName == undefined || this.khapName == null) { }
    else {
    }
  }


  onChangePhysical($event) {
    this.physicalName = $event;
    if (this.physicalName == undefined || this.physicalName == null) { }
    else {
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditpreferencePage');
    this.ageMin2 = 18;
    this.ageMax2 = 50;

    this.heightMin2 = 1;
    this.heightMax2 = 10;
    this.getCountryList();
    this.getAllInfo();
    this.getPrefernceDetails();
    // myfunction();
  }

  gobackProfile() {
    //this.navCtrl.setRoot(ProfilePage); 
    //this.navCtrl.setRoot(ProfilePage);
    this.navCtrl.pop();
    if (localStorage.getItem("pageToPlan") == '0') {
      $('.tabbar').css('display', 'flex');
    }
    else {

    }
  }
  showDivPre() {
    //this.showMorePre = true;
    // this.showMoreText = false;
  }
  ageChange(ageSlider) {
    // console.log(ageSlider)
    this.ageMin2 = ageSlider.lower;
    this.ageMax2 = ageSlider.upper;
  }
  heightChange(heightSlider) {
    this.heightMin2 = heightSlider.lower;
    this.heightMax2 = heightSlider.upper;
  }
  getCountryList() {
    let signinObj = {
    }
    // let loader = this.loadingCtrl.create({
    //   spinner: 'bubbles',
    //   content: "Please wait...",
    // });
    // loader.present();
    this.countryList = [];
    this.countryList1 = [];
    this.countryCurrency = [];
    this.countryCurrency1 = [];
    //  this.selectedCountryList='';
    this.serviceProvider.getCountryList(signinObj).then(data => {
      this.result = data;

      if (this.result.status == 1) {
        //   loader.dismiss();
        for (let i = 0; i < this.result.info.length; i++) {
          this.countryList1.push(this.result.info[i])
          this.countryCurrency1.push(this.result.info[i])
        }
        this.countryList = this.countryList1;
        this.countryCurrency = this.countryCurrency1;
      }
      else {
        //  loader.dismiss();
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      // loader.dismiss();
    });
  }

  onChangeCountryList($event) {
    this.countryListName = $event;
    if (this.countryListName == undefined || this.countryListName == null) { }
    else {
      // console.log(this.countryListName.id)
      this.countryId = this.countryListName.id;
      this.selectedStateList = '';
      this.selectedCityList = '';
      this.getStateList(this.countryListName.id)
    }
  }

  getStateList(id) {
    let StateList = {
      "CountryID": id
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    // loader.present();
    this.stateList = [];
    this.stateList1 = [];
    //  this.selectedStateList='';
    this.serviceProvider.getStateList(StateList).then(data => {
      this.result = data;

      if (this.result.status == 1) {
        loader.dismiss();
        for (let i = 0; i < this.result.info.length; i++) {
          this.stateList1.push(this.result.info[i])
        }
        this.stateList = this.stateList1;
      }
      else {
        loader.dismiss();
        this.stateList = [];
        this.stateList1 = [];
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }
  onChangeStateList($event) {
    this.stateListName = $event;
    if (this.stateListName == undefined || this.stateListName == null) { }
    else {
      // console.log(this.stateListName.id)
      this.stateId = this.stateListName.id;
      this.selectedCityList = '';
      this.getCityList(this.stateListName.id)
    }
  }
  getCityList(id) {
    let CityList = {
      "StateID": id
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    //  loader.present();
    this.cityList = [];
    this.cityList1 = [];
    //  this.selectedCityList='';
    this.serviceProvider.getCityList(CityList).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        loader.dismiss();
        for (let i = 0; i < this.result.info.length; i++) {
          this.cityList1.push(this.result.info[i])
        }
        this.cityList = this.cityList1;
      }
      else {
        loader.dismiss();
        this.cityList = [];
        this.cityList1 = [];
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }

  onChangeCityList($event) {
    this.cityListName = $event;
    if (this.cityListName == undefined || this.cityListName == null) { }
    else {
      // console.log(this.cityListName.id) 
      this.cityId = this.cityListName.id;
    }
  }

  getPrefernceDetails() {

    let allUserObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1"
    }
    this.serviceProvider.getPrefernceDetails(allUserObj).then(data => {
      this.result = data;

      if (this.result.status == 1) {

        this.heightSlider = { lower: this.result.info.height.split('-')[0], upper: this.result.info.height.split('-')[1] };
        this.ageSlider = { lower: this.result.info.age.split('-')[0], upper: this.result.info.age.split('-')[1] };


        this.selectedCountryList = this.result.info.country_name;
        this.countryId = this.result.info.country_id;
        this.selectedStateList = this.result.info.state;
        this.stateId = this.result.info.state_id;
        this.selectedCityList = this.result.info.city;
        this.cityId = this.result.info.city_id;
        this.getStateList(this.countryId);
        this.getCityList(this.stateId);


        this.selectedMartialStatus = this.result.info.marital_status;
        this.selectedEducationLevel = this.result.info.education;
        if(this.selectedEducationLevel[0] ==""){
          this.selectedEducationLevel = "";
        }
        this.selectedEdeducationField = this.result.info.working;
        if(this.selectedEdeducationField[0] == ""){
          this.selectedEdeducationField ="";
        }
        this.selectedIncome = this.result.info.income;
        this.selectedCountryCurrency = this.result.info.currency;
        this.selectedSmoke = this.result.info.smoke;
        this.selectedDrink = this.result.info.drink;
        this.selectedKhap = this.result.info.khap;
       
        if(this.selectedKhap[0] == ""){
          this.selectedKhap ="";
        }
        this.selectedGotra = this.result.info.gotra;
        if(this.selectedGotra[0] == ""){
          this.selectedGotra ="";
        }
        
        this.selectedMGotra = this.result.info.mother_gotra;
       
        if(this.selectedMGotra[0] == ""){
          this.selectedMGotra ="";
        }
        
        this.selectedGMGotra = this.result.info.grand_mother_gotra;
        if(this.selectedGMGotra[0] == ""){
          this.selectedGMGotra = "";
        }
        
        this.othergotra = this.result.info.other_gotra;
        if(this.othergotra[0] == ""){
          this.othergotra = "";
        }
        this.selectedReligion = this.result.info.religion;
        this.selectedPhysical = this.result.info.physical;
        this.selectedSkin = this.result.info.skin_type;
       
      }
      else {
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      // loader.dismiss();
    });
  }

  getAllInfo() {

    let signinObj = {
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.martialStatus = [];
    this.martialStatus1 = [];
    this.educationLevel = [];
    this.educationLevel1 = [];
    this.educationField = [];
    this.educationField1 = [];
    this.smoke = [];
    this.smoke1 = [];
    this.drink = [];
    this.drink1 = [];
    this.income = [];
    this.income1 = [];

    this.serviceProvider.getAllInfo(signinObj).then(data => {
      this.result = data;

      if (this.result.status == 1) {
        loader.dismiss();
        //Education Level
        for (let i = 0; i < this.result.info.MaritalStatus.length; i++) {
          this.martialStatus1.push(this.result.info.MaritalStatus[i])
        }
        this.martialStatus = this.martialStatus1;

        //Education Level
        for (let i = 0; i < this.result.info.EducationLevel.length; i++) {
          this.educationLevel1.push(this.result.info.EducationLevel[i])
        }
        this.educationLevel = this.educationLevel1;

        //Education Field
        for (let i = 0; i < this.result.info.EducationField.length; i++) {
          this.educationField1.push(this.result.info.EducationField[i])
        }
        this.educationField = this.educationField1;

        //Smoke
        for (let i = 0; i < this.result.info.Smoke.length; i++) {
          this.smoke1.push(this.result.info.Smoke[i])
        }
        this.smoke = this.smoke1;

        //Drink
        for (let i = 0; i < this.result.info.Drink.length; i++) {
          this.drink1.push(this.result.info.Drink[i])
        }
        this.drink = this.drink1;

        //Income
        for (let i = 0; i < this.result.info.Income.length; i++) {
          this.income1.push(this.result.info.Income[i])
        }
        this.income = this.income1;
        this.gotraArrayFiind = this.result.info.gotra;
        this.khap = this.result.info.Khap;
        this.religion = this.result.info.Religion;
        this.physical = this.result.info.PhysicalStatus;
        this.skin = this.result.info.SkinType;
        this.incomeArray = this.income;
        // this.income = [];
        // this.incomeArray.forEach(element => {
        //   console.log(element.id )
        //   console.log(this.incomeId )
        //   if (element.name == this.selectedIncome) {
        //     this.income.push(element);
        //     console.log(this.income)
        //   }
        // });
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

  onChangeMarStatus($event) {
    this.martialStatusName = $event;
    if (this.martialStatusName == undefined || this.martialStatusName == null) { }
    else {
      console.log(this.martialStatusName)
    }
  }
  onChangeEducationLevel($event) {
    this.educationLevelName = $event;
    if (this.educationLevelName == undefined || this.educationLevelName == null) { }
    else {
      //  console.log(this.educationLevelName.name)
    }
  }

  onChangeReligion($event) {
    this.religionName = $event;
    if (this.religionName == undefined || this.religionName == null) { }
    else {
    }
  }

  onChangeSkin($event) {
    this.skinName = $event;
    if (this.skinName == undefined || this.skinName == null) { }
    else {
      // console.log(this.skinName.name)
    }
  }
  onChangeEdeducationField($event) {
    this.educationFieldName = $event;
    if (this.educationFieldName == undefined || this.educationFieldName == null) { }
    else {
      // console.log(this.educationFieldName.name)
    }
  }
  onChangeCountryCurrency($event) {
    this.countryCurrencyName = $event;
    if (this.countryCurrencyName == undefined || this.countryCurrencyName == null) { }
    else {
      // console.log(this.countryCurrencyName.sortname)
    }
  }
  onChangeSmoke($event) {
    this.smokeName = $event;
    if (this.smokeName == undefined || this.smokeName == null) { }
    else {
      // console.log(this.smokeName.name)
    }
  }
  onChangeDrink($event) {
    this.drinkName = $event;
    if (this.drinkName == undefined || this.drinkName == null) { }
    else {
      //  console.log(this.drinkName.name)
    }
  }
  onChangeIncome($event) {
    this.incomeName = $event;
    if (this.incomeName == undefined || this.incomeName == null) { }
    else {
      //  console.log(this.incomeName.income)
    }
  }
  editPrefernce() {
    if (this.selectedGotra == '' || this.selectedGotra == null || this.selectedGotra == undefined) {
      this.selectedGotra = '';
    }
     if (this.selectedEducationLevel == '' || this.selectedEducationLevel == null || this.selectedEducationLevel == undefined) {
      this.selectedEducationLevel = '';
    }
     if (this.selectedEdeducationField == '' || this.selectedEdeducationField == null || this.selectedEdeducationField == undefined) {
      this.selectedEdeducationField = ''
    }
     if (this.selectedGotra == '' || this.selectedGotra == null || this.selectedGotra == undefined) {
      this.selectedGotra = '';
    }
     if (this.selectedMGotra == '' || this.selectedMGotra == null || this.selectedMGotra == undefined) {
      this.selectedMGotra = '';
    }
     if (this.selectedGMGotra == '' || this.selectedGMGotra == null || this.selectedGMGotra == undefined) {
      this.selectedGMGotra = '';
    }
     if (this.othergotra == '' || this.othergotra == null || this.othergotra == undefined) {
      this.othergotra = '';
    }
     if (this.selectedKhap == '' || this.selectedKhap == null || this.selectedKhap == undefined) {
      this.selectedKhap = '';
    }
   // else {
      this.ageMin2 = this.ageSlider.lower;
      this.ageMax2 = this.ageSlider.upper;
      this.heightMin2 = this.heightSlider.lower;
      this.heightMax2 = this.heightSlider.upper;
      this.disableButton = true;

      let editPrefernceObj = {
        "Age": this.ageMin2 + '-' + this.ageMax2,
        "Height": this.heightMin2 + '-' + this.heightMax2,
        "Marital": this.selectedMartialStatus,
        "Country": this.countryId,
        "State": this.stateId,
        "City": this.cityId,
        "Education": this.selectedEducationLevel,
        "Working": this.selectedEdeducationField,
        "Smoke": this.selectedSmoke,
        "Drink": this.selectedDrink,
        "Income": this.selectedIncome,
        "Currency": this.selectedCountryCurrency,
        "RegisterId": localStorage.getItem("register_id"),
        "ValidData": localStorage.getItem("ValidDataJat"),
        "Khap": this.selectedKhap,
        "Gotra": this.selectedGotra,
        "MotherGotra": this.selectedMGotra,
        "GrandMotherGotra": this.selectedGMGotra,
        "OtherGotra": this.othergotra,
        "Religion": this.selectedReligion,
        "Physical": this.selectedPhysical,
        "SkinType": this.selectedSkin,
        "Type": "1",
        "Service": "Expected Choice"
      }
      let loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: "Please wait...",
      });
      loader.present();
      this.serviceProvider.updatePrefernce(editPrefernceObj).then(data => {
        this.disableButton = false;
        this.result = data;

        if (this.result.status == 1) {
          loader.dismiss();
          this.presentToast(this.result.msg, 'bgGreen');
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
    //}
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
