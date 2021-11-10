import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../service/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  //mat checkbox
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';

  selectedPlayers: any[] = [];
  TotalPlayers: any[] = [];

  totalCards: number = 11;
  currentPage: number = 1;
  pagePosition: string = '0%';
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
  containerWidth: number;
  @ViewChild('container', { static: true, read: ElementRef })
  container: ElementRef;

  totalCards1: number = 11;
  currentPage1: number = 1;
  pagePosition1: string = '0%';
  cardsPerPage1: number;
  totalPages1: number;
  overflowWidth1: string;
  cardWidth1: string;
  containerWidth1: number;
  @ViewChild('container1', { static: true, read: ElementRef })
  container1: ElementRef;

  @HostListener('window:resize') windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }

    let newCardsPerPage1 = this.getCardsPerPage();
    if (newCardsPerPage1 != this.cardsPerPage1) {
      this.cardsPerPage1 = newCardsPerPage1;
      this.initializeSlider1();
      if (this.currentPage1 > this.totalPages1) {
        this.currentPage1 = this.totalPages1;
        this.populatePagePosition1();
      }
    }
  }
  constructor(
    private _router: Router,
    private _service: AppService,
    private _spinner: NgxSpinnerService
  ) {
   
  }

  ngOnInit() {
    this.cardsPerPage = this.getCardsPerPage();
    this.initializeSlider();
    this.cardsPerPage1 = this.getCardsPerPage();
    this.initializeSlider1();
    this.getAllPlayers();
  }

  // initialize Slider for Selected Players
  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${
      this.totalPages * 10
    }px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${
      this.cardsPerPage * 10
    }px) / ${this.cardsPerPage})`;
  }

  // initialize Slider for All Players

  initializeSlider1() {
    this.totalPages1 = Math.ceil(this.totalCards1 / this.cardsPerPage1);
    this.overflowWidth1 = `calc(${this.totalPages1 * 100}% + ${
      this.totalPages1 * 10
    }px)`;
    this.cardWidth1 = `calc((${100 / this.totalPages1}% - ${
      this.cardsPerPage1 * 10
    }px) / ${this.cardsPerPage1})`;
  }
  // No. of cards per row
  getCardsPerPage() {
    return 5;
  }

  // next prev functionality - Selected Players
  changePage(incrementor: any) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

// next prev functionality - All Players

  changePage1(incrementor: any) {
    this.currentPage1 += incrementor;
    this.populatePagePosition1();
  }

// Page Position - Selected Players

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${
      10 * (this.currentPage - 1)
    }px)`;
  }
// Page Position - All Players
  populatePagePosition1() {
    this.pagePosition1 = `calc(${-100 * (this.currentPage1 - 1)}% - ${
      10 * (this.currentPage1 - 1)
    }px)`;
  }

// get All players data
  getAllPlayers() {
    this._spinner.show();

    this._service.getPlayers().subscribe(
      (res: any) => {
        this.TotalPlayers = res.data;
        this.loadinitaialSelectedData(res.selectedPlayers)
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

  // on player selected update team
  updateTeam(event: any) {
    this._spinner.show();

    let data = {
      players: this.TotalPlayers,
    };
    this._service.updateTeam(data).subscribe(
      (res: any) => {
        console.log(res);
        this.loadinitaialSelectedData(res.data)
        this._spinner.hide();
      },
      (err) => {
        this._spinner.hide();
        Swal.fire('Unauthorized', err.error.message, 'error');
        this._router.navigate(['/']);
      }
    );
  }

  // load default cards if empty
  loadinitaialSelectedData(data: any) {
    let selectedPlayers: any[] = data;
    let selectedPlayersLength = selectedPlayers.length
    if (selectedPlayersLength < 11) {
      for (let index = 0; index < (11 - selectedPlayersLength); index++) {
        selectedPlayers.push({
          id: 0,
          name: "Select Player",
          country: "none",
          type: "none",
          avtar: "",
          about: "",
          selected: false,
        });
      }
      console.log(selectedPlayers)
    }
    this.selectedPlayers = selectedPlayers
   
  }
}
