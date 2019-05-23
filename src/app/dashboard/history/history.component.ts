import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme/components/window';
import { AppServiceService } from 'src/app/app.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

  money = this.app.money;
  pockectMoney = this.app.pockectMoney;
  dayFrom = this.app.dateFrom;
  dayTo = this.app.dateTo;

  constructor(protected windowRef: NbWindowRef, private app: AppServiceService) { }

  ngOnInit() {
  }

  close() {
    this.windowRef.close();
  }

}
