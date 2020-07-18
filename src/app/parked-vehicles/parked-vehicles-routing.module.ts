import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkedVehiclesPage } from './parked-vehicles.page';

const routes: Routes = [
  {
    path: '',
    component: ParkedVehiclesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkedVehiclesPageRoutingModule {}
