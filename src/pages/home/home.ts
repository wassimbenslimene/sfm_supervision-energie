import { Component } from '@angular/core';
import {AlertController, MenuController, NavController} from 'ionic-angular';
import {AppareilsPage} from "../appareils/appareils";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private menuCtrl: MenuController) {

  }
  onGoToAppareils() {
    this.navCtrl.push(AppareilsPage);
  }
  onToggleMenu() {
    this.menuCtrl.open();
  }

}
