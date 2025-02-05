import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { Stop } from '../models/stop.model';

@Component({
  selector: 'app-dropdown-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dropdown-search.component.html',
  styleUrl: './dropdown-search.component.css'
})
export class DropdownSearchComponent {
  filteredOptions: Stop[] = [];
  searchTerm: string = "";
  showDropdown = false;

  @Output() selectionChange = new EventEmitter<Stop>();

  constructor(private service: AppService) {
  }

  filterOptions() {

    if (this.searchTerm) {
      this.service.getStops(this.searchTerm).subscribe((stops: Stop[]) => {
        this.filteredOptions = stops;
      });
    }
     this.showDropdown = this.filteredOptions.length > 0 && this.searchTerm != "";
  }

  selectOption(stop: Stop) {
    this.showDropdown = false;
    this.searchTerm = stop.name;

    this.selectionChange.emit(stop);
  }

}
