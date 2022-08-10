import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnByTypingComponent } from './learn-by-typing.component';

describe('LearnByTypingComponent', () => {
  let component: LearnByTypingComponent;
  let fixture: ComponentFixture<LearnByTypingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnByTypingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnByTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
