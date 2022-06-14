import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainanceTableComponent } from './maintainance-table.component';

describe('MaintainanceTableComponent', () => {
  let component: MaintainanceTableComponent;
  let fixture: ComponentFixture<MaintainanceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainanceTableComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
