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
  markerStart,
  markerEnd,
}: {
  label: string;
  intake: number;
  recommended: number;
  color: string;
  markerStart: number;
  markerEnd: number;
}) {
  const maxNutrientValue = (recommended * 10) / 6;
  const normalizedIntake = Math.min(intake, maxNutrientValue);

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
    maintainAspectRatio: false,
  };

  console.log(markerStart, markerEnd);

  return (
    <BarWrapper>
      <BarBackground />
      <NutrientRange $length={markerEnd - markerStart} $position={markerStart}>
       <NutrientRangeText $length={markerEnd - markerStart}>적정 범위</NutrientRangeText> 
        <MarkerStart />
        <MarkerEnd />
      </NutrientRange>
      <NutrientNameText>{label}</NutrientNameText>
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
        { name: '탄수화물', amount: 0, properAmount: 0, markerStart: 291.9, markerEnd: 456.5 },
        { name: '단백질', amount: 0, properAmount: 0, markerStart: 78.6, markerEnd: 154.5 },
        { name: '지방', amount: 0, properAmount: 0, markerStart: 36.3, markerEnd: 145.5 },
      ];
      break;
    case 2: // 미네랄
      defaultNutrients = [
        { name: '칼슘', amount: 0, properAmount: 0, markerStart: 288, markerEnd: 1144.46 },
        { name: '인', amount: 0, properAmount: 0, markerStart: 357, markerEnd: 976.87 },
      ];
      break;
    case 3: // 비타민
      defaultNutrients = [
        { name: '비타민 A', amount: 0, properAmount: 0, markerStart: 3783, markerEnd: 18915 },
        { name: '비타민 D', amount: 0, properAmount: 0, markerStart: 30, markerEnd: 300 },
        { name: '비타민 E', amount: 0, properAmount: 0, markerStart: 8.1, markerEnd: 81 },
      ];
      break;
    default:
      break;
  }

  const mergedNutrients = defaultNutrients.map((defaultNutrient) => {
    const foundNutrient = nutrientData.find((nutrient) => nutrient.name === defaultNutrient.name);
    return foundNutrient ? { ...defaultNutrient, ...foundNutrient } : defaultNutrient;
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
          markerStart={nutrient.markerStart}
          markerEnd={nutrient.markerEnd}
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
  width: 302px;
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

const NutrientRange = styled.div<{ $length: number; $position: number }>`
  position: absolute;
  width: ${({ $length }) => $length}px;
  height: 9.5px;
  top: 15px;
  left: ${({ $position }) => $position}px;
  background: rgba(100, 105, 110, 0.2);
  display: flex;
  align-items: center;

 
`;

const NutrientRangeText = styled.div<{ $length: number }>`
position: absolute;
  top: -16px;
  left: ${({ $length }) => $length/2-19}px;

  // 글자
  color: var(--grey6, #afb8c1);

  /* caption_regular_10pt */
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 16px */
`;
const Marker = styled.div`
  width: 2px;
  height: 100%;
  background-color: var(--grey8, #7c8389);
  position: absolute;
`;

const MarkerStart = styled(Marker)`
  left: 0;
`;

const MarkerEnd = styled(Marker)`
  right: 0;
`;
