import { Appareil } from '../models/Appareil';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class AppareilsService {

  constructor(private http: HttpClient) {

  }
  getRemotedata(){
    return this.http.get("http://localhost:8003?devices=true");
  }

  appareilsList: Appareil[] = [
    {
      name: 'Machine à laver',
      description: [
        'Volume: 6 litres',
        'Temps de lavage: 2 heures'
      ],
      isOn: true,
      image:'assets/imgs/machinealaver.jpg'
    },
    {
      name: 'Télévision',
      description: [
        'Dimensions: 40 pouces'
      ],
      isOn: true,
      image:'assets/imgs/tel.jpg'
    },
    {
      name: 'climatiseur',
      description: [
        'Marque: fait maison'
      ],
      isOn: false,
      image:'assets/imgs/climatisseur.jpg'
    },
    {
      name: 'Réfrigérateur',
      description: [
        'Marque: fait maison'
      ],
      isOn: true,
      image:'assets/imgs/re.jpg'
    }
  ];
}
