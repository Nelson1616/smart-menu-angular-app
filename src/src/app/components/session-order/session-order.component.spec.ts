import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionOrderComponent } from './session-order.component';

describe('SessionOrderComponent', () => {
  let component: SessionOrderComponent;
  let fixture: ComponentFixture<SessionOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
