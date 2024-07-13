'use client';

import styled from 'styled-components';
import Image from 'next/image';
import StoreButtonInactive from '@public/svg/store-button-inactive.svg?url';
import StoreButtonActive from '@public/svg/store-button-active.svg?url';
import { useRecoilValue } from 'recoil';
import { isValidState } from '@recoil/atoms';

interface StoreButtonProps {
  onClick: () => void;
}

export default function StoreButton({ onClick }: StoreButtonProps) {
  const isValid = useRecoilValue(isValidState);

  return (
    <StoreButtonImage
      src={isValid ? StoreButtonActive : StoreButtonInactive}
      alt="store-button"
      onClick={onClick}
      priority
    />
  );
}

const StoreButtonImage = styled(Image)`
  grid-area: store-button;
  position: absolute;
  width: 312px;
  top: 537px;
  cursor: pointer;
`;
