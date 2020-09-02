import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {Appareil} from '../../../models/Appareil';
import {AppareilsService} from '../../../services/appareils.service';

@Component({
  selector: 'page-single-appareil',
  templateUrl: 'single-appareil.html',
})
export class SingleAppareilPage implements OnInit {
  error: string;
  dat: string;
  cons: string;
  x: string;
  index: number;
  appareil: Appareil;


  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public appareilsService: AppareilsService) {
    this.error = '';
    this.dat = '';
    this.cons = '';
  }

  ngOnInit() {

    this.index = this.navParams.get('index');
    this.appareil = this.appareilsService.appareilsList[this.index];
    this.appareilsService.getRemotedata().subscribe(
      data => {
        // Set the data to display in the template
        this.x = 'appliance_' + this.index;
        this.dat = data['Cout'][this.x];
        this.cons = data['Consommation'][this.x];

        this.dat == JSON.stringify(this.dat);
        this.cons == JSON.stringify(this.cons);
      },
      err => {
        // Set the error information to display in the template
        this.error = `An error occurred, the data could not be retrieved: Status: ${err.status}, Message: ${err.statusText}`;
      }
    );
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleAppareil() {
    this.appareil.isOn = !this.appareil.isOn;
  }

}
