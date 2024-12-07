import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskDialogComponent } from './delete-completed-task-dialog.component';

describe('DeleteCompletedTaskDialogComponent', () => {
  let component: DeleteTaskDialogComponent;
  let fixture: ComponentFixture<DeleteTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTaskDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
