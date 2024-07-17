'use client';
import styled from 'styled-components';
import Image from 'next/image';

const ExitButtonStyleWrapper = styled(Image).attrs<{ onClick: () => void }>((props) => ({
  onClick: props.onClick,
}))`
  position: absolute; /* 절대적인 위치를 고정 */
  top: 61px; /* 화면 상단에 고정 */
  z-index: 10; /* 다른 요소보다 위에 배치 */
  right: 20px;
  cursor: pointer;
`;

export default function ExitButtonImage({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  return <ExitButtonStyleWrapper src={src} alt={alt} onClick={onClick} />;
}
