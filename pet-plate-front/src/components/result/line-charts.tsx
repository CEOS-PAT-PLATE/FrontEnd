'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  Legend,
  Title,
  BarController,
} from 'chart.js';

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, Legend, Title, BarController);

function NutrientBar({
  label,
  intake,
  recommended,
  color,
}: {
  label: string;
  intake: number;
  recommended: number;
  color: string;
}) {
  const maxNutrientValue = 100; // 비율로 나타나게끔
  const normalizedIntake = Math.min((intake / recommended) * maxNutrientValue, maxNutrientValue);

  const chartData = {
    labels: [label],
    datasets: [
      {
        label: '섭취 영양소',
        data: [normalizedIntake],
        backgroundColor: [color],
        borderRadius: 20,
        barPercentage: 2,
        borderSkipped: false,
        minBarLength: 2
      },
    ],
  };

  const options = {
    barThickness: 7,
    indexAxis: 'y' as 'y',
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
        max: maxNutrientValue,
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    responsive: true,
  };

  return (
    <BarWrapper>
      <BarBackground />
      <NutrientNameText>{label}</NutrientNameText>
      <Bar data={chartData} options={options} />
      <NutrientText>
        {intake}g / {recommended}g
      </NutrientText>
    </BarWrapper>
  );
}

export default function LineChart({ nutrientData, group }: { nutrientData: any[], group: number }) {
  let defaultNutrients = [] as any[];

  switch(group) {
    case 1: // 기본 영양소
      defaultNutrients = [
        { name: '탄수화물', amount: 0, properAmount: 0 },
        { name: '단백질', amount: 0, properAmount: 0 },
        { name: '지방', amount: 0, properAmount: 0 },
      ];
      break;
    case 2: // 미네랄
      defaultNutrients = [
        { name: '칼슘', amount: 0, properAmount: 0 },
        { name: '인', amount: 0, properAmount: 0 },
      ];
      break;
    case 3: // 비타민
      defaultNutrients = [
        { name: '비타민 A', amount: 0, properAmount: 0 },
        { name: '비타민 D', amount: 0, properAmount: 0 },
        { name: '비타민 E', amount: 0, properAmount: 0 },
      ];
      break;
    default:
      break;
  }

  const mergedNutrients = defaultNutrients.map(defaultNutrient => {
    const foundNutrient = nutrientData.find(nutrient => nutrient.name === defaultNutrient.name);
    return foundNutrient ? foundNutrient : defaultNutrient;
  });

  return (
    <LineWrapper>
      {mergedNutrients.map((nutrient, index) => (
        <NutrientBar
          key={index}
          label={nutrient.name}
          intake={Math.round(Math.abs(nutrient.amount))}
          recommended={Math.round(nutrient.properAmount)}
          color={index % 2 === 0 ? '#40C97F' : '#FF4D46'}
        />
      ))}
    </LineWrapper>
  );
}

const LineWrapper = styled.div`
  top: 370px;
  left: 240px;
  display: flex;
  flex-direction: column;
`;

const BarWrapper = styled.div`
  position: relative;
  width: 230px;
  height: 40px;
  margin-bottom: 12px;
  z-index: 20;
`;

const BarBackground = styled.div`
  background-color: #eceef0;
  border-radius: 20px;
  position: absolute;
  top: 16px;
  left: 0;
  width: 100%;
  height: 17%;
  z-index: -10;
`;

const NutrientText = styled.div`
  margin-top: -15px;
  color: var(--grey8, #7c8389);
  font-family: SUIT;
  font-size: 10px;
  font-weight: 400;
  line-height: 160%;
`;

const NutrientNameText = styled.div`
  position: absolute;
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 10px;
  font-weight: 400;
  line-height: 160%;
`;
