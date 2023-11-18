import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(private http: HttpClient) {}

  private mainUrl: string = 'https://smartmenuapi.nntech.online/api/';

  private get(url: string): Observable<object> {
    return this.http.get(this.mainUrl + url);
  }

  private post(url: string, body: object): Observable<object> {
    return this.http.post(this.mainUrl + url, body);
  }

  getTableByCode(code: string): Observable<object> {
    return this.get('tables/' + code);
  }
}
