import {Component, OnInit} from '@angular/core';
import {
  AlertController,
  MenuController,
  ModalController,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import {AppareilsPage} from "../appareils/appareils";
import { Appareil } from '../../models/Appareil';
import { AppareilsService } from '../../services/appareils.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html'
})
export class HomePage{
  index: number;
  error: string;
  p1: number;
  p2: number;
  p3: number;
  appareilsList: Appareil[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController,
              private appareilsService: AppareilsService,
              private http: HttpClient
             ) {this.setIntrvl();

  }
  setInterval = setInterval;
  setIntrvl(){
    setInterval(() => this.ionicview(), 5000);

  }
  getRemotedata(){
    return this.http.get("http://localhost:8003?realtime=true");
  }
  ionicview() {
    this.getRemotedata().subscribe(
      data => {
        // Set the data to display in the template

          this.p1 = Math.round(data['RealP1'] * 100) / 100;
          this.p2 = Math.round(data['RealP2'] * 100) / 100;
          this.p3 = Math.round(data['RealP3'] * 100) / 100;
          //this.p1 == JSON.stringify(this.p1);
          //this.p2 == JSON.stringify(this.p2);
          //this.p3 == JSON.stringify(this.p3);
          console.log(this.p1+this.p3+this.p2);
      },
      err => {
        // Set the error information to display in the template
        this.error = `An error occurred, the data could not be retrieved: Status: ${err.status}, Message: ${err.statusText}`;
      }
    );
  }
  ionViewWillEnter() {
    this.appareilsList = this.appareilsService.appareilsList.slice();
  }

  onGoToAppareils() {
    this.navCtrl.push(AppareilsPage);
  }
  onToggleMenu() {
    this.menuCtrl.open();
  }

}
