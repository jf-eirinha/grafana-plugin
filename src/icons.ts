import { availableIconsIndex, SelectableValue } from '@grafana/data';

export const iconOptions: SelectableValue[] = Object.keys(availableIconsIndex).map((icon) => ({
  title: icon,
  label: icon,
  value: icon,
}));
