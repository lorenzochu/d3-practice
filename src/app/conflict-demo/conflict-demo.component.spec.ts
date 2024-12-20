import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictDemoComponent } from './conflict-demo.component';

describe('ConflictDemoComponent', () => {
  let component: ConflictDemoComponent;
  let fixture: ComponentFixture<ConflictDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConflictDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConflictDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
