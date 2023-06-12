import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/service/validators.service';
import { XmlmanagService } from 'src/app/service/xmlmanag.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/* The `export` keyword is used to make the `LoginComponent` class available for use in other parts of
the application. It allows other modules or components to import and use the `LoginComponent`. */
export class LoginComponent {

  logInStatus: boolean = false;

  /**
   * This is a constructor function that takes in several dependencies including FormBuilder,
   * ValidatorsService, Router, and XmlmanagService.
   * @param {FormBuilder} fb - The `fb` parameter is an instance of the `FormBuilder` class, which is
   * used to create and manage forms in Angular applications. It provides methods for creating form
   * controls, form groups, and form arrays, as well as validators for form inputs.
   * @param {ValidatorsService} validatorService - It is a service that provides custom validators for
   * form fields. It is injected into the constructor using Angular's dependency injection system.
   * @param {Router} router - The router parameter is an instance of the Angular Router service, which
   * is used for navigating between different views or components in an Angular application. It
   * provides methods for navigating to a specific route, navigating back to the previous route, and
   * navigating to a route with optional parameters. The router service is typically injected into
   * @param {XmlmanagService} Xml - It seems like "Xml" is an instance of a service called
   * "XmlmanagService". This service might be used for managing XML data or performing operations
   * related to XML.
   */
  constructor( private fb: FormBuilder, private validatorService: ValidatorsService, private router: Router,
    private Xml: XmlmanagService) {}

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  /**
   * This function checks if a given field in a login form is invalid and has been touched.
   * @param {string} campo - campo is a string parameter that represents the name of a field in a form.
   * @returns The function `campoNoValido` is returning a boolean value. It is checking if the form
   * control with the given `campo` name is invalid and has been touched by the user. If both
   * conditions are true, it returns `true`, indicating that the field is not valid. Otherwise, it
   * returns `false`, indicating that the field is valid.
   */
  campoNoValido( campo: string ) {
    return this.loginForm.get(campo)?.invalid
            && this.loginForm.get(campo)?.touched;
  }

  /**
   * This function logs in a user with a given username and password and subscribes to an XML response.
   * @param {string} Username - The username parameter is a string that represents the username entered
   * by the user during the login process.
   * @param {string} Password - The `Password` parameter is a string that represents the password
   * entered by the user during the login process. It is used as an input parameter for the `loging`
   * function, which is responsible for authenticating the user's credentials and returning a response
   * indicating whether the login was successful or not.
   */
  loging(Username: string, Password: string) {
    this.Xml.loging(Username, Password).subscribe(data => {
      this.logInStatus = data;
      console.log("data: ", data)
    });

    console.log("loging executed");
  }

  /**
   * The onSubmit function logs the login form value, marks all fields as touched, validates the
   * username and password, and navigates to the home page if the validation is successful.
   */
  onSubmit() {
    console.log(this.loginForm.value);
    this.loginForm.markAllAsTouched();

    this.loging(this.loginForm.value.username, this.loginForm.value.password);
    // se encarga de validar el usuario y contrasenia
    if (this.validatorService.userPasswordValid(this.loginForm.value.username, this.loginForm.value.password) && this.logInStatus) {
      this.router.navigate(['/home']);
    }

  }
}
