import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettings {

  public static API_URL = 'https://localhost:44382/';


  private _refreshrequired = new Subject<void>();
  get RequiredRefresh() {
    return this._refreshrequired;
  }




  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Get using id
   * @param url 
   * @param id 
   */
  getById<T>(url: string, id: any): Observable<any> {
    const rout = (id === undefined) ? `${AppSettings.API_URL}${url}` : `${AppSettings.API_URL}${url}/${id}`;
    return this.httpClient.get(rout);
  }

  /**
   * Delete function
   * @param url 
   * @param id 
   * @returns 
   */
  delete(url: string, id: number) {
    return this.httpClient.delete<any>(`${AppSettings.API_URL}${url}/${id}`);
  }


  /**
   * Update function
   * @param url 
   * @param body 
   * @returns 
   */
  update(url: string, body: any) {
    const res = `${AppSettings.API_URL}${url}`;
    return this.httpClient.put<any>(res, body);
  }

  /**
   * Create function
   * @param url 
   * @param body 
   */
  create<Object>(url: string, body: any) {
    return this.httpClient.post<any>(`${AppSettings.API_URL}${url}`, body);
  }
  /**
   * Get all function
   * @param url 
   * @returns 
   */
  getAll(url: string) {
    return this.httpClient.get<any[]>(`${AppSettings.API_URL}${url}`)
  }

}
