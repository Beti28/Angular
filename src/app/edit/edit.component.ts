import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Item } from '../model/item';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  item: Item = { id: '', name: '', weight: '', price: '', description: '', photo: '' };
  errorMessage: string = '';
  selectedFile?: File;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.dataService.getItemById(itemId).subscribe(item => {
        if (item) {
          this.item = item;
        } else {
          this.errorMessage = 'Item not found';
        }
      }, (error: any) => {
        console.error('Error retrieving item:', error);
        this.errorMessage = 'Error retrieving item';
      });
    } else {
      this.errorMessage = 'Item ID is not provided';
    }
  }

  save(): void {
    if (this.item && this.item.id) {
      if (this.selectedFile) {
        this.uploadImage(this.selectedFile).then(photoURL => {
          this.item.photo = photoURL;
          return this.dataService.updateItem(this.item);
        }).then(() => {
          this.router.navigate(['/details', this.item.id]);
        }).catch(error => {
          console.error('Error updating item:', error);
          this.errorMessage = 'Error updating item';
        });
      } else {
        this.dataService.updateItem(this.item).then(() => {
          this.router.navigate(['/details', this.item.id]);
        }).catch(error => {
          console.error('Error updating item:', error);
          this.errorMessage = 'Error updating item';
        });
      }
    } else {
      this.errorMessage = 'No item to save';
    }
  }

  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  async uploadImage(file: File): Promise<string> {
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    await task.snapshotChanges().toPromise();
    return fileRef.getDownloadURL().toPromise();
  }
}
