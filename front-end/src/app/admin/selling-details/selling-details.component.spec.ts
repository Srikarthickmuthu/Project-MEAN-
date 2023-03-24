import { HttpClient, HttpHandler } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { NavbarComponent } from 'src/app/home/navbar/navbar.component';
import { AdminService } from 'src/app/Services/admin.service';
import { TallyComponent } from '../tally/tally.component';
import { SellingDetailsComponent } from './selling-details.component';

describe('SellingDetailsComponent', () => {
  let component: SellingDetailsComponent;
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  let dialog: MatDialog;
  let toastr: ToastrService;
  let adminServiceSpy: jasmine.SpyObj<AdminService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellingDetailsComponent, NavbarComponent],
      imports: [MatDialogModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ToastrService,
          useValue: ToastrService,
        },
        { provide: AdminService, useValue: adminServiceSpy },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    dialog = TestBed.inject(MatDialog);
    toastr = TestBed.inject(ToastrService);
    adminServiceSpy = jasmine.createSpyObj('AdminService', ['getProduct']);
    component = TestBed.createComponent(
      SellingDetailsComponent
    ).componentInstance;
  });
  it('should clear the component after the dialog is closed', fakeAsync(() => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of({}),
    } as MatDialogRef<TallyComponent>);

    spyOn(component, 'clear');

    component.openTallyDialog();
    tick(700);

    expect(dialog.open).toHaveBeenCalled();
    expect(component.clear).toHaveBeenCalled();
  }));

  it('should display an error message when the dialog throws an error', () => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () =>
        throwError({
          status: 404,
          name: 'Not Found',
        }),
    } as unknown as MatDialogRef<TallyComponent>);

    spyOn(toastr, 'error');

    component.openTallyDialog();

    expect(dialog.open).toHaveBeenCalled();
    expect(toastr.error).toHaveBeenCalledWith('404 Error Not Found');
  });
  it('should remove all items from sessionStorage', () => {
    component.clear();
    expect(sessionStorage.length).toEqual(0);
  });
  it('should set session storage data correctly', (done) => {
    const data = 'test product';
    const id = 10;
    component.setSessionData(data, id);
    setTimeout(() => {
      expect(sessionStorage.getItem('productName')).toEqual('test product');
      expect(sessionStorage.getItem('productPrice')).toEqual('10');
      expect(sessionStorage.getItem('quantity')).toEqual(
        component.Quantity.toString()
      );
      done();
    }, 500);
  });
  it('should call the AdminService and clear sessionStorage', () => {
    const sampleData = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
      { id: 3, name: 'Product 3', price: 30 },
    ];
    adminServiceSpy.getProduct.and.returnValue(of(sampleData));
    component.ngOnInit();
    expect(adminServiceSpy.getProduct).toHaveBeenCalled();
    expect(component.cart).toEqual(sampleData);
    expect(sessionStorage.clear).toHaveBeenCalled();
  });
});
