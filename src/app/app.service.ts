import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  to: any;
  from: any;

  constructor(private http: HttpClient) {}

  getCurrency(symbole: any): Observable <any> {
    return this.http.get(`https://v3.exchangerate-api.com/bulk/25570423aa4ee829b429ed2c/${symbole}`);
  }

  getHistory(date: any): Observable <any> {
    return this.http.get(`http://data.fixer.io/api/${date}?access_key=d8c7c7aa670179bcf2589882df3480f8`);
  }

  getHotels(lat: any, lon: any): Observable <any> {
    const header = new HttpHeaders().append('Authorization', 'Bearer 1CNGajno6lIUt0ISAyoznHYMZKtM');
    // tslint:disable-next-line:max-line-length
    return this.http.get(`https://test.api.amadeus.com/v2/shopping/hotel-offers?latitude=${lat}&longitude=${lon}&radius=10&radiusUnit=KM&paymentPolicy=NONE&includeClosed=false&bestRateOnly=true&view=FULL&sort=NONE`, {headers: header});
  }

  getRest(lat: any, lon: any): Observable <any> {
    const header = new HttpHeaders().append('Authorization', 'Bearer bf8b9990fbc02287dbed9781fc6172f8');
    return this.http.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`, {headers: header});
  }

  getLocation(): Observable <any> {
    return this.http.get(`http://api.ipapi.com/197.14.157.140?access_key=b6e7a2d65110e9de73b56dc2ac44dd18`);
  }

  getCity(): Observable <any> {
    return this.http.get('assets/city.list.min.json');
  }

  getAllCountries(): Observable <any> {
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }
}
