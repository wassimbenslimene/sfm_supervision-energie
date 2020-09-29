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
  energy: number;
  etat:any;
  etat0:any;
  start:any;
  p2: number;
  p3: number;
  savedenergy:any;
  appareilsList: Appareil[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController,
              private appareilsService: AppareilsService,
              private http: HttpClient
             ) {
    this.energy=this.savedenergy;
    var today = new Date();
    this.start = today.toString()
    this.setIntrvl();

  }
  setInterval = setInterval;
  setIntrvl(){
    setInterval(() => this.ionicview(), 5000);

  }
  getRemotedata(){
    return this.http.get("http://localhost:8003?realtime=true");
  }
  getRemotedata2(){
    return this.http.get("http://localhost:8003?etat=true");
  }
  ionicview() {
    this.getRemotedata().subscribe(
      data => {
        // Set the data to display in the template

          this.p1 = Math.round(data['RealP1'] * 100.0) / 100;
          this.p2 = Math.round(data['RealP2'] * 100.0) / 100;
          this.p3 = Math.round(data['RealP3'] * 100.0) / 100;
          //this.p1 == JSON.stringify(this.p1);
          //this.p2 == JSON.stringify(this.p2);
          //this.p3 == JSON.stringify(this.p3);
          this.energy=((this.p1+this.p3+this.p2)/1000)*5/3600 + this.energy
          this.savedenergy=this.energy
          console.log(this.start);
      },
      err => {
        // Set the error information to display in the template
        this.error = `An error occurred, the data could not be retrieved: Status: ${err.status}, Message: ${err.statusText}`;
      }
    );

    this.getRemotedata2().subscribe(
      data2 => {
        // Set the data to display in the template

        this.etat = data2 ;
        this.appareilsList[0].isOn=this.etat["climatiseur"]
        this.appareilsList[1].isOn=this.etat["réfrigérateur"]
        this.appareilsList[2].isOn=this.etat["cafétière"]
        this.appareilsList[3].isOn=this.etat["television"]
        console.log(this.etat);
      },
      err => {
        // Set the error information to display in the template
        this.error = `An error occurred, the data could not be retrieved: Status: ${err.status}, Message: ${err.statusText}`;
      }
    );
  }

  ionViewWillEnter() {
    this.appareilsList = this.appareilsService.appareilsList.slice();
    this.savedenergy = this.appareilsService.savedenergy.slice();
  }

  onGoToAppareils() {
    this.navCtrl.push(AppareilsPage);
  }
  onToggleMenu() {
    this.menuCtrl.open();
  }

}
