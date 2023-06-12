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


  getData(XmlName: string, Atributes: string, Conditions: string): Observable<Array<Array<string>>> {
    const options = {
      params: {
        xmlName: XmlName,
        atributes: Atributes,
        conditions: Conditions
      }
    };
    return this.http.get<Array<Array<string>>>(this.baseApiUrl + '/api/Chris/GetData', options);

  }

  getSomeDataJoin(XmlName: string, Atributes: string, Conditions: string): Observable<Array<Array<string>>> {
    const options = {
      params: {
        xmlName: XmlName,
        atributes: Atributes,
        conditions: Conditions
      }
    };
    return this.http.get<Array<Array<string>>>(this.baseApiUrl + '/api/Chris/GetSomeDataJoin', options);

  }

  createXML(XmlName: string, attribList: Array<string>): Observable<void> {
    const requestModel = {
      request: XmlName,
      lista: attribList
    };

    return this.http.post<void>(this.baseApiUrl + '/api/Chris/CreateXML', requestModel);
  }


  addData(XmlName: string, attribList: string): Observable<void>{
    const url = `${this.baseApiUrl}/api/Chris/AgregarData?request=${XmlName}&Lista=${attribList}`;
    return this.http.post<void>(url, {});
}



  deleteData(XmlName: string, Conditions: string, Confirmation: boolean): Observable<Array<Array<string>>> {
    const url = `${this.baseApiUrl}/api/Chris/DeleteData?xmlName=${XmlName}&conditions=${Conditions}&confirmation=${Confirmation}`;

    return this.http.get<Array<Array<string>>>(url);
}


  updateData(XmlName: string, Atributes: string, Conditions: string, Confirmation: boolean): Observable<Array<Array<string>>> {
    const options = {
      params: {
        xmlName: XmlName,
        conditions: Conditions,
        atributtes: Atributes,
        confirmation: Confirmation

      }
    };
    return this.http.get<Array<Array<string>>>(this.baseApiUrl + '/api/Chris/UpdateData', options);

  }

  createUser(Username: string, Password: string): Observable<void>{
    const url = `${this.baseApiUrl}/api/Chris/CreateUser?username=${Username}&password=${Password}`;
    return this.http.post<void>(url, {});
}



  loging(Username: string, Password: string): Observable<boolean> {
    const url = `${this.baseApiUrl}/api/Chris/Login?username=${Username}&password=${Password}`;

    return this.http.get<boolean>(url);
  }



}
