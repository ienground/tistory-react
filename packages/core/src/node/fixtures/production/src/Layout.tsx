import type { PropsWithChildren } from 'react';

import './style.css';

export default function Layout({ children }: PropsWithChildren) {
  return <main className="production-fixture">{children}</main>;
}
