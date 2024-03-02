import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCOmponentComponent } from './login-component.component';

describe('LoginCOmponentComponent', () => {
  let component: LoginCOmponentComponent;
  let fixture: ComponentFixture<LoginCOmponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginCOmponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginCOmponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
