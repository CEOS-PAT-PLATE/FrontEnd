// GridContainer.tsx
'use client';
import styled from 'styled-components';

const GridStyleWrapper = styled.div`
  display: grid;
  background-color: ${(props) => props.theme.colors['grey1']}; // body 배경색 설정

  align-items: center;
  grid-template-areas:
    'navbar navbar exit-button'
    'content content content'; /* grid-area 이름 설정 */
`;

export default function GridContainer({ children }: { children: React.ReactNode }) {
  return <GridStyleWrapper>{children}</GridStyleWrapper>;
}
