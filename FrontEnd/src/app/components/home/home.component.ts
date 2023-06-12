import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Datos } from 'src/app/models/chris.model';
import { XmlmanagService } from 'src/app/service/xmlmanag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // CARD STATUS
  createCardStatus: boolean = false;
  selectCardStatus: boolean = false;
  insertCardStatus: boolean = true;
  deleteCardStatus: boolean = false;
  updateCardStatus: boolean = false;

  datosXml: Datos = [];
  attrList: string[] = [];


  ngOnInit(): void {

  }

  constructor(private createF: FormBuilder, private selectF: FormBuilder, private selectJoinF: FormBuilder,
    private insertF: FormBuilder, private deleteF: FormBuilder, private updateF: FormBuilder,
    private Xml: XmlmanagService) { }

  //Forms
  createForm: FormGroup = this.createF.group({
    name: ['', [Validators.required]],
    atributte1: ['', [Validators.required]],
    atributte2: [''],
    atributte3: ['']
  })

  selectForm: FormGroup = this.selectF.group({
    select: [''],
    from: [''],
    where: ['']
  })

  selectJoinForm: FormGroup = this.selectJoinF.group({
    select: [''],
    from: [''],
    innerJoin: [''],
    on: ['']
  })

  insertForm: FormGroup = this.insertF.group({
    insertInto: [''],
    values: ['']
  })

  deleteForm: FormGroup = this.deleteF.group({
    deleteFrom: [''],
    where: ['']
  })

  updateForm: FormGroup = this.updateF.group({
    update: [''],
    set: [''],
    where: ['']
  })

  getData(nameXml: string, atributes: string, conditions: string){
    this.Xml.getData(nameXml, atributes, conditions).subscribe(data => {
      this.datosXml = data;
    });

    console.log(this.datosXml);
  }

  //unir varios xml y buscarlos
  getSomeJoin(nameXml: string, atributes: string, conditions: string) {
    this.Xml.getSomeDataJoin(nameXml, atributes, conditions).subscribe(data => {
      this.datosXml = data;
    });

    console.log(this.datosXml);
  }

  //crea el XML
  createXML(xmlName: string, attribList: Array<string>) {

    this.Xml.createXML(xmlName, attribList).subscribe(data => {});
    console.log("attrList: ", typeof this.attrList);

    this.attrList = [];

    console.log("createXML executed");
  }

  //Insert
  addData(xmlName: string, attribList: string) {
    this.Xml.addData(xmlName, attribList).subscribe(data => {});

    console.log("addData executed");
  }

  //OnSubmitForms ------------------------------------------
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


  //INSERT INTO =
  //VALUES =
  insertSubmit() {
    console.log(this.insertForm.value);
    this.insertForm.markAllAsTouched();

    if (this.insertForm.value.insertInto != "" && this.insertForm.value.values != "") {
      this.addData(this.insertForm.value.insertInto, this.insertForm.value.values)
    }
  }

  deleteSubmit() {
    console.log(this.deleteForm.value);
    this.deleteForm.markAllAsTouched();
  }

  updateSubmit() {
    console.log(this.updateForm.value);
    this.updateForm.markAllAsTouched();
  }

  //submit -------------------------------------------------
  submit() {
    console.log("submitted ");
  }


  // Change card status ------------------------------------
  createCardChange() {
    this.createCardStatus = !this.createCardStatus;
    console.log("createCardStatus: ", this.createCardStatus);
  }

  selectCardChange() {
    this.selectCardStatus = !this.selectCardStatus;
    console.log("selectCardStatus: ", this.selectCardStatus);
  }

  insertCardChange() {
    this.insertCardStatus = !this.insertCardStatus;
    console.log("insertCardSatatus: ", this.insertCardStatus);
  }

  deleteCardChange() {
    this.deleteCardStatus = !this.deleteCardStatus;
    console.log("deleteCardStatus: ", this.deleteCardStatus);
  }

  updateCardChange() {
    this.updateCardStatus = !this.updateCardStatus;
    console.log("updateCardStatus: ", this.updateCardStatus);
  }



}
