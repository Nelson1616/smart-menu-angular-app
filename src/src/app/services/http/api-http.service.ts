import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(private http: HttpClient) {}

  private mainUrl: string = 'https://smartmenuapi.nntech.online/api/';

  private get(url: string) {
    return this.http.get(this.mainUrl + url) as Observable<{
      success: boolean;
      message: string;
      data: unknown;
    }>;
  }

  private post(url: string, body: object) {
    return this.http.post(this.mainUrl + url, body) as Observable<{
      success: boolean;
      message: string;
      data: unknown;
    }>;
  }

  getTableByCode(code: string) {
    return this.get('tables/' + code);
  }

  enterTableByCode(code: string, userName: string, userImageId: number) {
    return this.post('tables/enter/' + code, {
      'userName' : userName,
      'userImageId': userImageId
    });
  }
}
