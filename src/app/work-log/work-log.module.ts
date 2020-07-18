import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { WorkLogPageRoutingModule } from './work-log-routing.module';

import { WorkLogPage } from './work-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule,
    HttpClientModule,
    WorkLogPageRoutingModule
  ],
  declarations: [WorkLogPage]
})
export class WorkLogPageModule {}
