import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
/* The `export` keyword is used to make the `ValidatorsService` class available for use in other parts
of the application. It allows other modules to import and use the `ValidatorsService` class. */
export class ValidatorsService {

  constructor() { }

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  /**
   * This function checks if a username and password are valid by trimming and converting them to
   * lowercase, and returns true if both are not empty.
   * @param {string} username - A string representing the username to be validated.
   * @param {string} password - The `password` parameter is a string that represents the password that
   * needs to be validated.
   * @returns a boolean value. It returns `true` if both the `username` and `password` parameters are
   * not empty strings after being trimmed and converted to lowercase, and `false` otherwise.
   */
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

  /**
   * The function checks if two string fields are equal after trimming and returns true if they are,
   * false otherwise.
   * @param {string} campo1 - The first parameter is a string variable named "campo1".
   * @param {string} campo2 - The parameter "campo2" is a string representing the second field or input
   * to be compared with the first field or input ("campo1") in the "camposIguales" function.
   * @returns a boolean value. It returns `false` if the two input strings are not equal or if `campo1`
   * is an empty string. Otherwise, it returns `true`.
   */
  camposIguales(campo1: string, campo2: string) {
    const pass1 = campo1?.trim();
    const pass2 = campo2?.trim();

    if (pass1 != pass2 || pass1 == '') {
      return false;
      }

    return true;
  }
}
