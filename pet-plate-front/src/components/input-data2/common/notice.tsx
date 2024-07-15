'use client';

import styled, { css } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { noticeState } from '@recoil/atoms'; 
import { useEffect } from 'react';

export default function Notice() {
  const notice = useRecoilValue(noticeState);
  const setNotice = useSetRecoilState(noticeState);

  useEffect(() => {
    let timer: any;
    if (notice.isVisible) {
      timer = setTimeout(() => {
        setNotice({ isVisible: false, message: '' });
      }, 700); // 메시지 숨기는 시간 
    }
    return () => clearTimeout(timer);
  }, [notice, setNotice]);

  return notice.isVisible ? <NoticeContainer>{notice.message}</NoticeContainer> : null;
}

const NoticeContainer = styled.div`
  position: absolute;
  left: 108.5px;
  display: flex;
  padding: 4px 16px;
  bottom: 132px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  background: var(--grey11, #36393c);
  width: 144px;
  height: 23px;
  color: var(--grey1, #fafafc);
  text-align: center;
  /* body3_semibold_12pt */
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 19.2px */
`;
