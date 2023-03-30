import * as React from 'react';

export interface Props {
  /**
   * Component's HTML Element
   *
   * @default 'a'
   */
  component?: string;
  /**
   * Text content of the back link
   *
   * @default 'Back'
   */
  text?: string | React.ReactNode;
  /**
   * Defines whether to show the link text. When 'auto', it hides link text for Material theme
   *
   * @default 'auto'
   */
  showText?: boolean | 'auto';
  /**
   * Link click handler
   */
  onClick?: (e: any) => void;
}


interface NavbarBackLinkProps {}
interface NavbarBackLinkProps extends React.HTMLAttributes<HTMLElement> {}
interface NavbarBackLinkProps extends Props {}

declare const NavbarBackLink: React.FunctionComponent<NavbarBackLinkProps>;

export default NavbarBackLink;