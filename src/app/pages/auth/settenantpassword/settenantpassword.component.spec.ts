import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettenantpasswordComponent } from './settenantpassword.component';

describe('SettenantpasswordComponent', () => {
  let component: SettenantpasswordComponent;
  let fixture: ComponentFixture<SettenantpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettenantpasswordComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettenantpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
