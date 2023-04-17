import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { errorMessage } from 'src/app/Services/Guard/product';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  constructor(
    public adminservice: AdminService,
    private toastr: ToastrService,
    private userService:UserService,
  ) {}
    category:any=[];
  onSubmit(formData: NgForm): void {
    console.log(formData.value)
    formData.value.show=true
    console.log("form",formData.value)
    this.userService.addProductAdmin(formData.value).subscribe(
      () => {
        formData.resetForm();
        this.toastr.success('New product added..!');
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.name}`);
      }
    );
  }
  addNewCategory(formData:NgForm){
    this.userService.addCategoryAdmin(formData.value).subscribe(
      ()=>{
        formData.resetForm();
        this.toastr.success('New product added..!');
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.name}`);
      }
    )
  }
  ngOnInit(){
    this.userService.getCategory().subscribe((res:any)=>{
      res.forEach((element: { categoryName: any; }) => {
        this.category.push(element.categoryName)
      });
    })
  }
}