import { Component, OnInit } from '@angular/core';
import { Datos } from 'src/app/models/chris.model';
import { XmlmanagService } from 'src/app/service/xmlmanag.service';

@Component({
  selector: 'app-chris-list',
  templateUrl: './chris-list.component.html',
  styleUrls: ['./chris-list.component.css']
})
export class ChrisListComponent implements OnInit{

  /*chris: pruebaCh[] = [
    {
      id: 'asdasjkdasf',
      name: 'Sujeto',
      email: 'sujeto@prueba.com',
      phone: 846786,
      salary: 498,
      department: 'CE'
    },
    {
      id: 'asdaasdasdasf',
      name: 'Sujeto2',
      email: 'sujeto2@prueba.com',
      phone: 989135,
      salary: 156,
      department: 'Ati'
    },
    {
      id: 'sdfsdaf',
      name: 'Sujeto3',
      email: 'sujeto3@prueba.com',
      phone: 786132,
      salary: 920,
      department: 'U'
    },
    {
      id: 'abdfga',
      name: 'Sujeto4',
      email: 'sujeto4@prueba.com',
      phone: 6590,
      salary: 5,
      department: 'El'
    }
  ];*/
  Datosxml: Datos = [];
  constructor(private Xml: XmlmanagService) {}

  ngOnInit(): void {
    this.Xml.getAllData().subscribe(data => {
      this.Datosxml = data;
    });
  }

  getAtributoValor(instancia: string[], atributo: string): string {
    const atributoBuscado = instancia.find((item: string) => item.startsWith(atributo));
    if (atributoBuscado) {
      return atributoBuscado.split(':')[1];
    } else {
      return '';
    }
  }

}
