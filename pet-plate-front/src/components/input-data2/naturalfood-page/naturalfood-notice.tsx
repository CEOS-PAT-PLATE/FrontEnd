'use client';

import styled from 'styled-components';
import NaturalInfoCard from '@public/svg/naturalfood-info.svg?url';
import CancelButton from '@public/svg/cancel-button.svg?url';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { isNoticeVisibleState } from '@recoil/atoms'; // 경로를 적절하게 수정하세요
import NoticeText from '@style/input-data2/NoticeText'; // 경로를 적절하게 수정하세요
import { use } from 'react';
import { useEffect } from 'react';

export default function InfoCardAndButton() {
  const [isVisible, setIsVisible] = useRecoilState(isNoticeVisibleState);

  const handleCancelClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;
  return (
    <FullNoticeContainer>
      <InfoCardWrapper>
        <NaturalInfoCardImage src={NaturalInfoCard} alt="자연식 정보" />
        <CancelButtonImage src={CancelButton} alt="닫기 버튼" onClick={handleCancelClick} />
      </InfoCardWrapper>
    </FullNoticeContainer>
  );
}


const FullNoticeContainer = styled.div`
  position: absolute;
  bottom: -65px;
  left: -25px;
  width: 100%;
  height: 800px;
  backdrop-filter: blur(4px); /* 배경 블러 처리 */
  background: rgba(75, 147, 125, 0.3); /* 투명도 80% 적용 */
  color: var(--white, #fff);
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  z-index: 1;
`;

const NaturalInfoCardImage = styled(Image)`
  width: 312px;
  height: 580px;
  cursor: pointer;
  position: absolute;
`;

const CancelButtonImage = styled(Image)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  left: 420px;
  top: 35px;
`;

const InfoCardWrapper = styled.div`
  position: relative;
  width: 312px;
  height: 580px;
  margin-left: -130px;
  margin-top: 100px;
  z-index: 1;
`;
