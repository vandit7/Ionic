import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Camera } from '@ionic-native/camera';

import { ContactPage } from '../pages/contact/contact';    
import { HomePage } from '../pages/home/home';  
import { TabsPage } from '../pages/tabs/tabs'; 
  
import { StatusBar } from '@ionic-native/status-bar';    
import { SplashScreen } from '@ionic-native/splash-screen'; 
import { LoginPage } from '../pages/login/login';
import { ServiceProvider } from '../providers/service/service';  
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http'; 
import { LoginPageModule } from '../pages/login/login.module';  
import { ProfilePage } from '../pages/profile/profile';  
import { InboxPage } from '../pages/inbox/inbox'; 
import { File } from '@ionic-native/file' 
import { GooglePlus } from '@ionic-native/google-plus';   
import { Facebook } from '@ionic-native/facebook';
import { ImageTypeModalPage } from '../pages/image-type-modal/image-type-modal';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { Clipboard } from '@ionic-native/clipboard';
import { MassageInfoPage } from '../pages/massage-info/massage-info';
import { ChatsettingComponent } from '../components/chatsetting/chatsetting';
import { ChatInfoPage } from '../pages/chat-info/chat-info';  
import { ChatwindowPageModule } from '../pages/chatwindow/chatwindow.module'; 
import { PriceTablePageModule } from '../pages/price-table/price-table.module';
import { AtomService } from '../pages/service/atom';
import { InAppBrowser } from '@ionic-native/in-app-browser/index';
import { ImgFullPage } from '../pages/img-full/img-full';
import { IntroscreenPage } from '../pages/introscreen/introscreen';
import { IncomepopupPage } from '../pages/incomepopup/incomepopup';
import { PlanpopupPage } from '../pages/planpopup/planpopup';
// const config: SocketIoConfig = { url: 'https://socket.bet888.ooo:1010/', options: {} };  
//const config: SocketIoConfig = { url: 'http://136.244.109.30:8585/', options: {} };    
 const config: SocketIoConfig = { url: 'https://socket.bpcex.biz:8585/', options: {} };    

 
@NgModule({  
  declarations: [        
    MyApp,
    IntroscreenPage,
    InboxPage, 
    ContactPage,
    HomePage, 
    ProfilePage,    
    TabsPage,   
    ImageTypeModalPage,
    MassageInfoPage, 
    ImgFullPage,
    ChatInfoPage,
    ChatsettingComponent,
    PlanpopupPage
   //  LoginPage
  ], 
  imports: [
    BrowserModule, 
    HttpModule,
    HttpClientModule,
   // IonicModule.forRoot(MyApp),  
    IonicModule.forRoot(MyApp, {
      rippleEffect: true,
      scrollAssist: true, autoFocusAssist: true
}),
    SocketIoModule.forRoot(config),
    LoginPageModule,  
    PriceTablePageModule,
    ChatwindowPageModule  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroscreenPage,
    InboxPage,
    ContactPage,
    HomePage,
    ProfilePage,
    TabsPage,
    ImageTypeModalPage,
    MassageInfoPage,
    ImgFullPage,
    ChatInfoPage,
    ChatsettingComponent, 
    PlanpopupPage
  // LoginPage 
  ],
  providers: [
    Camera,
    StatusBar, 
    SplashScreen,
    GooglePlus,
    Facebook,
    Clipboard,
    File,
    AtomService,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
  ]
})
export class AppModule {}
