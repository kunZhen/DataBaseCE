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
export class RegisterComponent {


  constructor(private validatorService: ValidatorsService, private fb: FormBuilder, private router: Router,
    private Xml: XmlmanagService) {}

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

  createUser(Username: string, Password: string) {
    this.Xml.createUser(Username, Password).subscribe(data => {

    })
  }

  onSubmit() {

    if (this.validatorService.camposIguales(this.registerForm.value.password, this.registerForm.value.password2)) {
      this.createUser(this.registerForm.value.username, this.registerForm.value.password);
      this.router.navigate(['/']);
    }

    console.log(this.registerForm.value);
    this.registerForm.markAllAsTouched();

  }


}
