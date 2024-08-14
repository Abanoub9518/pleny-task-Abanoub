import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPhonesComponent } from './smart-phones.component';

describe('SmartPhonesComponent', () => {
  let component: SmartPhonesComponent;
  let fixture: ComponentFixture<SmartPhonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartPhonesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartPhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
