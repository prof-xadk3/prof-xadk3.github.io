import * as React from 'react';

export interface Props {
  /**
   * Component's HTML Element
   *
   * @default 'div'
   */
  component?: string;
  /**
   * Allows to open/close Action Sheet and set its initial state
   *
   * @default false
   */
  opened?: boolean;
  /**
   * Enables Action Sheet backdrop (dark semi transparent layer behind)
   *
   * @default true
   */
  backdrop?: boolean;
  /**
   * Click handler on backdrop element
   */
  onBackdropClick?: (e: any) => void;
}


interface ActionsProps {}
interface ActionsProps extends React.HTMLAttributes<HTMLElement> {}
interface ActionsProps extends Props {}

declare const Actions: React.FunctionComponent<ActionsProps>;

export default Actions;