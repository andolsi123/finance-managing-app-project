import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent implements OnInit {

  constructor(private county: AppServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
