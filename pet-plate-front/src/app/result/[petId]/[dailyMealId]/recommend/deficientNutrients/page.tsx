'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import nutrientAPI from '@api/nutrientAPI';

interface Supplement {
  id: number;
  name: string;
  englishName: string;
  vendor: string;
  drugImgPath: string;
}

interface ResultProps {
    params: { petId: number; dailyMealId: number };
  }
  

export default function DeficientNutrientsPage({ params }: ResultProps) {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const router = useRouter();

  const [petId, setPetId] = useState<number | null>(null);
  const [dailyMealId, setDailyMealId] = useState<number | null>(null);

  useEffect(() => {
    //  petId와 dailyMealId 추출
    const petId = params.petId;
    
    const dailyMealId = params.dailyMealId;

console.log('petId:', petId);
console.log('dailyMealId:', dailyMealId);
    setPetId(petId);
    setDailyMealId(dailyMealId);

    // API 요청 보내기
    if (petId && dailyMealId) {
      fetchSupplements(petId, dailyMealId);
    }
  }, []);

  const fetchSupplements = async (petId: number, dailyMealId: number) => {
    try {
      const response = await nutrientAPI.getRecommendedSupplements(petId, dailyMealId);
      setSupplements(response.data.data);
      console.log('추천 영양제:', supplements);
    } catch (error) {
    }
  };

  return (
    <Container>
      <Text>비슷한 고민을 가진 반려인들은 
      이 영양제를 많이 써요.</Text>
      {supplements.length > 0 ? (
        supplements.map((supplement) => (
          <Card key={supplement.id}>
          
            <ImageWrapper>
              <Image src={supplement.drugImgPath} alt={supplement.name} width={100} height={100} />
            </ImageWrapper>
            <Info>
              <Vendor>{supplement.vendor}</Vendor>
              <Name>{supplement.name}</Name>
            </Info>
          </Card>
        ))
      ) : (
        <EmptyMessage>추천 영양제를 불러오는 중입니다...</EmptyMessage>
      )}
    </Container>
  );
}

const Container = styled.div`
position: absolute;
top:300px;
height: 476px;
min-height: 476px;
min-width: 360px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--50, #ECFAF2);
`;

const Title = styled.h1`
  font-family: SUIT;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const Card = styled.div`

display: inline-flex;
padding: 10px 11px;
align-items: center;
gap: 8px;
border-radius: 8px;
background: var(--white, #FFF);

/* shadow_green */
box-shadow: 2px 2px 15px 0px rgba(64, 201, 127, 0.25);



  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  margin-bottom: 16px;

`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  margin-right: 16px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Vendor = styled.span`
  font-family: SUIT;
  font-size: 16px;
  font-weight: 600;
`;

const Name = styled.span`
  font-family: SUIT;
  font-size: 14px;
  font-weight: 400;
`;

const EmptyMessage = styled.div`
  font-family: SUIT;
  font-size: 14px;
  color: #999;
`;

const Text = styled.div`
 color: var(--700, #26784C);

/* header_bold_20pt */
font-family: SUIT;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 160%; /* 32px */
letter-spacing: -0.75px;
`;