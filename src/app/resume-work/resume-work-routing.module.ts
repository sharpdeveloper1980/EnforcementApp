import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumeWorkPage } from './resume-work.page';

const routes: Routes = [
  {
    path: '',
    component: ResumeWorkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeWorkPageRoutingModule {}
