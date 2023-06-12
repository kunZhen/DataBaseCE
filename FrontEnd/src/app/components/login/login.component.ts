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
export class LoginComponent {

  logInStatus: boolean = false;

  constructor( private fb: FormBuilder, private validatorService: ValidatorsService, private router: Router,
    private Xml: XmlmanagService) {}

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  campoNoValido( campo: string ) {
    return this.loginForm.get(campo)?.invalid
            && this.loginForm.get(campo)?.touched;
  }

  loging(Username: string, Password: string) {
    this.Xml.loging(Username, Password).subscribe(data => {
      this.logInStatus = data;
      console.log("data: ", data)
    });

    console.log("loging executed");
  }

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
