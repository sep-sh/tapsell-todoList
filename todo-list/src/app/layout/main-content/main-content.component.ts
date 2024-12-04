import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-content',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
  standalone: true,
})
export class MainContentComponent {

}
