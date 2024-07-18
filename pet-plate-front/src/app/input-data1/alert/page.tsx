'use client'

import React, { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { petInfoState } from '@lib/atoms';
import { petAPI } from '@api/petAPI';
import EndBtn from "@components/main/gapbtn"

export default function Page() {
  const [petInfo] = useRecoilState(petInfoState);

  useEffect(() => {
    const addPetInfo = async () => {
      try {
        const response = await petAPI.addPetInfo(petInfo);
        console.log('Pet info added successfully:', response.data);
      } catch (error) {
        console.error('Failed to add pet info:', error);
      }
    };

    if (petInfo) {
      addPetInfo();
    }
  }, [petInfo]);

  const buttonContent = (
    <>
    <span style={{color : "#fff"}}>종료할래요</span>
  </>
  )

  const handleOnclick = () =>{

  }

  return (
    <PageContainer>
      <AlertWrapper>
        <Text1>정보 입력을 종료하시겠어요?</Text1>
        <Text2>지금 종료하면 이제까지 작성한 내용이<br/> 저장되지 않고 모두 사라져요.</Text2>
        <BtnWrapper>
        <ContinueBtn href="/main/analyze-info"  style={{backgroundColor : '#ECEEF0', color : "#36393C"}}>종료할래요</ContinueBtn>
        <ContinueBtn href="/input-data1/result" style={{backgroundColor : '#40C97F', color : "#fff"}}>계속 할게요</ContinueBtn> {/* 클릭시 addPetInfo ? */}
        </BtnWrapper>
        
      </AlertWrapper>
      <div>
        {JSON.stringify(petInfo)}
      </div>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  height: 47.25rem;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const AlertWrapper = styled.div`
  width: 18.125rem;
  height: 14.063rem;
  border: none;
  border-radius: 0.75rem;
  background-color: white;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Text1 = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 160%;
  color: ${(props)=>props.theme.colors['grey9']};
  margin-bottom: 0.5rem;
`

const Text2 = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 160%;
  color: ${(props)=>props.theme.colors['grey9']};
  text-align: center;
`

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  margin-top: 2.25rem;
`
const ContinueBtn = styled(Link)`
  width: 7.063rem;
  height: 3rem;
  border: none;
  border-radius: 0.5rem;

  font-size: 0.875rem;
  font-weight: 600;
  line-height: 160%;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;
`