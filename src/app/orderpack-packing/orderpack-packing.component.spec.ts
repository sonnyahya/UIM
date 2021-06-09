import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPackPackingComponent } from './orderpack-packing.component';

describe('OrderPackPackingComponent', () => {
  let component: OrderPackPackingComponent;
  let fixture: ComponentFixture<OrderPackPackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPackPackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPackPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
