import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPackQcComponent } from './orderpack-qc.component';

describe('OrderPackQcComponent', () => {
  let component: OrderPackQcComponent;
  let fixture: ComponentFixture<OrderPackQcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPackQcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPackQcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
