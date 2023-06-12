import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Datos } from 'src/app/models/chris.model';
import { XmlmanagService } from 'src/app/service/xmlmanag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // CARD STATUS
  createCardStatus: boolean = false;
  selectCardStatus: boolean = false;
  insertCardStatus: boolean = false;
  deleteCardStatus: boolean = false;
  updateCardStatus: boolean = false;

  datosXml: Datos = [];

  ngOnInit(): void {

  }

  constructor( private createF: FormBuilder, private selectF: FormBuilder, private selectJoinF: FormBuilder,
    private insertF: FormBuilder, private deleteF: FormBuilder, private updateF: FormBuilder,
    private Xml: XmlmanagService) {}

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

  getAll(nameXml: string) {
    console.log("nameXml: ", nameXml);
    
    this.Xml.getAllData(nameXml).subscribe(data => {
      this.datosXml = data;
    });

    console.log(this.datosXml);
  }

  //OnSubmitForms ------------------------------------------
  createSubmit() {
    console.log(this.createForm.value);
    this.createForm.markAllAsTouched();

    this.getAll(this.createForm.value.name);
  }

  selectSubmit() {
    console.log(this.selectForm.value);
    this.selectForm.markAllAsTouched();
  }

  selectJoinSubmit() {
    console.log(this.selectJoinForm.value);
    this.selectJoinForm.markAllAsTouched();
  }

  insertSubmit() {
    console.log(this.insertForm.value);
    this.insertForm.markAllAsTouched();
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
