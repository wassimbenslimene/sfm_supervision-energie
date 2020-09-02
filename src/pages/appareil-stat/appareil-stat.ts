import {Component, ViewChild,OnInit} from '@angular/core';
import {MenuController, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Chart} from 'chart.js';
import {AppareilsService} from "../../services/appareils.service";
import {Appareil} from "../../models/Appareil";

@Component({
  selector: 'page-appareil-stat',
  templateUrl: 'appareil-stat.html'
})
export class AppareilStatPage implements OnInit  {
  public format: any;
  public value: any;
  index: number;
  appareil: Appareil;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private menuCtrl: MenuController,
              public appareilsService: AppareilsService) {


  }
  ngOnInit() {
    this.index = this.navParams.get('index');
    this.appareil = this.appareilsService.appareilsList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }
  public formatChangeListener(){
    if (this.value == "mois") {
      this.format = "MMM-YYYY";
    }
    else if (this.value == "année") {
      this.format = "YYYY";
    }
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Consommation energitique',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
