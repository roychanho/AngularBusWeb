import { Component } from '@angular/core';
import { BusRecord, BusstopRecord } from './BusRecord.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rbus';
  deleteEventTriggered: boolean = false;
  deleteEventTriggered2: boolean = false;
  busRecord!: BusRecord;
  busstopRecord!: BusstopRecord;
  showsearch: boolean = true;
  showcreate: boolean = false;
  showupdate: boolean = false;

  //response to deletebus
  deleteEventReceiver(busRecord: BusRecord) {
    // old object push to new object
    var newBusRecord: BusRecord = {
      route: busRecord.route,
      routeNumber: busRecord.routeNumber,
      fare: busRecord.fare,
      startPoint: busRecord.startPoint,
      endPoint: busRecord.endPoint,
    };
    this.busRecord = newBusRecord;
    this.deleteEventTriggered = true;
  }

  deletestopEventReceiver(busstopRecord: BusstopRecord) {
    // old object push to new object
    var newBusstopRecord: BusstopRecord = {
      routeid: busstopRecord.routeid,
    };
    this.busstopRecord = newBusstopRecord;
    this.deleteEventTriggered2 = true;
  }

  cancelDeleteEventReceiver() {
    this.deleteEventTriggered = false;
  }
  cancelDeleteEventReceiver2() {
    this.deleteEventTriggered2 = false;
  }

  showsearchtable() {
    this.showsearch = true;
    this.showcreate = false;
    this.showupdate = false;
  }
  showcreatetable() {
    this.showsearch = false;
    this.showcreate = true;
    this.showupdate = false;
  }
  showupdatetable() {
    this.showcreate = false;
    this.showsearch = false;
    this.showupdate = true;
  }
}
