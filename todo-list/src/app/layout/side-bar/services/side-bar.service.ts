import { computed, Injectable, Signal } from '@angular/core';
import { List } from '../../../shared/types/list.type';
import { sideBarLink } from '../types/layout.type';
import { ListsService } from '../../../shared/services/lists.service';
import { NewListDialogService } from '../../../shared/services/new-list-dialog.service';

const SIDEBAR_MAIN_ITEMS: sideBarLink[] = [
  {
    routeLink: 'mainList',
    icon: 'home',
    label: 'mainList',
  },
  {
    routeLink: 'completed',
    icon: 'checklist',
    label: 'completed',
  },
];


@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  readonly otherLists: Signal<List[]>;
  readonly sideBarLinks = computed(() =>
    this.generateSidebarLinks(this.otherLists())
  );

  constructor(private listsService: ListsService, private newListDialogService: NewListDialogService) {
    this.otherLists = this.listsService.otherLists
  }

  createNewList() {
    this.newListDialogService.open()
  }


  private generateSidebarLinks(list: List[]): sideBarLink[] {
    const filtered = list.filter((item: List) => !item.isMain);
    let sidebarLinks: sideBarLink[] = filtered.map((item: List) => ({
      routeLink: `/list/${item._id}`,
      icon: 'list',
      label: `${item.title}`,
    }));
    sidebarLinks = [...SIDEBAR_MAIN_ITEMS, ...sidebarLinks]
    return sidebarLinks;
  }



}
