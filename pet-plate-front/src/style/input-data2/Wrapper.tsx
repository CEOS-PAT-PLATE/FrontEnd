// Wrapper.tsx
'use client';
import styled from 'styled-components';

const WrapperStyleWrapper = styled.div`
  background-color: ${(props) => props.theme.colors['grey1']}; // body 배경색 설정
  width: 360px;
  height: 800px;
`;

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <WrapperStyleWrapper>{children}</WrapperStyleWrapper>;
}
