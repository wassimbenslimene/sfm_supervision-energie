import { Component } from '@angular/core';
import { AppareilsPage } from '../appareils/appareils';
import { AlertesPage } from '../alertes/alertes';
import {StatsPage} from "../stats/stats";
import {HomePage} from "../homepage/homepage";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  appareilsPage = AppareilsPage;
  alertesPage = AlertesPage;
  statsPage = StatsPage;
  homePage = HomePage;
}
