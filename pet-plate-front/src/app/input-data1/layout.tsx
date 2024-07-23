'use client'

import styled from "styled-components"
import { useResetRecoilState, useRecoilState} from 'recoil';
import { isExitModalOpenState } from '@recoil/atoms';



export default function Layout({ 
  children ,
  AlertExit
}: { 
  children: React.ReactNode ,
  AlertExit : React.ReactNode
}) {
  const [isExitModalOpen, setIsExitModalOpen] = useRecoilState(isExitModalOpenState);
    
  return (
        <Container>
            <Padding></Padding> 
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
  `
  const Padding = styled.div`
    width: 100%;
    height: 44px;
    //상단 탭 임의 설정
  `
 const Contents = styled.div`
    width: 100%;
 `
