import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubProjectComponent } from './add-sub-project.component';

describe('AddSubProjectComponent', () => {
  let component: AddSubProjectComponent;
  let fixture: ComponentFixture<AddSubProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubProjectComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
