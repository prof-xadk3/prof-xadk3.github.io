import * as React from 'react';

export interface Props {
  /**
   * Makes menu list item highlighted (active)
   *
   * @default false
   */
  active?: boolean;
  /**
   * Menu list item link's `href` attribute
   */
  href?: string | boolean;
  /**
   * Content of the chip media area (e.g. icon)
   */
  media?: React.ReactNode;
}


interface MenuListItemProps {}
interface MenuListItemProps extends React.HTMLAttributes<HTMLElement> {}
interface MenuListItemProps extends Props {}

declare const MenuListItem: React.FunctionComponent<MenuListItemProps>;

export default MenuListItem;