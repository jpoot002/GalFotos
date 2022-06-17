import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgunComponent } from './algun.component';

describe('AlgunComponent', () => {
  let component: AlgunComponent;
  let fixture: ComponentFixture<AlgunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
