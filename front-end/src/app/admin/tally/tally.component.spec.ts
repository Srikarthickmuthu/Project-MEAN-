import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { TallyComponent } from './tally.component';

describe('TallyComponent', () => {
  let component: TallyComponent;
  let fixture: ComponentFixture<TallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TallyComponent],
      imports: [MatDialogModule],
      providers: [MatDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should call the method',()=>{
  //   component.close()
  // })
});
