'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  BarController,
} from 'chart.js';

ChartJS.register(LinearScale, CategoryScale, BarElement, Legend,  BarController);

function NutrientBar({
  label,
  intake,
  color,
  markerStart,
  markerEnd,
  unit,
  ratio
}: {
  label: string;
  intake: number;
  color: string;
  markerStart: number;
  markerEnd: number;
  unit: string;
  ratio: number;
}) {
  const maxNutrientValue = ( markerStart * 10) /ratio;
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

  const startPosition = (markerStart / maxNutrientValue) * 302; // 302는 그래프의 최대 너비로
  const endPosition = (markerEnd / maxNutrientValue) * 302;
  const rangeWidth = endPosition - startPosition;

  return (
    <BarWrapper>
      <BarBackground />
      <NutrientTextWrapper>
        <NutrientNameText>{label}</NutrientNameText>
        <NutrientText>
          {intake}
          {unit}
        </NutrientText>
      </NutrientTextWrapper>
      <NutrientRange $length={rangeWidth} $position={startPosition}>
        <NutrientRangeText $length={rangeWidth}>적정 범위</NutrientRangeText>
        <MarkerStart />
        <MarkerStartText $position={startPosition} $length={rangeWidth}>
          {markerStart.toFixed(1)}
        </MarkerStartText>
        <MarkerEnd />
        <MarkerEndText $position={endPosition} $length={rangeWidth}>
          {markerEnd.toFixed(1)}
        </MarkerEndText>
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
        {
          name: '탄수화물',
          amount: 0,
          properAmount: 0,
          markerStart: 291.95,
          markerEnd: 496.31,
          units: 'g',
          color: '#FF4D46',
          ratio: 5.9,
        },
        {
          name: '단백질',
          amount: 0,
          properAmount: 0,
          markerStart: 46.81,
          markerEnd: 93.62,
          units: 'g',
          color: '#40C97F',
          ratio: 5,

        },
        {
          name: '지방',
          amount: 0,
          properAmount: 0,
          markerStart: 14.28,
          markerEnd: 24.99,
          units: 'g',
          color: '#40C97F',
          ratio: 5.7,

        },
      ];
      break;
    case 2: // 미네랄
      defaultNutrients = [
        {
          name: '칼슘',
          amount: 0,
          properAmount: 0,
          markerStart: 1.32,
          markerEnd: 2.64,
          units: 'g',
          color: '#40C97F',
          ratio: 5,

        },
        { name: '인', amount: 0, properAmount: 0, markerStart: 1.04, markerEnd: 2.08, units: 'g', color: '#40C97F',          ratio: 5,
        },
      ];
      break;
    case 3: // 비타민
      defaultNutrients = [
        {
          name: '비타민 A',
          amount: 0,
          properAmount: 0,
          markerStart: 1579.38,
          markerEnd: 7896.94,
          units: 'IU',
          color: '#FF4D46',
          ratio: 2,
          
          
        },
        {
          name: '비타민 D',
          amount: 0,
          properAmount: 143.75,
          markerStart: 30,
          markerEnd: 1437.52,
          units: 'IU',
          color: '#FF4D46',
          ratio: 0.21,
        },
        {
          name: '비타민 E',
          amount: 0,
          properAmount: 0,
          markerStart: 9.45,
          markerEnd: 94.57,
          units: 'IU',
          color: '#40C97F',
          ratio: 1,
        },
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
          intake={nutrient.amount.toFixed(1)}
          markerStart={nutrient.markerStart}
          markerEnd={nutrient.markerEnd}
          unit={nutrient.units}
          color={nutrient.color}
          ratio={nutrient.ratio}
        />
      ))}
    </LineWrapper>
  );
}

const LineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const BarWrapper = styled.div`
  position: relative;
  height: 40px;
  margin-bottom: 32px;
  margin-top: 0px;
  z-index: 20;
  max-width: 320px;
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

  margin-top: 5px;
`;

const NutrientText = styled.div`
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 14px;
  font-weight: 600;
  line-height: 160%;

  margin-top: -15px;
`;

const NutrientNameText = styled.div`
  color: var(--grey9, #64696e);
  margin-right: 5px;
  font-family: SUIT;
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
  margin-top: -15px;
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
  left: ${({ $length }) => $length / 2 - 19}px;
  color: var(--grey6, #afb8c1);
  font-family: SUIT;
  font-size: 10px;
  font-weight: 400;
  line-height: 160%;
  width: 38px;
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

const MarkerStartText = styled.div<{ $position: number; $length: number }>`
  position: absolute;
  top: 13px;
  width: 38px;

  left: -10px;
  color: var(--grey6, #afb8c1);
  font-family: SUIT;
  font-size: 10px;
  font-weight: 400;
  line-height: 160%;
`;

const MarkerEndText = styled.div<{ $position: number; $length: number }>`
  position: absolute;
  top: 13px;
  right: -10px;
  color: var(--grey6, #afb8c1);
  font-family: SUIT;
  font-size: 10px;
  font-weight: 400;
  line-height: 160%;
`;
