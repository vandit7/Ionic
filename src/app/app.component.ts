import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Socket } from 'ng-socket-io';
import { PriceTablePage } from '../pages/price-table/price-table';
import { IntroscreenPage } from '../pages/introscreen/introscreen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  projectName: any;
  ValidData: any;
  result: any;
  dataSet: any;
  chatList: any[] = [];
  constructor(platform: Platform,
    statusBar: StatusBar,
    private socket: Socket,
    splashScreen: SplashScreen) {

    if (localStorage.getItem("Islogin") == '1') {
      this.rootPage = TabsPage;
    }
    else {
      if (localStorage.getItem("IntroJatPage") == '1') {
        this.rootPage = LoginPage;
      }
      else {
        this.rootPage = IntroscreenPage;
        localStorage.setItem("IntroJatPage", '1')
      }
    }
    window.addEventListener("keyboardDidShow", () => {
      document.activeElement.scrollIntoView(false);
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need. eaeff3
        //statusBar.hide();
      // statusBar.backgroundColorByHexString('#eaeff3'); 
      // let status bar overlay webview
      statusBar.overlaysWebView(false); 
      //statusBar.styleDefault();
      // // set status bar to white
      statusBar.backgroundColorByHexString('#000');
      // statusBar.styleDefault();

      splashScreen.hide();
      this.projectName = 'Jat Shadi';
      localStorage.setItem("projectName", this.projectName);
      this.ValidData = '7sWHsT70hnXcCn5BiPtMEf3L7PHG7R';
      localStorage.setItem("ValidDataJat", this.ValidData);
      this.newSocket();

    });
  }
  myMethod(index) {
    console.log(index)
  }
  newSocket() {
    this.socket.connect();
    var RegisterId = localStorage.getItem("register_id");
    var Type = "1";
    var ValidData = localStorage.getItem("ValidDataJat");
    this.socket.emit('PendingListData', { RegisterId: RegisterId, Type: Type, ValidData: ValidData }, function (response) {
      // console.log(response);
    });
    this.socket.on('ReceivePendingListData', (response) => {
      this.result = response;
      this.chatList = []
      if (this.result.status == 1) {
        this.dataSet = this.result.info;
      }
      else {
      }
    });
  }

}
