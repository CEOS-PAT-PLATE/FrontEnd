'use client';

import styled from 'styled-components';
import rightArrow from '@public/svg/chevron-right.svg?url';
import Image from 'next/image';



export default function RightArrow() {
  const handleClick = () => {
    
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
right:30px;
margin-left:5px;
`;
