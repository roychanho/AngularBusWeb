import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-create-bus',
  templateUrl: './create-bus.component.html',
  styleUrls: ['./create-bus.component.css'],
})
export class CreateBusComponent implements OnInit {
  http: HttpClient;
  createbusform: FormGroup;
  serverData: Object | null;
  serverDataArr: any;

  url: string;
  resource: string;

  constructor(fb: FormBuilder, http: HttpClient) {
    this.http = http;
    this.serverData = null;
    this.url = '';
    this.resource = 'Routes';

    this.createbusform = fb.group({
      routeNumber: [
        '',
        Validators.compose([Validators.required, this.createKeyValidator]),
      ],
      startPointCN: [
        '',
        Validators.compose([Validators.required, this.createKeyValidator]),
      ],
      startPointEN: [
        '',
        Validators.compose([Validators.required, this.createKeyValidator]),
      ],
      endPointCN: [
        '',
        Validators.compose([Validators.required, this.createKeyValidator]),
      ],
      endPointEN: [
        '',
        Validators.compose([Validators.required, this.createKeyValidator]),
      ],
      stopCN: [
        '',
        Validators.compose([Validators.required, this.createKeyValidator]),
      ],
      stopEN: [
        '',
        Validators.compose([Validators.required, this.createKeyValidator]),
      ],
    });
  }
  onSubmit(formValue: any): void {
    this.serverData = null;
    this.url =
      'http://localhost/ATWD/Controller.php/' +
      this.resource +
      '/' +
      formValue['routeNumber'] +
      '/' +
      formValue['startPointCN'] +
      '/' +
      formValue['startPointEN'] +
      '/' +
      formValue['endPointCN'] +
      '/' +
      formValue['endPointEN'] +
      '/' +
      formValue['stopCN'] +
      '/' +
      formValue['stopEN'];
    console.log(formValue['routeNumber']);
    console.log(formValue['startPointCN']);
    console.log(formValue['startPointEN']);
    console.log(formValue['endPointCN']);
    console.log(formValue['endPointEN']);
    console.log(formValue['stopCN']);
    console.log(formValue['stopEN']);

    this.http
      .post<any>(this.url, {
        routeNumber: formValue['routeNumber'],
        startPointCN: formValue['startPointCN'],
        startPointEN: formValue['startPointEN'],
        endPointCN: formValue['endPointCN'],
        endPointEN: formValue['endPointEN'],
        stopCN: formValue['stopCN'],
        stopEN: formValue['stopEN'],
      })
      .subscribe(
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

  createKeyValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value.match(/^0/)) {
      // this.checkbutton;
      return { validcreateKey: true };
    }
    return null;
  }
}
