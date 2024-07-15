'use client';

import styled from 'styled-components';
import Image from 'next/image';
import StoreButtonInactive from '@public/svg/store-button-inactive.svg?url';
import StoreButtonActive from '@public/svg/store-button-active.svg?url';
import { useRecoilValue } from 'recoil';
import { isValidState } from '@recoil/atoms';
import { isFormValidState } from '@recoil/nutrientAtoms';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';



interface StoreButtonProps {
  onClick: () => void;
}

export default function StoreButton({ onClick }: StoreButtonProps) {
  const pathname = usePathname();
  const [isValid, setIsValid] = useState(false);

  const formValidState = useRecoilValue(isFormValidState);
  const validState = useRecoilValue(isValidState);





  useEffect(() => {
    if (pathname === '/input-data2/packaged-snacks' || pathname === '/input-data2/dry-food') {
      setIsValid(formValidState);
    } else {
      setIsValid(validState);
    }
  }, [pathname, formValidState, validState]);

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
