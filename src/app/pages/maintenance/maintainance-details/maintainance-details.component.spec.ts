import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainanceDetailsComponent } from './maintainance-details.component';

describe('MaintainanceDetailsComponent', () => {
  let component: MaintainanceDetailsComponent;
  let fixture: ComponentFixture<MaintainanceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainanceDetailsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
