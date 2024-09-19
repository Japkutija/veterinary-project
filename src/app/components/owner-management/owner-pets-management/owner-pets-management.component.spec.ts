import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPetsManagementComponent } from './owner-pets-management.component';

describe('OwnerPetsManagementComponent', () => {
  let component: OwnerPetsManagementComponent;
  let fixture: ComponentFixture<OwnerPetsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerPetsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerPetsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
