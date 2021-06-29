import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-update-bus',
  templateUrl: './update-bus.component.html',
  styleUrls: ['./update-bus.component.css'],
})
export class UpdateBusComponent implements OnInit {
  http: HttpClient;
  updatebusform: FormGroup;
  serverData: Object | null;
  serverDataArr: any;
  url: string;
  resource: string;

  constructor(fb: FormBuilder, http: HttpClient) {
    this.http = http;
    this.serverData = null;
    this.url = '';
    this.resource = 'Routes';

    this.updatebusform = fb.group({
      routeNumber: [
        '',
        Validators.compose([Validators.required, this.updateKeyValidator]),
      ],
      newrouteNumber: [
        '',
        Validators.compose([Validators.required, this.updateKeyValidator]),
      ],
      startPointCN: [
        '',
        Validators.compose([Validators.required, this.updateKeyValidator]),
      ],
      startPointEN: [
        '',
        Validators.compose([Validators.required, this.updateKeyValidator]),
      ],
      endPointCN: [
        '',
        Validators.compose([Validators.required, this.updateKeyValidator]),
      ],
      endPointEN: [
        '',
        Validators.compose([Validators.required, this.updateKeyValidator]),
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
      formValue['newrouteNumber'] +
      '/' +
      formValue['startPointCN'] +
      '/' +
      formValue['startPointEN'] +
      '/' +
      formValue['endPointCN'] +
      '/' +
      formValue['endPointEN'];
    this.http
      .put<any>(this.url, {
        routeNumber: formValue['routeNumber'],
        newrouteNumber: formValue['newrouteNumber'],
        startPointCN: formValue['startPointCN'],
        startPointEN: formValue['startPointEN'],
        endPointCN: formValue['endPointCN'],
        endPointEN: formValue['endPointEN'],
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

  updateKeyValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value.match(/^0/)) {
      // this.checkbutton;
      return { validsearchKey: true };
    }
    return null;
  }
}
