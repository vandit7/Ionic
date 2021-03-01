import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderScreenPage } from './order-screen';

@NgModule({
  declarations: [
    OrderScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderScreenPage),
  ],
})
export class OrderScreenPageModule {}
