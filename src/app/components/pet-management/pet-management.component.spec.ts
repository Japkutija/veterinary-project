import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetManagementComponent } from './pet-management.component';

describe('PetManagementComponent', () => {
  let component: PetManagementComponent;
  let fixture: ComponentFixture<PetManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
