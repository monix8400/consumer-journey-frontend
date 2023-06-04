import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Faq } from './faq';

describe('ResponseDisplayComponent', () => {
  let component: Faq;
  let fixture: ComponentFixture<Faq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Faq ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Faq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
