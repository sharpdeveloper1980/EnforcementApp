import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { SpecialTicketPageRoutingModule } from './special-ticket-routing.module';

import { SpecialTicketPage } from './special-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	HttpClientModule,
    SpecialTicketPageRoutingModule
  ],
  declarations: [SpecialTicketPage]
})
export class SpecialTicketPageModule {}
