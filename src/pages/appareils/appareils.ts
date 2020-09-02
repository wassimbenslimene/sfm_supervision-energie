import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { MenuController} from 'ionic-angular';
import { SingleAppareilPage } from './single-appareil/single-appareil';
import { Appareil } from '../../models/Appareil';
import { AppareilsService } from '../../services/appareils.service';
import {AppareilStatPage} from "../appareil-stat/appareil-stat";

@Component({
  selector: 'page-appareils',
  templateUrl: 'appareils.html'
})
export class AppareilsPage {

  appareilsList: Appareil[];

  constructor(private modalCtrl: ModalController,private menuCtrl: MenuController,
              private appareilsService: AppareilsService) {}

  ionViewWillEnter() {
    this.appareilsList = this.appareilsService.appareilsList.slice();
  }

  onLoadAppareil(index: number) {
    let modal = this.modalCtrl.create(SingleAppareilPage, {index: index});
    modal.present();
  }
  onLoadStatAppareil(index: number){
    let modal = this.modalCtrl.create(AppareilStatPage,{index: index});
    modal.present();
  }
  onToggleMenu() {
    this.menuCtrl.open();
  }
}
