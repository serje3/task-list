import {NavMenu} from '@app/shared/types/nav-menu.interface';

const home: NavMenu[] = [
  {
    path: '/tasks',
    title: 'Tasks',
    translateKey: 'NAV.TASKS',
    type: 'item',
    iconType: 'feather',
    icon: 'icon-bookmark',
    key: 'task',
    submenu: []
  }
];



export const navConfiguration: NavMenu[] = [
  ...home,
];
