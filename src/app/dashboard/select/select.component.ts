import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory,
  BingMapAPILoaderConfig, BingMapAPILoader,
  GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _markerTypeId = MarkerTypeId;
  // tslint:disable-next-line:variable-name
  _options: IMapOptions = {
    disableBirdseye: false,
    disableStreetside: false,
    navigationBarMode: 1,
    zoom: 6
  };

  // tslint:disable-next-line:variable-name
  _box: IBox = {
    maxLatitude: 32,
    maxLongitude: -92,
    minLatitude: 29,
    minLongitude: -98
  };

  // tslint:disable-next-line:variable-name
  private _iconInfo: IMarkerIconInfo = {
    markerType: MarkerTypeId.FontMarker,
    fontName: 'FontAwesome',
    fontSize: 48,
    color: 'red',
    markerOffsetRatio: { x: 0.5, y: 1 },
    text: '\uF276'
  };

  city: any;
  cityGo: any;
  code: any;
  cityLon: any;
  cityLat: any;
  curr: any;
  currCodeTo: any;
  currCodeFrom: any;
  capLon: any;
  capLat: any;
  cap: any;

  constructor(private app: AppServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.app.getAllCountries().subscribe(dt => {
      // tslint:disable-next-line:prefer-const
      for (let counry of dt) {
        if (counry.name === this.app.to) {
          this.code = counry.alpha2Code;
          this.currCodeTo = counry.currencies.code;
          this.cap = counry.capital;
        }
        if (counry.name === this.app.from) {
          this.currCodeFrom = counry.currencies.code;
        }
      }
    });
    this.app.getCity().subscribe(data => {
     this.city = data.cities;
     // tslint:disable-next-line:prefer-const
     for (let key of data.cities) {
       if (key === this.cap) {
         this.capLat = key.lat;
         this.capLon = key.lon;
       }
     }
     this.app.getHotels(this.capLon, this.capLat).subscribe(dt => {
      console.log(dt);
     });
     this.app.getRest(this.capLon, this.capLat).subscribe(dt => {
      console.log(dt);
     });
    });

  }

  onChange(event: any) {
    this.app.getCity().subscribe(data => {
      // tslint:disable-next-line:prefer-const
      for (let key of data.cities) {
        if (event === key.name) {
          this.cityLon = key.coord.lon;
          this.cityLat = key.coord.lat;
        }
      }
      this.app.getHotels(this.cityLat, this.cityLon).subscribe(dt => {
        console.log(dt);
      });
      this.app.getRest(this.cityLat, this.cityLon).subscribe(dt => {
        console.log(dt);
      });
    });
  }

  onSubmit() {
    this.app.getCurrency(this.currCodeTo).subscribe(data => {
      // tslint:disable-next-line:prefer-const
      for (let key of data.rates) {
        if (key === this.currCodeFrom) {
          // this.res = key * parseFloat(this.total);
        }
      }
    });
  }
}
