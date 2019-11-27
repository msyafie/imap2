import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'nmosque', loadChildren: './nmosque/nmosque.module#NmosquePageModule' },
  { path: 'calculate-distance', loadChildren: './calculate-distance/calculate-distance.module#CalculateDistancePageModule' },  { path: 'prayertime', loadChildren: './prayertime/prayertime.module#PrayertimePageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'solat-report', loadChildren: './solat-report/solat-report.module#SolatReportPageModule' },
  { path: 'detailed-report', loadChildren: './detailed-report/detailed-report.module#DetailedReportPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },

  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
