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


  getData(XmlName: string, Atributes: string, Conditions: string): Observable<Array<Array<string>>>{
    const options = {
      params: {
        xmlName: XmlName,
        atributes: Atributes,
        conditions: Conditions
      }
    };
    return this.http.get<Array<Array<string>>>(this.baseApiUrl +  '/api/Chris/GetData', options);

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

  createXML(XmlName: string, attribList: Array<string>): Observable<void> {
    const requestModel = {
      request: XmlName,
      lista: attribList
    };
  
    return this.http.post<void>(this.baseApiUrl + '/api/Chris/CreateXML', requestModel);
  }


  addData(XmlName: string, attribList: string): Observable<void>{
    const options = {
      params: {
        request: XmlName,
        Lista: attribList
      }
    };
    console.log("se llamo")
    console.log(options);
    return this.http.post<void>(this.baseApiUrl +  '/api/Chris/AgregarData', options);
  }

  deleteData(XmlName: string, Conditions: string, Confirmation: boolean): Observable<Array<Array<string>>>{
    const options = {
      params: {
        xmlName: XmlName,
        conditions: Conditions,
        confirmation: Confirmation

      }
    };
    return this.http.get<Array<Array<string>>>(this.baseApiUrl +  '/api/Chris/DeleteData', options);

  }

  updateData(XmlName: string, Atributes:string, Conditions: string, Confirmation: boolean): Observable<Array<Array<string>>>{
    const options = {
      params: {
        xmlName: XmlName,
        conditions: Conditions,
        atributtes: Atributes,
        confirmation: Confirmation

      }
    };
    return this.http.get<Array<Array<string>>>(this.baseApiUrl +  '/api/Chris/UpdateData', options);

  }

  createUser(Username: string, Password: string): Observable<void>{
    const options = {
      params: {
        username: Username,
        password: Password
      }
    };
    return this.http.post<void>(this.baseApiUrl +  '/api/Chris/CreateUser', options);
  }

  Loging(Username: string, Password: string): Observable<boolean>{
    const options = {
      params: {
        username: Username,
        password: Password
      }
    };
    return this.http.get<boolean>(this.baseApiUrl +  '/api/Chris/Login', options);
  }


}
