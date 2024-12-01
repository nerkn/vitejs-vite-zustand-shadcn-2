import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from 'react';

type propsType = {
  href?: string;
  children:
    | string
    | number
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null;
};

export function Link(props: propsType) {
  return <a href={props.href}>{props.children}</a>;
}
