'use client';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import InputDataFirstHeader from '@components/input-data1/inputDataFirstHeader';
import Progressbar from '@components/input-data1/progressbar';
import NextButton from '@components/input-data1/nextButton';

export default function Page() {
  return (
    <>
      <InputDataFirstHeader onClickBackButton={() => {}} />
      <Progressbar />
      <PageContainer>
        <FixedButtonContainer>
          <NextButton onClick={() => {}} />
        </FixedButtonContainer>
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 42rem;
  overflow: hidden;
`;

const FixedButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;
