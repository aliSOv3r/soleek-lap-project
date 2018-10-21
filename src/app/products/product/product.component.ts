import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../shared/product.service';
import { CategoriesService } from '../../shared/categories.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private service: ProductService,
     private categoryService: CategoriesService,
      private notificationService: NotificationService,

    ) { }



  ngOnInit() {
    this.service.getProducts();
  }
onClear(){
  this.service.form.reset();
  this.service.initializeformGroup();

}

onSubmit(){
  if(this.service.form.valid){
    this.service.insertProduct(this.service.form.value);
    this.service.form.reset();
    this.service.initializeformGroup();
    this.notificationService.success(':: Submitted Successfully');
    
  }
}

}
