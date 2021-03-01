import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriceTablePage } from './price-table';

@NgModule({
  declarations: [
    PriceTablePage,
  ],
  imports: [
    IonicPageModule.forChild(PriceTablePage),
  ],
})
export class PriceTablePageModule {}
