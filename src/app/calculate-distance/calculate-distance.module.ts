import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalculateDistancePage } from './calculate-distance.page';

const routes: Routes = [
  {
    path: '',
    component: CalculateDistancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalculateDistancePage]
})
export class CalculateDistancePageModule {}
