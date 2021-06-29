import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStopComponent } from './search-stop.component';

describe('SearchStopComponent', () => {
  let component: SearchStopComponent;
  let fixture: ComponentFixture<SearchStopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchStopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
