import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Item } from '../model/item';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  item: Item | undefined;
  isOwner: boolean = false; // Initialize isOwner to false
  currentUser: string | undefined; // Define currentUser property

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getItemDetails();
  }

  getItemDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getItemById(id)
        .subscribe(item => {
          this.item = item;
          
        });
    }
  }
  editItem(): void {
    // Logic to navigate to the edit page or perform edit action
  }

  deleteItem(item: Item) {
    if (window.confirm('Are you sure you want to delete ' + item.name+ ' ?')) {
      this.dataService.deleteItem(item)
        .then(() => {
          console.log('Item deleted successfully');
          // Navigate to the catalog
          this.router.navigate(['/catalog']);
        })
        .catch(error => console.error('Error deleting item:', error));
    }
  }
}