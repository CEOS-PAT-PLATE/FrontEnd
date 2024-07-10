// Content.tsx
'use client';
import styled from 'styled-components';

const ContentStyleWrapper = styled.div`
  grid-area: content; /* Content를 content 영역에 배치 */
  position: relative; /* 절대적인 위치를 고정 */
  top: 138px; /* 화면 상단에 고정 */
  left: 24px;
  
`;

export default function Content({ children }: { children: React.ReactNode }) {
  return <ContentStyleWrapper>{children}</ContentStyleWrapper>;
}
