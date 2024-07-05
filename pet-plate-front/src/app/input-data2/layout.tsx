'use client';
import Image from 'next/image';
import Navbar from '@components/input-data2/navbar';
import StoreButton from '@components/input-data2/store-button';
import styled from 'styled-components';
import ExitButton from '@public/svg/exit-button.svg?url';
//import StoreButtonInactive from '@public/svg/store-button-inactive.svg?url';
//import StoreButtonActive from '@public/svg/store-button-inactive.svg?url';



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <GridContainer>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>
        <ExitButtonImage src={ExitButton} alt="exit-button" />
        <Content>{children}</Content>
      </GridContainer>
      <StoreButton/>
    </Wrapper>
  );
}

const GridContainer = styled.div`
  display: grid;
  background-color: ${(props) => props.theme.colors['grey1']}; // body 배경색 설정

  align-items: center;
  grid-template-areas:
    'navbar navbar exit-button'
    'content content content' /* grid-area 이름 설정 */
    'store-button  store-button  store-button';
`;

const NavbarContainer = styled.div`
  grid-area: navbar; /* Navbar를 navbar 영역에 배치 */
`;

const ExitButtonImage = styled(Image)`
  grid-area: exit-button; /* 이미지를 exit-button 영역에 배치 */
  position: relative; /* 절대적인 위치를 고정 */
  top: 72px; /* 화면 상단에 고정 */
  left: -3px; /* 좌측 정렬 */
`;

const Content = styled.div`
  grid-area: content; /* Content를 content 영역에 배치 */
  position: absolute; /* 절대적인 위치를 고정 */
  top: 138px; /* 화면 상단에 고정 */
  left:24px;
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors['grey1']}; // body 배경색 설정
  width: 360px;
  height: 800px;
`;

