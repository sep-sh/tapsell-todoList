import { CommonModule } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SideBarService } from './services/side-bar.service';
import { sideBarLink } from './types/layout.type';
@Component({
  selector: 'app-side-bar',
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  standalone: true,
})
export class SideBarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  constructor(public sideBarService: SideBarService) {
}

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
