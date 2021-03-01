import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomepopupPage } from './incomepopup';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IncomepopupPage,
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    IonicPageModule.forChild(IncomepopupPage),
    
  ],
})
export class IncomepopupPageModule {}
