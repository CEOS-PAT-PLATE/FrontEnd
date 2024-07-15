'use client';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isNoticeVisibleState } from '@recoil/atoms'; // 경로를 적절하게 수정하세요

const NoticeTextStyleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 22.4px */
  text-decoration-line: underline;
  position: absolute;
  top: 507px;
  left: 22.5%;
  z-index: 1;
  cursor: pointer;
`;

export default function NoticeText({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useRecoilState(isNoticeVisibleState);

  const handleClick = () => {
    setIsVisible(true);
    // console.log('clicked');
  };

  return <NoticeTextStyleWrapper onClick={handleClick}>{children}</NoticeTextStyleWrapper>;
}
