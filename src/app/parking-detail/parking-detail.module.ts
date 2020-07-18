import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';


import { ParkingDetailPageRoutingModule } from './parking-detail-routing.module';

import { ParkingDetailPage } from './parking-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ParkingDetailPageRoutingModule
  ],
  declarations: [ParkingDetailPage]
})
export class ParkingDetailPageModule {}
