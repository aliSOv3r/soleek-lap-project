import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categoryList : AngularFireList<any>;
  array:[];

  constructor(private firebase: AngularFireDatabase) {
    this.categoryList = this.firebase.list('categories');
    this.categoryList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
   }


}
