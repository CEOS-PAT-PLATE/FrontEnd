'use client';

import styled from 'styled-components';
import NaturalInfoCard from '@public/svg/naturalfood-info.svg?url';
import CancelButton from '@public/svg/cancel-button.svg?url';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { isNoticeVisibleState } from '@recoil/atoms';
import NoticeText from '@style/input-data2/NoticeText';
import { use } from 'react';
import { useEffect } from 'react';

export default function InfoCardAndButton() {
  const [isVisible, setIsVisible] = useRecoilState(isNoticeVisibleState);

  const handleCancelClick = () => {
    setIsVisible(false);
  };

  const foodCategories = [
    { title: '육류 및 해산물', types: ['닭고기', '소고기', '돼지고기', '연어', '참치', '정어리', '새우'] },
    { title: '채소', types: ['단호박', '고구마', '강낭콩', '당근', '오이', '파프리카', '브로콜리', '토마토', '애호박', '샐러리', '아스파라거스', '옥수수', '감자', '브로콜리'] },
    { title: '과일', types: ['바나나', '사과', '배', '딸기', '블루베리', '라즈베리', '키위', '수박', '복숭아', '파인애플'] },
    { title: '달걀 및 유제품', types: ['계란', '메추리알'] },
    { title: '오일 및 버터', types: ['코코넛 오일', '땅콩 버터'] },
  ];

  if (!isVisible) return null;
  return (
    <FullNoticeContainer>
      
      <InfoCardWrapper>
        
        <NaturalInfoCardImage>
          <Head>자연식이 뭔지 모르겠어요!</Head>
          <HeadInfo>펫플레이트의 자연식은 생식과 생 간식을 의미해요. 즉, 가열하지 않은, 날 것 그대로 급여하는 음식으로 사람과 반려견 둘 다 먹을 수 있는 음식이에요.</HeadInfo>
          {foodCategories.map((category, index) => (
            <div key={index}>
              <CategoryTitle>{category.title}</CategoryTitle>
              <FoodTypes>{category.types.join(', ')}</FoodTypes>
            </div>
          ))}
        </NaturalInfoCardImage>
        <CancelButtonImage src={CancelButton} alt="닫기 버튼" onClick={handleCancelClick} />
      </InfoCardWrapper>
    </FullNoticeContainer>
  );
}

const Head = styled.div`
  color: var(--grey11, #36393C);
  font-family: SUIT;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.2px;
    text-align: left;
    margin-bottom: 8px;

`;

const HeadInfo = styled.div`
  color: var(--grey8, #7C8389);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
      text-align: left;
      margin-bottom: 20px;

`;

const FullNoticeContainer = styled.div`
  position: absolute;
  left: -25px;
  width: 100%;
  height: 800px;
  backdrop-filter: blur(4px);
  background: rgba(75, 147, 125, 0.3);
  color: var(--white, #fff);
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  z-index: 8;
  top:-176px;
`;

const NaturalInfoCardImage = styled.div`
  display: inline-flex;
  padding: 36px 24px;
  flex-direction: column;
  align-items: flex-start;
left: 165px;
top: 50px;
  width: 290px;
  height: 513px;
  cursor: pointer;
  position: absolute;
  border-radius: 12px;
  background: var(--white, #FFF);
  box-shadow: 2px 2px 6px 0px rgba(153, 159, 165, 0.20);
`;

const CancelButtonImage = styled(Image)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  left: 414px;
  top: 64px;
`;

const InfoCardWrapper = styled.div`
  position: relative;
  width: 312px;
  height: 580px;
  margin-left: -130px;
  margin-top: 100px;
  z-index: 1;
`;

const CategoryTitle = styled.div`
  color: var(--grey9, #64696E);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
      text-align: left;
    margin-bottom:8px;


`;

const FoodTypes = styled.div`
  color: var(--grey10, #4F5357);
  width: 242px;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
      text-align: left;
      margin-bottom:20px;

`;
