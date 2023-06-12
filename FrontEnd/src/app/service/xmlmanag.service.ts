import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "src/enviroments/environments";

@Injectable({
  providedIn: 'root'
})
/* Exporting a TypeScript class called `XmlmanagService`. This class is decorated with `@Injectable`
which means it can be injected with dependencies. It contains methods that make HTTP requests to an
API to perform CRUD operations on XML data and also to create and authenticate users. */
export class XmlmanagService {


  baseApiUrl: string = enviroment.baseApiUrl;
  constructor(private http: HttpClient) { }


  /**
   * This function retrieves data from an API endpoint with specified parameters and returns an
   * observable array of arrays of strings.
   * @param {string} XmlName - The name of the XML file that contains the data to be retrieved.
   * @param {string} Atributes - A string that represents the attributes of the XML elements that you
   * want to retrieve. For example, if you want to retrieve the "name" and "age" attributes of all
   * "person" elements, you would pass in "name,age" as the value for Atributes.
   * @param {string} Conditions - Conditions are additional criteria that can be added to the query to
   * filter the data. For example, if you want to retrieve only the data that meets certain conditions,
   * you can specify those conditions in the "Conditions" parameter. These conditions can be based on
   * one or more attributes of the data.
   * @returns An Observable of an array of arrays of strings is being returned.
   */
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

  /**
   * This function retrieves some data by joining multiple tables based on specified attributes and
   * conditions.
   * @param {string} XmlName - The name of the XML file or document that contains the data to be
   * retrieved.
   * @param {string} Atributes - A string that represents the attributes to be selected from the XML
   * data. For example, if the XML data has attributes "name", "age", and "gender", the Atributes
   * parameter could be "name, age, gender".
   * @param {string} Conditions - Conditions are the criteria used to filter the data that is retrieved
   * from the API. It can be a combination of one or more conditions that are used to narrow down the
   * search results. For example, if you want to retrieve data for a specific date range or for a
   * specific category, you can use conditions
   * @returns An Observable of an array of arrays of strings is being returned.
   */
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

  /**
   * This function creates an XML file by sending a POST request to a specified API endpoint with a
   * request model containing the XML name and a list of attributes.
   * @param {string} XmlName - A string representing the name of the XML file to be created.
   * @param attribList - An array of strings representing the attributes to be included in the XML
   * element. For example, if the XML element is <person>, the attribList could include attributes such
   * as "name", "age", "gender", etc.
   * @returns An Observable of type void is being returned.
   */
  createXML(XmlName: string, attribList: Array<string>): Observable<void> {
    const requestModel = {
      request: XmlName,
      lista: attribList
    };

    return this.http.post<void>(this.baseApiUrl + '/api/Chris/CreateXML', requestModel);
  }


  /**
   * This function sends a POST request to a specific API endpoint with a given XML name and attribute
   * list.
   * @param {string} XmlName - A string parameter that represents the name of an XML file or document.
   * @param {string} attribList - attribList is a string parameter that represents a list of attributes
   * in XML format. It is used as a parameter in the API call to add data to a specific XML file.
   * @returns An Observable of type void is being returned.
   */
  addData(XmlName: string, attribList: string): Observable<void> {
    const url = `${this.baseApiUrl}/api/Chris/AgregarData?request=${XmlName}&Lista=${attribList}`;
    return this.http.post<void>(url, {});
  }



  /**
   * This function sends a request to delete data from a specified XML file with given conditions and
   * confirmation.
   * @param {string} XmlName - The name of the XML file that contains the data to be deleted.
   * @param {string} Conditions - Conditions is a string parameter that specifies the conditions for
   * deleting data from an XML file. It is used to filter the data that needs to be deleted based on
   * certain criteria. For example, if you want to delete all records where the "status" field is set
   * to "inactive", you would specify the
   * @param {boolean} Confirmation - Confirmation is a boolean parameter that indicates whether the
   * user wants to confirm the deletion of data before it is executed. If set to true, the user will be
   * prompted to confirm the deletion before it is carried out. If set to false, the deletion will be
   * executed without confirmation.
   * @returns An Observable of an array of arrays of strings is being returned.
   */
  deleteData(XmlName: string, Conditions: string, Confirmation: boolean): Observable<Array<Array<string>>> {
    const url = `${this.baseApiUrl}/api/Chris/DeleteData?xmlName=${XmlName}&conditions=${Conditions}&confirmation=${Confirmation}`;

    return this.http.get<Array<Array<string>>>(url);
  }


  /**
   * This function updates data in an API using the provided XML name, attributes, conditions, and
   * confirmation.
   * @param {string} XmlName - The name of the XML file that contains the data to be updated.
   * @param {string} Atributes - Attributes refer to the specific data fields or properties that need to
   * be updated in the XML file. For example, if the XML file contains information about a person's name,
   * age, and address, the attributes could be "name", "age", and "address". The "Attributes" parameter
   * in the
   * @param {string} Conditions - Conditions refer to the criteria or filters that are used to identify
   * the specific data that needs to be updated in the database. It is usually expressed in the form of a
   * SQL WHERE clause. For example, if you want to update the salary of an employee with the ID 1234, the
   * condition would
   * @param {boolean} Confirmation - A boolean value that indicates whether the update operation should
   * be confirmed or not. If set to true, the server will send a confirmation message after the update is
   * completed. If set to false, no confirmation message will be sent.
   * @returns An Observable of an array of arrays of strings is being returned.
   */
  updateData(XmlName: string, Atributes: string, Conditions: string, Confirmation: boolean): Observable<Array<Array<string>>> {
    console.log(XmlName, Atributes, Conditions, Confirmation);

    const url = `${this.baseApiUrl}/api/Chris/UpdateData`;
    const body = {
      XmlName: XmlName,
      Attributes: Atributes,
      Conditions: Conditions,
      Confirmation: Confirmation
    };
    return this.http.post<Array<Array<string>>>(url, body);
  }


  /**
   * This function creates a user by sending a POST request to a specified API endpoint with a username
   * and password as parameters.
   * @param {string} Username - A string representing the username of the user to be created.
   * @param {string} Password - A string representing the password for the user being created.
   * @returns An Observable of type void is being returned.
   */
  createUser(Username: string, Password: string): Observable<void> {
    const url = `${this.baseApiUrl}/api/Chris/CreateUser?username=${Username}&password=${Password}`;
    return this.http.post<void>(url, {});
  }


  /**
   * This function sends a GET request to a login API endpoint with a username and password and returns
   * an Observable of type boolean.
   * @param {string} Username - A string representing the username of the user trying to log in.
   * @param {string} Password - The password parameter is a string that represents the user's password.
   * It is used in the login function to authenticate the user's credentials and grant access to the
   * application.
   * @returns An Observable of type boolean is being returned.
   */
  loging(Username: string, Password: string): Observable<boolean> {
    const url = `${this.baseApiUrl}/api/Chris/Login?username=${Username}&password=${Password}`;

    return this.http.get<boolean>(url);
  }



}
