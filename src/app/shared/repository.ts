import { AppSettings } from "./app-settings";
// import { IRepository } from "./irepository";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class Repository {

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
     * @param idDoc 
     * @returns 
     */
    delete(url: string, idDoc: any) {
        return this.httpClient.delete(`${AppSettings.API_URL}${url}/${idDoc}/Delete`);
    }


    /**
     * Update function
     * @param url 
     * @param body 
     * @returns 
     */
    update(url: string, body: any) {
        const res = `${AppSettings.API_URL}${url}/Update`;
        return this.httpClient.put<any>(res, body);
    }

    /**
     * Create function
     * @param url 
     * @param body 
     */
    create(url: string, body: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Get all function
     * @param url 
     * @returns 
     */
    getAll(url: string) {
        debugger;
        return this.httpClient.get<any[]>(`${AppSettings.API_URL}${url}`,
            AppSettings.RequestOptions())
    }
}
