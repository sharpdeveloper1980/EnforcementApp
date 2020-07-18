import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { ParkedVehiclesPageRoutingModule } from './parked-vehicles-routing.module';

import { ParkedVehiclesPage } from './parked-vehicles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ParkedVehiclesPageRoutingModule
  ],
  declarations: [ParkedVehiclesPage]
})
export class ParkedVehiclesPageModule {}
