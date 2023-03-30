import * as React from 'react';

export interface Props {}


interface MenuListProps {}
interface MenuListProps extends React.HTMLAttributes<HTMLElement> {}
interface MenuListProps extends Props {}

declare const MenuList: React.FunctionComponent<MenuListProps>;

export default MenuList;