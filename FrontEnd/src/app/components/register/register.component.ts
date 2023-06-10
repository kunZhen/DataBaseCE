import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/service/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private validatorService: ValidatorsService, private fb: FormBuilder, private router: Router) {}

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  })

  campoNoValido( campo: string ) {
    return this.registerForm.get(campo)?.invalid
            && this.registerForm.get(campo)?.touched;
  }

  onSubmit() {

    if (this.validatorService.camposIguales(this.registerForm.value.password, this.registerForm.value.password2)) {
      this.router.navigate(['/']);
    }
    console.log(this.registerForm.value);
    this.registerForm.markAllAsTouched();


  }


}
