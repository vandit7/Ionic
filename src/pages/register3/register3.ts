import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Alert, Platform } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { LoginPage } from '../login/login';
import { Register2Page } from '../register2/register2';
import * as $ from 'jquery'

@IonicPage()
@Component({
  selector: 'page-register3',
  templateUrl: 'register3.html',
})
export class Register3Page {
  selectedCity: any;
  result: any;

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
  gMGotra2: any;
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

  filterItems: any[];
  selectedItems: any[] = [];
  flag: any;
  input: any;
  flagMgotra: any;
  inputmGotra: any;
  flagGMgotra: any;
  inputGmGotra: any;
  gotraList: any[];
  gotraArrayFiind: any[];

  motherGotraList:any;
  mothergotraName:any;
  motherGotraArrayFind:any[];

  gmotherGotraList:any;
  gmothergotraName:any;
  gmotherGotraArrayFind:any[];
  othergotra1:any;

  othergotraList: any;
  othergotraName: any;
  othergotraArrayFind: any[];
  othergotra: any;

  constructor(public navCtrl: NavController,
    public serviceProvider: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    platform: Platform, ) {

    platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot(Register2Page);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Register3Page');
    this.disableButton = false;
    this.getAllInfo();

    if (localStorage.getItem("Jstep3") == '1') {

      if (localStorage.getItem("JKhap") != '' || localStorage.getItem("JKhap") != null || localStorage.getItem("JKhap") != undefined) {
        this.selectedKhap = localStorage.getItem("JKhap")

        if (localStorage.getItem("JKhap") == 'OTHER') {
          this.khapBox = true;
          this.KhapBoxDetail = localStorage.getItem("JKhapBoxDetails");
        } else {
          this.khapBox = false;
          this.KhapBoxDetail = localStorage.getItem("JKhapBoxDetails");
        }

      }
      if (localStorage.getItem("JGotra") != '' || localStorage.getItem("JGotra") != null || localStorage.getItem("JGotra") != undefined) {
        this.selectedGotra = localStorage.getItem("JGotra");
        if (localStorage.getItem("JGotra") == 'OTHER') {
          this.gotraBox = true;
          this.GotraBoxDetail = localStorage.getItem("JGotraBoxDetail");
        } else {
          this.gotraBox = false;
          this.GotraBoxDetail = localStorage.getItem("JGotraBoxDetail");
        }

      }
      if (localStorage.getItem("JMotherGotra") != '' || localStorage.getItem("JMotherGotra") != null || localStorage.getItem("JMotherGotra") != undefined) {
        this.selectedMGotra = localStorage.getItem("JMotherGotra");
        if (localStorage.getItem("JMotherGotra") == 'OTHER') {
          this.motherGotraBox = true;
          this.MotherGotraBoxDetails = localStorage.getItem("JMotherGotraBoxDetails");
        } else {
          this.motherGotraBox = false;
          this.MotherGotraBoxDetails = localStorage.getItem("JMotherGotraBoxDetails");
        }
      }
      if (localStorage.getItem("JGMotherGotra") != '' || localStorage.getItem("JGMotherGotra") != null || localStorage.getItem("JGMotherGotra") != undefined) {
        this.selectedGMGotra = localStorage.getItem("JGMotherGotra");
        if (localStorage.getItem("JGMotherGotra") == 'OTHER') {
          this.gMotherGotraBox = true;
          this.gMotherGotraBoxDetails = localStorage.getItem("JGMotherGotraBoxDetails");
        } else {
          this.motherGotraBox = false;
          this.gMotherGotraBoxDetails = localStorage.getItem("JGMotherGotraBoxDetails");
        }
      }
      if (localStorage.getItem("Jreligion") != '' || localStorage.getItem("Jreligion") != null || localStorage.getItem("Jreligion") != undefined) {
        this.selectedReligion = localStorage.getItem("Jreligion");
        if (localStorage.getItem("Jreligion") == 'OTHER') {
          this.religionBox = true;
          this.religionBoxDetails = localStorage.getItem("JreligionBoxDetails");
        } else {
          this.religionBox = false;
          this.religionBoxDetails = localStorage.getItem("JreligionBoxDetails");
        }
      }
      if (localStorage.getItem("JEducationLevel") != '' || localStorage.getItem("JEducationLevel") != null || localStorage.getItem("JEducationLevel") != undefined) {
        this.selectedEducationLevel = localStorage.getItem("JEducationLevel");
        if (localStorage.getItem("JEducationLevel") == 'OTHER') {
          this.educationLevelBox = true;
          this.educationLevelBoxDetails = localStorage.getItem("JEducationLevelBoxDetails");
        } else {
          this.educationLevelBox = false;
          this.educationLevelBoxDetails = localStorage.getItem("JEducationLevelBoxDetails");
        }
      }
      if (localStorage.getItem("JEdeducationField") != '' || localStorage.getItem("JEdeducationField") != null || localStorage.getItem("JEdeducationField") != undefined) {
        this.selectedEdeducationField = localStorage.getItem("JEdeducationField");
        if (localStorage.getItem("JEdeducationField") == 'OTHER') {
          this.educationFieldBox = true;
          this.educationFieldBoxDetails = localStorage.getItem("JEducationFieldBoxDetails");
        } else {
          this.educationFieldBox = false;
          this.educationFieldBoxDetails = localStorage.getItem("JEducationFieldBoxDetails");
        }
      }
      if (localStorage.getItem("Jworkwith") != '' || localStorage.getItem("Jworkwith") != null || localStorage.getItem("Jworkwith") != undefined) {
        this.workwith = localStorage.getItem("Jworkwith");
      }
      if (this.selectedDesignation != '' || this.selectedDesignation != null || this.selectedDesignation != undefined) {
        this.selectedDesignation = localStorage.getItem("JDesignation");
        if (localStorage.getItem("JDesignation") == 'OTHER') {
          this.designationBox = true;
          this.designationBoxDetails = localStorage.getItem("JDesignationBoxDetails");
        } else {
          this.designationBox = false;
          this.designationBoxDetails = localStorage.getItem("JDesignationBoxDetails");
        }
      }
      if (this.selectedIncome != '' || this.selectedIncome != null || this.selectedIncome != undefined) {
        this.selectedIncome = localStorage.getItem("JIncome");
      }
      if (localStorage.getItem("Jmyself") != '' || localStorage.getItem("Jmyself") != null || localStorage.getItem("Jmyself") != undefined) {
        this.myself = localStorage.getItem("Jmyself");
      }

    }
  }

  onChangeGotra1($event, type) {
    this.gotraName = $event;
    //let gotraName12 = this.gotraName.name;
    let signinObj = {
      "Gotra": this.gotraName
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.getAllInfo(signinObj).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        loader.dismiss();
        this.gMGotra2 = this.result.info.gotra;
        if (type == 'gotra') {
          this.flag = 1;
        } if (type == 'mGotra') {
          this.flagMgotra = 1;
        }
        if (type == 'gmGotra') {
          this.flagGMgotra = 1;
        }


        // this.gotra = this.result.info.gotra;
        //  for (let i = 0; i < this.result.info.gotra.length; i++) {
        //   this.gMGotra1.push(this.result.info.gotra[i])
        // }
        // this.gMGotra = this.gMGotra1;
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

  onItemClick(name, type) {
    if (type == 'gotra') {
      this.flag = 0;
      this.input = name;
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JGotra", name);
      this.selectedGotra = name;
      if (name == 'OTHER') {
        this.gotraBox = true;
      }
      else {
        this.gotraBox = false;
        this.GotraBoxDetail = '';
        localStorage.setItem("JGotraBoxDetail", '');
      }
      localStorage.setItem("gotraName", name);
    } if (type == 'mGotra') {
      this.flagMgotra = 0;
      this.inputmGotra = name;
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JMotherGotra", name);
      this.selectedMGotra = name;
      if (name == 'OTHER') {
        this.motherGotraBox = true;
      }
      else {
        this.motherGotraBox = false;
        this.MotherGotraBoxDetails = '';
        localStorage.setItem("JMotherGotraBoxDetails", '');
      }
      localStorage.setItem("JMotherGotraBoxDetails", name);
    }
    if (type == 'gmGotra') {
      this.flagGMgotra = 0;
      this.inputGmGotra = name;
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JGMotherGotra", name);
      this.selectedGMGotra = name;
      if (this.gMGotraName == undefined || this.gMGotraName == null) { }
      else {
        //  console.log(this.gMGotraName.name)
        localStorage.setItem("Jstep3", '1');
        localStorage.setItem("JGMotherGotra", this.gMGotraName.name);
        if (this.gMGotraName.name == 'OTHER') {
          this.gMotherGotraBox = true;
        }
        else {
          this.gMotherGotraBox = false;
          this.gMotherGotraBoxDetails = '';
          localStorage.setItem("JGMotherGotraBoxDetails", '');
        }
      }
    }
  }
  onClear(event, type) {
    if (type == 'gotra') {
      this.flag = 0;
    } if (type == 'mGotra') {
      this.flag = 0;
    }
    if (type == 'gmGotra') {
      this.flag = 0;
    }
  }

  getAllInfo() {
    this.flag == 0;
    let signinObj = {
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
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

      if (this.result.status == 1) {
        loader.dismiss();
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

        //Designation
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
        // for (let i = 0; i < this.result.info.Gotra.length; i++) {
        //   this.gotra1.push(this.result.info.Gotra[i])
        // }

        this.gotra = this.result.info.gotra;
        this.gotraList = [];
        //Mothe Gotra
        // for (let i = 0; i < this.result.info.gotra.length; i++) {
        //   this.mGotra1.push(this.result.info.gotra[i])
        // }
        this.mGotra = this.result.info.gotra;

        //Grand Mothe Gotra
        // for (let i = 0; i < this.result.info.gotra.length; i++) {
        //   this.gMGotra1.push(this.result.info.gotra[i])
        // }
        this.gMGotra = this.result.info.gotra;

        //Religion
        for (let i = 0; i < this.result.info.Religion.length; i++) {
          this.religion1.push(this.result.info.Religion[i])
        }
        this.religion = this.religion1;
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


  onChangeEducationLevel($event) {
    this.educationLevelName = $event;
    if (this.educationLevelName.length > 0) {
      if (this.educationLevelName == undefined || this.educationLevelName == null) { }
      else {
        //  console.log(this.educationLevelName.name)
        localStorage.setItem("Jstep3", '1');
        localStorage.setItem("JEducationLevel", this.educationLevelName.name);
        if (this.educationLevelName[0].name == 'OTHER') {
          this.educationLevelBox = true;
        }
        else {
          this.educationLevelBox = false;
          this.educationLevelBoxDetails = '';
          localStorage.setItem("JEducationLevelBoxDetails", '');
        }
      }
    }

  }

  onChangeEdeducationField($event) {
    this.educationFieldName = $event;
    if (this.educationFieldName.length > 0) {
      if (this.educationFieldName == undefined || this.educationFieldName == null) { }
      else {
        // console.log(this.educationFieldName.name)
        localStorage.setItem("Jstep3", '1');
        localStorage.setItem("JEdeducationField", this.educationFieldName.name);
        if (this.educationFieldName[0].name == 'OTHER') {
          this.educationFieldBox = true;
        }
        else {
          this.educationFieldBox = false;
          this.educationFieldBoxDetails = '';
          localStorage.setItem("JEducationFieldBoxDetails", '');
        }
      }

    }
  }
  onChangeDesignation($event) {
    this.designationName = $event;
    if (this.designationName == undefined || this.designationName == null) { }
    else {
      //  console.log(this.designationName.name)
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JDesignation", this.designationName.name);
      if (this.designationName.name == 'OTHER') {
        this.designationBox = true;
      }
      else {
        this.designationBox = false;
        this.designationBoxDetails = '';
        localStorage.setItem("JDesignationBoxDetails", '');
      }
    }
  }
  onChangeIncome($event) {
    this.incomeName = $event;
    if (this.incomeName == undefined || this.incomeName == null) { }
    else {
      //  console.log(this.incomeName.income)
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JIncome", this.incomeName.income);
    }
  }
  onChangeKhap($event) {
    this.khapName = $event;
    if (this.khapName == undefined || this.khapName == null) { }
    else {
      //  console.log(this.khapName.name)
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JKhap", this.khapName.name);
      if (this.khapName.name == 'OTHER') {
        this.khapBox = true;
      }
      else {
        this.khapBox = false;
        this.KhapBoxDetail = '';
        localStorage.setItem("JKhapBoxDetails", '');
      }
    }
  }

  onkeypress(ev){
    if (ev.target.value.length >= 2) {
      this.gotraList = [];
      this.gotraName = ev.target.value;
      this.gotraArrayFiind = this.result.info.gotra;
      // this.gotraList = this.gotraArrayFiind.filter(v => v.name == this.gotraName.toLowerCase());
      this.gotraList = this.gotraArrayFiind.filter((item) => {
        return (item.name.toLowerCase().indexOf(this.gotraName.toLowerCase()) > -1);
      })
    }
  }

  onkeypressmgotra(ev){
    if (ev.target.value.length >= 2) {
      this.motherGotraList = [];
      this.mothergotraName = ev.target.value;
      this.motherGotraArrayFind = this.result.info.gotra;
      // this.gotraList = this.gotraArrayFiind.filter(v => v.name == this.gotraName.toLowerCase());
      this.motherGotraList = this.motherGotraArrayFind.filter((item) => {
        return (item.name.toLowerCase().indexOf(this.mothergotraName.toLowerCase()) > -1);
      })
    }
  }
  onkeypressGmgotra(ev){
    if (ev.target.value.length >= 2) {
      this.gmotherGotraList = [];
      this.gmothergotraName = ev.target.value;
      this.gmotherGotraArrayFind = this.result.info.gotra;
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
      this.othergotraArrayFind = this.result.info.gotra;
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
      //  console.log(this.gotraName.name)
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JGotra", this.gotraName.name);
      if (this.gotraName.name == 'OTHER') {
        this.gotraBox = true;
      }
      else {
        this.gotraBox = false;
        this.GotraBoxDetail = '';
        localStorage.setItem("JGotraBoxDetail", '');
      }
    }
  }

  onChangeMGotra($event) {
    this.mGotraName = $event;
    if (this.mGotraName == undefined || this.mGotraName == null) { }
    else {
      //  console.log(this.mGotraName.name) 
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JMotherGotra", this.mGotraName.name);
      if (this.mGotraName.name == 'OTHER') {
        this.motherGotraBox = true;
      }
      else {
        this.motherGotraBox = false;
        this.MotherGotraBoxDetails = '';
        localStorage.setItem("JMotherGotraBoxDetails", '');
      }
    }
  }

  onChangeOtherGotra($event) {
    this.othergotraName = $event;
    if (this.othergotraName == undefined || this.othergotraName == null) { }
    else {
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JotherGotra", this.othergotraName.name);
      if (this.othergotraName.name == 'OTHER') {
      }
    }
  }

  onChangeGMGotra($event) {
    this.gMGotraName = $event;
    if (this.gMGotraName == undefined || this.gMGotraName == null) { }
    else {
      //  console.log(this.gMGotraName.name)
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JGMotherGotra", this.gMGotraName.name);
      if (this.gMGotraName.name == 'OTHER') {
        this.gMotherGotraBox = true;
      }
      else {
        this.gMotherGotraBox = false;
        this.gMotherGotraBoxDetails = '';
        localStorage.setItem("JGMotherGotraBoxDetails", '');
      }
    }
  }
  onChangeReligion($event) {
    this.religionName = $event;
    if (this.religionName == undefined || this.religionName == null) { }
    else {
      //  console.log(this.gMGotraName.name)
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("Jreligion", this.religionName.name);
      if (this.religionName.name == 'OTHER') {
        this.religionBox = true;
      }
      else {
        this.religionBox = false;
        this.religionBoxDetails = '';
        localStorage.setItem("JreligionBoxDetails", '');
      }
    }
  }
  onChangeWorkWith($event) {

    if (this.workwith == undefined || this.workwith == null) { }
    else {
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("Jworkwith", this.workwith);
    }
  }
  onChangeMyself($event) {
    if (this.myself == undefined || this.myself == null) { }
    else {
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("Jmyself", this.myself);
    }
  }
  onChangeKhapBox($event) {
    if (this.KhapBoxDetail == undefined || this.KhapBoxDetail == null) { }
    else {
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JKhapBoxDetails", this.KhapBoxDetail);
    }
  }
  onChangeGotraBox($event) {
    if (this.GotraBoxDetail == undefined || this.GotraBoxDetail == null) { }
    else {
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JGotraBoxDetail", this.GotraBoxDetail);
    }
  }
  onChangeMotherGotraBox($event) {
    if (this.MotherGotraBoxDetails == undefined || this.MotherGotraBoxDetails == null) { }
    else {
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JMotherGotraBoxDetails", this.MotherGotraBoxDetails);
    }
  }
  onChangegMotherGotraBox($event) {
    if (this.gMotherGotraBoxDetails == undefined || this.gMotherGotraBoxDetails == null) { }
    else {
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JGMotherGotraBoxDetails", this.gMotherGotraBoxDetails);
    }
  }
  onChangeReligionBox($event) {
    if (this.religionBoxDetails == undefined || this.religionBoxDetails == null) { }
    else {
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JreligionBoxDetails", this.religionBoxDetails);
    }
  }
  onChangeEducationLevelBox($event) {
    if (this.educationLevelBoxDetails == undefined || this.educationLevelBoxDetails == null) { }
    else {
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JEducationLevelBoxDetails", this.educationLevelBoxDetails);
    }
  }
  onChangeEducationFieldBox($event) {
    if (this.educationFieldBoxDetails == undefined || this.educationFieldBoxDetails == null) { }
    else {
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JEducationFieldBoxDetails", this.educationFieldBoxDetails);
    }
  }
  onChangeDesignationBox($event) {
    if (this.designationBoxDetails == undefined || this.designationBoxDetails == null) { }
    else {
      localStorage.setItem("Jstep3", '1');
      localStorage.setItem("JDesignationBoxDetails", this.designationBoxDetails);
    }
  }
  signUp() {
     if (this.selectedGotra == '' || this.selectedGotra == null || this.selectedGotra == undefined) {
      this.presentToast('Please Select Gotra !', 'bgRed');
    }
    else if (this.gotraBox == true && (this.GotraBoxDetail == '' || this.GotraBoxDetail == null || this.GotraBoxDetail == undefined)) {
      this.presentToast('Please Enter Gotra Other Details !', 'bgRed');
    }
    // else if (this.selectedMGotra == '' || this.selectedMGotra == null || this.selectedMGotra == undefined) {
    //   this.presentToast('Please Select Mother Gotra !', 'bgRed');
    // }
    // else if (this.motherGotraBox == true && (this.MotherGotraBoxDetails == '' || this.MotherGotraBoxDetails == null || this.MotherGotraBoxDetails == undefined)) {
    //   this.presentToast('Please Enter  Mother Gotra Other Details !', 'bgRed');
    // }
    // else if (this.selectedGMGotra == '' || this.selectedGMGotra == null || this.selectedGMGotra == undefined) {
    //   this.presentToast('Please Select Grand Mother Gotra !', 'bgRed');
    // }
    // else if (this.gMotherGotraBox == true && (this.gMotherGotraBoxDetails == '' || this.gMotherGotraBoxDetails == null || this.gMotherGotraBoxDetails == undefined)) {
    //   this.presentToast('Please Enter  Grand Mother Gotra Other Details !', 'bgRed');
    // }
    // else if (this.othergotra == true && (this.othergotra == '' || this.othergotra == null || this.othergotra == undefined)) {
    //   this.presentToast('Please Enter  Other Gotra !', 'bgRed');
    // }
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
      this.disableButton = true;
      localStorage.setItem("JKhap", this.selectedKhap);
      if (this.khapBox == true) {
        localStorage.setItem("JKhapBoxDetails", this.KhapBoxDetail);
      } else {
        localStorage.setItem("JKhapBoxDetails", '');
      }

      localStorage.setItem("JGotra", this.selectedGotra);
      if (this.gotraBox == true) {
        localStorage.setItem("JGotraBoxDetail", this.GotraBoxDetail);
      } else {
        localStorage.setItem("JGotraBoxDetail", '');
      }

      localStorage.setItem("JMotherGotra", this.selectedMGotra);
      if (this.motherGotraBox == true) {
        localStorage.setItem("JMotherGotraBoxDetails", this.MotherGotraBoxDetails);
      } else {
        localStorage.setItem("JMotherGotraBoxDetails", '');
      }

      localStorage.setItem("JGMotherGotra", this.selectedGMGotra);
      localStorage.setItem("othergotra", this.othergotra);
      if (this.gMotherGotraBox == true) {
        localStorage.setItem("JGMotherGotraBoxDetails", this.gMotherGotraBoxDetails);
      } else {
        localStorage.setItem("JGMotherGotraBoxDetails", '');
      }


      localStorage.setItem("Jreligion", this.selectedReligion);
      if (this.religionBox == true) {
        localStorage.setItem("JreligionBoxDetails", this.religionBoxDetails);
      } else {
        localStorage.setItem("JreligionBoxDetails", '');
      }

      localStorage.setItem("JEducationLevel", this.selectedEducationLevel);
      if (this.educationLevelBox == true) {
        localStorage.setItem("JEducationLevelBoxDetails", this.educationLevelBoxDetails);
      } else {
        localStorage.setItem("JEducationLevelBoxDetails", '');
      }

      localStorage.setItem("JEdeducationField", this.selectedEdeducationField);
      if (this.educationFieldBox == true) {
        localStorage.setItem("JEducationFieldBoxDetails", this.educationFieldBoxDetails);
      } else {
        localStorage.setItem("JEducationFieldBoxDetails", '');
      }

      localStorage.setItem("Jworkwith", this.workwith);

      localStorage.setItem("JDesignation", this.selectedDesignation);
      if (this.designationBox == true) {
        localStorage.setItem("JDesignationBoxDetails", this.designationBoxDetails);
      } else {
        localStorage.setItem("JDesignationBoxDetails", '');
      }

      localStorage.setItem("JIncome", this.selectedIncome);
      localStorage.setItem("Jmyself", this.myself);
      localStorage.setItem("othergotra", this.othergotra);

      let signupObj = {
        "AccountName": localStorage.getItem("Jaccountname"),
        "ProfileFor": localStorage.getItem("JProfileFor"),
        "MobileCode": localStorage.getItem("Jmocode"),
        "MobileNo": localStorage.getItem("Jmobile"),
        "UserName": localStorage.getItem("JuserName"),
        "EmailId": localStorage.getItem("JemailAddress"),
        // "Password": localStorage.getItem("Jpassword"),
        "Password": "",
        "FirstName": localStorage.getItem("Jfullname"),
        "LastName": localStorage.getItem("Jlastname"),
        "Gender": localStorage.getItem("JGender"),
        "DOB": localStorage.getItem("Jdob"),
        "Country": localStorage.getItem("JCountryList"),
        "State": localStorage.getItem("JStateList"),
        "City": localStorage.getItem("JCityList"),
        "Marital": localStorage.getItem("JMarital"),
        "Physical": localStorage.getItem("JPhysical"),
        "PhysicalBox": localStorage.getItem("JPhysicalBox"),
        "Height": localStorage.getItem("JHeight"),
        "Weight": localStorage.getItem("Jweight"),
        "SkinType": localStorage.getItem("JSkin"),
        "BodyType": localStorage.getItem("JBody"),
        "Eat": '',
        "Smoke": localStorage.getItem("JSmoke"),
        "Kundali": localStorage.getItem("JKundali"),
        "Drink": localStorage.getItem("JDrink"),
        "Khap": localStorage.getItem("JKhap"),
        "KhapText": localStorage.getItem("JKhapBoxDetails"),
        "Gotra": localStorage.getItem("JGotra"),
        "GotraText": localStorage.getItem("JGotraBoxDetail"),
        "MotherGotra": localStorage.getItem("JMotherGotra"),
        "MotherGotraText": localStorage.getItem("JMotherGotraBoxDetails"),
        "GrandMotherGotra": localStorage.getItem("JGMotherGotra"),
        "GrandMotherGotraText": localStorage.getItem("JGMotherGotraBoxDetails"),
        "Religion": localStorage.getItem("Jreligion"),
        "ReligionText": localStorage.getItem("JreligionBoxDetails"),
        "EducationLevel": localStorage.getItem("JEducationLevel"),
        "EducationLevelText": localStorage.getItem("JEducationLevelBoxDetails"),
        "EducationField": localStorage.getItem("JEdeducationField"),
        "EducationFieldText": localStorage.getItem("JEducationFieldBoxDetails"),
        "Organisation": localStorage.getItem("Jworkwith"),
        "OrganisationType": '',
        "Designation": localStorage.getItem("JDesignation"),
        "DesignationText": localStorage.getItem("JDesignationBoxDetails"),
        "Income": localStorage.getItem("JIncome"),
        "About": localStorage.getItem("Jmyself"),
        "ValidData": localStorage.getItem("ValidDataJat"),
        "Type": "1",
        "OtherGotra":this.othergotra
      }

      let loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: "Please wait...",
      });
      loader.present();
      this.serviceProvider.signupApi(signupObj).then(data => {
        this.result = data;
        this.disableButton = false;
        if (this.result.status == 1) {
          loader.dismiss();
          this.presentToast(this.result.msg, 'bgGreen');
          localStorage.setItem("Userregister_id", this.result.info.register_id);
          localStorage.setItem("otpMobile", this.result.info.mobile_no);
          this.removeAllData();
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
      //this.navCtrl.push(LoginPage);
    }
  }

  gotoRegister2Page() {
    this.navCtrl.push('Register2Page');
  }
  removeAllData() {
    localStorage.removeItem("Jaccountname");
    localStorage.removeItem("JProfileFor");
    localStorage.removeItem("Jmocode");
    localStorage.removeItem("Jmobile");
    localStorage.removeItem("JemailAddress");
    localStorage.removeItem("JuserName");
    // localStorage.removeItem("Jpassword");
    // localStorage.removeItem("JCpassword");
    localStorage.removeItem("Jfullname");
    localStorage.removeItem("Jlastname");
    localStorage.removeItem("JGender");
    localStorage.removeItem("Jdob");

    localStorage.removeItem("JCountryListName");
    localStorage.removeItem("JStateListName");
    localStorage.removeItem("JCityListName");

    localStorage.removeItem("JCountryList");
    localStorage.removeItem("JStateList");
    localStorage.removeItem("JCityList");
    localStorage.removeItem("JMarital");
    localStorage.removeItem("JPhysical");
    localStorage.removeItem("JPhysicalBox");
    localStorage.removeItem("JHeight");
    localStorage.removeItem("Jweight");
    localStorage.removeItem("JSkin");
    localStorage.removeItem("JBody");
    localStorage.removeItem("JSmoke");
    localStorage.removeItem("JKundali");
    localStorage.removeItem("JDrink");

    localStorage.removeItem("JKhap");
    localStorage.removeItem("JKhapBoxDetails");
    localStorage.removeItem("JGotra");
    localStorage.removeItem("JGotraBoxDetail");
    localStorage.removeItem("JMotherGotra");
    localStorage.removeItem("JMotherGotraBoxDetails");
    localStorage.removeItem("JGMotherGotra");
    localStorage.removeItem("JGMotherGotraBoxDetails");
    localStorage.removeItem("Jreligion");
    localStorage.removeItem("JreligionBoxDetails");
    localStorage.removeItem("JEducationLevel");
    localStorage.removeItem("JEducationLevelBoxDetails");
    localStorage.removeItem("JEdeducationField");
    localStorage.removeItem("JEducationFieldBoxDetails");
    localStorage.removeItem("Jworkwith");
    localStorage.removeItem("JDesignation");
    localStorage.removeItem("JDesignationBoxDetails");
    localStorage.removeItem("JIncome");
    localStorage.removeItem("Jmyself");

    localStorage.removeItem("Jstep1");
    localStorage.removeItem("Jstep2");
    localStorage.removeItem("Jstep3");
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
