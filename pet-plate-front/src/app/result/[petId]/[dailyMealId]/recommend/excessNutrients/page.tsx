'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import nutrientAPI from '@api/nutrientAPI';
import RightArrow from '@components/result/right-arrow';




interface ResultProps {
  params: { petId: number; dailyMealId: number };
}

export default function ExcessNutrientsPage({ params }: ResultProps) {
  const router = useRouter();

  const [petId, setPetId] = useState<number | null>(null);
  const [dailyMealId, setDailyMealId] = useState<number | null>(null);

  useEffect(() => {
    const petId = params.petId;
    const dailyMealId = params.dailyMealId;

    setPetId(petId);
    setDailyMealId(dailyMealId);

    if (petId && dailyMealId) {
      
    }
  }, []);

  

 

  return (
    <>
    <ContainerWrapper>
    <Text1>비슷한 고민을 가진</Text1>
    <Text2>반려인들은 이런 점을 신경써요!</Text2>
    <Container>
      {supplements.length > 0 ? (
        supplements.map((supplement) => (
          <Card key={supplement.id}>
            <ImageWrapper>
              <img
                src={supplement.drugImgPath}
                alt={supplement.name}
                width={80}
                height={80}
                onError={() => handleImageError(supplement.id)}
              />
            </ImageWrapper>
            <Info>
              <Vendor>{supplement.vendor}</Vendor>
              <Name>{supplement.name}</Name>
            </Info>
            <RightArrow/>
          </Card>
        ))
      ) : (
        <EmptyMessage>추천 영양제를 불러오는 중입니다...</EmptyMessage>
      )}
    </Container>
    </ContainerWrapper>
    </>
  );
}

const ContainerWrapper = styled.div`
  position: absolute;
  padding-top:10px;
  top: 300px;
  height: 476px;
  min-height: 476px;
  min-width: 360px;

  display: flex;
  flex-direction: column;
  background: var(--50, #ECFAF2);
`;

const Container = styled.div`
  position: absolute;
  height: 440px;
  min-height: 420px;
  min-width: 360px;
    max-height: 440px;

  padding: 16px;
  overflow-y: auto;
  top:60px;
`;


const Card = styled.div`
  display: inline-flex;
  padding: 10px 11px;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: var(--white, #FFF);
  box-shadow: 2px 2px 15px 0px rgba(64, 201, 127, 0.25);
  display: flex;
  align-items: center;
  width:312px;
  height:100px;
  padding: 16px;
  margin-bottom: 16px;
  margin-left: 8px;
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  margin-right: 10px;

`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Vendor = styled.span`
width: 171px;
color: var(--grey7, #959CA4);

/* body3_regular_12pt */
font-family: SUIT;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 19.2px */
`;

const Name = styled.span`
align-self: stretch;
color: var(--grey10, #4F5357);

/* title2_bold_16pt */
font-family: SUIT;
font-size: 16px;
font-style: normal;
font-weight: 700;
max-width: 171px;
line-height: 160%;

 /* 이름 너무 길면 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmptyMessage = styled.div`
  font-family: SUIT;
  font-size: 14px;
  color: #999;
`;

const Text1 = styled.div`
  color: var(--700, #26784C);
  font-family: SUIT;
  font-size: 20px;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: -0.75px;
  position:absolute;
  z-index: 100;
  background: var(--50, #ECFAF2);

  color: var(--700, #26784C);
  padding: 0px 16px;



`;

const Text2 = styled.div`
  color: var(--700, #26784C);
  font-family: SUIT;
  font-size: 20px;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: -0.75px;
  position:absolute;
  z-index: 100;
  background: var(--50, #ECFAF2);
margin-top: 30px;
  color: var(--700, #26784C);
  padding: 0px 16px;
  width: 360px;



`;
