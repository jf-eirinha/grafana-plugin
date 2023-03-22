import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import { Button, ComponentSize, Drawer, Menu, Tooltip } from '@grafana/ui';
import { createPortal } from 'react-dom';
import { Options } from 'editor';

interface Props extends PanelProps<Options> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, replaceVariables }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     {!isOpen && createPortal(
        <Tooltip content={options.navigation.tooltip as string}>
         <Button
            size={options.navigation.iconSize as ComponentSize}
            style={{
              position: 'fixed',
              zIndex: 99999,
              ...options.navigation.position,
            }}
            variant="secondary"
            icon={options.navigation.icon}
            onClick={() => setIsOpen(true)}
          />
        </Tooltip>,
        document.body
      )}


        {isOpen && (
          <Drawer
            title={options.navigation.title}
            onClose={() => setIsOpen(false)}
            scrollableContent
          >
            <Menu
              style={{width: '100%'}}
            >
            {options.navigation.menu.map((menuItem, index) => {
                return (
                  <Menu.Group
                    key={index}
                    label={menuItem.name}
                  >
                    {menuItem.subMenu.map((subMenuItem, subIndex) => {
                      return (
                        <Menu.Item
                          key={subIndex}
                          target="_self"
                          url={replaceVariables(subMenuItem.link)}
                          icon={subMenuItem.icon || undefined}
                          label={replaceVariables(subMenuItem.name)}
                          // onClick={() => (location.href = replaceVariables(subMenuItem.link))}
                        />
                      );
                    })}
                    {index !== options.navigation.menu.length - 1 && (<Menu.Divider />)}
                  </Menu.Group>
                );
              })}
            </Menu>
          </Drawer>
        )}
      </>
  )
};
