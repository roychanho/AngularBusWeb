import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BusRecord } from '../BusRecord.model';

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.css'],
})
export class SearchRouteComponent implements OnInit {
  @Input() searchType: string;

  searchbusform: FormGroup;
  serverData: Object | null;
  http: HttpClient;
  url: string;
  resource: string;
  search: string;

  serverDataArr: any;
  //send to app object
  busRecord: BusRecord = {
    route: '',
    routeNumber: '',
    fare: '',
    startPoint: '',
    endPoint: '',
  };

  constructor(fb: FormBuilder, http: HttpClient) {
    this.searchType = '';
    this.serverData = null;
    this.http = http;
    this.url = '';
    this.resource = 'Routes';
    this.search = '';

    this.searchbusform = fb.group({
      searchKey: [
        '',
        Validators.compose([Validators.required, this.searchKeyValidator]),
      ],
    });
  }

  onSubmit(formValue: any): void {
    this.serverData = null;
    if (this.searchType === 'By Route') {
      this.search = 'route';
      this.url =
        'http://localhost/ATWD/Controller.php/' +
        this.resource +
        '/' +
        this.search +
        '/' +
        formValue['searchKey'];
    } else if (this.searchType === 'By Fare') {
      this.search = 'fare';
      this.url =
        'http://localhost/ATWD/Controller.php/' +
        this.resource +
        '/' +
        this.search +
        '/' +
        formValue['searchKey'];
    } else if (this.searchType === 'By Start Point') {
      this.search = 'startpoint';
      this.url =
        'http://localhost/ATWD/Controller.php/' +
        this.resource +
        '/' +
        this.search +
        '/' +
        formValue['searchKey'];
    } else if (this.searchType === 'By End Point') {
      this.search = 'endpoint';
      this.url =
        'http://localhost/ATWD/Controller.php/' +
        this.resource +
        '/' +
        this.search +
        '/' +
        formValue['searchKey'];
    }
    this.http.get<any>(this.url).subscribe(
      (res) => {
        // anonymous function
        console.log('Server return: ' + res);
        this.serverData = res;
        this.serverDataArr = JSON.parse(JSON.stringify(res));
      },
      (res) => {
        // anonymous function
        console.log('Server error: ' + res);
        this.serverData = res;
        this.serverDataArr = JSON.parse(JSON.stringify(res));
      }
    );
  }
  //send back to the app
  @Output() deleteEvent = new EventEmitter<BusRecord>();
  //update to the busRecord
  deleteButtonHandler(route: string) {
    for (let bus of this.serverDataArr) {
      if (route === bus.route) {
        this.busRecord.route = bus.route;
        this.busRecord.routeNumber = bus.routeNumber;
        this.busRecord.fare = bus.fare;
        this.busRecord.startPoint = bus.startPoint;
        this.busRecord.endPoint = bus.endPoint;
      }
    }
    this.deleteEvent.emit(this.busRecord);
  }

  ngOnInit(): void {}

  searchKeyValidator(control: FormControl): { [s: string]: boolean } | null {
    //check user input to form data return boolean
    if (control.value.match(/^0/)) {
      //if not error
      return { validsearchKey: true };
    }
    // error
    return null;
  }
}
