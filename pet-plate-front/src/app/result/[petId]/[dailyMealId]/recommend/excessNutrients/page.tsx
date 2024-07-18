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
  const [petId, setPetId] = useState<number | null>(null);
  const [dailyMealId, setDailyMealId] = useState<number | null>(null);

  const excessNutrient = '비타민 D와 칼슘';

  const nutritionAdvice = getNutritionAdvice(excessNutrient);

  useEffect(() => {
    const petId = params.petId;
    const dailyMealId = params.dailyMealId;

    setPetId(petId);
    setDailyMealId(dailyMealId);

    if (petId && dailyMealId) {
      // 여기서, 흠.. 어떻게 하지?
    }
  }, []);

  return (
    <>
      <ContainerWrapper>
        <Text1>비슷한 고민을 가진</Text1>
        <Text2>반려인들은 이런 점을 신경써요!</Text2>
        <Container>
          {nutritionAdvice.map((advice, index) => (
            <Card key={index}>
              <Info>
                <Vendor>{advice.title}</Vendor>
                <Name>{advice.content}</Name>
              </Info>
            </Card>
          ))}
        </Container>
      </ContainerWrapper>
    </>
  );
}

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
  top: 300px;
  height: 476px;
  min-height: 476px;
  min-width: 360px;

  display: flex;
  flex-direction: column;
  background: var(--50, #ecfaf2);
`;

const Container = styled.div`
  position: absolute;
  height: 440px;
  min-height: 420px;
  min-width: 360px;
  max-height: 440px;

  padding: 16px;
  overflow-y: auto;
  top: 60px;
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
  color: #999;
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
  position: absolute;
  z-index: 100;
  background: var(--50, #ecfaf2);
  margin-top: 30px;
  color: var(--700, #26784c);
  padding: 0px 16px;
  width: 360px;
`;
