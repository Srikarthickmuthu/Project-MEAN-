import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from 'src/app/home/navbar/navbar.component';
import { AdminService } from 'src/app/Services/admin.service';
import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let service: AdminService;
  let toastrService: ToastrService;
  let fixture: ComponentFixture<AddProductComponent>;
  let addProduct: NgForm;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent, NavbarComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule,
      ],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ToastrService,
          useValue: ToastrService,
        },
        {
          provide: AdminService,
          useValue: service,
        },
      ],
    }).compileComponents();
    toastrService = TestBed.inject(ToastrService);
    service = TestBed.get(AdminService);
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain values form', () => {
    expect(component.onSubmit(addProduct)).withContext(addProduct.value);
  });
});
