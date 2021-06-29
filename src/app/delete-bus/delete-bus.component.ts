import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { BusRecord, BusstopRecord } from '../BusRecord.model';
import { ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-delete-bus',
  templateUrl: './delete-bus.component.html',
  styleUrls: ['./delete-bus.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteBusComponent implements OnInit, OnChanges {
  @Input() deleteType: string;
  @Input() busRecord!: BusRecord;
  @Input() busstopRecord!: BusstopRecord;

  deletebusform: FormGroup;
  http: HttpClient;
  serverData: Object | null;
  serverDataArr: any;
  url: string;
  resource: string;

  constructor(fb: FormBuilder, http: HttpClient) {
    this.http = http;
    this.serverData = null;
    this.url = '';
    this.resource = 'Routes';
    this.deleteType = '';

    this.deletebusform = fb.group({
      route: [
        '',
        Validators.compose([Validators.required, this.searchKeyValidator]),
      ],
      // routeNumber: ['', Validators.required],
      // fare: ['', Validators.required],
      // startPoint: ['', Validators.required],
      // endPoint: ['', Validators.required],
    });
  }
  //show what Record on your busRecord
  ngOnChanges() {
    // get the newobject(throung busRecord) to here update

    if (this.busRecord) {
      this.deletebusform.controls['route'].setValue(this.busRecord.route);
      // this.busRecord.route = '';
      console.log(this.busRecord.route);
    }

    if (this.busstopRecord) {
      this.deletebusform.controls['route'].setValue(this.busstopRecord.routeid);
      console.log(this.busstopRecord.routeid);
    }

    // this.deletebusform.controls['route'].setValue(this.busstopRecord.routeid);
    // this.deletebusform.controls['routeNumber'].setValue(
    //   this.busRecord.routeNumber
    // );
    // this.deletebusform.controls['fare'].setValue(this.busRecord.fare);
    // this.deletebusform.controls['startPoint'].setValue(
    //   this.busRecord.startPoint
    // );
    // this.deletebusform.controls['endPoint'].setValue(this.busRecord.endPoint);
  }

  onSubmit(formValue: any): void {
    this.serverData = null;
    this.deleteType === 'By Id';
    this.url =
      'http://localhost/ATWD/Controller.php/' +
      this.resource +
      '/' +
      formValue['route'];
    this.http.delete<any>(this.url).subscribe(
      (res) => {
        this.serverData = res;
        this.serverDataArr = JSON.parse(JSON.stringify(res));
      },
      (res) => {
        this.serverData = res;
        this.serverDataArr = JSON.parse(JSON.stringify(res));
      }
    );
  }
  ngOnInit(): void {}

  @Output() cancelDeleteEvent = new EventEmitter();

  cancelButtonHandler(): void {
    this.cancelDeleteEvent.emit();
  }

  searchKeyValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value.match(/^0/)) {
      return { validsearchKey: true };
    }
    return null;
  }
}
