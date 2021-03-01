import { Component, ViewChild } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { InboxPage } from '../inbox/inbox';
import { NavController, Events,Tabs } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
 
  tab1Root: any = HomePage;
  tab2Root: any = InboxPage;
  tab3Root: any = ContactPage;
  tab4Root: any =  ProfilePage;

  constructor(public nav:NavController,
     public events: Events ) {

  }
  
}
