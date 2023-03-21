import React from 'react';
import { PanelProps } from '@grafana/data';
import { Options } from 'types';
import { Menu } from '@grafana/ui';

interface Props extends PanelProps<Options> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  return (
    <Menu>
      {options.menu.map((menuItem, index) => {
        return (
          <Menu.Group key={index} label={menuItem.name}>
            {menuItem.subMenu.map((subMenuItem, subIndex) => {
              return (
                <Menu.Item key={subIndex} label={subMenuItem.name} onClick={() => (location.href = subMenuItem.link)} />
              );
            })}
          </Menu.Group>
        );
      })}
    </Menu>
  );
};
