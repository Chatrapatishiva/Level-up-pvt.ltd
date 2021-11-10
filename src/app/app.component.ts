import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './service/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cricket Team';
  constructor(
    public _router: Router,
    private _service: AppService,
    private _spinner: NgxSpinnerService
  ) {}
  logout() {
     this._spinner.show();

     this._service.logout().subscribe(
      (res: any) => {
        this._spinner.hide();
        console.log(res);
        sessionStorage.removeItem('session_id');
        Swal.fire('Success', res.message, 'success');
        this._router.navigate(['/']);
      },
      (err) => {
        this._spinner.hide();
        Swal.fire('Error', "PleaseTry Again", 'error');
        console.log(err);
      }
    );
  }
}
