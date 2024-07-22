'use client';

import SnackIcon from '@public/svg/간식_circle.svg?url';
import DryfoodIcon from '@public/svg/사료_circle.svg?url';
import NaturalfoodIcon from '@public/svg/자연식_circle.svg?url';
import Image from 'next/image';

import styled, { css } from 'styled-components';
import FavoriteIcon from '@components/input-data2/favorite-page/favorite-icon';

import { useState } from 'react';

const foodIconList = [
  { type: '자연식', img: NaturalfoodIcon },
  { type: '사료', img: DryfoodIcon },
  { type: '포장 간식', img: SnackIcon },
];

interface Foodlist {
  id: number;
  type: string;
  name: string;
  onClick: () => void;
  isClicked: boolean;
}

interface FoodCardsContainerProps {
  dailyMeals: any;
}

export default function FoodCardsContainer({ dailyMeals }: FoodCardsContainerProps) {
  const [clickedId, setClickedId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setClickedId(clickedId === id ? null : id);
  };

  const renderCards = (mealType: string, meals: any[]) => {
    return meals.map((meal) => (
      <FavoriteContainer
        key={meal.dailyRawId + mealType + meal.name}
        id={meal.dailyRawId}
        type={mealType}
        name={meal.name}
        onClick={() => handleCardClick(meal.dailyRawId)}
        isClicked={clickedId === meal.dailyRawId}
      />
    ));
  };

  return (
    <div>
      {renderCards('자연식', dailyMeals.dailyRaws)}
      {renderCards('사료', dailyMeals.dailyFeeds)}
      {renderCards('포장 간식', dailyMeals.dailyPackagedSnacks)}
      {renderCards('자연식', dailyMeals.dailyBookMarkedRaws)}
      {renderCards('사료', dailyMeals.dailyBookMarkedFeeds)}
      {renderCards('포장 간식', dailyMeals.dailyBookMarkedPackagedSnacks)}
    </div>
  );
}

interface Foodlist {
  id: number;
  type: string;
  name: string;
  onClick: () => void;
  isClicked: boolean;
}

const FavoriteContainer = ({ id, type, name, onClick, isClicked }: Foodlist) => {
  const foodIcon = foodIconList.find((icon) => icon.type === type);

  return (
    <Container onClick={onClick}>
      <IconImage src={foodIcon?.img || ''} alt={type} />
      <FavoriteText>{name}</FavoriteText>
      <FavoriteIconWrapper></FavoriteIconWrapper>
    </Container>
  );
};

const IconImage = styled(Image)`
  position: absolute;
  width: 26px;
  height: 26px;
  top: 16px;
`;

const Container = styled.div`
  padding: 5px 0px 5px 16px;
  min-height: 58px;
  width: 312px;
  height: 58px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 8px;
  margin-bottom: 8px;
  position: relative;
  background: var(--white, #fff);
  border: 1px solid var(--grey2, #eceef0);
`;

const FavoriteText = styled.div`
  position: absolute;
  width: 180px;
  height: 32px;
  color: var(--grey10, #4f5357);
  font-family: SUIT;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
  letter-spacing: -0.75px;
  left: 58px;
  top: 14px;
`;

const FavoriteIconWrapper = styled.div`
  position: absolute;
  left: 275px;
  top: 14px;
  left: 264px;
  background-color: none;
`;
