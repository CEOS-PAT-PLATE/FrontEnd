'use client';

import styled from 'styled-components';
import NutrientInputFieldsSection from '@components/input-data2/dryfood-snack-page/nutrient-input-section';
import { simpleHash } from '@lib/utils';


interface Nutrient {
  name: string;
  unit: string;
  isRequired: boolean;
  index:number;
}

interface NutrientSection {
  nutrients: Nutrient[];
}

interface NutrientInputFieldsContainerProps {
  nutrientSections: NutrientSection[];
}

const NutrientInputFieldsContainer = ({ nutrientSections }: NutrientInputFieldsContainerProps) => {



  return (
     <NutrientInputContainer>
      {nutrientSections.map((section, index) => (
         <div key={simpleHash(JSON.stringify(section))}>
         <NutrientInputFieldsSection nutrients={section.nutrients} />
         <SectionBorder />
       </div>
      
      ))}
    </NutrientInputContainer>
  );
};

export const NutrientInputContainer = styled.div`
  overflow-y: scroll;
  margin-top: 14px;
  display: grid;
  height: 280px;
`;

const SectionBorder = styled.div`
  width: 312px;
  background: #dde0e4;
  height: 1px;
  margin-top: 11px;
  margin-bottom: 11px;
`;

export default NutrientInputFieldsContainer;
