import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/homepage/homepage';
import { AppareilsPage } from '../pages/appareils/appareils';
import { SingleAppareilPage } from '../pages/appareils/single-appareil/single-appareil';
import { AlertesPage } from '../pages/alertes/alertes';
import { TabsPage } from '../pages/tabs/tabs';
import { AppareilsService } from '../services/appareils.service';
import { OptionsPage } from '../pages/options/options';
import {StatsPage} from "../pages/stats/stats";
import {AppareilStatPage} from "../pages/appareil-stat/appareil-stat";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AppareilsPage,
    SingleAppareilPage,
    AlertesPage,
    TabsPage,
    OptionsPage,
    StatsPage,
    AppareilStatPage

  ],
  imports: [
    BrowserModule, HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AppareilsPage,
    SingleAppareilPage,
    AlertesPage,
    TabsPage,
    OptionsPage,
    StatsPage,
    AppareilStatPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppareilsService

  ]
})
export class AppModule {}
