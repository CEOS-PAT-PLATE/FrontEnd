'use client';

import StyledComponentsRegistry from '@lib/registry';
import ClientComponentContainer from '@components/ClientComponentContainer';
import { RecoilRoot } from 'recoil';
import RecoilRootWrapper from '@lib/recoilwrapper';

import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <RecoilRootWrapper>
          <ClientComponentContainer>{children}</ClientComponentContainer>
        </RecoilRootWrapper>
      </body>
    </html>
  )
}
