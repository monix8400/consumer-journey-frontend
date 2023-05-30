import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmnEvaluationComponent } from './dmn-evaluation.component';

describe('DmnEvaluationComponent', () => {
  let component: DmnEvaluationComponent;
  let fixture: ComponentFixture<DmnEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmnEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmnEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
