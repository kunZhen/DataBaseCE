import { Component } from '@angular/core';

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


  ngOnInit(): void {

  }

  //submit
  submit() {
    console.log("submitted ");
  }


  // Change card status
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
