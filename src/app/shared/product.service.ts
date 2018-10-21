import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  productList : AngularFireList<any>;

  form : FormGroup = new FormGroup({
    $key: new FormControl(null),
    proSku: new FormControl('', Validators.required),
    proName: new FormControl('', Validators.required),
    proImg: new FormControl('', Validators.required),
    proCategory: new FormControl(0, Validators.required),
    proPrice: new FormControl('', Validators.required),
    proDate: new FormControl('', Validators.required)
  });
  initializeformGroup(){
    this.form.setValue({
      $key: null,
      proSku: '',
      proName: '',
      proImg: '',
      proCategory: 0,
      proPrice: '',
      proDate: '',
    });
  }

  getProducts(){
    this.productList = this.firebase.list('products');
    return this.productList.snapshotChanges();
  }

  insertProduct(product){
    this.productList.push({
      proSku: product.proSku,
      proName: product.proName,
      proImg: product.proImg,
      proCategory: product.proCategory,
      proPrice: product.proPrice,
      proDate: product.proDate == "" ? "" : this.datePipe.transform(product.proDate, 'yyyy-MM-dd')
    });
  }
    updateProduct(product){
      this.productList.update(product.$key,
        {
          proSku: product.proSku,
          proName: product.proName,
          proImg: product.proImg,
          proCategory: product.proCategory,
          proPrice: product.proPrice,
          proDate: product.proDate
        }
      );
    }
  deleteProduct($key: string){
    this.productList.remove($key);
  }
  populateForm(product){
    this.form.setValue(_.omit(product, 'proCategory'));
  }
}
