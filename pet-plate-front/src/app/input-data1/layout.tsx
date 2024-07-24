'use client'

import styled from "styled-components"
import { useRecoilState } from 'recoil';
import { isExitModalOpenState } from '@recoil/atoms';

export default function Layout({ 
  children,
  AlertExit
}: { 
  children: React.ReactNode,
  AlertExit: React.ReactNode
}) {
  const [isExitModalOpen] = useRecoilState(isExitModalOpenState);
    
  return (
    <Container>
      <Padding />
      <Contents>{children}</Contents>
      {isExitModalOpen && <div>{AlertExit}</div>}
    </Container>
  )
}

const Container = styled.div`
  width: 360px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.theme.colors['grey1']};
`;

const Padding = styled.div`
  width: 100%;
  height: 44px;
`;

const Contents = styled.div`
  width: 100%;
`;
