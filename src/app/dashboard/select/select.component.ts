import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppServiceService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory,
  BingMapAPILoaderConfig, BingMapAPILoader,
  GoogleMapAPILoader,  GoogleMapAPILoaderConfig, ILatLong, ClusterPlacementMode, ClusterClickAction
} from 'angular-maps';
import {  NbToastrService, NbWindowService } from '@nebular/theme';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent implements OnInit {

  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;

  // tslint:disable-next-line:variable-name
  _box: IBox;
  // tslint:disable-next-line:variable-name
  _iconInfo: IMarkerIconInfo = {
    markerType: MarkerTypeId.FontMarker,
    fontName: 'FontAwesome',
    fontSize: 48,
    color: 'red',
    markerOffsetRatio: { x: 0.5, y: 1 },
    text: '\uF276'
  };

  // tslint:disable-next-line:variable-name
  _ranges: Map<number, string> = new Map<number, string>([
    [10, 'rgba(20, 180, 20, 0.5)'],
    [20, 'rgba(255, 210, 40, 0.5)'],
    [Number.MAX_SAFE_INTEGER , 'rgba(255, 40, 40, 0.5)']
  ]);
  // tslint:disable-next-line:variable-name
  _placementMode = ClusterPlacementMode;
  // tslint:disable-next-line: variable-name
  _clickActionMode = ClusterClickAction;
  // tslint:disable-next-line: variable-name
  _markerTypeId = MarkerTypeId;
  // tslint:disable-next-line: variable-name
  _options: IMapOptions = {
    disableBirdseye: false,
    disableStreetside: false,
    navigationBarMode: 1,
    zoom: 6
  };
  // tslint:disable-next-line:variable-name
  _markersres: Array<ILatLong> = new Array<ILatLong>();
  // tslint:disable-next-line:variable-name
  _markershot: Array<ILatLong> = new Array<ILatLong>();

  city: any;
  cityGo: any;
  code: any;
  cityLon: any;
  cityLat: any;
  curr: any;
  currCodeTo: any;
  currCodeFrom: any;
  cap: any;
  cit: any;
  hotels: any;
  rests: any;
  error: any;
  counter = true;
  restPrice = [];
  res: any;
  money: any;
  pockectMoney: any;
  dateTo: any;
  dateFrom: any;
  hot: any;
  totaleTo: any;
  totaleFrom: any;
  valTo: any;
  valInFrom: any;
  valInTo: any;
  TimeError = false;
  moenyError = false;
  pockectMoneyError = false;
  hotelError = false;
  restError = false;
  index = 0;
  items: Observable<any[]>;
  logged: any;
  restName = [];
  hotelName: any;

  // tslint:disable-next-line:max-line-length
  constructor(private app: AppServiceService, private router: Router, private route: ActivatedRoute, private windowService: NbWindowService, private toastrService: NbToastrService, public db: AngularFireDatabase) {}

  ngOnInit() {
    this.items = this.db.list('login').valueChanges();
    this.items.forEach(element => {
      element.forEach(item => {
        this.logged = item.log;
      });
    });
    this.app.getAllCountries().subscribe(dt => {
      // tslint:disable-next-line:prefer-const
      for (let counry of dt) {
        if (counry.name === this.app.to) {
          this.code = counry.name;
          this.currCodeTo = counry.currencies[0].code;
          this.cap = counry.capital;
        }
        if (counry.name === this.app.from) {
          this.currCodeFrom = counry.currencies[0].code;
        }
      }
    });
    this.app.postToken().subscribe(token => {
      this.app.getCity().subscribe(data => {
        this.city = data.cities;
        // tslint:disable-next-line:prefer-const
        for (let elements of this.city) {
          if (elements.city === this.cap) {
            // tslint:disable-next-line:variable-name
            this._box = {
              maxLatitude: +elements.lat + 2,
              maxLongitude: +elements.lon + 2,
              minLatitude: +elements.lat - 2,
              minLongitude: +elements.lon - 2
            };
            this.app.getHotels(elements.lat, elements.lon, token.access_token).subscribe(dt => {
              this.hotels = dt.data;
              // tslint:disable-next-line: prefer-const
              for (let index of dt.data) {
                this._markershot.push({latitude: +(index.hotel.latitude), longitude: +(index.hotel.longitude)});
              }
            }, error => this.error = error);
            this.app.getRest(elements.lat, elements.lon).subscribe(dt => {
              this.rests = dt.nearby_restaurants;
              // tslint:disable-next-line: prefer-const
              for (let index of dt.nearby_restaurants) {
                this._markersres.push({latitude: +(index.restaurant.location.latitude), longitude: +(index.restaurant.location.longitude)});
              }
            }, error => this.error = error);
            this.cit = this.cap;
          }
        }
      });
    });
  }

  onChange(event: any) {
    this.app.postToken().subscribe(token => {
      // tslint:disable-next-line: prefer-const
      for (let elements of this.city) {
        // tslint:disable-next-line:triple-equals
        if (event == elements.city) {
          // tslint:disable-next-line:variable-name
          this._box = {
            maxLatitude: +elements.lat + 2,
            maxLongitude: +elements.lon + 2,
            minLatitude: +elements.lat - 2,
            minLongitude: +elements.lon - 2
          };
          this.app.getHotels(elements.lat, elements.lon, token.access_token).subscribe(dt => {
            this.hotels = dt.data;
            // tslint:disable-next-line: prefer-const
            for (let index of dt.data) {
              this._markershot.push({latitude: +index.hotel.latitude, longitude: +index.hotel.longitude});
            }
          }, error => { console.log(error); });
          this.app.getRest(elements.lat, elements.lon).subscribe(dt => {
            this.rests = dt.nearby_restaurants;
            // tslint:disable-next-line: prefer-const
            for (let index of dt.nearby_restaurants) {
              this._markersres.push({latitude: +index.restaurant.location.latitude, longitude: +index.restaurant.location.longitude});
            }
          }, error => { console.log(error); });
        }
      }
    });
  }

  veifres(price: any, name: any) {
    this.restPrice.push(price);
    this.res += price;
    this.restError = true;
    this.restName.push(name);
    this.showToast('top-right', 'success');
  }

  verifhotel(price: any, name: any) {
    if (this.counter === true) {
      this.counter = false;
      this.hot = price;
      this.hotelName = name;
    } else {
      this.hotelError = true;
      this.showToast('top-right', 'info');
    }
  }

  openWindow() {
    this.windowService.open(this.contentTemplate, { title: `Your Result`});
  }

  showToast(position, status) {
    this.index += 1;
    this.toastrService.show(
      status || 'Item selected',
      `Alert ${this.index}`,
      { position, status });
  }

  onBlurTime() {
    const time = Date.parse(this.dateTo) - Date.parse(this.dateFrom);
    const days = Math.round(time / (1000 * 60 * 60 * 24));
    if (days < 1) {
      this.TimeError = true;
    }
  }

  onBlurMoney() {
    if (+this.money < 1) {
      this.moenyError = true;
    }
  }

  onBlurPocket() {
    if (+this.pockectMoney >= +this.money) {
      this.pockectMoneyError = true;
    }
  }

  onSubmit() {
    this.app.money = this.money;
    this.app.pockectMoney = this.pockectMoney;
    this.app.dateFrom = this.dateFrom;
    this.app.dateTo = this.dateTo;

    const time = Date.parse(this.dateTo) - Date.parse(this.dateFrom);
    const days = Math.round(time / (1000 * 60 * 60 * 24));
    this.app.getCurrency(this.currCodeFrom).subscribe(data => {
      Object.entries(data.rates).forEach(([key, value]) => {
        if (key === this.currCodeTo) {
          this.valInTo = ((+this.money) * (+value));
          this.valInFrom = +this.money;
          this.valTo = +value;
          if (this.counter === false && this.restError === true) {
            this.totaleTo = +this.pockectMoney + (this.res * days) + (this.hot * days);
            this.totaleFrom = this.totaleTo / this.valTo;
            // tslint:disable-next-line:no-shadowed-variable
            const data = {
              user: this.logged,
              totalMoneyFrom: this.money,
              totalMoneyTo: this.valInTo,
              moneyToSpentFrom: this.totaleFrom,
              moneyToSpentTo: this.totaleTo,
              timeToSpent: days,
              timeFrom: this.dateFrom,
              timeTo: this.dateTo,
              rest: this.restName,
              restPrice: this.restPrice,
              hotel: this.hotelName,
              hotelPrice: this.hot
            };
            this.db.list('result').push(data);
          }
          if (this.counter === true && this.restError === false) {
            this.totaleTo = +this.pockectMoney;
            this.totaleFrom = this.totaleTo / this.valTo;
            // tslint:disable-next-line:no-shadowed-variable
            const data = {
              user: this.logged,
              totalMoneyFrom: this.money,
              totalMoneyTo: this.valInTo,
              moneyToSpentFrom: this.totaleFrom,
              moneyToSpentTo: this.totaleTo,
              timeToSpent: days,
              timeFrom: this.dateFrom,
              timeTo: this.dateTo,
            };
            this.db.list('result').push(data);
          }
          if (this.counter === true && this.restError === true) {
            this.totaleTo = +this.pockectMoney + (this.res * days);
            this.totaleFrom = this.totaleTo / this.valTo;
            // tslint:disable-next-line:no-shadowed-variable
            const data = {
              user: this.logged,
              totalMoneyFrom: this.money,
              totalMoneyTo: this.valInTo,
              moneyToSpentFrom: this.totaleFrom,
              moneyToSpentTo: this.totaleTo,
              timeToSpent: days,
              timeFrom: this.dateFrom,
              timeTo: this.dateTo,
              rest: this.restName,
              restPrice: this.restPrice,
            };
            this.db.list('result').push(data);
          }
          if (this.restError === false && this.counter === false) {
            this.totaleTo = +this.pockectMoney + (this.hot * days);
            this.totaleFrom = this.totaleTo / this.valTo;
            // tslint:disable-next-line:no-shadowed-variable
            const data = {
              user: this.logged,
              totalMoneyFrom: this.money,
              totalMoneyTo: this.valInTo,
              moneyToSpentFrom: this.totaleFrom,
              moneyToSpentTo: this.totaleTo,
              timeToSpent: days,
              timeFrom: this.dateFrom,
              timeTo: this.dateTo,
              hotel: this.hotelName,
              hotelPrice: this.hot
            };
            this.db.list('result').push(data);
          }
        }
      });
    });
    this.openWindow();
  }

}
