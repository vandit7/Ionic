import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamilydetailsPage } from './familydetails';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FamilydetailsPage,
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    IonicPageModule.forChild(FamilydetailsPage),
  ],
})
export class FamilydetailsPageModule {}
