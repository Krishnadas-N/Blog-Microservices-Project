import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostComponentComponent } from './add-post-component.component';

describe('AddPostComponentComponent', () => {
  let component: AddPostComponentComponent;
  let fixture: ComponentFixture<AddPostComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPostComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPostComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
