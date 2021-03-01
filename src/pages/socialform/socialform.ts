import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, LoadingController } from 'ionic-angular';
import $ from "jquery";
import { ProfilePage } from '../profile/profile';
import { ServiceProvider } from '../../providers/service/service';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-socialform',
  templateUrl: 'socialform.html',
})
export class SocialformPage {
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
  // password: any;
  fullname: any;
  lastname: any;
  dob: any;
  userName: any;
  // confirmpassword: any; 
  endMax: any;

  countryList1: any[] = [];
  countryList: {}[];
  selectedCountryList: any;
  countryListName: any;
  countryId: any;

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

  marital1: any[] = [];
  marital: {}[];
  selectedMarital: any;
  maritalName: any;

  physical1: any[] = [];
  physical: {}[];
  selectedPhysical: any;
  physicalName: any;

  skin1: any[] = [];
  skin: {}[];
  selectedSkin: any;
  skinName: any;

  body1: any[] = [];
  body: {}[];
  selectedBody: any;
  bodyName: any;

  smoke1: any[] = [];
  smoke: {}[];
  selectedSmoke: any;
  smokeName: any;

  drink1: any[] = [];
  drink: {}[];
  selectedDrink: any;
  drinkName: any;


  height: {}[];
  selectedHeight: any;
  heightName: any;
  weight: any;
  showBox: any;
  physicalBox: any;
  newArr: any[] = [];

  educationLevel1: any[] = [];
  educationLevel: {}[];
  selectedEducationLevel: any;
  educationLevelName: any;

  educationField1: any[] = [];
  educationField: {}[];
  selectedEdeducationField: any;
  educationFieldName: any;

  designation1: any[] = [];
  designation: {}[];
  selectedDesignation: any;
  designationName: any;

  income1: any[] = [];
  income: {}[];
  selectedIncome: any;
  incomeName: any;

  khap1: any[] = [];
  khap: {}[];
  selectedKhap: any;
  khapName: any;

  gotra1: any[] = [];
  gotra: {}[];
  selectedGotra: any;
  gotraName: any;

  mGotra1: any[] = [];
  mGotra: {}[];
  selectedMGotra: any;
  mGotraName: any;

  gMGotra1: any[] = [];
  gMGotra: {}[];
  selectedGMGotra: any;
  gMGotraName: any;

  religion1: any[] = [];
  religion: {}[];
  selectedReligion: any;
  religionName: any;

  workwith: any;
  myself: any;
  disableButton: any;
  platform: any;
  step1: any;
  step2: any;
  step3: any;
  no1: any;
  src1: any
  no2: any;
  src2: any
  no3: any;
  src3: any;

  khapBox: any;
  KhapBoxDetail: any;
  gotraBox: any;
  GotraBoxDetail: any;
  motherGotraBox: any;
  MotherGotraBoxDetails: any;
  gMotherGotraBox: any;
  gMotherGotraBoxDetails: any;
  religionBox: any;
  religionBoxDetails: any;
  educationLevelBox: any;
  educationLevelBoxDetails: any;
  educationFieldBox: any;
  educationFieldBoxDetails: any;
  designationBox: any;
  designationBoxDetails: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public serviceProvider: ServiceProvider,
    platform: Platform, ) {
    $('.tabbar ').css('display', 'none');
    this.endMax = (new Date()).getFullYear() - 18;
    this.step1 = true;
    this.no1 = 0;
    this.src1 = '../../assets/imgs/ic_arrowup.png'
    this.no2 = 1;
    this.src2 = '../../assets/imgs/ic_arrowdown.png'
    this.step2 = false;
    this.no3 = 1;
    this.src3 = '../../assets/imgs/ic_arrowdown.png'
    this.step3 = false;

    platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialPage');
    this.gender = [
      {
        id: 1, name: 'Male',
      },
      {
        id: 2, name: 'Female'
      }
    ];
    this.height = [
      { id: 60, name: '4.0' }, { id: 1, name: '4.1' }, { id: 2, name: '4.2' }, { id: 3, name: '4.3' }, { id: 4, name: '4.4' }, { id: 5, name: '4.5' }, { id: 6, name: '4.6' }, { id: 7, name: '4.7' }, { id: 8, name: '4.8' }, { id: 9, name: '4.9' },
      { id: 10, name: '4.10' }, { id: 11, name: '4.11' }, { id: 12, name: '4.12' }, { id: 61, name: '5.0' }, { id: 13, name: '5.1' }, { id: 14, name: '5.2' }, { id: 15, name: '5.3' }, { id: 16, name: '5.4' }, { id: 17, name: '5.5' }, { id: 18, name: '5.6' },
      { id: 19, name: '5.7' }, { id: 20, name: '5.8' }, { id: 21, name: '5.9' }, { id: 22, name: '5.10' }, { id: 23, name: '5.11' }, { id: 24, name: '5.12' }, { id: 62, name: '6.0' }, { id: 25, name: '6.1' }, { id: 26, name: '6.2' }, { id: 27, name: '6.3' },
      { id: 27, name: '6.4' }, { id: 28, name: '6.5' }, { id: 29, name: '6.6' }, { id: 30, name: '6.7' }, { id: 31, name: '6.8' }, { id: 32, name: '6.9' }, { id: 33, name: '6.10' }, { id: 34, name: '6.11' }, { id: 35, name: '6.12' },
      { id: 63, name: '7.0' }, { id: 36, name: '7.1' }, { id: 37, name: '7.2' }, { id: 38, name: '7.3' }, { id: 39, name: '7.4' }, { id: 40, name: '7.5' }, { id: 41, name: '7.6' }, { id: 42, name: '7.7' }, { id: 43, name: '7.8' }, { id: 44, name: '7.9' },
      { id: 45, name: '7.10' }, { id: 46, name: '7.11' }, { id: 47, name: '7.12' }, { id: 64, name: '8.0' }, { id: 48, name: '8.1' }, { id: 49, name: '8.2' }, { id: 50, name: '8.3' }, { id: 51, name: '8.4' }, { id: 52, name: '8.5' }, { id: 53, name: '8.6' },
      { id: 54, name: '8.7' }, { id: 55, name: '8.8' }, { id: 56, name: '8.9' }, { id: 57, name: '8.10' }, { id: 58, name: '8.11' }, { id: 59, name: '8.12' }
    ];

    this.getAllInfo();
    this.getCountryList();
    this.emailAddress = localStorage.getItem("socialEmail");
    this.fullname = localStorage.getItem("socialFirstName");
    this.lastname = localStorage.getItem("socialLastName");
    this.mocode = "91";
    this.showBox = false;
  }
  funStep1() {
    if (this.no1 == 1) {
      this.step1 = true;
      this.no1 = 0;
      this.src1 = '../../assets/imgs/ic_arrowup.png'
    }
    else {
      this.step1 = false;
      this.no1 = 1;
      this.src1 = '../../assets/imgs/ic_arrowdown.png'
    }
  }

  funStep2() {
    if (this.no2 == 1) {
      this.step2 = true;
      this.no2 = 0;
      this.src2 = '../../assets/imgs/ic_arrowup.png'
    }
    else {
      this.step2 = false;
      this.no2 = 1;
      this.src2 = '../../assets/imgs/ic_arrowdown.png'
    }
  }

  funStep3() {
    if (this.no3 == 1) {
      this.step3 = true;
      this.no3 = 0;
      this.src3 = '../../assets/imgs/ic_arrowup.png'
    }
    else {
      this.step3 = false;
      this.no3 = 1;
      this.src3 = '../../assets/imgs/ic_arrowdown.png'
    }
  }
  keyPress(event: any) {
    var key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8 || (key >= 97 && key <= 122));
  }


  getCountryList() {
    let signinObj = {
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.countryList = [];
    this.countryList1 = [];
    //  this.selectedCountryList='';
    this.serviceProvider.getCountryList(signinObj).then(data => {
      this.result = data;

      if (this.result.status == 1) {
        loader.dismiss();
        for (let i = 0; i < this.result.info.length; i++) {
          this.countryList1.push(this.result.info[i])
        }
        this.countryList = this.countryList1;
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

  onChangeCountryList($event) {
    this.countryListName = $event;
    if (this.countryListName == undefined || this.countryListName == null) { }
    else {
      // console.log(this.countryListName.id)
      this.countryId = this.countryListName.id;
      this.selectedStateList='';
      this.selectedCityList='';
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
    //loader.present();
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
      this.selectedCityList='';
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
    //loader.present();
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
  getAllInfo() {

    let signinObj = {
    }
    // let loader = this.loadingCtrl.create({
    //   spinner: 'bubbles',
    //   content: "Please wait...",
    // });
    // loader.present();
    this.profileFor = [];
    this.profileFor1 = [];
    this.marital = [];
    this.marital1 = [];
    this.skin = [];
    this.skin1 = [];
    this.physical = [];
    this.physical1 = [];
    this.body = [];
    this.body1 = [];
    this.smoke = [];
    this.smoke1 = [];
    this.drink = [];
    this.drink1 = [];

    this.educationLevel = [];
    this.educationLevel1 = [];
    this.educationField = [];
    this.educationField1 = [];
    this.designation = [];
    this.designation1 = [];
    this.income = [];
    this.income1 = [];
    this.khap = [];
    this.khap1 = [];
    this.religion = [];
    this.religion1 = [];
    this.gotra = [];
    this.gotra1 = [];
    this.mGotra = [];
    this.mGotra1 = [];
    this.gMGotra = [];
    this.gMGotra1 = [];

    this.serviceProvider.getAllInfo(signinObj).then(data => {
      this.result = data;

      //Profile For
      if (this.result.status == 1) {
        // loader.dismiss();
        for (let i = 0; i < this.result.info.ProfileFor.length; i++) {
          this.profileFor1.push(this.result.info.ProfileFor[i])
        }
        this.profileFor = this.profileFor1;
        //MaritalStatus
        for (let i = 0; i < this.result.info.MaritalStatus.length; i++) {
          this.marital1.push(this.result.info.MaritalStatus[i])
        }
        this.marital = this.marital1;

        //SkinType
        for (let i = 0; i < this.result.info.SkinType.length; i++) {
          this.skin1.push(this.result.info.SkinType[i])
        }
        this.skin = this.skin1;

        //PhysicalStatus
        for (let i = 0; i < this.result.info.PhysicalStatus.length; i++) {
          this.physical1.push(this.result.info.PhysicalStatus[i])
        }
        this.physical = this.physical1;

        //Body Type
        for (let i = 0; i < this.result.info.BodyType.length; i++) {
          this.body1.push(this.result.info.BodyType[i])
        }
        this.body = this.body1;

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

        //Education Field
        for (let i = 0; i < this.result.info.Designation.length; i++) {
          this.designation1.push(this.result.info.Designation[i])
        }
        this.designation = this.designation1;

        //Income
        for (let i = 0; i < this.result.info.Income.length; i++) {
          this.income1.push(this.result.info.Income[i])
        }
        this.income = this.income1;

        //Khap
        for (let i = 0; i < this.result.info.Khap.length; i++) {
          this.khap1.push(this.result.info.Khap[i])
        }
        this.khap = this.khap1;

        //Gotra
        for (let i = 0; i < this.result.info.Gotra.length; i++) {
          this.gotra1.push(this.result.info.Gotra[i])
        }
        this.gotra = this.gotra1;

        //Mothe Gotra
        for (let i = 0; i < this.result.info.Gotra.length; i++) {
          this.mGotra1.push(this.result.info.Gotra[i])
        }
        this.mGotra = this.mGotra1;

        //Grand Mothe Gotra
        for (let i = 0; i < this.result.info.Gotra.length; i++) {
          this.gMGotra1.push(this.result.info.Gotra[i])
        }
        this.gMGotra = this.gMGotra1;

        //Religion
        for (let i = 0; i < this.result.info.Religion.length; i++) {
          this.religion1.push(this.result.info.Religion[i])
        }
        this.religion = this.religion1;
      }
      else {
        //loader.dismiss();
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      // loader.dismiss();
    });
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

  onChangeMarital($event) {
    this.maritalName = $event;
    if (this.maritalName == undefined || this.maritalName == null) { }
    else {
      // console.log(this.maritalName.name)
    }
  }

  onChangeSkin($event) {
    this.skinName = $event;
    if (this.skinName == undefined || this.skinName == null) { }
    else {
      // console.log(this.skinName.name)
    }
  }

  onChangePhysical($event) {
    this.physicalName = $event;
    if (this.physicalName == undefined || this.physicalName == null) { }
    else {
      // console.log(this.physicalName.name);
      if (this.physicalName.name == 'OTHER') {
        this.showBox = true;
      }
      else {
        this.showBox = false;
        this.physicalBox = '';
      }
    }
  }

  onChangeBody($event) {
    this.bodyName = $event;
    if (this.bodyName == undefined || this.bodyName == null) { }
    else {
      // console.log(this.bodyName.name)
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

  onChangeHeight($event) {
    this.heightName = $event;
    if (this.heightName == undefined || this.heightName == null) { }
    else {
      // console.log(this.heightName.name)
    }
  }
  onChangePBox($event) {
    if (this.physicalBox == undefined || this.physicalBox == null) { }
    else {
    }
  }
  onChangeWeight($event) {
    if (this.weight == undefined || this.weight == null) { }
    else {
    }
  }
  onChangeEducationLevel($event) {
    this.educationLevelName = $event;
    if (this.educationLevelName == undefined || this.educationLevelName == null) { }
    else {
      //  console.log(this.educationLevelName.name)
      if (this.educationLevelName.name == 'OTHER') {
        this.educationLevelBox = true;
      }
      else {
        this.educationLevelBox = false;
        this.educationLevelBoxDetails = '';
      }
    }
  }

  onChangeEdeducationField($event) {
    this.educationFieldName = $event;
    if (this.educationFieldName == undefined || this.educationFieldName == null) { }
    else {
      // console.log(this.educationFieldName.name)
      if (this.educationFieldName.name == 'OTHER') {
        this.educationFieldBox = true;
      }
      else {
        this.educationFieldBox = false;
        this.educationFieldBoxDetails = '';
      }
    }
  }
  onChangeDesignation($event) {
    this.designationName = $event;
    if (this.designationName == undefined || this.designationName == null) { }
    else {
      //  console.log(this.designationName.name)
      if (this.designationName.name == 'OTHER') {
        this.designationBox = true;
      }
      else {
        this.designationBox = false;
        this.designationBoxDetails = '';
      }
    }
  }
  onChangeIncome($event) {
    this.incomeName = $event;
    if (this.incomeName == undefined || this.incomeName == null) { }
    else {
      //  console.log(this.incomeName.income)
    }
  }
  onChangeKhap($event) {
    this.khapName = $event;
    if (this.khapName == undefined || this.khapName == null) { }
    else {
      //  console.log(this.khapName.name)
      if (this.khapName.name == 'OTHER') {
        this.khapBox = true;
      }
      else {
        this.khapBox = false;
        this.KhapBoxDetail = '';
      }
    }
  }
  onChangeGotra($event) {
    this.gotraName = $event;
    if (this.gotraName == undefined || this.gotraName == null) { }
    else {
      //  console.log(this.gotraName.name)
      if (this.gotraName.name == 'OTHER') {
        this.gotraBox = true;
      }
      else {
        this.gotraBox = false;
        this.GotraBoxDetail = '';
      }
    }
  }
  onChangeMGotra($event) {
    this.mGotraName = $event;
    if (this.mGotraName == undefined || this.mGotraName == null) { }
    else {
      //  console.log(this.mGotraName.name) 
      if (this.mGotraName.name == 'OTHER') {
        this.motherGotraBox = true;
      }
      else {
        this.motherGotraBox = false;
        this.MotherGotraBoxDetails = '';
      }
    }
  }
  onChangeGMGotra($event) {
    this.gMGotraName = $event;
    if (this.gMGotraName == undefined || this.gMGotraName == null) { }
    else {
      //  console.log(this.gMGotraName.name)
      if (this.gMGotraName.name == 'OTHER') {
        this.gMotherGotraBox = true;
      }
      else {
        this.gMotherGotraBox = false;
        this.gMotherGotraBoxDetails = '';
      }
    }
  }

  onChangeReligion($event) {
    this.religionName = $event;
    if (this.religionName == undefined || this.religionName == null) { }
    else {
      //  console.log(this.gMGotraName.name)
      if (this.religionName.name == 'OTHER') {
        this.religionBox = true;
      }
      else {
        this.religionBox = false;
        this.religionBoxDetails = '';
      }
    }
  }
  onChangeWorkWith($event) {
    if (this.workwith == undefined || this.workwith == null) { }
    else {
    }
  }
  onChangeMyself($event) {
    if (this.myself == undefined || this.myself == null) { }
    else {
    }
  }
  onChangeKhapBox($event) {
    if (this.KhapBoxDetail == undefined || this.KhapBoxDetail == null) { }
    else {
    }
  }
  onChangeGotraBox($event) {
    if (this.GotraBoxDetail == undefined || this.GotraBoxDetail == null) { }
    else {
    }
  }
  onChangeMotherGotraBox($event) {
    if (this.MotherGotraBoxDetails == undefined || this.MotherGotraBoxDetails == null) { }
    else {
    }
  }
  onChangegMotherGotraBox($event) {
    if (this.gMotherGotraBoxDetails == undefined || this.gMotherGotraBoxDetails == null) { }
    else {
    }
  }
  onChangeReligionBox($event) {
    if (this.religionBoxDetails == undefined || this.religionBoxDetails == null) { }
    else {
    }
  }
  onChangeEducationLevelBox($event) {
    if (this.educationLevelBoxDetails == undefined || this.educationLevelBoxDetails == null) { }
    else {
    }
  }
  onChangeEducationFieldBox($event) {
    if (this.educationFieldBoxDetails == undefined || this.educationFieldBoxDetails == null) { }
    else {
    }
  }
  onChangeDesignationBox($event) {
    if (this.designationBoxDetails == undefined || this.designationBoxDetails == null) { }
    else {
    }
  }

  addProfile() {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(this.emailAddress);

    // if (this.accountName == '' || this.accountName == null || this.accountName == undefined || this.accountName.trim() == "") {
    //   this.presentToast('Please Enter Account Name !','bgRed');
    // }
    if (this.selectedProfileFor == '' || this.selectedProfileFor == null || this.selectedProfileFor == undefined) {
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
    else if (this.selectedCountryList == '' || this.selectedCountryList == null || this.selectedCountryList == undefined) {
      this.presentToast('Please Select Country !', 'bgRed');
    }
    else if (this.selectedStateList == '' || this.selectedStateList == null || this.selectedStateList == undefined) {
      this.presentToast('Please Select State !', 'bgRed');
    }
    else if (this.selectedCityList == '' || this.selectedCityList == null || this.selectedCityList == undefined) {
      this.presentToast('Please Select City !', 'bgRed');
    }
    else if (this.selectedMarital == '' || this.selectedMarital == null || this.selectedMarital == undefined) {
      this.presentToast('Please Select Marital Status !', 'bgRed');
    }
    else if (this.selectedPhysical == '' || this.selectedPhysical == null || this.selectedPhysical == undefined) {
      this.presentToast('Please Select Physical Status !', 'bgRed');
    }
    else if (this.showBox == true && (this.physicalBox == '' || this.physicalBox == null || this.physicalBox == undefined)) {
       this.presentToast('Please Enter Physical Box !', 'bgRed');
    }
    else if (this.selectedHeight == '' || this.selectedHeight == null || this.selectedHeight == undefined) {
      this.presentToast('Please Select Height !', 'bgRed');
    }
    else if (this.weight == '' || this.weight == null || this.weight == undefined || this.weight.trim() == "") {
      this.presentToast('Please Enter Weight !', 'bgRed');
    }
    else if (this.selectedSkin == '' || this.selectedSkin == null || this.selectedSkin == undefined) {
      this.presentToast('Please Select Skin Color !', 'bgRed');
    }
    else if (this.selectedBody == '' || this.selectedBody == null || this.selectedBody == undefined) {
      this.presentToast('Please Select Blood Type !', 'bgRed');
    }
    else if (this.selectedSmoke == '' || this.selectedSmoke == null || this.selectedSmoke == undefined) {
      this.presentToast('Please Select Smoke !', 'bgRed');
    }
    else if (this.selectedDrink == '' || this.selectedDrink == null || this.selectedDrink == undefined) {
      this.presentToast('Please Select Drink !', 'bgRed');
    }
    else if (this.selectedKhap == '' || this.selectedKhap == null || this.selectedKhap == undefined) {
      this.presentToast('Please Select Khap !', 'bgRed');
    }
    else if (this.khapBox == true && (this.KhapBoxDetail == '' || this.KhapBoxDetail == null || this.KhapBoxDetail == undefined)) {
      this.presentToast('Please Enter Khap Other Details !', 'bgRed');
    }
    else if (this.selectedGotra == '' || this.selectedGotra == null || this.selectedGotra == undefined) {
      this.presentToast('Please Select Gotra !', 'bgRed');
    }
    else if (this.gotraBox == true && (this.GotraBoxDetail == '' || this.GotraBoxDetail == null || this.GotraBoxDetail == undefined)) {
      this.presentToast('Please Enter Gotra Other Details !', 'bgRed');
    }
    else if (this.selectedMGotra == '' || this.selectedMGotra == null || this.selectedMGotra == undefined) {
      this.presentToast('Please Select Mother Gotra !', 'bgRed');
    }
    else if (this.motherGotraBox == true && (this.MotherGotraBoxDetails == '' || this.MotherGotraBoxDetails == null || this.MotherGotraBoxDetails == undefined)) {
      this.presentToast('Please Enter  Mother Gotra Other Details !', 'bgRed');
    }
    else if (this.selectedGMGotra == '' || this.selectedGMGotra == null || this.selectedGMGotra == undefined) {
      this.presentToast('Please Select Grand Mother Gotra !', 'bgRed');
    }
    else if (this.gMotherGotraBox == true && (this.gMotherGotraBoxDetails == '' || this.gMotherGotraBoxDetails == null || this.gMotherGotraBoxDetails == undefined)) {
      this.presentToast('Please Enter  Grand Mother Gotra Other Details !', 'bgRed');
    }
    else if (this.selectedReligion == '' || this.selectedReligion == null || this.selectedReligion == undefined) {
      this.presentToast('Please Select Religion !', 'bgRed');
    }
    else if (this.religionBox == true && (this.religionBoxDetails == '' || this.religionBoxDetails == null || this.religionBoxDetails == undefined)) {
      this.presentToast('Please Enter Religion Other Details !', 'bgRed');
    }
    else if (this.selectedEducationLevel == '' || this.selectedEducationLevel == null || this.selectedEducationLevel == undefined) {
      this.presentToast('Please Select Education Level !', 'bgRed');
    }
    else if (this.educationLevelBox == true && (this.educationLevelBoxDetails == '' || this.educationLevelBoxDetails == null || this.educationLevelBoxDetails == undefined)) {
      this.presentToast('Please Enter Education Level Other Details !', 'bgRed');
    }
    else if (this.selectedEdeducationField == '' || this.selectedEdeducationField == null || this.selectedEdeducationField == undefined) {
      this.presentToast('Please Select Education Field !', 'bgRed');
    }
    else if (this.educationFieldBox == true && (this.educationFieldBoxDetails == '' || this.educationFieldBoxDetails == null || this.educationFieldBoxDetails == undefined)) {
      this.presentToast('Please Enter Education Field Other Details !', 'bgRed');
    }
    else if (this.workwith == '' || this.workwith == null || this.workwith == undefined || this.workwith.trim() == "") {
      this.presentToast('Please Enter Working Organization !', 'bgRed');
    }
    else if (this.selectedDesignation == '' || this.selectedDesignation == null || this.selectedDesignation == undefined) {
      this.presentToast('Please Select Designation !', 'bgRed');
    }
    else if (this.designationBox == true && (this.designationBoxDetails == '' || this.designationBoxDetails == null || this.designationBoxDetails == undefined)) {
      this.presentToast('Please Enter Designation Other Details !', 'bgRed');
    }
    else if (this.selectedIncome == '' || this.selectedIncome == null || this.selectedIncome == undefined) {
      this.presentToast('Please Select Annual Income !', 'bgRed');
    }
    else if (this.myself == '' || this.myself == null || this.myself == undefined || this.myself.trim() == "") {
      this.presentToast('Please Enter About Myself !', 'bgRed');
    }
    else {
      this.addAllProfile()
    }
  }

  addAllProfile() {
    this.disableButton = true;
    let socialUserObj = {
      "AccountName": this.accountName,
      "ProfileFor": this.selectedProfileFor,
      "MobileCode": this.mocode,
      "MobileNo": this.mobile,
      "UserName": this.userName,
      "EmailId": this.emailAddress,
      "FirstName": this.fullname,
      "LastName": this.lastname,
      "Gender": this.selectedGender,
      "DOB": this.dob,
      "Country": this.countryId,
      "State": this.stateId,
      "City": this.cityId,
      "Marital": this.selectedMarital,
      "Physical": this.selectedPhysical,
      "PhysicalBox": this.physicalBox,
      "Height": this.selectedHeight,
      "Weight": this.weight,
      "SkinType": this.selectedSkin,
      "BodyType": this.selectedBody,
      "Eat": '',
      "Smoke": this.selectedSmoke,
      "Drink": this.selectedDrink,
      "Khap": this.selectedKhap,
      "Gotra": this.selectedGotra,
      "MotherGotra": this.selectedMGotra,
      "GrandMotherGotra": this.selectedGMGotra,
      "Religion": this.selectedReligion,
      "EducationLevel": this.selectedEducationLevel,
      "EducationField": this.selectedEdeducationField,
      "Organisation": this.workwith,
      "OrganisationType": '',
      "Designation": this.selectedDesignation,
      "Income": this.selectedIncome,
      "About": this.myself,
      "KhapText": this.KhapBoxDetail,
      "GotraText": this.GotraBoxDetail,
      "MotherGotraText": this.MotherGotraBoxDetails,
      "GrandMotherGotraText": this.gMotherGotraBoxDetails,
      "ReligionText": this.religionBoxDetails,
      "EducationLevelText": this.educationLevelBoxDetails,
      "EducationFieldText": this.educationFieldBoxDetails,
      "DesignationText": this.designationBoxDetails,
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1",
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.UpdateSocialDeatils(socialUserObj).then(data => {
      this.result = data;
      this.disableButton = false;
      if (this.result.status == 1) {
        loader.dismiss();
        this.presentToast(this.result.msg, 'bgGreen');
        localStorage.setItem("Userregister_id", this.result.info.register_id);
        localStorage.setItem("otpMobile", this.result.info.mobile_no);
        this.navCtrl.push("OtppagePage");
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
