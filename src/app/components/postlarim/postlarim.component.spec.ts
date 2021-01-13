import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostlarimComponent } from './postlarim.component';

describe('PostlarimComponent', () => {
  let component: PostlarimComponent;
  let fixture: ComponentFixture<PostlarimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostlarimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostlarimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
