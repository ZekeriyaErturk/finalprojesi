import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostlarComponent } from './postlar.component';

describe('PostlarComponent', () => {
  let component: PostlarComponent;
  let fixture: ComponentFixture<PostlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostlarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
