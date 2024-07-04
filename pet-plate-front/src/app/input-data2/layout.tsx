'use client'
import Navbar from '../components/input-data2/navbar';
import styled from 'styled-components';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GridContainer>
    <Navbar />
    <Content>{children}</Content>
  </GridContainer>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr; /* Navbar는 자동으로 크기를 조절하고, 나머지는 남은 공간을 모두 차지 */
  min-height: 100vh; /* 최소 화면 높이까지 전체 컨테이너 확장 */
`;

const Content = styled.div`
  grid-row: 2 / 3; /* Content를 두 번째 행에 배치 */
  padding: 20px; /* 내용 여백 설정 */
`;

