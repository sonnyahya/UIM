import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwpEditComponent } from './gwp-edit.component';

describe('GwpEditComponent', () => {
  let component: GwpEditComponent;
  let fixture: ComponentFixture<GwpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
