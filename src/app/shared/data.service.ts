import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from '../model/item';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  saveMetaDataOfFile(fileObj: Item): Promise<void> {
    const fileMeta = {
      id: fileObj.id,
      name: fileObj.name,
      weight: fileObj.weight,
      price: fileObj.price,
      description: fileObj.description,
      photo: fileObj.photo
    };

    // Return a Promise here
    return new Promise<void>((resolve, reject) => {
      this.afs.collection('/Upload').add(fileMeta)
        .then(() => {
          resolve(); // Resolve the Promise when the operation is completed
        })
        .catch((error) => {
          reject(error); // Reject the Promise if an error occurs
        });
    });
  }

  addItem(item : Item) {
    item.id = this.afs.createId();
    return this.afs.collection('/Upload').add(item)
  }
    

  getAllItems() {
    return this.afs.collection('/Upload').snapshotChanges();
  }

  deleteItem(item: Item) {
    return this.afs.doc('/Upload/' + item.id).delete()
      .then(() => {
        console.log('Item deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting item:', error);
        throw error; // Rethrow the error to propagate it to the caller
      });
  }
  editItem(item: Item): Promise<void> {
    return this.afs.collection('/Upload').doc(item.id).update(item);
  }

  getItemById(itemId: string): Observable<Item | undefined> {
    return this.afs.collection('Upload').doc<Item>(itemId).valueChanges();
  }
}
