import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginImageComponent } from './login-image.component';

describe('LoginImageComponent', () => {
  let component: LoginImageComponent;
  let fixture: ComponentFixture<LoginImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
