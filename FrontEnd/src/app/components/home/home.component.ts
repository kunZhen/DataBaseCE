import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // CARD STATUS
  createCardStatus: boolean = true;
  selectCardStatus: boolean = false;
  insertCardStatus: boolean = false;
  deleteCardStatus: boolean = false;
  updateCardStatus: boolean = false;


  ngOnInit(): void {

  }

  constructor( private createF: FormBuilder, private selectF: FormBuilder, private selectJoinF: FormBuilder,
    private insertF: FormBuilder, private deleteF: FormBuilder, private updateF: FormBuilder) {}

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

  //OnSubmitForms ------------------------------------------
  createSubmit() {
    console.log(this.createForm.value);
    this.createForm.markAllAsTouched();
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
