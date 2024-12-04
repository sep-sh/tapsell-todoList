import { CommonModule } from '@angular/common';
import { Component, input, output, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SideBarService } from './services/side-bar.service';
import { sideBarLink } from './types/layout.type';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-side-bar',
  imports: [RouterModule, CommonModule, MatIconModule,MatButtonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  standalone: true,
})
export class SideBarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  readonly sideBarLinks: Signal<sideBarLink[]>;

  constructor(public service: SideBarService) {
    this.sideBarLinks = this.service.sideBarLinks



  }

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  onCreateNewListButtonClick(){
    this.service.createNewList()
  }
}
