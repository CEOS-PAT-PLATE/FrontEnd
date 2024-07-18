'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import nutrientAPI from '@api/nutrientAPI';
import RightArrow from '@components/result/right-arrow';

interface Supplement {
  id: number;
  name: string;
  englishName: string;
  vendor: string;
  drugImgPath: string;
}

interface NutrientGroup {
  nutrientName: string;
  drugResponseDtoList: Supplement[];
}

interface ResultProps {
  params: { petId: number; dailyMealId: number };
}

export default function ExcessNutrientsPage({ params }: ResultProps) {
  const router = useRouter();

  const [nutrientGroups, setNutrientGroups] = useState<NutrientGroup[]>([]);

  const [petId, setPetId] = useState<number | null>(null);
  const [dailyMealId, setDailyMealId] = useState<number | null>(null);
  useEffect(() => {
    const petId = params.petId;
    const dailyMealId = params.dailyMealId;

    setPetId(petId);
    setDailyMealId(dailyMealId);

    if (petId && dailyMealId) {
      fetchSupplements(petId, dailyMealId);
    }
  }, []);

  const fetchSupplements = async (petId: number, dailyMealId: number) => {
    try {
      const response = await nutrientAPI.getRecommendedSupplements(petId, dailyMealId);
      const uniqueNutrientGroups = filterUniqueNutrientGroups(response.data.data);
      setNutrientGroups(uniqueNutrientGroups);
    } catch (error) {
      console.error('이미지 로딩 오류', error);
    }
  };

  const filterUniqueNutrientGroups = (groups: NutrientGroup[]): NutrientGroup[] => {
    const uniqueGroups: { [key: string]: NutrientGroup } = {};

    groups.forEach((group) => {
      if (!uniqueGroups[group.nutrientName]) {
        uniqueGroups[group.nutrientName] = group;
      }
    });

    return Object.values(uniqueGroups);
  };

  const handleImageError = (id: number) => {
    setNutrientGroups((prevGroups) =>
      prevGroups.map((group) => ({
        ...group,
        drugResponseDtoList: group.drugResponseDtoList.filter((supplement) => supplement.id !== id),
      })),
    );
  };

  return (
    <>
      <Content>
        {nutrientGroups.map((group) => (
          <ContainerWrapper key={group.nutrientName}>
            <Text1>비슷한 고민을 가진</Text1>
            <Text2>이 영양제를 많이 써요.</Text2>
            {/**   <Text1>{group.nutrientName} 관련 추천 영양제</Text1> */}
            <Container>
              {group.drugResponseDtoList.length > 0 ? (
                group.drugResponseDtoList.map((supplement) => (
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
                    <RightArrow />
                  </Card>
                ))
              ) : (
                <EmptyMessage>추천 영양제를 불러오는 중입니다...</EmptyMessage>
              )}
            </Container>
          </ContainerWrapper>
        ))}
      </Content>
    </>
  );
}

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  position: absolute;
  top: 300px;
`;

const ContainerWrapper = styled.div`
  padding-top: 10px;
  margin-top: 20px;
  height: auto;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  background: var(--50, #ecfaf2);
`;

const Container = styled.div`
  height: auto;
  min-width: 360px;
  padding: 16px;
  margin-top: 54px;
  overflow-y: auto;
`;

const Card = styled.div`
  display: inline-flex;
  padding: 10px 11px;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: var(--white, #fff);
  box-shadow: 2px 2px 15px 0px rgba(64, 201, 127, 0.25);
  display: flex;
  align-items: center;
  width: 312px;
  height: 100px;
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
  color: var(--grey7, #959ca4);

  /* body3_regular_12pt */
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 19.2px */
`;

const Name = styled.span`
  align-self: stretch;
  color: var(--grey10, #4f5357);

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
  color: var(--700, #26784c);
  font-family: SUIT Variable;
  font-size: 20px;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: -0.75px;
  position: absolute;
  z-index: 100;
  background: var(--50, #ecfaf2);

  color: var(--700, #26784c);
  padding: 0px 16px;
`;

const Text2 = styled.div`
  color: var(--700, #26784c);
  font-family: SUIT Variable;
  font-size: 20px;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: -0.75px;
  position: absolute;
  z-index: 100;
  background: var(--50, #ecfaf2);
  margin-top: 30px;
  color: var(--700, #26784c);
  padding: 0px 16px;
  width: 360px;
`;
