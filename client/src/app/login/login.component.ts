import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ThemeEnum } from '../models/ewelink_enums';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading: boolean = false;
  public themeEnum = ThemeEnum;

  public formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(public notifierService: NotifierService, public authService: AuthService, public router: Router, public themeService: ThemeService) {
  }

  ngOnInit(): void {
  }

  LoginApp() {
    if (this.formLogin.valid) {
      this.isLoading = true;
      this.authService.loginAuth(this.formLogin.value).subscribe(res => {
        this.router.navigate(['/home']);
        this.isLoading = false;
      }, err => {
        this.notifierService.notify('error','Unauthorized');
        this.isLoading = false;
      })
    } else {
      this.notifierService.notify('error','Is not valid input');
    }
  }

}
