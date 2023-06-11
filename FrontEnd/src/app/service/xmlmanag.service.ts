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

  getAllData(XmlName: string): Observable<Array<Array<string>>>{
    const options = {
      params: {
        xmlName: XmlName
      }
    };
    return this.http.get<Array<Array<string>>>(this.baseApiUrl +  '/api/Chris/GetAllData', options);
  
  }

  getSomeData(XmlName: string, Atributes: string, Conditions: string): Observable<Array<Array<string>>>{
    const options = {
      params: {
        xmlName: XmlName,
        atributes: Atributes,
        conditions: Conditions
      }
    };
    return this.http.get<Array<Array<string>>>(this.baseApiUrl +  '/api/Chris/GetSomeData', options);
  
  }

  getSomeDataJoin(XmlName: string, Atributes: string, Conditions: string): Observable<Array<Array<string>>>{
    const options = {
      params: {
        xmlName: XmlName,
        atributes: Atributes,
        conditions: Conditions
      }
    };
    return this.http.get<Array<Array<string>>>(this.baseApiUrl +  '/api/Chris/GetSomeDataJoin', options);
  
  }
}
