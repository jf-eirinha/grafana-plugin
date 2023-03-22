import React from 'react';
import { IconName, PanelOptionsEditorBuilder, StandardEditorProps } from '@grafana/data';
import { MenuItem, Navigation, SubMenuItem } from 'types';
import { Button, Collapse, Field, HorizontalGroup, Input, Select } from '@grafana/ui';
import { iconOptions } from 'icons';

const defaultSubMenuItem: SubMenuItem = {
  name: 'Submenu item',
  icon: undefined,
  link: '',
  isOpen: true,
};

const defaultMenuItem: MenuItem = {
  name: 'Menu item',
  isOpen: true,
  subMenu: [defaultSubMenuItem],
};

function Editor({value , onChange, context }: StandardEditorProps<Navigation>) {
  const [menu, setMenu] = React.useState<Navigation['menu']>(value.menu);
  const [title, setTitle] = React.useState<Navigation['title']>(value.title);
  const [icon, setIcon] = React.useState<Navigation['icon']>(value.icon);
  const [tooltip, setTooltip] = React.useState<Navigation['tooltip']>(value.tooltip);
  const [position, setPosition] = React.useState<Navigation['position']>(value.position);
  const [iconSize, setIconSize] = React.useState<Navigation['iconSize']>(value.iconSize);

  function onToggleMenu(index: number) {
    const newMenu = [...menu];
    newMenu[index] = { ...newMenu[index], isOpen: !newMenu[index].isOpen };
    setMenu(newMenu);
  }

  function onAddNewMenu() {
    setMenu([...menu, defaultMenuItem]);
  }

  function onAddNewSubMenu(menuIndex: number) {
    const newMenu = [...menu];
    newMenu[menuIndex] = { ...newMenu[menuIndex], subMenu: [...newMenu[menuIndex].subMenu, defaultSubMenuItem] };
    setMenu(newMenu);
  }

  function onToggleSubMenu(menuIndex: number, suMenuIndex: number) {
    const newMenu = [...menu];

    newMenu[menuIndex].subMenu[suMenuIndex] = {
      ...newMenu[menuIndex].subMenu[suMenuIndex],
      isOpen: !newMenu[menuIndex].subMenu[suMenuIndex].isOpen,
    };
    setMenu(newMenu);
  }

  function onSubMenuNameChange(menuIndex: number, subMenuIndex: number, name: string) {
    const newMenu = [...menu];
    newMenu[menuIndex].subMenu[subMenuIndex] = { ...newMenu[menuIndex].subMenu[subMenuIndex], name };
    setMenu(newMenu);
  }

  function onSubMenuIconChange(menuIndex: number, subMenuIndex: number, icon?: IconName) {
    const newMenu = [...menu];
    newMenu[menuIndex].subMenu[subMenuIndex] = { ...newMenu[menuIndex].subMenu[subMenuIndex], icon };
    setMenu(newMenu);
  }

  function onMenuNameChange(menuIndex: number, name: string) {
    const newMenu = [...menu];
    newMenu[menuIndex] = { ...newMenu[menuIndex], name };
    setMenu(newMenu);
  }

  function onSubMenuLinkChange(menuIndex: number, subMenuIndex: number, link: string) {
    const newMenu = [...menu];
    newMenu[menuIndex].subMenu[subMenuIndex] = { ...newMenu[menuIndex].subMenu[subMenuIndex], link };
    setMenu(newMenu);
  }

  const onDeleteSubmenu = (menuIndex: number, subMenuIndex: number) => {
    const newMenu = [...menu];
    newMenu[menuIndex].subMenu.splice(subMenuIndex, 1);
    setMenu(newMenu);
  };

  const onDeleteMenuItem = (menuIndex: number) => {
    const newMenu = [...menu];
    newMenu.splice(menuIndex, 1);
    setMenu(newMenu);
  };


  return (
    <>
      <Field
        label="Navigation Title"
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </Field>
      <Field
        label="Tooltip"
      >
        <Input
          value={tooltip}
          onChange={(e) => setTooltip(e.currentTarget.value)}
        />
      </Field>
      <Field label="Icon">
        <HorizontalGroup>
          <Field
            label="Icon"
          >
            <Select
              options={iconOptions}
              value={icon}
              onChange={(option) => setIcon(option.value)}
            />
          </Field>
          <Field
            label="Size"
          >
            <Select
              options={iconOptions}
              value={icon}
              onChange={(option) => setIconSize(option.value)}
            />
          </Field>
        </HorizontalGroup>
      </Field>

      <Field label="Position">
        <HorizontalGroup>

          <Field
            label="Top"
          >
            <Input
              value={position.top}
              onChange={(e) => setPosition({ ...position, top: e.currentTarget.value })}
            />
          </Field>
          <Field
            label="Right"
          >
            <Input
              value={position.right}
              onChange={(e) => setPosition({ ...position, right: e.currentTarget.value})}
            />
          </Field>
          <Field
            label="Bottom"
          >
            <Input
              value={position.bottom}
              onChange={(e) => setPosition({ ...position, bottom: e.currentTarget.value})}
            />
          </Field>
          <Field
            label="Left"
          >
            <Input
              value={position.left}
              onChange={(e) => setPosition({ ...position, left: e.currentTarget.value})}
            />
          </Field>
        </HorizontalGroup>
      </Field>

      {menu.map((menuItem, menuIndex) => {
        return (
          <Collapse
            key={menuIndex}
            label={context.replaceVariables ? context.replaceVariables(menuItem.name) : menuItem.name}
            isOpen={menuItem.isOpen}
            onToggle={() => onToggleMenu(menuIndex)}
            collapsible
          >
            <Field
              label="Name"

            >
              <Input
                value={menuItem.name}
                onChange={(e) => onMenuNameChange(menuIndex, e.currentTarget.value)}
              />
            </Field>

            {menuItem.subMenu.map((subMenu, subMenuIndex) => {
              return (
                <Collapse
                  key={subMenuIndex}
                  label={context.replaceVariables ? context.replaceVariables(subMenu.name) : subMenu.name}
                  isOpen={subMenu.isOpen}
                  onToggle={() => onToggleSubMenu(menuIndex, subMenuIndex)}
                  collapsible
                >
                  <Field label={'Name'}>
                    <Input
                      value={subMenu.name}
                      onChange={(e) => onSubMenuNameChange(menuIndex, subMenuIndex, e.currentTarget.value)}
                    />
                  </Field>
                  <Field label={'Icon'}>
                    <Select
                      options={iconOptions}
                      value={subMenu.icon}
                      onChange={(option) => onSubMenuIconChange(menuIndex, subMenuIndex, option.value)}
                    />
                  </Field>
                  <Field label={'Link'}>
                    <Input
                      value={subMenu.link}
                      onChange={(e) => onSubMenuLinkChange(menuIndex, subMenuIndex, e.currentTarget.value)}
                    />
                  </Field>

                  <Button
                    icon={'trash-alt'}
                    onClick={() => onDeleteSubmenu(menuIndex, subMenuIndex)}
                    variant="destructive"
                    fullWidth>
                    Delete
                  </Button>
                </Collapse>
              );
            })}

            <HorizontalGroup>
              <Button onClick={() => onAddNewSubMenu(menuIndex)} variant={'secondary'}>
                Add new submenu item
              </Button>
              <Button icon={'trash-alt'} onClick={() => onDeleteMenuItem(menuIndex)} variant="destructive">
                  Delete
              </Button>
            </HorizontalGroup>
          </Collapse>
        );
      })}

      <HorizontalGroup>
        <Button onClick={onAddNewMenu} variant={'secondary'}>
          Add new menu
        </Button>
        <Button onClick={() => onChange({menu, title, icon, position, iconSize, tooltip })} variant="primary">
          Save
        </Button>
      </HorizontalGroup>
    </>
  );
}

export interface Options {
  navigation: Navigation;
}

const defaultNavigation = {
  title: undefined,
  menu: [defaultMenuItem],
  tooltip: 'Open Navigation',
  position: {
    bottom: '25px',
    right: '25px',
  },
  icon: 'bars',
  iconSize: 'lg',
};

export function addEditor(builder: PanelOptionsEditorBuilder<Options>) {
  builder.addCustomEditor({
    id: 'menu',
    path: 'navigation',
    name: 'Navigation',
    description: 'Configure your navigation menu',
    defaultValue: defaultNavigation,
    editor: (props) => <Editor {...props} />,
  });
}
