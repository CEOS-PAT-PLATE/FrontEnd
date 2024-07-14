import styled from 'styled-components';
import NutrientInputField from '@components/input-data2/dryfood-snack-page/nutrient-input';
import { useRecoilState } from 'recoil';
import {  RequiredInputState } from '@recoil/nutrientAtoms';
import React, { ChangeEvent } from 'react';


interface Nutrient {
  name: string;
  unit: string;
  isRequired: boolean;
  index: number;
}

interface NutrientInputFieldsSectionProps {
  nutrients: Nutrient[];
}



const NutrientInputFieldsSection = ({ nutrients }: NutrientInputFieldsSectionProps) => {
  const [requiredInputList, setRequiredInputList] = useRecoilState(RequiredInputState); // 배열 형태임




  
  return (
    <NutrientInputSection>
      {nutrients.map((nutrient, index) => (
        <NutrientInputField
          key={index}
          label={nutrient.name}
          unit={nutrient.unit}
          isRequired={nutrient.isRequired}
          placeholder="00"
          index={nutrient.index}
        />
      ))}
    </NutrientInputSection>
  );
};

export default NutrientInputFieldsSection;

export const NutrientInputSection = styled.div`
  display: flex;
  width: 312px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;
