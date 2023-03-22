import { IconName } from '@grafana/data';
import { IconSize } from '@grafana/ui';

export type MenuItem = {
  name: string;
  isOpen: boolean;
  subMenu: SubMenuItem[];
};

export type SubMenuItem = {
  name: string;
  link: string;
  icon?: IconName;
  isOpen: boolean;
};

export type Navigation = {
  menu: MenuItem[];
  title?: string;
  tooltip?: string;
  position: {
    top?: string;
    bottom?: string;
    right?: string;
    left?: string;
  };
  iconSize: IconSize;
  icon: IconName;
};
