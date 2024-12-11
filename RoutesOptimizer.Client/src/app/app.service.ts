import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(private httpClient: HttpClient) { }

  get() {
    return this.httpClient.get(`${environment.apiUrl}/WeatherForecast`);
  }

}
