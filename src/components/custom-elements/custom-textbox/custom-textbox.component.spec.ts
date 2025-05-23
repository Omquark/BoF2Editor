import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTextboxComponent } from './custom-textbox.component';

describe('CustomTextboxComponent', () => {
  let component: CustomTextboxComponent;
  let fixture: ComponentFixture<CustomTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTextboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
