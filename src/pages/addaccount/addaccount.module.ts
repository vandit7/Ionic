import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddaccountPage } from './addaccount';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddaccountPage,
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    IonicPageModule.forChild(AddaccountPage),
  ],
})
export class AddaccountPageModule {}
