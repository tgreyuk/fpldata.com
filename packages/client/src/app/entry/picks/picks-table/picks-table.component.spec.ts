import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicksTableComponent } from './picks-table.component';

describe('PicksTableComponent', () => {
  let component: PicksTableComponent;
  let fixture: ComponentFixture<PicksTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicksTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
