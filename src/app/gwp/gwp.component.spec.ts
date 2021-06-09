import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwpComponent } from './gwp.component';

describe('GwpComponent', () => {
  let component: GwpComponent;
  let fixture: ComponentFixture<GwpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
