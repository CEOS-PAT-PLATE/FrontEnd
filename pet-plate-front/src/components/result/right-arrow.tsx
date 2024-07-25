'use client';

import styled from 'styled-components';
import rightArrow from '@public/svg/chevron-right.svg?url';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { isModalVisibleState, selectedSupplementState } from '@recoil/nutrientAtoms';

interface Supplement {
  id: number;
  name: string;
  englishName: string;
  vendor: string;
  drugImgPath: string;
}

interface RightArrowProps {
  detail: { supplement: Supplement; nutrient: string };
}

export default function RightArrow({ detail }: RightArrowProps) {
  const [isVisible, setIsVisible] = useRecoilState(isModalVisibleState);
  const [selectedDetail, setSelectedDetail] = useRecoilState(selectedSupplementState);

  const handleClick = () => {
    setSelectedDetail(detail);
    setIsVisible(true);
  };

  return (
    <ButtonWrapper onClick={handleClick}>
      <Image src={rightArrow} alt="영양제 상세보기" />
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  cursor: pointer;
  z-index: 1;
  position: absolute;
  right: 30px;
  margin-left: 20px;
  margin-right:20px;
  width: 24px;
  height: 24px;
`;
