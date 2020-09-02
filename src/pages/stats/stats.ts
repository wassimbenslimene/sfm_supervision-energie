import {Component, ViewChild, OnInit} from '@angular/core';
import {MenuController, ModalController, NavController} from 'ionic-angular';
import {AppareilsPage} from "../appareils/appareils";
import {Chart} from 'chart.js';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage implements OnInit {
  public format: any;
  public value: any;
  error: string;
  dat: any;
  allData: string;
  datetime: any;

  constructor(public navCtrl: NavController,
              private menuCtrl: MenuController,
              private http: HttpClient) {


  }

  getRemotedata() {
    return this.http.get("http://localhost:8003/?startdate=" + this.startdate + "&enddate=" + this.enddate);
  }

  ngOnInit() {

  }

  public formatChangeListener() {
    if (this.value == "mois") {
      this.format = "MMM-YYYY";
    } else if (this.value == "année") {
      this.format = "YYYY";
    } else if (this.value == "jour") {
      this.format = "DD-MMM-YYYY";
    }
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  @ViewChild('barChart') barChart;
  @ViewChild('barChart2') barChart2;
  bars: any;
  colorArray: any;
  startdate: any;
  enddate: any;

  loadData() {
    console.log(this.startdate);
    if (this.startdate == null || this.enddate == null)
      return;
    this.getRemotedata().subscribe(
      data => {
        // Set the data to display in the template
        this.dat = data;
        this.dat == JSON.stringify(this.dat);
        console.log(this.dat);
        this.allData = JSON.parse(this.dat); // parse json data and pass json string
        console.log(this.allData['I']);

        var v = new Array()
        var k = new Array()
        var v1 = new Array()
        var x;
        v = Object.values(this.allData['cons']);
        k = Object.values(this.allData['date'])

        v1 = Object.values(this.allData['I']);

        var s = 'consommation totale en W';
        var s1 = 'intensité en ampère'
        this.createBarChart(k, v, this.barChart, s);
        this.createBarChart(k, v1, this.barChart2, s1);
      },
      err => {
        // Set the error information to display in the template
        this.error = `An error occurred, the data could not be retrieved: Status: ${err.status}, Message: ${err.statusText}`;
      }
    );
  }

  createBarChart(k, v, x, s) {
    //var v = new Array()
    //var k = new Array()
    // v= Object.values(this.allData['RealP1']);
    //k=Object.values(this.allData['date']);
    console.log("**************");
    //console.log(v);
    // console.log(k);
    console.log("**************");
    this.bars = new Chart(x.nativeElement, {
      type: 'bar',
      data: {
        labels: k,
        datasets: [{
          label: s,
          data: v,
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
