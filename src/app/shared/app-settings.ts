import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AppSettings {
    public static API_URL = 'https://localhost:44382/';


    static RequestOptions(requestType: any = 'application/json') {
        return {
            headers: new HttpHeaders({
                'Access-Control-Allow-Headers': '*',
                'Content-Type': requestType,
            })
        };
    }
}
