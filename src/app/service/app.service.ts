import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(protected http: HttpClient) { }

  login(data: any) {
    return this.http.post(`${environment.URL}/login`, data);
  }

  logout() {
    return this.http.get(`${environment.URL}/logout`);
  }

  getPlayers() {
    return this.http.get(`${environment.URL}/players`);
  }

  updateTeam(data: any) {
    return this.http.post(`${environment.URL}/team`, data);
  }

  getTeam() {
    return this.http.get(`${environment.URL}/team`);
  }
}
