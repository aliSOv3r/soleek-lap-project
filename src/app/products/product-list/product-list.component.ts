import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { ProductComponent } from '../product/product.component';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationService } from '../../shared/notification.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private service: ProductService, private dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  listData : MatTableDataSource<any>;
  displayedCols : string[] = ['proName','proSku','proCategory','proImg','proPrice','proDate','actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchkey : string;
  ngOnInit() {
    this.service.getProducts().subscribe(
      list =>{
        let array = list.map(
          item =>{
            return{
              $key :item.key,
              ...item.payload.val()
            };
          });

          this.listData = new MatTableDataSource(array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
      });
  }
onSearchClear(){
  this.searchkey = '';
  this.applyFilter();
}
applyFilter(){
  this.listData.filter = this.searchkey.trim().toLowerCase();
}
onAddProduct(){
  this.service.initializeformGroup();
  const dialoagConfig = new MatDialogConfig();
  dialoagConfig.autoFocus = true;
  dialoagConfig.width = "60%";
  this.dialog.open(ProductComponent, dialoagConfig);
}
onEdit(row){
  this.service.populateForm(row);
  const dialoagConfig = new MatDialogConfig();
  dialoagConfig.autoFocus = true;
  dialoagConfig.width = "60%";
  this.dialog.open(ProductComponent, dialoagConfig);
}

onDelete($key){
  if(confirm('Areu Sure?')){
  this.service.deleteProduct($key);
  this.notificationService.warn(' :: Successfully Deleted')
  }
}
}
