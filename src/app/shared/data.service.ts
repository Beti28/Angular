import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from '../model/item';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { interval } from 'rxjs';

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

  deleteItem(itemId: string): Promise<void> {
    return this.afs.collection('Upload').doc(itemId).delete();
  }
  updateItem(item: Item): Promise<void> {
    const docRef = this.afs.collection('/Upload').doc(item.id);
  
    return docRef.get().toPromise()
      .then((docSnapshot) => {
        if (docSnapshot && docSnapshot.exists) {
          return docRef.update(item);
        } else {
          return docRef.set(item);
        }
      })
      .then(() => {
        console.log('Item updated successfully:', item);
      })
      .catch((error) => {
        console.error('Error updating item:', error);
        throw error; 
      });
  }
  editItem(item: Item): Promise<void> {
    return this.afs.collection('/Upload').doc(item.id).update(item);
  }

  getItemById(itemId: string): Observable<Item | undefined> {
    return this.afs.collection('Upload').doc<Item>(itemId).valueChanges();
  }

}