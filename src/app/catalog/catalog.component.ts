import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../model/item';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  items$!: Observable<Item[]>; // Use definite assignment assertion modifier

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.items$ = this.afs.collection('Upload').snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Item;
          const id = action.payload.doc.id;
          return { ...data, id };
        });
      })
    );
  }
}
