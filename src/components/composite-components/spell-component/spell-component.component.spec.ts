import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellComponentComponent } from './spell-component.component';

describe('SpellComponentComponent', () => {
  let component: SpellComponentComponent;
  let fixture: ComponentFixture<SpellComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpellComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
