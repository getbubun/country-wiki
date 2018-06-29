import { Injectable } from '@angular/core';
import { ApiFormat} from './api-format'
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AppService implements ApiFormat {

  public baseUrl = "https://restcountries.eu";

  constructor(private http: HttpClient) { }

//Method to handle http calls
public handleError(err: HttpErrorResponse) {
  console.log("Handle error HTTP calls");
  console.log(err.message);
  return Observable.throw(err.message);
}

//Method to getAllCountries
public getAllCountries(firstLevel,secondLevel,thirdLevel): Observable<any> {
  return this.http.get(`${this.baseUrl}/rest/v2/${firstLevel}/${secondLevel}?fields=name;region;capital;currencies;subregion;timezones;population;languages;flag;alpha3Code`)
    .do(data => console.log('Message from AppService : Countries Found'))
    .catch(this.handleError);
} 

//Method to getCountryByName
public getCountryDetailsByName(countryName): Observable<any> {
  return this.http.get(`${this.baseUrl}/rest/v2/name/${countryName}?fullText=true`)
    .do(data => console.log('Message from AppService : Single Country Found'))
    .catch(this.handleError);
} 

//Method to getCountryByCode
public getCountryDetailsByCode(countryCode): Observable<any> {
  return this.http.get(`${this.baseUrl}/rest/v2/alpha/${countryCode}`)
    .do(data => console.log('Message from AppService : Single Country Found'))
    .catch(this.handleError);
}
}