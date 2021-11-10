import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../service/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new LoginForm();
  constructor(
    private _router: Router,
    private _service: AppService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  userAuthentication() {
    this._spinner.show();
    console.log(this.loginForm);
    if (!this.loginForm.password || !this.loginForm.username) {
      this._spinner.hide();
      Swal.fire('Invalid Credintials', 'Username/Password is empty', 'warning');
      return;
    } else {
      let data = {
        user: this.loginForm.username,
        password: this.loginForm.password,
      };
      this._service.login(data).subscribe(
        (res: any) => {
          this._spinner.hide();
          sessionStorage.setItem('session_id', res.session_id);
          console.log(res);
          Swal.fire('Success', res.message, 'success');
          this._router.navigate(['create-team']);
        },
        (err) => {
          this._spinner.hide();
          Swal.fire('Error', err.error.message, 'error');
          console.log(err);
        }
      );
    }
  }
}

class LoginForm {
  username = null;
  password = null;
}
