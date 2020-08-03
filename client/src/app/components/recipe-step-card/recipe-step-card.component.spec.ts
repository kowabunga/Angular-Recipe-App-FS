import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStepCardComponent } from './recipe-step-card.component';

describe('RecipeStepCardComponent', () => {
  let component: RecipeStepCardComponent;
  let fixture: ComponentFixture<RecipeStepCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeStepCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeStepCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
