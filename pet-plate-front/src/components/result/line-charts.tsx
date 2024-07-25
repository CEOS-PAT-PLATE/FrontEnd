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
  unit
}: {
  label: string;
  intake: number;
  recommended: number;
  color: string;
  markerStart: number;
  markerEnd: number;
  unit: string;
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
    < NutrientTextWrapper>
      <NutrientNameText>{label}</NutrientNameText>
      <NutrientText>
        {intake}{unit}
      </NutrientText>
      </NutrientTextWrapper>
      <NutrientRange $length={markerEnd - markerStart} $position={markerStart}>
       <NutrientRangeText $length={markerEnd - markerStart}>적정 범위</NutrientRangeText> 
        <MarkerStart />
        <MarkerStartText $position={markerStart}$length={markerEnd - markerStart} >{markerStart}</MarkerStartText> 
        <MarkerEnd />
        <MarkerEndText $position={markerEnd} $length={markerEnd - markerStart}>{markerEnd}</MarkerEndText> 
      </NutrientRange>
     
      <Bar data={chartData} options={options} />
    
    </BarWrapper>
  );
}

export default function LineChart({ nutrientData, group }: { nutrientData: any[]; group: number }) {
  let defaultNutrients = [] as any[];

  switch (group) {
    case 1: // 기본 영양소
      defaultNutrients = [
        { name: '탄수화물', amount: 0, properAmount: 0, markerStart: 291.9, markerEnd: 456.5,units: 'g' },
        { name: '단백질', amount: 0, properAmount: 0, markerStart: 78.6, markerEnd: 154.5,  units: 'g' },
        { name: '지방', amount: 0, properAmount: 0, markerStart: 36.3, markerEnd: 145.5,  units: 'g' },
      ];
      break;
    case 2: // 미네랄
      defaultNutrients = [
        { name: '칼슘', amount: 0, properAmount: 0, markerStart: 288, markerEnd: 1144.46, units: 'mg' },
        { name: '인', amount: 0, properAmount: 0, markerStart: 357, markerEnd: 976.87, units: 'mg' },
      ];
      break;
    case 3: // 비타민
      defaultNutrients = [
        { name: '비타민 A', amount: 0, properAmount: 0, markerStart: 3783, markerEnd: 18915, units: 'IU' },
        { name: '비타민 D', amount: 0, properAmount: 0, markerStart: 30, markerEnd: 300, units: 'IU' },
        { name: '비타민 E', amount: 0, properAmount: 0, markerStart: 8.1, markerEnd: 81, units: 'IU' },
      ];
      break;
    default:
      break;
  }

  const mergedNutrients = defaultNutrients.map((defaultNutrient) => {
    const foundNutrient = nutrientData.find((nutrient) => nutrient.name === defaultNutrient.name);
    return foundNutrient ? { ...defaultNutrient, ...foundNutrient, } : defaultNutrient;
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
          unit={nutrient.units}
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

const NutrientTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-top: 5px;
  position: absolute;
  width: 302px;
  top: -14px;
`;

const NutrientText = styled.div`
color: var(--grey11, #36393C);

/* body2_semibold_14pt */
font-family: SUIT;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 160%; /* 22.4px */

`;

const NutrientNameText = styled.div`  
 color: var(--grey9, #64696E);
  margin-right: 5px;

/* body2_regular_14pt */
font-family: SUIT;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 22.4px */
`;

const NutrientRange = styled.div<{ $length: number; $position: number }>`
  position: absolute;
  width: ${({ $length }) => $length}px;
  max-width: ${({ $length }) => $length}px;
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


const MarkerStartText = styled.div<{ $position: number, $length: number }>`
  position: absolute;
  top: +13px;
  left: 0px;
  width: 38px;

color: var(--grey6, #AFB8C1);

/* caption_regular_10pt */
font-family: SUIT;
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 16px */
`;

const MarkerEndText = styled.div<{ $position: number, $length: number }>`
  position: absolute;
  top: +13px;
  right: -27px;
  width: 38px;

color: var(--grey6, #AFB8C1);

/* caption_regular_10pt */
font-family: SUIT;
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 16px */
`;