'use client'

import styled from "styled-components"
import InputDataFirstHeader from "@components/input-data1/inputDataFirstHeader"
import Progressbar from "@components/input-data1/progressbar"
import NextButton from "@components/input-data1/nextButton"
import ResultList from "@components/input-data1/resultList"

import {useRecoilValue} from 'recoil'
import {petInfoState} from "@lib/atoms"

export default function page() {
const  petInfo = useRecoilValue(petInfoState);
    
const navigte = () =>{

}

const handleAlert = () => {

}

  return (
    <>
    <InputDataFirstHeader onClickBackButton = {navigte}/>
    <Progressbar/>
    <PageContainer>
        <ResultList title = '반려견의 이름' value={petInfo[0].name}/>
        <ResultList title = '나이' value={petInfo[0].age}/>
        <ResultList title = '몸무게' value={petInfo[0].weight}/>
        <ResultList title = '활동량' value={petInfo[0].activity}/>
        <ResultList title = '중성화 여부' value={petInfo[0].neutering}/>
        <FixedButtonContainer>
            <NextButton onClick={handleAlert} />
        </FixedButtonContainer>
    </PageContainer>
    </>
  )
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
