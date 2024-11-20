import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from '../model/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  addItem(item: Item) {
    item.id = this.afs.createId();
    return this.afs.collection('/Upload').doc(item.id).set(item);
  }
  
  editItem(item: Item): Promise<void> {
    return this.afs.collection('/Upload').doc(item.id).update(item);
  }

  getAllItems(): Observable<any[]> {
    return this.afs.collection('/Upload').snapshotChanges();
  }

  deleteItem(itemId: string): Promise<void> {
    return this.afs.collection('/Upload').doc(itemId).delete()
      .then(() => {
        console.log('Item deleted successfully:', itemId);
      })
      .catch((error: any) => { 
        console.error('Error deleting item:', error);
        throw error;
      });
  }

  getItemById(itemId: string): Observable<Item | undefined> {
    return this.afs.collection('/Upload').doc<Item>(itemId).valueChanges();
  }
  updateItem(item: Item): Promise<void> {
    const docRef = this.afs.collection('/Upload').doc(item.id);
    return docRef.update(item);
  }
}