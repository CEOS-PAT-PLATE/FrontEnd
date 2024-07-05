'use client'
import Image from 'next/image'
import Navbar from '@components/input-data2/navbar'
import styled from 'styled-components'
import ExitButton from '@public/svg/exit-button.svg?url'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GridContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
      <ExitButtonImage src={ExitButton} alt="exit-button" />
      <Content>{children}</Content>
    </GridContainer>
  )
}

const GridContainer = styled.div`
  background-color: ${(props) =>
    props.theme.colors['grey1']}; // body 배경색 설정

  display: grid;
  align-items: center;
  grid-template-areas:
    'navbar navbar exit-button'
    'content content content'; /* grid-area 이름 설정 */
`

const NavbarContainer = styled.div`
  grid-area: navbar; /* Navbar를 navbar 영역에 배치 */
`

const ExitButtonImage = styled(Image)`
  grid-area: exit-button; /* 이미지를 exit-button 영역에 배치 */
  position: relative; /* 절대적인 위치를 고정 */
  top: 14px; /* 화면 상단에 고정 */
  left: -3px; /* 좌측 정렬 */
`

const Content = styled.div`
  grid-area: content; /* Content를 content 영역에 배치 */
  padding: 20px; /* 내용 여백 설정 */
`
