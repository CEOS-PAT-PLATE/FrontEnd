// NavbarContainer.tsx
'use client';
import styled from 'styled-components';

const NavbarStyleWrapper = styled.div`
  grid-area: navbar; /* Navbar를 navbar 영역에 배치 */
`;

export default function NavbarContainer({ children }: { children: React.ReactNode }) {
  return <NavbarStyleWrapper>{children}</NavbarStyleWrapper>;
}
