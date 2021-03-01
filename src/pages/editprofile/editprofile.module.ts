import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditprofilePage } from './editprofile';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    EditprofilePage,
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    IonicPageModule.forChild(EditprofilePage), 
  ],
})
export class EditprofilePageModule {}
