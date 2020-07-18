import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ResumeWorkPageRoutingModule } from './resume-work-routing.module';

import { ResumeWorkPage } from './resume-work.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ResumeWorkPageRoutingModule
  ],
  declarations: [ResumeWorkPage]
})
export class ResumeWorkPageModule {}
