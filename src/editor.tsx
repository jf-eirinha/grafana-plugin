import React from 'react';
import { PanelOptionsEditorBuilder } from '@grafana/data';
import { SimpleOptions } from 'types';
import { Button, Collapse, Field, IconButton, Input } from '@grafana/ui';

type NavigationMenu = MenuItem[];

type MenuItem = {
  name: string;
  isOpen: boolean;
  subMenu: SubMenuItem[];
};

type SubMenuItem = {
  name: string;
  link: string;
  isOpen: boolean;
};

const newSubMenu: SubMenuItem = {
  name: 'Submenu item',
  link: '',
  isOpen: true,
};

const newMenu: MenuItem = {
  name: 'Menu item',
  isOpen: true,
  subMenu: [newSubMenu],
};

function Editor({ value, onChange }: { value: NavigationMenu; onChange: (value: NavigationMenu) => void }) {
  const [state, setState] = React.useState<NavigationMenu>(value);

  function onToggleMenu(index: number) {
    const newState = [...state];
    newState[index] = { ...newState[index], isOpen: !newState[index].isOpen };
    setState(newState);
  }

  function onAddNewMenu() {
    setState([...state, newMenu]);
  }

  function onAddNewSubMenu(menuIndex: number) {
    const newState = [...state];
    newState[menuIndex] = { ...newState[menuIndex], subMenu: [...newState[menuIndex].subMenu, newSubMenu] };
    setState(newState);
  }

  function onToggleSubMenu(menuIndex: number, suMenuIndex: number) {
    const newState = [...state];

    newState[menuIndex].subMenu[suMenuIndex] = {
      ...newState[menuIndex].subMenu[suMenuIndex],
      isOpen: !newState[menuIndex].subMenu[suMenuIndex].isOpen,
    };
    setState(newState);
  }

  function onSubMenuNameChange(menuIndex: number, subMenuIndex: number, name: string) {
    const newState = [...state];
    newState[menuIndex].subMenu[subMenuIndex] = { ...newState[menuIndex].subMenu[subMenuIndex], name };
    setState(newState);
  }

  function onSubMenuLinkChange(menuIndex: number, subMenuIndex: number, link: string) {
    const newState = [...state];
    newState[menuIndex].subMenu[subMenuIndex] = { ...newState[menuIndex].subMenu[subMenuIndex], link };
    setState(newState);
  }

  const onDeleteSubmenu = (menuIndex: number, subMenuIndex: number) => {
    const newState = [...state];
    newState[menuIndex].subMenu.splice(subMenuIndex, 1);
    setState(newState);
  };

  const onDeleteMenuItem = (menuIndex: number) => {
    const newState = [...state];
    newState.splice(menuIndex, 1);
    setState(newState);
  };

  return (
    <>
      {state.map((menu, menuIndex) => {
        return (
          <Collapse
            key={menuIndex}
            label={`Menu ${menuIndex + 1}`}
            isOpen={menu.isOpen}
            onToggle={() => onToggleMenu(menuIndex)}
            collapsible
          >
            {menu.subMenu.map((subMenu, subMenuIndex) => {
              return (
                <Collapse
                  key={subMenuIndex}
                  label={subMenu.name}
                  isOpen={subMenu.isOpen}
                  onToggle={() => onToggleSubMenu(menuIndex, subMenuIndex)}
                >
                  <Field label={'Name'}>
                    <Input
                      value={subMenu.name}
                      onChange={(e) => onSubMenuNameChange(menuIndex, subMenuIndex, e.currentTarget.value)}
                    />
                  </Field>
                  <Field label={'Link'}>
                    <Input
                      value={subMenu.link}
                      onChange={(e) => onSubMenuLinkChange(menuIndex, subMenuIndex, e.currentTarget.value)}
                    />
                  </Field>

                  <IconButton
                    name={'trash-alt'}
                    variant={'destructive'}
                    onClick={() => onDeleteSubmenu(menuIndex, subMenuIndex)}
                  />
                </Collapse>
              );
            })}

            <Button onClick={() => onAddNewSubMenu(menuIndex)} variant={'secondary'}>
              Add new submenu item
            </Button>
            <div>
              <IconButton name={'trash-alt'} variant={'destructive'} onClick={() => onDeleteMenuItem(menuIndex)} />
            </div>
          </Collapse>
        );
      })}

      <Button onClick={onAddNewMenu} variant={'secondary'}>
        Add new menu
      </Button>

      <div>
        <Button onClick={() => onChange(state)}>Save</Button>
      </div>
    </>
  );
}

export function addEditor(builder: PanelOptionsEditorBuilder<SimpleOptions>) {
  builder.addCustomEditor({
    id: 'menu',
    path: 'menu',
    name: 'Configure your navigation menu:',
    defaultValue: [],
    editor: (props) => <Editor {...props} />,
  });
}
