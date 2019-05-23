import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  to: any;
  from: any;

  money: any;
  pockectMoney: any;
  dateFrom: any;
  dateTo: any;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  getCurrency(symbole: any): Observable <any> {
    return this.http.get(`https://v3.exchangerate-api.com/bulk/25570423aa4ee829b429ed2c/${symbole}`);
  }

  getHistory(date: any): Observable <any> {
    return this.http.get(`http://data.fixer.io/api/${date}?access_key=d8c7c7aa670179bcf2589882df3480f8`);
  }

  postToken(): Observable <any> {
    // tslint:disable-next-line:max-line-length
    const httpBody = new HttpParams().set('grant_type', 'client_credentials').set('client_id', '1U4zgMkro0jBNUdEnyMGKNpMtPKcntbQ').set('client_secret', 'KYKRpOlz6sfjZglR');
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
    return this.http.post<any>('https://test.api.amadeus.com/v1/security/oauth2/token', httpBody, httpOptions);
  }

  getHotels(lat: any, lon: any, token: any): Observable <any> {
    const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    // tslint:disable-next-line:max-line-length
    return this.http.get(`https://test.api.amadeus.com/v2/shopping/hotel-offers?latitude=${lat}&longitude=${lon}&radius=10&radiusUnit=KM&paymentPolicy=NONE&includeClosed=false&view=FULL&sort=NONE`, {headers: header}).pipe(catchError(this.handleError));
  }

  getRest(lat: any, lon: any): Observable <any> {
    const httpOptions = {headers: new HttpHeaders({'user-key': 'bf8b9990fbc02287dbed9781fc6172f8'})};
    // tslint:disable-next-line:max-line-length
    return this.http.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`, httpOptions).pipe(catchError(this.handleError));
  }

  getLocation(): Observable <any> {
    return this.http.get(`http://api.ipapi.com/197.14.157.140?access_key=b6e7a2d65110e9de73b56dc2ac44dd18`);
  }

  /*
  getCity(): Observable <any> {
    return this.http.get('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json');
  }*/

  getCity(): Observable <any> {
    return this.http.get('./assets/city.list.min.json');
  }

  getAllCountries(): Observable <any> {
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }

}
