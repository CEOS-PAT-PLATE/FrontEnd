// ResultList.tsx
import styled from "styled-components";
import Image from "next/image";
import nextIcon from "@public/svg/arrow-right.svg?url";
import Link from "next/link";

interface Nutrient {
  name: string;
  amount: number;
}

interface ResultItemProps {
  date: string;
  nutrients: Nutrient[];
  dailyMealId : number
  key : number
  petId : number
}

const ResultList: React.FC<ResultItemProps> = ({key, date, nutrients, dailyMealId, petId}) => {
  // 영양소 이름만 추출하여 리스트로 만듭니다.
  const nutrientList = nutrients.length > 0
    ? nutrients.map(nutrient => nutrient.name).join(', ')
    : '';

  return (
    <ResultListWrapper href={`/result/${petId}/${dailyMealId}`}>
      <ResultInfo>
        <DateInfo><span>{date}</span> 분석 결과</DateInfo>
        <Nutrients>
          {nutrients.length > 0
            ? <><span>{nutrientList}</span> 부족해요!</>
            : <span>부족한 영양소가 없어요!</span>
          }
        </Nutrients>      
      </ResultInfo>
      <NextIcon src={nextIcon} alt="next-icon" />
    </ResultListWrapper>
  );
};

const ResultListWrapper = styled(Link)`
  width: 19.5rem;
  padding: 1.031rem 1.25rem;
  margin-bottom: 0.813rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: solid 1px ${(props) => props.theme.colors['grey3']};
  border-radius: 0.5rem;
  text-decoration: none;
`;

const ResultInfo = styled.div`
  width: 14rem;
  display: flex;
  flex-direction: column;
`;

const DateInfo = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 160%;
  color: ${(props) => props.theme.colors['grey7']};
`;

const Nutrients = styled.h1`
  span {
    color: ${(props) => props.theme.colors['symentic-red-400']};
  }
`;

const NextIcon = styled(Image)`
  width: 1.5rem;
`;

export default ResultList;
