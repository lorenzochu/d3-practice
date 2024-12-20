import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbikeDemoComponent } from './ubike-demo.component';

describe('UbikeDemoComponent', () => {
  let component: UbikeDemoComponent;
  let fixture: ComponentFixture<UbikeDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbikeDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UbikeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
