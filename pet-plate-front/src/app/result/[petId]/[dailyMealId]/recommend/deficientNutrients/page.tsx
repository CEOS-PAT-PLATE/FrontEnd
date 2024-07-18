'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import nutrientAPI from '@api/nutrientAPI';
import RightArrow from '@components/result/right-arrow';
import nutritionInfo from '@lib/descriptionData';

import Image from 'next/image';

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

export default function DeficientNutrientsPage({ params }: ResultProps) {
  const router = useRouter();

  const [nutrientGroups, setNutrientGroups] = useState<NutrientGroup[]>([]);

  const [petId, setPetId] = useState<number | null>(null);
  const [dailyMealId, setDailyMealId] = useState<number | null>(null);

  useEffect(() => {
    const { petId, dailyMealId } = params;

    setPetId(petId);
    setDailyMealId(dailyMealId);

    if (petId && dailyMealId) {
      fetchSupplements(petId, dailyMealId);
    }
  }, [params]);

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
        {nutrientGroups.map((group, index) => (
          <div key={group.nutrientName}>
            <NutrientInfoSection nutrient={group.nutrientName} index={index} />
            <ContainerWrapper>
              <Text1>비슷한 고민을 가진 반려인들은</Text1>
              <Text2>이 영양제를 많이 써요.</Text2>
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
          </div>
        ))}
      </Content>
    </>
  );
}

const orderArray = [
  { index: 1, word: '첫' },
  { index: 2, word: '두' },
  { index: 3, word: '세' },
  { index: 4, word: '네' },
  { index: 5, word: '다섯' },
  { index: 6, word: '여섯' },
  { index: 7, word: '일곱' },
  { index: 8, word: '여덟' },
  { index: 9, word: '아홉' },
  { index: 10, word: '열' },
];

const NutrientInfoSection = ({ nutrient, index }: { nutrient: any; index: number }) => {
  const nutrientData = nutritionInfo.find((info) => info.nutrientName === nutrient);
  return (
    <Section>
      <OrderText>{`${orderArray[index].word}번째 부족 영양소`}</OrderText>
      <NutrientTitle>{nutrientData?.title}</NutrientTitle>
      <NutrientContent>{nutrientData?.content}</NutrientContent>
      <NutrientSymptomsTitle>{`${nutrient}가 부족할 때 발생할 수 있는 증상`}</NutrientSymptomsTitle>
      <SymptomsList>
        {nutrientData?.symptoms.map((symptom, i) => (
          <SymptomWrapper key={i}>
            <SymptomIcon src={symptom.src} alt="아이콘" />
            <SymptomItem key={i}>
              <SymptomName>{symptom.name}</SymptomName>
              <SymptomDescription>{symptom.description}</SymptomDescription>
            </SymptomItem>
          </SymptomWrapper>
        ))}
      </SymptomsList>
      <NutrientDefinitionTitle>{`${nutrient}이란?`}</NutrientDefinitionTitle>
      <NutrientDefinition>{nutrientData?.definition}</NutrientDefinition>
    </Section>
  );
};

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  position: absolute;
  top: 150px;
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
  font-family: SUIT variable;
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
  font-family: SUIT variable;
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

const Section = styled.div`
  margin-bottom: 40px;
  margin-left: 25px;
  margin-top: 40px;
`;

const OrderText = styled.div`
  color: var(--grey7, #959ca4);
  font-family: SUIT;
  font-size: 12px;
  font-weight: 600;
  line-height: 160%; /* 19.2px */
  margin-bottom: 4px;
`;

const NutrientTitle = styled.div`
  color: var(--primary, #40c97f);
  /* header_bold_20pt */
  font-family: SUIT variable;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 32px */
  letter-spacing: -0.75px;
`;

const NutrientContent = styled.div`
  color: var(--grey11, #36393c);
  width: 312px;
  /* body2_regular_14pt */
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  margin-bottom: 16px;
`;

const NutrientSymptomsTitle = styled.div`
  color: var(--grey11, #36393c);

  /* title2_bold_16pt */
  font-family: SUIT variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 6px;

  line-height: 160%;
`;

const SymptomsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 165px;
  color: var(--grey11, #36393c);

  /* body2_semibold_14pt */
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 22.4px */
`;

const SymptomWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 14px;
`;

const SymptomItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 256px;
`;

const SymptomIcon = styled(Image)`
  width: 36px;
  height: 36px;
  background-size: contain;
  margin-right: 15px;
 
`;

const SymptomName = styled.div`
  width: 165px;
  margin-right: 8px;

  color: var(--grey11, #36393c);

  /* body2_semibold_14pt */
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 22.4px */
  margin-bottom: 0px;
`;

const SymptomDescription = styled.div`
  color: var(--grey11, #36393c);

  /* body3_regular_12pt */
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */

  width: 256px;
`;

const NutrientDefinitionTitle = styled.div`
  color: var(--grey11, #36393c);
  font-family: SUIT variable;
  font-size: 16px;
  font-weight: 700;
  line-height: 160%;
  margin-bottom: 6px;
  margin-top: 25px;

`;

const NutrientDefinition = styled.div`
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 14px;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  align-self: stretch;
  width: 312px;
`;