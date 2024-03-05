import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostCompoentntComponent } from './add-post-compoentnt.component';

describe('AddPostCompoentntComponent', () => {
  let component: AddPostCompoentntComponent;
  let fixture: ComponentFixture<AddPostCompoentntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPostCompoentntComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPostCompoentntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
