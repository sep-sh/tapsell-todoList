import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-list-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss',
  standalone: true
})
export class ListHeaderComponent {

  onDeleteButtonClick() { }
  onEditButtonClick() { }

}
