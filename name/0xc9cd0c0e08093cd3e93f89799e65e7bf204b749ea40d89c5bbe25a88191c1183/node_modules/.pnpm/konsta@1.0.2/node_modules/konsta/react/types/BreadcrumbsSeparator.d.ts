import * as React from 'react';

export interface Props {
  /**
   * Component's HTML Element
   *
   * @default 'div'
   */
  component?: string;
}


interface BreadcrumbsSeparatorProps {}
interface BreadcrumbsSeparatorProps extends React.HTMLAttributes<HTMLElement> {}
interface BreadcrumbsSeparatorProps extends Props {}

declare const BreadcrumbsSeparator: React.FunctionComponent<BreadcrumbsSeparatorProps>;

export default BreadcrumbsSeparator;