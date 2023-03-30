import * as React from 'react';

export interface Props {
  /**
   * Makes this tabbar link active
   *
   * @default false
   */
  active?: boolean;
  /**
   * Component's HTML Element
   *
   * @default 'a'
   */
  component?: string;
  /**
   * Link icon content
   */
  icon?: React.ReactNode;
  /**
   * Link label content
   */
  label?: string | React.ReactNode;
}


interface TabbarLinkProps {}
interface TabbarLinkProps extends React.HTMLAttributes<HTMLElement> {}
interface TabbarLinkProps extends Props {}

declare const TabbarLink: React.FunctionComponent<TabbarLinkProps>;

export default TabbarLink;