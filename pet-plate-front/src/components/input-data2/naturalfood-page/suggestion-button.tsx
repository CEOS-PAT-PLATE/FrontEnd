'use client';

import styled from 'styled-components';
import SuggestionIcon from '@public/svg/건의하기.svg?url';
import Image from 'next/image';

const googleFormUrl = 'https://www.google.com/intl/ko_kr/forms/about/';

export default function SuggestionButton() {
  const handleClick = () => {
    window.open(googleFormUrl, '_blank');
  };

  return (
    <ButtonWrapper onClick={handleClick}>
      <Image src={SuggestionIcon} alt="건의하기" />
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  left: 260px;
  top: 440px;

  cursor: pointer;
  z-index: 1;
  position: absolute;
`;
