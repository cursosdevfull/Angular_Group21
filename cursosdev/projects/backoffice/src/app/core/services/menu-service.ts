import { Injectable } from '@angular/core';
import { MenuList } from '../types/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly menuItems: MenuList = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: 'dashboard'
    },
    {
      path: "/courses",
      label: "Courses",
      icon: "school"
    },
    {
      path: "/users",
      label: "Users",
      icon: "people"
    },
    {
      path: "/schedules",
      label: "Schedules",
      icon: "schedule"
    }
  ]

  constructor() { }

  get menu(): MenuList {
    return [...this.menuItems]
  }
}
