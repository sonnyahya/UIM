import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwpAddComponent } from './gwp-add.component';

describe('GwpAddComponent', () => {
  let component: GwpAddComponent;
  let fixture: ComponentFixture<GwpAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwpAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwpAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
