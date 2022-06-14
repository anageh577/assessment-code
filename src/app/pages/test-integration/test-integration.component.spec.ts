import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestIntegrationComponent } from './test-integration.component';

describe('TestIntegrationComponent', () => {
  let component: TestIntegrationComponent;
  let fixture: ComponentFixture<TestIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestIntegrationComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
