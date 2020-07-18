import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'parking-detail',
    loadChildren: () => import('./parking-detail/parking-detail.module').then( m => m.ParkingDetailPageModule)
  },
  {
    path: 'work-log',
    loadChildren: () => import('./work-log/work-log.module').then( m => m.WorkLogPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'special-ticket',
    loadChildren: () => import('./special-ticket/special-ticket.module').then( m => m.SpecialTicketPageModule)
  },
  {
    path: 'parking-history',
    loadChildren: () => import('./parking-history/parking-history.module').then( m => m.ParkingHistoryPageModule)
  },
  {
    path: 'parked-vehicles',
    loadChildren: () => import('./parked-vehicles/parked-vehicles.module').then( m => m.ParkedVehiclesPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'resume-work/:id',
    loadChildren: () => import('./resume-work/resume-work.module').then( m => m.ResumeWorkPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
