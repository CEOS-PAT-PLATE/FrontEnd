// Wrapper.tsx
'use client';
import styled from 'styled-components';

const WrapperStyleWrapper = styled.div`
  margin-top: 28px;
  position: absolute;
  height: 395px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export default function FavoriteContainerWrapper({ children }: { children: React.ReactNode }) {
  return <WrapperStyleWrapper>{children}</WrapperStyleWrapper>;
}
