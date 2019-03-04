import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  // tslint:disable-next-line:max-line-length
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  countys: any;
  currentCount: any;
  currency: any;
  base: any;
  from: any;
  to: any;
  arr: Array<string>;
  constructor(private county: AppServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.county.getCurrency().subscribe(data => {
      this.currency = data.rates; this.base = data.base;
      // tslint:disable-next-line:prefer-const
      Object.entries(this.currency).forEach(
        ([key, value]) => /*console.log(key, value)*/
          this.county.getSymbol(value).subscribe(dataa => {
            this.arr.push(dataa[0].name);
            this.arr.forEach(element => {
              this.county.getLocation().subscribe(datas => {
                this.currentCount = datas.country_name;
                if (element === this.currentCount) {
                  this.from = this.currentCount;
                }
              });
            });
          }
      ));
    });
  }

  onChangeTo(neww) {
    this.to = neww;
  }
  onChangeFrom(neww) {
    this.from = neww;
  }
  onClick() {
    if (this.from && this.to) {
      this.router.navigate([`../dashboard/select`], { relativeTo: this.route });
    }
  }
}
