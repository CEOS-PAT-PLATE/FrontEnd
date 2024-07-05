'use client'

import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import StoreButtonInactive from '@public/svg/store-button-inactive.svg?url';
import StoreButtonActive from '@public/svg/store-button-active.svg?url';
import { isValidState } from '@lib/atoms';
import { useRecoilValue } from 'recoil';



interface StoreButtonProps {
  isValid: boolean;
}

export default function StoreButton() {
  const pathname = usePathname();
  const isValid = useRecoilValue(isValidState);

  function handleClick() {
    if (!isValid) {
      alert('입력 양식을 확인해 주세요.');
      return;
    }

    switch (pathname) {
      case '/input-data2/dry-food':
        alert('하루 식사에 사료가 저장되었습니다.');
        break;
      case '/input-data2/favorites':
        alert('즐겨찾기에 저장되었습니다.');
        break;
      case '/input-data2/natural-food':
        alert('하루 식사에 자연식이 저장되었습니다.');
        break;
      case '/input-data2/packaged-snacks':
        alert('하루 식사에 포장 간식이 저장되었습니다.');
        break;
      default:
        alert('잘못된 페이지');
    }
  }

  return (
    <StoreButtonImage
      src={isValid ? StoreButtonActive : StoreButtonInactive}
      alt="store-button"
      onClick={handleClick}
      priority // 이미지 로드 우선순위 지정
    />
  );
}

const StoreButtonImage = styled(Image)`
  grid-area: store-button; /* 이미지를 exit-button 영역에 배치 */
  position: absolute; /* 절대적인 위치를 고정 */
  width: 312px;
  bottom: 36px;
  left: 24px;
`;
