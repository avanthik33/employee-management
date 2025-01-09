import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllProjectComponent } from './view-all-project.component';

describe('ViewAllProjectComponent', () => {
  let component: ViewAllProjectComponent;
  let fixture: ComponentFixture<ViewAllProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
