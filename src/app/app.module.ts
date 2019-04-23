import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, RoutedComponents } from './app-routing.module';

import { AppComponent } from './app.component';

import { RybService } from './_services/ryb.service';
import { ColorService } from './_services/color.service';
import { MatIconComponent } from './_components/mat-icon/mat-icon.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    RoutedComponents,
    MatIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [RybService, ColorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
