import { Injectable, signal } from '@angular/core';
import { ListApiService } from '../../../shared/services/http/list-api.service';
import { List } from '../../../shared/types/list.type';
import { sideBarLink } from '../types/layout.type';

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
  readonly sideBarLinks = signal<sideBarLink[]>([]);

  constructor(private listApiService: ListApiService) {
    this.loadSidebarLinks()

  }

  public loadSidebarLinks(): void {
    this.listApiService.getAllLists().subscribe((lists: List[]) => {
      this.sideBarLinks.set(this.generateSidebarLinks(lists))

    })
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
