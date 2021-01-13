import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YorumekleComponent } from './yorumekle.component';

describe('YorumekleComponent', () => {
  let component: YorumekleComponent;
  let fixture: ComponentFixture<YorumekleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YorumekleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YorumekleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
