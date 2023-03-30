import * as React from 'react';

export interface Props {}


interface ListGroupProps {}
interface ListGroupProps extends React.HTMLAttributes<HTMLElement> {}
interface ListGroupProps extends Props {}

declare const ListGroup: React.FunctionComponent<ListGroupProps>;

export default ListGroup;