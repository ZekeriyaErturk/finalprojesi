import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostekleComponent } from './postekle.component';

describe('PostekleComponent', () => {
  let component: PostekleComponent;
  let fixture: ComponentFixture<PostekleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostekleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostekleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
