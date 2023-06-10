import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  userPasswordValid(username: string, password: string) {
    const usuario = username?.trim().toLowerCase();
    const contrasenia = password?.trim().toLowerCase();

    console.log('usuario: ', usuario);
    console.log('contrasenia: ', contrasenia);

    if (usuario == '' || contrasenia == '') {
      return false;
    }

    return true;
  }

  camposIguales(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ noIguales: true })
        return { noIguales: true }
      }

      formGroup.get(campo2)?.setErrors(null)

      return null;
    }
  }
}
