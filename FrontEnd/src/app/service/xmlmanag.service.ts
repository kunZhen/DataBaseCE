import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "src/enviroments/environments";

@Injectable({
  providedIn: 'root'
})
export class XmlmanagService {


  baseApiUrl: string = enviroment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllData(): Observable<Array<Array<string>>>{
    return this.http.get<Array<Array<string>>>(this.baseApiUrl +  '/api/Chris')
    
  }
}
