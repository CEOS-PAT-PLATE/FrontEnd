'use client';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import ExitButtonImage from '@style/201/ExitButtonImage';
import ExitButton from '@public/svg/exit-button.svg?url';

import { isExitModalOpenState, isCompleteModalOpenState } from '@recoil/atoms';

import InputDataFirstHeader from '@components/input-data2/common/inputDataFirstHeader';


export default function Layout({
  children,
  CompletionModal,
  ExitModal,
}: {
  children: React.ReactNode;
  CompletionModal: React.ReactNode;
  ExitModal: React.ReactNode;
}) {
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useRecoilState(isCompleteModalOpenState);
  const [isExitModalOpen, setIsExitModalOpen] = useRecoilState(isExitModalOpenState);

  return (
    <Wrapper>
      <InputDataFirstHeader onClickBackButton={()=>{}} />
      <ExitButtonImage
        src={ExitButton}
        alt="exit-button"
        onClick={() => {
          setIsExitModalOpen(true);
          console.log('클릭');
        }}
      />
      {isExitModalOpen && <div>{ExitModal}</div>}
      {isCompleteModalOpen && <div>{CompletionModal}</div>}
      <div>{children}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: 800px;
  position: relative;
`;
