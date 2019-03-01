import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  getSymbol(): Observable <any> {
    return this.http.get('http://data.fixer.io/api/symbols?access_key=d8c7c7aa670179bcf2589882df3480f8');
  }

  getCurrency(): Observable <any> {
    return this.http.get<any>('http://data.fixer.io/api/latest?access_key=d8c7c7aa670179bcf2589882df3480f8');
  }

  getHistory(date: string): Observable <any> {
    return this.http.get(`http://data.fixer.io/api/${date}?access_key=d8c7c7aa670179bcf2589882df3480f8`);
  }

  getLocation(): Observable <any> {
    return this.http.get(`http://api.ipapi.com/197.14.157.140?access_key=b6e7a2d65110e9de73b56dc2ac44dd18`);
  }
}
