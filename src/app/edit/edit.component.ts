import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Item } from '../model/item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  item: Item = { id: '', name: '', weight: '', price: '', description: '', photo: '' };
  errorMessage: string = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      const state = history.state;
      if (state && state['item']) {
        this.item = state['item'];
      } else {
        this.errorMessage = 'Item data is not available';
      }
    } else {
      this.errorMessage = 'Item ID is not provided';
    }
  }

  save(): void {
    console.log('Item to be saved:', this.item);
    if (this.item) {
      this.dataService.updateItem(this.item)
        .then(() => {
          console.log('Item updated successfully');
          this.router.navigate(['/details', this.item?.id]);
        })
        .catch(error => {
          console.error('Error updating item:', error);
          this.errorMessage = 'Error updating item';
        });
    } else {
      this.errorMessage = 'No item to save';
    }
  }

  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.item.photo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}