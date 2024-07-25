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
let normalizedIntake=0;
  if(intake>recommended*10/6)
    {normalizedIntake = recommended*10/6;}
  else{normalizedIntake = intake;}
 

  const chartData = {
    labels: [label],
    datasets: [
      {
        label: '섭취 영양소',
        data: [normalizedIntake],
        backgroundColor: [color],
        borderRadius: 20,
        barPercentage: 1,
        borderSkipped: false,
        minBarLength: 2,
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
        max: recommended*10/6,
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
    maintainAspectRatio: false,
  };

  return (
    <BarWrapper>
      <BarBackground />
      <NutrientRange>
      <MarkerStart />
      <MarkerMiddle />
      <MarkerEnd />
    </NutrientRange>      <NutrientNameText>{label}</NutrientNameText>
      <Bar data={chartData} options={options} />
      <NutrientText>
        {intake}g / {recommended}g
      </NutrientText>
    </BarWrapper>
  );
}

export default function LineChart({ nutrientData, group }: { nutrientData: any[]; group: number }) {
  let defaultNutrients = [] as any[];

  switch (group) {
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

  const mergedNutrients = defaultNutrients.map((defaultNutrient) => {
    const foundNutrient = nutrientData.find((nutrient) => nutrient.name === defaultNutrient.name);
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
  display: flex;
  flex-direction: column;

`;

const BarWrapper = styled.div`
  position: relative;
  height: 40px;
  margin-bottom: 12px;
  z-index: 20;
  max-width: 302px;
   

`;

const BarBackground = styled.div`
  background-color: #eceef0;
  border-radius: 20px;
  position: absolute;
  top: 16px;
  left: 0;
  width: 270px;
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
  `


  const NutrientNameText = styled.div`
  position: absolute;
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 10px;
  font-weight: 400;
  line-height: 160%;
;`


// 적정 영양소 범위 표시 위한 요소
const NutrientRange = styled.div`
  position: relative;
  width: 59px;
  height: 10px;
  flex-shrink: 0;
  background: rgba(100, 105, 110, 0.20);
  display: flex;
  align-items: center;
`;

const Marker = styled.div`
  position: absolute;
width: 1px;
background-color: var(--grey8, #7C8389);
  height: 100%;
`;

const MarkerStart = styled(Marker)`
  left: 0;
`;

const MarkerMiddle = styled(Marker)`
  left: 50%;
  transform: translateX(-50%);
`;

const MarkerEnd = styled(Marker)`
  right: 0;
`;

