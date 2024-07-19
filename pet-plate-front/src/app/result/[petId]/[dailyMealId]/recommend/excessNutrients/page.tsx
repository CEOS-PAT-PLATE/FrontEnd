'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import dailyMealsAPI from '@api/dailyMealsAPI';
import RightArrow from '@components/result/right-arrow';
import { nutrientExcessInfo } from '@lib/descriptionData';
import Wrapper from '@style/input-data2/Wrapper';

interface ResultProps {
  params: { petId: number; dailyMealId: number };
}

interface ExcessNutrient {
  name: string;
  unit: string;
  description: string;
  amount: number;
  properAmount: number;
  maximumAmount: number;
  maximumAmountRatioPerProperAmount: number;
  amountRatioPerProperAmount: number;
  amountRatioPerMaximumAmount: number;
}

export default function ExcessNutrientsPage({ params }: ResultProps) {
  const [petId, setPetId] = useState<number | null>(null);
  const [dailyMealId, setDailyMealId] = useState<number | null>(null);
  const [excessNutrients, setExcessNutrients] = useState<ExcessNutrient[]>([]);

  useEffect(() => {
    const { petId, dailyMealId } = params;

    setPetId(petId);
    setDailyMealId(dailyMealId);

    if (petId && dailyMealId) {
      fetchExcessNutrients(petId, dailyMealId);
    }
  }, [params]);

  const fetchExcessNutrients = async (petId: number, dailyMealId: number) => {
    try {
      const response = await dailyMealsAPI.getExcessNutrients(petId, dailyMealId);
      setExcessNutrients(response.data.data);
    } catch (error) {
      console.error('과잉 영양소 불러오기 오류', error);
    }
  };

  const filteredNutrientExcessInfo = nutrientExcessInfo.filter((info) =>
    excessNutrients.some((nutrient) => nutrient.name === info.nutrientName),
  );

  return (
    <>
     <Wrapper>
      {filteredNutrientExcessInfo.length === 0 ? (
        <EmptyMessage>과잉 영양소가 없어요!</EmptyMessage>
      ) : (
        <>
        <div>
          <Content>
            {filteredNutrientExcessInfo.map((group, index) => (
              <NutrientInfoSection nutrient={group.nutrientName} index={index} key={group.nutrientName} />
            ))}
                
                <ContainerWrapper>
            <Text1>비슷한 고민을 가진</Text1>
            <Text2>반려인들은 이런 점을 신경써요!</Text2>
              {getNutritionAdvice(excessNutrients.map((n) => n.name).join('과 ')).map((advice, index) => (
                <Card key={index}>
                  <Info>
                    <Vendor>{advice.title}</Vendor>
                    <Name>{advice.content}</Name>
                  </Info>
                </Card>
              ))}
              </ContainerWrapper>
             
            
            
          </Content>
      </div>
      
      </>
    
      )}
      </Wrapper>
    </>
  );
}

const Content = styled.div`
  overflow-y: scroll;
  position: absolute;
  top: 150px;
  height: 650px;
  width: 360px;
`;

const getNutritionAdvice = (excessNutrient: string) => [
  {
    title: '균형 잡힌 식단',
    content: `입력한 식단에서 어떤 식품이 ${excessNutrient}가 많이 함유되어 있는지 확인해주세요 -> 식이 조절: 사료와 보충제의 영양 성분표를 확인하여 ${excessNutrient} 함량을 확인해보세요! ${excessNutrient} 과잉 섭취를 완화하기 위해, 반려견 사료의 영양 성분표 내 ${excessNutrient}의 적정 함유량을 확인한 후 제품을 구매해요. AAFCO(미국 사료 관리 협회)와 같은 인정된 기관의 영양 지침을 충족하면서도 ${excessNutrient}가 많이 안 들어있는 사료로 변경하는 걸 추천드려요. 더불어, ${excessNutrient}가 많이 포함된 자연식품을 주의해주세요!`,
  },
  {
    title: '정기적인 수의사 검진',
    content: '정기적인 수의사 검진으로 개의 건강을 모니터링하고 영양소 과잉 섭취의 초기 징후를 발견할 수 있어요!',
  },
  {
    title: '과도한 보충제 피하기',
    content: `현재 ${excessNutrient}가 포함된 보충제를 사용하고 있다면, 수의사의 지침에 따라 제한하는 걸 추천드려요. 직접적으로 ${excessNutrient}가 명시되어 있지 않아도 종합 비타민이라면 해당될 수도 있으니 신중하게 사용하세요.`,
  },
  {
    title: '체중과 건강 모니터링',
    content: '개의 체중과 배변 활동, 활동량 등 건강을 정기적으로 모니터링하고 필요에 따라 식단을 조정하는걸 추천드려요',
  },
];

const ContainerWrapper = styled.div`
  position: absolute;
  padding-top: 10px;

  min-height: 476px;
  min-width: 360px;
  width: 360px;

  display: flex;
  flex-direction: column;
  background: var(--50, #ecfaf2);
`;

const Container = styled.div`
  height: 440px;
  min-height: 420px;
  min-width: 360px;
  max-height: 440px;
z-index: 1000;
  position: absolute;
  display: flex;
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

  padding: 16px;
  margin-bottom: 16px;
  margin-left: 8px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Vendor = styled.span`
  width: 171px;
  color: var(--grey11, #36393c);

  /* title2_bold_16pt */
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
`;

const Name = styled.span`
  color: var(--grey8, #7c8389);

  /* body3_regular_12pt */
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
`;

const EmptyMessage = styled.div`
  font-family: SUIT;
  font-size: 14px;
  font-weight: 400;
  position: absolute;
  top: 430px;
  left: 125px;
  color: var(--grey8, #7c8389);
`;

const Text1 = styled.div`
  color: var(--700, #26784c);
  font-family: SUIT;
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
  font-family: SUIT;
  font-size: 20px;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: -0.75px;
  position: relative;
  z-index: 100;
  background: var(--50, #ecfaf2);
  margin-top: 30px;
  color: var(--700, #26784c);
  padding: 0px 16px;
  width: 360px;
    margin-bottom: 20px;
    height: 40px;

`;

const NutrientInfoSection = ({ nutrient, index }: { nutrient: any; index: number }) => {
  const nutrientData = nutrientExcessInfo.find((info) => info.nutrientName === nutrient);
  return (
    <Section>
      <OrderText>{`${orderArray[index].word}번째 과잉 영양소`}</OrderText>
      <NutrientTitle>{nutrientData?.title}</NutrientTitle>
      <NutrientContent>{nutrientData?.content}</NutrientContent>
      <NutrientSymptomsTitle>{`${nutrient}가 과잉 섭취될 때 발생할 수 있는 증상`}</NutrientSymptomsTitle>
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
  font-family: SUIT;
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
  font-family: SUIT;
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

const SymptomIcon = styled.img`
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

