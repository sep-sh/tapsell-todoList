import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCompletedTaskDialogComponent } from './delete-completed-task-dialog.component';

describe('DeleteCompletedTaskDialogComponent', () => {
  let component: DeleteCompletedTaskDialogComponent;
  let fixture: ComponentFixture<DeleteCompletedTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCompletedTaskDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCompletedTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
