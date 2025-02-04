import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialTicketPage } from './special-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialTicketPageRoutingModule {}
