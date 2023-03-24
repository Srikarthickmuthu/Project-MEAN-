// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { RouterModule } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ToastrService } from 'ngx-toastr';
// import { of, throwError } from 'rxjs';
// import { NavbarComponent } from 'src/app/home/navbar/navbar.component';
// import { AdminService } from 'src/app/Services/admin.service';
// import { EditProductComponent } from '../edit-product/edit-product.component';

// import { ViewProductComponent } from './view-product.component';

// describe('ViewProductComponent', () => {
//   let component: ViewProductComponent;
//   let fixture: ComponentFixture<ViewProductComponent>;
//   let data: number;
//   let adminService:AdminService
//   let dialog: MatDialog;
//   let toastr: ToastrService;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ViewProductComponent, NavbarComponent],
//       imports: [MatDialogModule, RouterModule, RouterTestingModule],
//       providers: [
//         HttpClient,
//         HttpHandler,
//         {
//           provide: ToastrService,
//           useValue: ToastrService,
//         },
//         MatDialogModule,
//         MatDialog,
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ViewProductComponent);
//     component = fixture.componentInstance;
//     dialog = TestBed.inject(MatDialog);
//     toastr = TestBed.inject(ToastrService);
//     adminService = jasmine.createSpyObj('AdminService', ['deleteProduct']);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   it('should call the getproducts when changes occurs',()=>{
//     spyOn(component,'getProducts')
//     component.ngOnChanges();
//     expect(component.getProducts).toHaveBeenCalled()
//   })
//   it('should call MatDialog.open with EditProductComponent', () => {
//     spyOn(dialog, 'open');
//     component.editProduct(1);
//     expect(dialog.open).toHaveBeenCalledWith(EditProductComponent);
//   });

//   it('should call getProducts after dialog is closed', () => {
//     spyOn(dialog, 'open');
//     spyOn(component, 'getProducts');
//     component.editProduct(1);
//     expect(component.getProducts).toHaveBeenCalled();
//   });

//   it('should call toastr.error if dialog throws an error', () => {
//     const error = { status: 500, name: 'Internal Server Error' };
//     spyOn(dialog, 'open');
//     spyOn(toastr, 'error');
//     component.editProduct(1);
//     expect(toastr.error).toHaveBeenCalledWith(
//       `${error.status} Error ${error.name}`
//     );
//   });
// });
