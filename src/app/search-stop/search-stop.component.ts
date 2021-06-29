import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BusstopRecord } from '../BusRecord.model';

@Component({
  selector: 'app-search-stop',
  templateUrl: './search-stop.component.html',
  styleUrls: ['./search-stop.component.css'],
})
export class SearchStopComponent implements OnInit {
  @Input() searchType: string;

  searchstopform: FormGroup;
  http: HttpClient;
  serverData: Object | null;
  url: string;
  resource: string;
  serverDataArr: any;
  serverDataerror: any;

  busstopRecord: BusstopRecord = {
    routeid: '',
  };

  constructor(fb: FormBuilder, http: HttpClient) {
    this.http = http;
    this.searchType = '';
    this.serverData = null;
    this.resource = 'Rstop';
    this.url = '';
    this.searchstopform = fb.group({
      searchKey: [
        '',
        Validators.compose([Validators.required, this.searchKeyValidator]),
      ],
    });
  }

  onSubmit(formValue: any): void {
    this.serverData = null;
    this.searchType === 'By Name';
    this.url =
      'http://localhost/ATWD/Controller.php/' +
      this.resource +
      '/' +
      formValue['searchKey'];

    this.http.get<any>(this.url).subscribe(
      (res) => {
        console.log('Server return: ' + res);
        this.serverData = res;
        this.serverDataArr = JSON.parse(JSON.stringify(res));
      },
      (res) => {
        console.log('Server error: ' + res);
        this.serverData = res;
        this.serverDataArr = JSON.parse(JSON.stringify(res));
      }
    );
  }

  ngOnInit(): void {}

  @Output() deleteEvent = new EventEmitter<BusstopRecord>();

  deleteButtonHandler2(route: string) {
    for (let bus of this.serverDataArr) {
      if (route === bus.route) {
        this.busstopRecord.routeid = bus.route;
      }
    }
    this.deleteEvent.emit(this.busstopRecord);
  }

  searchKeyValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value.match(/^0/)) {
      return { validsearchKey: true };
    }
    return null;
  }
}
