import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../service/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.scss'],
})
export class ViewTeamComponent implements OnInit {
  selectedPlayers: any[] = [];
  cachedPlayersData: any[] = [];
  defaultCountry = 'All';
  defaultType = 'All';

  countries: any[] = [
    'All',
    'India',
    'South Africa',
    'Australia',
    'Bangadesh',
    'Pakistan',
  ];
  types: any[] = ['All', 'Batsman', 'Bowler', 'Allrounder'];

  constructor(
    private _router: Router,
    private _service: AppService,
    private _spinner: NgxSpinnerService
  ) {
  
  }
  ngOnInit(): void {
    this.getTeam();
  }

  // get team data
  getTeam() {
    this._spinner.show();
    this.defaultCountry = 'All';
    this.defaultType = 'All';
    this._service.getTeam().subscribe(
      (res: any) => {
        this.loadinitaialSelectedData(res.data);
        this._spinner.hide();
        console.log(res);
      },
      (err) => {
        this._spinner.hide();
        Swal.fire('Unauthorized', err.error.message, 'error');
        this._router.navigate(['/']);
      }
    );
  }

  loadinitaialSelectedData(data: any) {
    let selectedPlayers: any[] = data;
    this.cachedPlayersData = data;
  
    this.selectedPlayers = selectedPlayers;
  }

  
  filterCountry(event: any) {
    console.log(event);
    if(event.value == 'All') {
      this.getTeam();
      return;
    }
    let filteredCountry = this.cachedPlayersData.filter(
      (item) => item.country == event.value
    );
    this.selectedPlayers = filteredCountry;
    console.log(filteredCountry);
  }

  filterType(event: any) {
    if(event.value == 'All') {
      this.getTeam();
      return;
    }
    let filteredtype = this.cachedPlayersData.filter(
      (item) => item.type == event.value
    );
    this.selectedPlayers = filteredtype;
    console.log(filteredtype);
  }
}
