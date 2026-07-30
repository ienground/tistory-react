import type { PropsWithChildren } from 'react';
import './index.css';

export type LayoutComponentProps = PropsWithChildren;

export default function Layout({ children }: LayoutComponentProps) {
  return (
    <div className="min-h-screen">
      Layout
      {children}
    </div>
  );
}
