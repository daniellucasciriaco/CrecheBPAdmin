import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

/* Services */
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  formulario: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.onAuthChangeSucess.subscribe(data => {
      this.router.navigate(['/']);
    });
    this.authService.onAuthChangeError.subscribe(err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.email = this.formulario.get('email').value;
      this.password = this.formulario.get('password').value;
      this.authService.doLogin(this.email, this.password);
    }
  }
}
