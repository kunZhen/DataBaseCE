import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/service/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private fb: FormBuilder, private validatorService: ValidatorsService, private router: Router) {}

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  campoNoValido( campo: string ) {
    return this.loginForm.get(campo)?.invalid
            && this.loginForm.get(campo)?.touched;
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.loginForm.markAllAsTouched();

    // se encarga de validar el usuario y contrasenia
    if (this.validatorService.userPasswordValid(this.loginForm.value.username, this.loginForm.value.password)) {
      this.router.navigate(['/home']);
    }

  }
}
