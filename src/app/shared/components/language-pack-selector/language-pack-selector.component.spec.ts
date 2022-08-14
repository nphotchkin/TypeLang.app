import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagePackSelectorComponent } from './language-pack-selector.component';

describe('LanguagePackSelectorComponent', () => {
  let component: LanguagePackSelectorComponent;
  let fixture: ComponentFixture<LanguagePackSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagePackSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagePackSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
