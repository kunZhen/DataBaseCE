import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Datos } from 'src/app/models/chris.model';
import { XmlmanagService } from 'src/app/service/xmlmanag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/* The HomeComponent class initializes boolean variables and arrays for card status, data, and
attribute lists in TypeScript. */
export class HomeComponent implements OnInit {
  // CARD STATUS
  createCardStatus: boolean = true;
  selectCardStatus: boolean = false;
  insertCardStatus: boolean = false;
  deleteCardStatus: boolean = false;
  updateCardStatus: boolean = false;

  datosXml: Datos = [];
  attrList: string[] = [];


  ngOnInit(): void {

  }

  /**
   * This is a constructor function that takes in several instances of FormBuilder and XmlmanagService
   * as parameters.
   * @param {FormBuilder} createF - An instance of the FormBuilder class used to create forms for
   * creating new data entries.
   * @param {FormBuilder} selectF - This is an instance of the FormBuilder class used for creating
   * forms for selecting data from a database.
   * @param {FormBuilder} selectJoinF - This parameter is an instance of the FormBuilder class, which
   * is used to create a form for selecting and joining data from multiple tables in a database. It is
   * likely used in a component or service that deals with querying data from a database.
   * @param {FormBuilder} insertF - This is an instance of the FormBuilder class, which is used to
   * create a form for inserting data into a database. It is likely used in conjunction with the
   * XmlmanagService to send the data to the database in XML format.
   * @param {FormBuilder} deleteF - This parameter is an instance of the FormBuilder class, which is
   * used to create a form for deleting data. It is likely used in a component or service that deals
   * with deleting data from a database or other data source.
   * @param {FormBuilder} updateF - The updateF parameter is an instance of the FormBuilder class,
   * which is used to create and manage forms in Angular applications. It is likely being used to
   * create a form for updating data in the application.
   * @param {XmlmanagService} Xml - An instance of the XmlmanagService class, which is likely used for
   * managing XML data in the application.
   */
  constructor(private createF: FormBuilder, private selectF: FormBuilder, private selectJoinF: FormBuilder,
    private insertF: FormBuilder, private deleteF: FormBuilder, private updateF: FormBuilder,
    private Xml: XmlmanagService) { }

  //Forms
  /* `createForm` is a property of the `HomeComponent` class that is being initialized with a new
  instance of the `FormGroup` class. The `FormGroup` instance is being created using the `createF`
  instance of the `FormBuilder` class, which is passed in as a parameter to the constructor
  function. The `createForm` property is defining a form with four fields: `name`, `attribute1`,
  `attribute2`, and `attribute3`. The `name` and `attribute1` fields are required, as indicated by
  the `Validators.required` parameter passed in as the second argument to the `FormControl`
  constructor. The `attribute2` and `attribute3` fields are optional, as they are initialized with
  an empty string. */
  createForm: FormGroup = this.createF.group({
    name: ['', [Validators.required]],
    atributte1: ['', [Validators.required]],
    atributte2: [''],
    atributte3: ['']
  })

  /* `selectForm` is a property of the `HomeComponent` class that is being initialized with a new
  instance of the `FormGroup` class. The `FormGroup` instance is being created using the `selectF`
  instance of the `FormBuilder` class, which is passed in as a parameter to the constructor
  function. The `selectForm` property is defining a form with three fields: `select`, `from`, and
  `where`. These fields are used for selecting data from a database. The `select` and `from` fields
  are optional, as they are initialized with an empty string. The `where` field is also optional,
  but it is initialized with a value of `*`. */
  selectForm: FormGroup = this.selectF.group({
    select: [''],
    from: [''],
    where: ['']
  })

  /* `selectJoinForm` is creating a new instance of the `FormGroup` class using the `selectJoinF`
  instance of the `FormBuilder` class. It is defining a form with four fields: `select`, `from`,
  `innerJoin`, and `on`. These fields are likely used for selecting and joining data from multiple
  tables in a database. The fields are initialized with empty strings. */
  selectJoinForm: FormGroup = this.selectJoinF.group({
    select: [''],
    from: [''],
    innerJoin: [''],
    on: ['']
  })

  /* The above code is defining a FormGroup object called "insertForm" using the FormBuilder service.
  The FormGroup has two form controls: "insertInto" and "values", both of which are initially set to
  empty strings. This FormGroup can be used to create a form in a TypeScript application. */
  insertForm: FormGroup = this.insertF.group({
    insertInto: [''],
    values: ['']
  })

  /* The above code is defining a FormGroup object named "deleteForm" using the FormBuilder object
  "deleteF". The FormGroup has two form controls named "deleteFrom" and "where", both initialized
  with empty string values. This code is likely part of a larger form implementation for deleting
  data from a database or other data source. */
  deleteForm: FormGroup = this.deleteF.group({
    deleteFrom: [''],
    where: ['']
  })

  /* The above code is defining a FormGroup object named "updateForm" using the FormBuilder object
  "updateF". The FormGroup has three form controls named "update", "set", and "where", each
  initialized with an empty string as their default value. This code is likely used in a reactive
  form in a TypeScript file. */
  updateForm: FormGroup = this.updateF.group({
    update: [''],
    set: [''],
    where: ['']
  })

  /**
   * The function retrieves data from an XML file and assigns it to a variable, and then logs the
   * variable to the console.
   * @param {string} nameXml - The name of the XML file or resource from which data is being retrieved.
   * @param {string} atributes - A string that specifies the attributes to retrieve from the XML data.
   * For example, if the XML data has attributes "id", "name", and "age", the atributes parameter could
   * be "id, name, age".
   * @param {string} conditions - The "conditions" parameter is a string that specifies the conditions
   * that must be met in order to retrieve the data from the XML file. It could include things like
   * filtering by certain attributes or values, or specifying a range of data to retrieve. The exact
   * format and syntax of the conditions will depend on the
   */
  getData(nameXml: string, atributes: string, conditions: string) {
    this.Xml.getData(nameXml, atributes, conditions).subscribe(data => {
      this.datosXml = data;
    });

    console.log(this.datosXml);
  }

  //unir varios xml y buscarlos
  /**
   * This function retrieves some data from an XML file using a join operation and logs it to the
   * console.
   * @param {string} nameXml - The name of the XML file or resource from which data is being retrieved.
   * @param {string} atributes - The "atributes" parameter is a string that specifies the attributes of
   * the XML elements that should be returned in the query result. It is used in conjunction with the
   * "nameXml" and "conditions" parameters to construct a query that retrieves data from an XML file.
   * @param {string} conditions - The "conditions" parameter is a string that specifies the conditions
   * that must be met for the join operation to be performed. It typically includes one or more SQL
   * statements that specify the columns to be joined and the criteria for matching rows from the two
   * tables being joined. For example, a condition might specify that
   */
  getSomeJoin(nameXml: string, atributes: string, conditions: string) {
    this.Xml.getSomeDataJoin(nameXml, atributes, conditions).subscribe(data => {
      this.datosXml = data;
    });

    console.log(this.datosXml);
  }

  //crea el XML
  /**
   * The function creates an XML with a given name and list of attributes using TypeScript.
   * @param {string} xmlName - a string representing the name of the XML file to be created.
   * @param attribList - An array of strings representing the attributes to be added to the XML element
   * being created.
   */
  createXML(xmlName: string, attribList: Array<string>) {

    this.Xml.createXML(xmlName, attribList).subscribe(data => { });
    console.log("attrList: ", typeof this.attrList);

    this.attrList = [];

    console.log("createXML executed");
  }

  //Insert
  /**
   * The function adds data to an XML file and logs a message to the console.
   * @param {string} xmlName - A string representing the name of the XML data to be added.
   * @param {string} attribList - attribList is a string parameter that contains a list of attributes
   * to be added to the XML data. It is likely in a specific format, such as a comma-separated list or
   * a JSON object, depending on how the XML data is structured.
   */
  addData(xmlName: string, attribList: string) {
    this.Xml.addData(xmlName, attribList).subscribe(data => { });

    console.log("addData executed");
  }

  /**
   * The function deletes data from an XML file based on specified conditions and confirmation.
   * @param {string} xmlName - The name of the XML file from which data needs to be deleted.
   * @param {string} conditions - The conditions parameter is a string that specifies the conditions
   * that must be met in order for the data to be deleted from the XML file. It could include things
   * like specific values for certain fields or a range of values for a particular field.
   * @param {boolean} confirmation - A boolean value that indicates whether the user has confirmed the
   * deletion of data. If set to true, the data will be deleted. If set to false, the deletion will be
   * cancelled.
   */
  deleteData(xmlName: string, conditions: string, confirmation: boolean) {
    this.Xml.deleteData(xmlName, conditions, confirmation).subscribe(data => {
      this.datosXml = data;
    })

    console.log("deleteData excuted");
  }

  /**
   * The function updates data in an XML file based on specified attributes and conditions, with an
   * option for confirmation.
   * @param {string} XmlName - The name of the XML file that needs to be updated.
   * @param {string} Atributes - Atributes is a string parameter that represents the attributes that
   * need to be updated in the XML file. It could be a single attribute or multiple attributes
   * separated by commas. For example, "name='John', age='30'".
   * @param {string} Conditions - Conditions are the criteria used to identify the specific data that
   * needs to be updated in the XML file. It can be a combination of one or more attributes or values
   * that uniquely identify the data to be updated. For example, if you want to update the name of a
   * specific user in an XML file,
   * @param {boolean} Confirmation - Confirmation is a boolean parameter that determines whether the
   * update operation should be confirmed or not. If it is set to true, the update operation will only
   * be executed if the user confirms it. If it is set to false, the update operation will be executed
   * without confirmation.
   */
  updateData(XmlName: string, Atributes: string, Conditions: string, Confirmation: boolean) {
    this.Xml.updateData(XmlName, Atributes, Conditions, Confirmation).subscribe(data => {
      this.datosXml = data;
    });

    console.log("updateData executed")
  }

  //OnSubmitForms ------------------------------------------
  /**
   * This function creates an XML file based on the values entered in a form.
   */
  createSubmit() {
    console.log(this.createForm.value);
    this.createForm.markAllAsTouched();

    if (this.createForm.value.name != "" && this.createForm.value.atributte1 != "" && this.createForm.value.atributte2 == "" && this.createForm.value.atributte3 == "") {
      this.attrList.push(this.createForm.value.atributte1.toString());

      this.createXML(this.createForm.value.name, this.attrList);
    }

    if (this.createForm.value.name != "" && this.createForm.value.atributte1 != "" && this.createForm.value.atributte2 != "" && this.createForm.value.atributte3 == "") {
      this.attrList.push(this.createForm.value.atributte1);
      this.attrList.push(this.createForm.value.atributte2);

      this.createXML(this.createForm.value.name, this.attrList);
    }

    if (this.createForm.value.name != "" && this.createForm.value.atributte1 != "" && this.createForm.value.atributte2 != "" && this.createForm.value.atributte3 != "") {
      this.attrList.push(this.createForm.value.atributte1);
      this.attrList.push(this.createForm.value.atributte2);
      this.attrList.push(this.createForm.value.atributte3);

      this.createXML(this.createForm.value.name, this.attrList);
    }
  }

  /**
   * The function handles different SELECT queries based on the values of the selectForm inputs.
   */
  selectSubmit() {
    console.log(this.selectForm.value);
    this.selectForm.markAllAsTouched();

    // SELECT = *
    // FROM = Carros
    // WHERE = *
    if (this.selectForm.value.from != "" && this.selectForm.value.select == "*" && this.selectForm.value.where == "*") {
      this.getData(this.selectForm.value.from, this.selectForm.value.select, this.selectForm.value.where);
    }

    // SELECT = Modelo
    // FROM = Carros
    // WHERE = *
    if (this.selectForm.value.from != "" && this.selectForm.value.select != "" && this.selectForm.value.where == "*") {
      this.getData(this.selectForm.value.from, this.selectForm.value.select, this.selectForm.value.where);
    }

    // SELECT = Modelo
    // FROM = Carros
    // WHERE = Año=2001
    if (this.selectForm.value.from != "" && this.selectForm.value.select != "" && this.selectForm.value.where != "") {
      this.getData(this.selectForm.value.from, this.selectForm.value.select, this.selectForm.value.where);
    }
  }


  /**
   * The function selects and joins data from two tables based on specified criteria.
   */
  selectJoinSubmit() {
    console.log(this.selectJoinForm.value);
    this.selectJoinForm.markAllAsTouched();

    // FROM = Personas
    // INNER JOIN = CarrosDueño
    // SELECT = CarrosDueño.Modelo, Personas.Nombre
    // ON = Personas.Nombre=CarrosDueño.Dueño or Personas.Edad=CarrosDueño.Edad

    if (this.selectJoinForm.value.from != "" && this.selectJoinForm.value.innerJoin != "" && this.selectJoinForm.value.select != "" && this.selectJoinForm.value.on != "") {
      this.getSomeJoin(this.selectJoinForm.value.from + ", " + this.selectJoinForm.value.innerJoin, this.selectJoinForm.value.select, this.selectJoinForm.value.on);
    }
  }


  //INSERT INTO = Reloj
  //VALUES = Color:Verde
  /**
   * The function logs the values of a form and adds data to a database if certain conditions are met.
   */
  insertSubmit() {
    console.log(this.insertForm.value);
    this.insertForm.markAllAsTouched();

    if (this.insertForm.value.insertInto != "" && this.insertForm.value.values != "") {
      this.addData(this.insertForm.value.insertInto, this.insertForm.value.values)
    }
  }


  /**
   * The function deletes data from a specified table based on a specified condition.
   */
  deleteSubmit() {
    console.log(this.deleteForm.value);
    this.deleteForm.markAllAsTouched();

    //DELETE FROM = Reloj
    //WHERE = *

    //DELETE FROM = Reloj
    //WHERE = Azul

    if (this.deleteForm.value.deleteFrom != "" && this.deleteForm.value.where != "") {
      this.deleteData(this.deleteForm.value.deleteFrom, this.deleteForm.value.where, false)
    }
  }


  //UPDATE = Reloj
  //SET = Color=Azul
  //WHERE = Color=Rosado
  /**
   * The function logs the values of a form, marks it as touched, and updates data if certain
   * conditions are met.
   */
  updateSubmit() {
    console.log(this.updateForm.value);
    this.updateForm.markAllAsTouched();

    if (this.updateForm.value.update != "" && this.updateForm.value.set != "" && this.updateForm.value.where != "") {
      this.updateData(this.updateForm.value.update, this.updateForm.value.set, this.updateForm.value.where, false);
    }
  }

  //submit -------------------------------------------------
  /**
   * The function checks if certain conditions are met before calling deleteData() or updateData() and
   * logs a message.
   */
  submit() {
    if (this.deleteCardStatus && this.deleteForm.value.deleteFrom != "" && this.deleteForm.value.where != "") {
      this.deleteData(this.deleteForm.value.deleteFrom, this.deleteForm.value.where, true)
    }

    if (this.updateCardStatus && this.updateForm.value.update != "" && this.updateForm.value.set != "" && this.updateForm.value.where != "") {
      this.updateData(this.updateForm.value.update, this.updateForm.value.set, this.updateForm.value.where, true);
    }

    console.log("submitted ");
  }


  // Change card status ------------------------------------
  /**
   * The function toggles the status of a card creation feature and logs the new status to the console.
   */
  createCardChange() {
    this.createCardStatus = !this.createCardStatus;
    console.log("createCardStatus: ", this.createCardStatus);
  }

  /**
   * The function toggles the status of a select card.
   */
  selectCardChange() {
    this.selectCardStatus = !this.selectCardStatus;
    console.log("selectCardStatus: ", this.selectCardStatus);
  }

  /**
   * The function toggles the status of a card insertion.
   */
  insertCardChange() {
    this.insertCardStatus = !this.insertCardStatus;
    console.log("insertCardSatatus: ", this.insertCardStatus);
  }

  /**
   * The function toggles the status of a delete card feature and logs the current status to the
   * console.
   */
  deleteCardChange() {
    this.deleteCardStatus = !this.deleteCardStatus;
    console.log("deleteCardStatus: ", this.deleteCardStatus);
  }

  /**
   * The function toggles the updateCardStatus boolean and logs its current value.
   */
  updateCardChange() {
    this.updateCardStatus = !this.updateCardStatus;
    console.log("updateCardStatus: ", this.updateCardStatus);
  }

}
