import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Stop } from './models/stop.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(private httpClient: HttpClient) { }

  getStops(name: string): Observable<Stop[]> {
    return this.httpClient.get<Stop[]>(`${environment.apiUrl}/Routes/GetStops/?name=${name}`); // Automatic mapping
  }
}

