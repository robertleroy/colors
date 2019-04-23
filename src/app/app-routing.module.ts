import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MixerComponent } from './mixer/mixer.component';
import { MorphComponent } from './morph/morph.component';
import { ShadesComponent } from './shades/shades.component';
import { ShifterComponent } from './shifter/shifter.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mixer', component: MixerComponent },
  { path: 'shifter', component: ShifterComponent },
  { path: 'morph', component: MorphComponent },
  { path: 'shades', component: ShadesComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutedComponents = [
  HomeComponent,
  MixerComponent,
  ShifterComponent,
  MorphComponent,
  ShadesComponent
];
