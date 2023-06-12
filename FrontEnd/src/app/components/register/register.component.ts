import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/service/validators.service';
import { XmlmanagService } from 'src/app/service/xmlmanag.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
/* The `export` keyword is used to make the `RegisterComponent` class available for use in other parts
of the application. It allows other modules or components to import and use the `RegisterComponent`
class. */
export class RegisterComponent {


  /**
   * This is a constructor function that takes in several services and initializes them for use in the
   * component.
   * @param {ValidatorsService} validatorService - It is an instance of the ValidatorsService class,
   * which is likely used for validating form inputs or other data in the application.
   * @param {FormBuilder} fb - The "fb" parameter is an instance of the FormBuilder class, which is
   * used to simplify the process of creating reactive forms in Angular. It provides a set of methods
   * to create form controls, form groups, and form arrays, and also allows you to define validators
   * and async validators for form controls.
   * @param {Router} router - The router parameter is an instance of the Angular Router service, which
   * is used for navigating between different views or components in an Angular application. It
   * provides methods for navigating to a specific route, navigating back to the previous route, and
   * navigating to a route with optional parameters. The Router service is typically injected into
   * @param {XmlmanagService} Xml - The Xml parameter is an instance of the XmlmanagService class,
   * which is likely used for managing XML data within the application.
   */
  constructor(private validatorService: ValidatorsService, private fb: FormBuilder, private router: Router,
    private Xml: XmlmanagService) {}

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  })

  /**
   * This function checks if a given form field is invalid and has been touched.
   * @param {string} campo - campo is a string parameter representing the name of a field in a form.
   * @returns The function `campoNoValido` is returning a boolean value. It is checking if the form
   * control with the given `campo` name is invalid and has been touched by the user. If both
   * conditions are true, it returns `true`, indicating that the field is not valid. Otherwise, it
   * returns `false`, indicating that the field is valid.
   */
  campoNoValido( campo: string ) {
    return this.registerForm.get(campo)?.invalid
            && this.registerForm.get(campo)?.touched;
  }

  /**
   * This function creates a user with a given username and password using an XML API.
   * @param {string} Username - A string representing the username of the user being created.
   * @param {string} Password - The "Password" parameter is a string that represents the password for
   * the user being created.
   */
  createUser(Username: string, Password: string) {
    this.Xml.createUser(Username, Password).subscribe(data => {

    })
  }

  /**
   * The onSubmit function checks if the password fields match, creates a user and navigates to the
   * home page, and marks all form fields as touched.
   */
  onSubmit() {

    if (this.validatorService.camposIguales(this.registerForm.value.password, this.registerForm.value.password2)) {
      this.createUser(this.registerForm.value.username, this.registerForm.value.password);
      this.router.navigate(['/']);
    }

    console.log(this.registerForm.value);
    this.registerForm.markAllAsTouched();

  }


}
