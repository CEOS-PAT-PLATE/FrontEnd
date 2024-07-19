'use client';

import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isModalVisibleState, selectedSupplementState } from '@recoil/nutrientAtoms';
import CancelButton from '@public/svg/cancel-button.svg?url';
import Image from 'next/image';

export default function SupplementModal() {
  const [isVisible, setIsVisible] = useRecoilState(isModalVisibleState);
  const [selectedSupplement] = useRecoilState(selectedSupplementState);

  const handleCancelClick = () => {
    setIsVisible(false);
  };

  if (!isVisible || !selectedSupplement) return null;

  return (
    <FullNoticeContainer>
      <InfoCardWrapper>
      <NaturalInfoCardImage>
        <img src={selectedSupplement.supplement?.drugImgPath}  width={120} height={120} alt="영양제 정보" />
        </NaturalInfoCardImage>
        <SupplementInfo>
          <Vendor>{selectedSupplement.supplement?.vendor}</Vendor>
          <Name>{selectedSupplement.supplement?.name}</Name>
          <NutrientTag>{selectedSupplement.nutrient}</NutrientTag>
          <AlignCenter>
          <EnglishNameTag>영문명</EnglishNameTag>
          <EnglishName>{selectedSupplement.supplement?.englishName}</EnglishName>
          </AlignCenter>
        </SupplementInfo>
        <CancelButtonImage src={CancelButton} alt="닫기 버튼" onClick={handleCancelClick} />
      </InfoCardWrapper>
    </FullNoticeContainer>
  );
}


const AlignCenter = styled.div`
    display: flex;
   flex-direction:row;
align-items: center;

    `;
const FullNoticeContainer = styled.div`
  position: absolute;
display: flex;
justify-content: center;


  width: 100%;
  height: 800px;
  backdrop-filter: blur(4px); /* 배경 블러 처리 */
  background: rgba(75, 147, 125, 0.3); /* 투명도 80% 적용 */
  color: var(--white, #fff);
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  z-index: 1000;
`;

const NaturalInfoCardImage = styled.div`
  position: absolute;

display: flex;
width: 272px;
height: 156px;
padding: 0px 80px;
align-items: center;
border-radius: 8px;
top:16px;
background: var(--white, #FFF);


/* shadow_popup,carousel */
box-shadow: 2px 2px 15px 0px rgba(149, 156, 164, 0.20);
`;

const CancelButtonImage = styled(Image)`
  width: 24px;
  height: 24px;
  cursor: pointer;
 position: absolute;
    top:-144px;
    left: 90%;



`;

const InfoCardWrapper = styled.div`
min-height: 410px;
display: flex;
width: 304px;
max-height: 410px;
align-items: center;
align-content: space-around;
justify-content:center;
gap: 8px;
flex-wrap: wrap;
border-radius: 16px;
background: var(--grey1, #FAFAFC);
box-shadow: 2px 2px 15px 0px rgba(153, 159, 165, 0.20);
position: relative;
  width: 312px;
  height: 580px;
 
  margin-top: 100px;
  z-index: 1;
  top: 90px;
`;

const SupplementInfo = styled.div`
  position: absolute;
 top:188px;

  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 14px;
  font-weight: 400;
  display: flex;
flex-direction: column;
align-items: flex-start;
margin-left: 16px;
margin-right: 16px;
`;

const Vendor = styled.div`
margin-top:16px;
color: var(--grey7, #959CA4);
text-align: left;
/* body2_regular_14pt */
font-family: SUIT;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 22.4px */


`;

const Name = styled.div`
color: var(--grey11, #36393C);
text-align: left;

/* title2_bold_16pt */
font-family: SUIT variable;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 160%; /* 25.6px */
margin-bottom: 20px;

`;

const EnglishName = styled.div`
  font-size: 14px;
  text-align: left;
  max-width: 200px;


`;

const EnglishNameTag = styled.div`
  color: var(--grey8, #7C8389);
font-family: SUIT;
font-size: 12.036px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 19.258px */
margin-top: 20px;
margin-bottom: 20px;
margin-right: 13.24px;

`;

const NutrientTag = styled.div`
display: flex;
padding: 4px 8px;
justify-content: center;
align-items: center;
gap: 10px;
  border-radius: 100px;
background: var(--100, #D9F4E5);
max-width: 96px;
color: var(--600, #33A165);

/* body3_semibold_12pt */
font-family: SUIT;
font-size: 12px;
font-style: normal;
font-weight: 600;
line-height: 160%; /* 19.2px */
    `;
