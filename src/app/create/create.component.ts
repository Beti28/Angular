import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { DataService } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'; 
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router'; // Import Router service

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  newItem: Item = {
    id: '',
    name: '',
    weight: '',
    price: '',
    description: '',
    photo: '',
    
  };

  selectedFile: File | null = null;
  isUploading = false; // Flag to track if file is currently being uploaded

  constructor(private dataService: DataService, 
              private storage: AngularFireStorage,
              private router: Router,
             ) { } // Inject Router service

              ngOnInit(): void {
               
              }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addItem() {
    if (!this.newItem.name || !this.newItem.weight || !this.newItem.price || !this.newItem.description || !this.selectedFile) {
      alert('Please fill in all fields and select a file');
      return;
    }

    this.isUploading = true; // Set uploading flag to true

    const filePath = `uploads/${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.selectedFile);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((downloadURL: string) => {
          this.newItem.photo = downloadURL; // Set the photo URL in the newItem object
          this.saveItem(); // Proceed to save the item
        });
      })
    ).subscribe();
  }

  async saveItem() {
    try {
      await this.dataService.addItem(this.newItem);
      alert('Item added successfully');
      this.clearForm();
      this.isUploading = false;
      this.router.navigate(['/catalog']);
    } catch (error) {
      console.error("Error adding item: ", error);
      this.isUploading = false;
    }
  }
  
  clearForm() {
    this.newItem = {
      id: '',
      name: '',
      weight: '',
      price: '',
      description: '',
      photo: '',

    };
    this.selectedFile = null;
  }
}