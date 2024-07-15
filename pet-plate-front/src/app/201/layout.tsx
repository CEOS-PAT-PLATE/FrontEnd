'use client';

import AddButton from '@components/input-data2/common/addplate-button';
import id_200 from '@public/svg/id_200.svg?url';
import Image from 'next/image';
import StoreButtonInactive from '@public/svg/btn_cta_inactive.svg?url';
import StoreButtonActive from '@public/svg/btn_cta_active.svg?url';
import styled from 'styled-components';
import Wrapper from '@style/input-data2/Wrapper';

import { isValidState } from '@recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function Layout({ children }: { children: React.ReactNode }) {
  const isValid = useRecoilValue(isValidState);
  const setIsValid = useSetRecoilState(isValidState);

  function handleClick() {
    if (!isValid) {
      alert('입력 양식을 확인해 주세요.');
      return;
    }
  }

  return (
    <>
      <Wrapper>
        <Image src={id_200} alt="id-200" priority />
        <AddButton />
        <StoreButtonImage
          src={isValid ? StoreButtonActive : StoreButtonInactive}
          alt="store-button"
          onClick={handleClick}
          priority // 이미지 로드 우선순위 지정
        />
      </Wrapper>
    </>
  );
}

const StoreButtonImage = styled(Image)`
  width: 312px;
  position: relative; /* 절대적인 위치를 고정 */
  bottom: 200px;
  left: 24px;
  cursor: pointer;
`;
