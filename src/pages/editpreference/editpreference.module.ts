import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditpreferencePage } from './editpreference';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditpreferencePage,
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    IonicPageModule.forChild(EditpreferencePage),
  ],
})
export class EditpreferencePageModule {}
