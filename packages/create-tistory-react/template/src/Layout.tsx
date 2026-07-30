import type { PropsWithChildren } from 'react';
import './index.css';

export type LayoutComponentProps = PropsWithChildren;

export default function Layout({ children }: LayoutComponentProps) {
  return <>{children}</>;
}
