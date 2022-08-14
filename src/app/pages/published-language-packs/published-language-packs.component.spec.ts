import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedLanguagePacksComponent } from './published-language-packs.component';

describe('PublishedLanguagePacksComponent', () => {
  let component: PublishedLanguagePacksComponent;
  let fixture: ComponentFixture<PublishedLanguagePacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedLanguagePacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedLanguagePacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
